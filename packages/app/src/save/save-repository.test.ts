import { ok, err, type Result } from '@gotn/kernel';
import type { BattleCheckpoint, BattleResult } from '@gotn/sim';
import { describe, expect, it } from 'vitest';
import type { Clock, Logger, SaveDocument, SaveStore, SaveStoreError } from '../ports';
import { createEmptySave, parseSave, serializeSave, type GameSave } from './game-save';
import { QUARANTINE_KEY, SAVE_KEY, SaveRepository } from './save-repository';

const checkpoint: BattleCheckpoint = {
  mapId: 'greenwood_gate',
  seed: 3,
  tick: 900,
  wave: 4,
  wavesCleared: 4,
  gold: 120,
  lives: 17,
  kills: 30,
  goldEarned: 400,
  nextId: 77,
  breakTicksLeft: 300,
  rngState: 123456,
  towers: [{ id: 5, padId: 'p1', defId: 'arcane_tower', tier: 1, cooldown: 0.5, spent: 180 }],
};

const save: GameSave = {
  schemaVersion: 1,
  savedAt: 1000,
  profile: { runs: 2, clears: 1, bestLivesLeft: 12, bestTicks: 20000 },
  checkpoint,
};

class FakeStore implements SaveStore {
  readonly documents = new Map<string, SaveDocument>();
  failWith: SaveStoreError | null = null;

  async read(key: string): Promise<Result<SaveDocument | null, SaveStoreError>> {
    return ok(this.documents.get(key) ?? null);
  }
  async write(document: SaveDocument): Promise<Result<void, SaveStoreError>> {
    if (this.failWith) return err(this.failWith);
    this.documents.set(document.key, document);
    return ok(undefined);
  }
  async remove(key: string): Promise<Result<void, SaveStoreError>> {
    this.documents.delete(key);
    return ok(undefined);
  }
  async listKeys(): Promise<Result<readonly string[], SaveStoreError>> {
    return ok([...this.documents.keys()]);
  }
}

const clock: Clock = { nowMs: () => 5000 };
const silent: Logger = { debug() {}, info() {}, warn() {}, error() {} };

function repository(store: FakeStore): SaveRepository {
  return new SaveRepository(store, clock, silent);
}

const victory: BattleResult = {
  outcome: 'victory',
  wavesCleared: 15,
  kills: 100,
  goldEarned: 3000,
  livesLeft: 15,
  ticks: 18000,
};

describe('parseSave', () => {
  it('round-trips a valid save', () => {
    const parsed = parseSave(serializeSave(save));
    expect(parsed.ok && parsed.value).toEqual(save);
  });

  it('accepts a save without a checkpoint', () => {
    const parsed = parseSave(serializeSave({ ...save, checkpoint: null }));
    expect(parsed.ok && parsed.value.checkpoint).toBeNull();
  });

  it('reports other versions separately from damage', () => {
    const other = parseSave(JSON.stringify({ ...save, schemaVersion: 2 }));
    expect(!other.ok && other.error.kind).toBe('version');
  });

  it.each([
    ['broken JSON', '{nope'],
    ['a non-object', '42'],
    ['no version', JSON.stringify({ profile: save.profile })],
    ['a bad profile', JSON.stringify({ ...save, profile: { runs: -1 } })],
    ['a negative gold value', JSON.stringify({ ...save, checkpoint: { ...checkpoint, gold: -1 } })],
    ['a fractional tick', JSON.stringify({ ...save, checkpoint: { ...checkpoint, tick: 1.5 } })],
    ['a bad tower', JSON.stringify({ ...save, checkpoint: { ...checkpoint, towers: [{ id: 'x' }] } })],
    ['a missing map id', JSON.stringify({ ...save, checkpoint: { ...checkpoint, mapId: 5 } })],
  ])('rejects %s as corrupt', (_label, body) => {
    const parsed = parseSave(body);
    expect(!parsed.ok && parsed.error.kind).toBe('corrupt');
  });
});

describe('SaveRepository', () => {
  it('starts empty when nothing is stored', async () => {
    const loaded = await repository(new FakeStore()).load();
    expect(loaded.warning).toBeNull();
    expect(loaded.save.checkpoint).toBeNull();
    expect(loaded.save.profile.runs).toBe(0);
  });

  it('persists a checkpoint and loads it back in a new repository', async () => {
    const store = new FakeStore();
    const first = repository(store);
    await first.load();
    expect(await first.saveCheckpoint(checkpoint)).toBeNull();

    const loaded = await repository(store).load();
    expect(loaded.save.checkpoint).toEqual(checkpoint);
  });

  it('records results into the profile and clears the checkpoint', async () => {
    const store = new FakeStore();
    const repo = repository(store);
    await repo.load();
    await repo.saveCheckpoint(checkpoint);
    await repo.recordResult(victory);
    await repo.saveCheckpoint(checkpoint);
    await repo.recordResult({ ...victory, outcome: 'defeat', livesLeft: 0, ticks: 9000 });
    await repo.recordResult({ ...victory, livesLeft: 20, ticks: 17000 });

    const loaded = await repository(store).load();
    expect(loaded.save.checkpoint).toBeNull();
    expect(loaded.save.profile).toEqual({ runs: 3, clears: 2, bestLivesLeft: 20, bestTicks: 17000 });
  });

  it('sets corrupt data aside and starts fresh', async () => {
    const store = new FakeStore();
    store.documents.set(SAVE_KEY, { key: SAVE_KEY, revision: 4, body: '{broken' });
    const loaded = await repository(store).load();

    expect(loaded.warning).toMatch(/damaged/);
    expect(loaded.save.profile.runs).toBe(0);
    expect(store.documents.has(SAVE_KEY)).toBe(false);
    expect(store.documents.get(QUARANTINE_KEY)?.body).toBe('{broken');
  });

  it('starts a new profile on a version mismatch and keeps the old data', async () => {
    const store = new FakeStore();
    const body = JSON.stringify({ ...save, schemaVersion: 99 });
    store.documents.set(SAVE_KEY, { key: SAVE_KEY, revision: 1, body });
    const loaded = await repository(store).load();

    expect(loaded.warning).toMatch(/another version/);
    expect(loaded.save.profile.runs).toBe(0);
    expect(store.documents.get(QUARANTINE_KEY)?.body).toBe(body);
  });

  it('reports a quota error without throwing and keeps the in-memory state', async () => {
    const store = new FakeStore();
    store.failWith = { kind: 'quota', message: 'full' };
    const repo = repository(store);
    await repo.load();

    const warning = await repo.recordResult(victory);
    expect(warning).toMatch(/full/);
    expect(repo.save.profile.runs).toBe(1);

    store.failWith = null;
    expect(await repo.saveCheckpoint(checkpoint)).toBeNull();
    const loaded = await repository(store).load();
    expect(loaded.save.profile.runs).toBe(1);
  });

  it('survives a store that throws', async () => {
    const store = new FakeStore();
    store.write = async () => {
      throw new Error('boom');
    };
    const repo = repository(store);
    await repo.load();
    expect(await repo.saveCheckpoint(checkpoint)).toMatch(/could not be saved/);
  });

  it('createEmptySave stamps the time', () => {
    expect(createEmptySave(42).savedAt).toBe(42);
  });
});
