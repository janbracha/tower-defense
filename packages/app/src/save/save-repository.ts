import { err, type Result } from '@gotn/kernel';
import type { BattleCheckpoint, BattleResult } from '@gotn/sim';
import type { Clock, Logger, SaveStore, SaveStoreError } from '../ports';
import { createEmptySave, parseSave, serializeSave, type GameSave, type Profile } from './game-save';

export const SAVE_KEY = 'gotn.save';
export const QUARANTINE_KEY = `${SAVE_KEY}.corrupt`;

export interface LoadedGame {
  readonly save: GameSave;
  /** Set when the stored data had to be discarded or could not be read. */
  readonly warning: string | null;
}

/** A write failure is reported to the player but never stops the game. */
export type PersistWarning = string | null;

function describe(error: SaveStoreError): string {
  return error.kind === 'quota'
    ? 'Browser storage is full; progress was not saved.'
    : 'Progress could not be saved.';
}

/** Profile and checkpoint persistence on top of any `SaveStore`. */
export class SaveRepository {
  private current: GameSave;
  private revision = 0;
  private queue: Promise<unknown> = Promise.resolve();

  constructor(
    private readonly store: SaveStore,
    private readonly clock: Clock,
    private readonly logger: Logger,
  ) {
    this.current = createEmptySave(clock.nowMs());
  }

  get save(): GameSave {
    return this.current;
  }

  /** Reads and validates the stored save; unusable data is set aside, never thrown. */
  async load(): Promise<LoadedGame> {
    const read = await this.store.read(SAVE_KEY);
    if (!read.ok) {
      this.logger.warn('Save could not be read', { error: read.error.message });
      this.current = createEmptySave(this.clock.nowMs());
      return { save: this.current, warning: 'Saved progress could not be read.' };
    }
    if (!read.value) {
      this.current = createEmptySave(this.clock.nowMs());
      return { save: this.current, warning: null };
    }

    this.revision = read.value.revision;
    const parsed = parseSave(read.value.body);
    if (parsed.ok) {
      this.current = parsed.value;
      return { save: this.current, warning: null };
    }

    this.logger.warn('Discarding unusable save', { reason: parsed.error.kind });
    await this.store.write({ key: QUARANTINE_KEY, revision: this.revision, body: read.value.body });
    await this.store.remove(SAVE_KEY);
    this.current = createEmptySave(this.clock.nowMs());
    return {
      save: this.current,
      warning:
        parsed.error.kind === 'version'
          ? 'Saved progress is from another version and was set aside.'
          : 'Saved progress was damaged and was set aside.',
    };
  }

  saveCheckpoint(checkpoint: BattleCheckpoint): Promise<PersistWarning> {
    return this.update((save) => ({ ...save, checkpoint }));
  }

  clearCheckpoint(): Promise<PersistWarning> {
    return this.update((save) => ({ ...save, checkpoint: null }));
  }

  /** Counts a finished battle and drops the checkpoint. */
  recordResult(result: BattleResult): Promise<PersistWarning> {
    return this.update((save) => {
      const won = result.outcome === 'victory';
      const { profile } = save;
      const next: Profile = {
        runs: profile.runs + 1,
        clears: profile.clears + (won ? 1 : 0),
        bestLivesLeft: won ? Math.max(profile.bestLivesLeft ?? 0, result.livesLeft) : profile.bestLivesLeft,
        bestTicks: won ? Math.min(profile.bestTicks ?? result.ticks, result.ticks) : profile.bestTicks,
      };
      return { ...save, profile: next, checkpoint: null };
    });
  }

  private update(change: (save: GameSave) => GameSave): Promise<PersistWarning> {
    const run = async (): Promise<PersistWarning> => {
      const next = { ...change(this.current), savedAt: this.clock.nowMs() };
      this.current = next;
      const written = await this.write(next);
      if (!written.ok) {
        this.logger.warn('Save failed', { error: written.error.message });
        return describe(written.error);
      }
      return null;
    };
    const result = this.queue.then(run, run);
    this.queue = result;
    return result;
  }

  private async write(save: GameSave): Promise<Result<void, SaveStoreError>> {
    try {
      this.revision += 1;
      return await this.store.write({ key: SAVE_KEY, revision: this.revision, body: serializeSave(save) });
    } catch (error) {
      return err({ kind: 'io', message: error instanceof Error ? error.message : String(error) });
    }
  }
}
