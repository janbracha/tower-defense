import type { DamageType } from '@gotn/content-schema';

/**
 * The minimal read-only shape the scene draws. The simulation state satisfies it
 * structurally, so the web layer can pass it straight through without render importing sim.
 */
export interface RenderTower {
  readonly id: number;
  readonly padId: string;
  readonly defId: string;
  readonly x: number;
  readonly y: number;
  readonly tier: number;
}

export interface RenderEnemy {
  readonly id: number;
  readonly defId: string;
  readonly hp: number;
  readonly maxHp: number;
  readonly x: number;
  readonly y: number;
  readonly prevX: number;
  readonly prevY: number;
  readonly slowAmount: number;
  readonly phase: number;
  /** Pods: ticks until they hatch, out of `timerMax`. */
  readonly timerTicks: number;
  readonly timerMax: number;
}

export interface RenderProjectile {
  readonly id: number;
  readonly kind: 'homing' | 'bolt';
  readonly damageType: DamageType;
  readonly x: number;
  readonly y: number;
  readonly prevX: number;
  readonly prevY: number;
  readonly dirX: number;
  readonly dirY: number;
}

export interface RenderState {
  readonly towers: readonly RenderTower[];
  readonly enemies: readonly RenderEnemy[];
  readonly projectiles: readonly RenderProjectile[];
}

/** Interaction feedback that is not part of the simulation. */
export interface RenderOverlay {
  readonly hoverPadId: string | null;
  readonly selectedPadId: string | null;
  /** Tower being placed; `valid` tints the ghost green or red. */
  readonly ghost: { readonly towerId: string; readonly valid: boolean } | null;
  /** Debug: draw every tower's range and the tile grid. */
  readonly debug: boolean;
}

export const EMPTY_OVERLAY: RenderOverlay = {
  hoverPadId: null,
  selectedPadId: null,
  ghost: null,
  debug: false,
};
