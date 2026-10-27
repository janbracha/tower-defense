import { BattleSession, SaveRepository, type BattleEvent, type BattleResult } from '@gotn/app';
import { greenwoodGateContent } from '@gotn/content-core';
import { InMemorySaveStore } from '@gotn/infra';
import { describe, expect, it } from 'vitest';

type Step =
  | { readonly kind: 'place'; readonly padId: string; readonly towerId: string }
  | { readonly kind: 'upgrade'; readonly padId: string };

const place = (padId: string, towerId: string): Step => ({ kind: 'place', padId, towerId });
const upgrade = (padId: string): Step => ({ kind: 'upgrade', padId });

/** A fixed build order; each step waits until it is affordable. */
const BUILD: readonly Step[] = [
  place('p2', 'arcane_tower'),
  place('p7', 'ballista_post'),
  place('p11', 'frost_spire'),
  upgrade('p7'),
  upgrade('p2'),
  place('p6', 'ballista_post'),
  upgrade('p11'),
  place('p1', 'arcane_tower'),
  upgrade('p6'),
  place('p3', 'ballista_post'),
  upgrade('p1'),
  place('p9', 'frost_spire'),
  upgrade('p3'),
  place('p8', 'arcane_tower'),
  upgrade('p9'),
  upgrade('p8'),
];

/** Stateless, so a resumed session makes exactly the decisions the original would have. */
function buildNext(session: BattleSession): void {
  const towers = new Map(session.state.towers.map((tower) => [tower.padId, tower]));
  for (const step of BUILD) {
    const tower = towers.get(step.padId);
    if (step.kind === 'place' && !tower) {
      session.submit({ type: 'placeTower', padId: step.padId, towerId: step.towerId });
      return;
    }
    if (step.kind === 'upgrade' && tower && tower.tier === 0) {
      session.submit({ type: 'upgradeTower', padId: step.padId });
      return;
    }
  }
}

const FRAME_MS = 1000 / 30;
const MAX_TICKS = 60_000;

const silent = { debug() {}, info() {}, warn() {}, error() {} };
const clock = { nowMs: () => 1_000_000 };

function newRepository(store = new InMemorySaveStore()): { store: InMemorySaveStore; repo: SaveRepository } {
  return { store, repo: new SaveRepository(store, clock, silent) };
}

interface Tally {
  checkpoints: number;
  events: BattleEvent[];
  result: BattleResult | null;
}

/** Plays like the battle screen does: one tick per frame, saving at wave breaks and on the end. */
async function play(
  session: BattleSession,
  repo: SaveRepository,
  options: { player?: (session: BattleSession) => void; stopAtWave?: number } = {},
): Promise<Tally> {
  const player = options.player ?? buildNext;
  const tally: Tally = { checkpoints: 0, events: [], result: null };

  while (session.state.status === 'running' && session.state.tick < MAX_TICKS) {
    player(session);
    session.advance(FRAME_MS);
    const events = session.drainEvents();
    tally.events.push(...events);

    for (const event of events) {
      if (event.type === 'waveCleared') {
        const checkpoint = session.checkpoint();
        if (checkpoint) {
          tally.checkpoints += 1;
          await repo.saveCheckpoint(checkpoint);
        }
        if (options.stopAtWave === event.wave) return tally;
      }
    }
  }

  tally.result = session.result();
  if (tally.result) await repo.recordResult(tally.result);
  return tally;
}

const countOf = (events: readonly BattleEvent[], type: BattleEvent['type']): number =>
  events.filter((event) => event.type === type).length;

describe('complete Greenwood Gate battle', () => {
  it('can be won from wave 1 to Sporemother Myra, saving at every wave break', async () => {
    const { repo, store } = newRepository();
    await repo.load();
    const session = new BattleSession(greenwoodGateContent, 11);

    const tally = await play(session, repo);

    expect(tally.result?.outcome).toBe('victory');
    expect(tally.result?.wavesCleared).toBe(greenwoodGateContent.waves.length);
    expect(countOf(tally.events, 'waveCleared')).toBe(14);
    expect(tally.checkpoints).toBe(14);

    // The boss fight actually happened: Myra spawned, dropped pods, enraged, and fell.
    expect(countOf(tally.events, 'bossSpawned')).toBe(1);
    expect(countOf(tally.events, 'podSpawned')).toBeGreaterThan(0);
    expect(countOf(tally.events, 'bossPhaseChanged')).toBe(1);
    expect(
      tally.events.some((event) => event.type === 'enemyKilled' && event.defId === 'sporemother_myra'),
    ).toBe(true);

    const saved = await newRepository(store).repo.load();
    expect(saved.save.checkpoint).toBeNull();
    expect(saved.save.profile).toMatchObject({ runs: 1, clears: 1 });
    expect(saved.save.profile.bestLivesLeft).toBe(tally.result?.livesLeft);
  });

  it('ends in defeat without towers and records the loss', async () => {
    const { repo, store } = newRepository();
    await repo.load();
    const session = new BattleSession(greenwoodGateContent, 11);

    const tally = await play(session, repo, { player: () => {} });

    expect(tally.result?.outcome).toBe('defeat');
    expect(tally.result?.livesLeft).toBe(0);

    // Early waves still leave checkpoints behind; the loss must clear them.
    const saved = await newRepository(store).repo.load();
    expect(saved.save.profile).toEqual({ runs: 1, clears: 0, bestLivesLeft: null, bestTicks: null });
    expect(saved.save.checkpoint).toBeNull();
  });

  it('resumes from the saved checkpoint and finishes exactly like an uninterrupted run', async () => {
    const uninterrupted = new BattleSession(greenwoodGateContent, 5);
    const first = newRepository();
    await first.repo.load();
    const tallyFull = await play(uninterrupted, first.repo);

    // Play to the break after wave 6, then "close the tab".
    const store = new InMemorySaveStore();
    const before = newRepository(store);
    await before.repo.load();
    const original = new BattleSession(greenwoodGateContent, 5);
    await play(original, before.repo, { stopAtWave: 6 });

    // "Reopen": a new repository on the same storage offers Continue.
    const after = newRepository(store);
    const loaded = await after.repo.load();
    const checkpoint = loaded.save.checkpoint;
    expect(checkpoint?.wave).toBe(6);
    if (!checkpoint) throw new Error('expected a checkpoint');

    const resumed = BattleSession.fromCheckpoint(greenwoodGateContent, checkpoint);
    expect(resumed.view().hash).toBe(original.view().hash);

    const tallyResumed = await play(resumed, after.repo);
    expect(tallyResumed.result).toEqual(tallyFull.result);
    expect(resumed.view().hash).toBe(uninterrupted.view().hash);
  });

  it('never offers Continue after a finished battle', async () => {
    const { repo, store } = newRepository();
    await repo.load();
    await play(new BattleSession(greenwoodGateContent, 2), repo, { player: () => {} });
    expect((await newRepository(store).repo.load()).save.checkpoint).toBeNull();
  });

  it('refuses a checkpoint from a different map instead of crashing the game', async () => {
    const { repo } = newRepository();
    await repo.load();
    const session = new BattleSession(greenwoodGateContent, 3);
    const checkpoint = session.checkpoint();
    if (!checkpoint) throw new Error('expected a checkpoint');
    expect(() =>
      BattleSession.fromCheckpoint(greenwoodGateContent, { ...checkpoint, mapId: 'elsewhere' }),
    ).toThrow(/Invalid checkpoint/);
  });
});
