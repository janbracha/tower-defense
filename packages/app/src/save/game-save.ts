import { err, ok, type Result } from '@gotn/kernel';
import type { BattleCheckpoint, TowerCheckpoint } from '@gotn/sim';

export const SAVE_SCHEMA_VERSION = 1;

export interface Profile {
  readonly runs: number;
  readonly clears: number;
  /** Best result among victories; null until the first clear. */
  readonly bestLivesLeft: number | null;
  readonly bestTicks: number | null;
}

export interface GameSave {
  readonly schemaVersion: typeof SAVE_SCHEMA_VERSION;
  readonly savedAt: number;
  readonly profile: Profile;
  /** Present only while a run is in progress. */
  readonly checkpoint: BattleCheckpoint | null;
}

export type SaveParseError =
  | { readonly kind: 'corrupt'; readonly reason: string }
  | { readonly kind: 'version'; readonly found: unknown };

export const EMPTY_PROFILE: Profile = {
  runs: 0,
  clears: 0,
  bestLivesLeft: null,
  bestTicks: null,
};

export function createEmptySave(savedAt: number): GameSave {
  return { schemaVersion: SAVE_SCHEMA_VERSION, savedAt, profile: EMPTY_PROFILE, checkpoint: null };
}

export function serializeSave(save: GameSave): string {
  return JSON.stringify(save);
}

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;
const isNonNegative = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;
const isNullableCount = (value: unknown): value is number | null => value === null || isCount(value);

function parseProfile(value: unknown): Profile | null {
  if (!isObject(value)) return null;
  const { runs, clears, bestLivesLeft, bestTicks } = value;
  if (!isCount(runs) || !isCount(clears) || !isNullableCount(bestLivesLeft) || !isNullableCount(bestTicks)) {
    return null;
  }
  return { runs, clears, bestLivesLeft, bestTicks };
}

function parseTower(value: unknown): TowerCheckpoint | null {
  if (!isObject(value)) return null;
  const { id, padId, defId, tier, cooldown, spent } = value;
  if (
    !isCount(id) ||
    typeof padId !== 'string' ||
    typeof defId !== 'string' ||
    !isCount(tier) ||
    !isNonNegative(cooldown) ||
    !isCount(spent)
  ) {
    return null;
  }
  return { id, padId, defId, tier, cooldown, spent };
}

function parseCheckpoint(value: unknown): BattleCheckpoint | null {
  if (!isObject(value)) return null;
  const v = value;
  if (typeof v.mapId !== 'string' || !Array.isArray(v.towers)) return null;
  const counts = [
    v.seed,
    v.tick,
    v.wave,
    v.wavesCleared,
    v.gold,
    v.lives,
    v.kills,
    v.goldEarned,
    v.nextId,
    v.breakTicksLeft,
    v.rngState,
  ];
  if (!counts.every(isCount)) return null;

  const towers: TowerCheckpoint[] = [];
  for (const raw of v.towers as unknown[]) {
    const tower = parseTower(raw);
    if (!tower) return null;
    towers.push(tower);
  }

  return {
    mapId: v.mapId,
    seed: v.seed as number,
    tick: v.tick as number,
    wave: v.wave as number,
    wavesCleared: v.wavesCleared as number,
    gold: v.gold as number,
    lives: v.lives as number,
    kills: v.kills as number,
    goldEarned: v.goldEarned as number,
    nextId: v.nextId as number,
    breakTicksLeft: v.breakTicksLeft as number,
    rngState: v.rngState as number,
    towers,
  };
}

/** Validates untrusted JSON; whatever it returns is safe to hand to the rest of the app. */
export function parseSave(body: string): Result<GameSave, SaveParseError> {
  let raw: unknown;
  try {
    raw = JSON.parse(body);
  } catch {
    return err({ kind: 'corrupt', reason: 'not valid JSON' });
  }
  if (!isObject(raw)) return err({ kind: 'corrupt', reason: 'not an object' });
  if (raw.schemaVersion !== SAVE_SCHEMA_VERSION) {
    return err(
      typeof raw.schemaVersion === 'number'
        ? { kind: 'version', found: raw.schemaVersion }
        : { kind: 'corrupt', reason: 'missing schemaVersion' },
    );
  }

  const profile = parseProfile(raw.profile);
  if (!profile) return err({ kind: 'corrupt', reason: 'bad profile' });
  if (!isNonNegative(raw.savedAt)) return err({ kind: 'corrupt', reason: 'bad savedAt' });

  let checkpoint: BattleCheckpoint | null = null;
  if (raw.checkpoint !== null && raw.checkpoint !== undefined) {
    checkpoint = parseCheckpoint(raw.checkpoint);
    if (!checkpoint) return err({ kind: 'corrupt', reason: 'bad checkpoint' });
  }

  return ok({ schemaVersion: SAVE_SCHEMA_VERSION, savedAt: raw.savedAt, profile, checkpoint });
}
