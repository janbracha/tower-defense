import type { BattleSession } from '@gotn/app';
import type { BattleViewStore } from '@gotn/stores';

const POINTER_MESSAGE = 'Select a tower type first, then click a pad.';

/** Hotkeys and clicks all funnel through here so every action explains a rejection. */
export function placeTower(session: BattleSession, store: BattleViewStore, padId: string): void {
  const { buildTowerId } = store.getState();
  if (!buildTowerId) {
    store.getState().setNotice(POINTER_MESSAGE);
    return;
  }
  runCommand(session, store, { type: 'placeTower', padId, towerId: buildTowerId });
}

type Command = Parameters<BattleSession['submit']>[0];

const REJECTION_TEXT = {
  'battle-over': 'The battle is over.',
  'unknown-pad': 'There is no such pad.',
  'unknown-tower': 'There is no such tower.',
  'pad-occupied': 'That pad already has a tower.',
  'no-tower-on-pad': 'There is no tower on that pad.',
  'max-tier': 'That tower is already fully upgraded.',
  'insufficient-gold': 'Not enough gold.',
  'wave-in-progress': 'A wave is already in progress.',
} as const;

export function runCommand(session: BattleSession, store: BattleViewStore, command: Command): void {
  const result = session.submit(command);
  const state = store.getState();
  state.setNotice(result.ok ? null : REJECTION_TEXT[result.error]);
  state.setModel(session.view());
}
