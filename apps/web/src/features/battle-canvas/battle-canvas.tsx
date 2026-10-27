'use client';

import { useEffect, useRef } from 'react';
import type { BattleEvent, BattleSession } from '@gotn/app';
import { createBattleView, type RenderOverlay } from '@gotn/render';
import { useAppStores } from '@gotn/ui';
import { placeTower } from '@/features/battle-hud/commands';

/** HUD values are pushed at most this often; events and commands publish immediately. */
const PUBLISH_INTERVAL_MS = 100;

export function BattleCanvas({
  session,
  onEvents,
}: {
  session: BattleSession;
  onEvents?: (events: readonly BattleEvent[]) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { battleView } = useAppStores();
  const hoverRef = useRef<string | null>(null);
  const onEventsRef = useRef(onEvents);

  useEffect(() => {
    onEventsRef.current = onEvents;
  }, [onEvents]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let frame = 0;
    let destroy: (() => void) | null = null;

    const store = battleView;
    store.getState().setModel(session.view());

    createBattleView(host, session.content)
      .then((view) => {
        if (cancelled) {
          view.destroy();
          return;
        }
        destroy = () => view.destroy();

        const onMove = (event: PointerEvent): void => {
          hoverRef.current = view.padAt(event.clientX, event.clientY);
        };
        const onLeave = (): void => {
          hoverRef.current = null;
        };
        const onClick = (event: PointerEvent): void => {
          const padId = view.padAt(event.clientX, event.clientY);
          const state = store.getState();
          if (!padId) {
            state.selectPad(null);
            return;
          }
          const occupied = session.state.towers.some((tower) => tower.padId === padId);
          state.selectPad(padId);
          if (!occupied && state.buildTowerId) placeTower(session, store, padId);
        };
        host.addEventListener('pointermove', onMove);
        host.addEventListener('pointerleave', onLeave);
        host.addEventListener('pointerdown', onClick);

        let last = performance.now();
        let sincePublish = 0;

        const tick = (now: number): void => {
          const elapsed = now - last;
          last = now;

          session.advance(elapsed);
          const events = session.drainEvents();
          sincePublish += elapsed;
          if (events.length > 0 || sincePublish >= PUBLISH_INTERVAL_MS) {
            sincePublish = 0;
            store.getState().setModel(session.view());
          }
          if (events.length > 0) onEventsRef.current?.(events);

          const state = store.getState();
          const ghostDef = state.buildTowerId
            ? session.content.towers.find((def) => def.id === state.buildTowerId)
            : undefined;
          const hoverPadId = hoverRef.current;
          const hoverFree =
            hoverPadId !== null && !session.state.towers.some((tower) => tower.padId === hoverPadId);
          const overlay: RenderOverlay = {
            hoverPadId,
            selectedPadId: state.selectedPadId,
            ghost: ghostDef
              ? { towerId: ghostDef.id, valid: hoverFree && session.state.gold >= ghostDef.cost }
              : null,
            debug: state.debug,
          };
          view.draw(session.state, session.alpha, overlay);
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        const previousDestroy = destroy;
        destroy = () => {
          host.removeEventListener('pointermove', onMove);
          host.removeEventListener('pointerleave', onLeave);
          host.removeEventListener('pointerdown', onClick);
          previousDestroy();
        };
      })
      .catch((error: unknown) => {
        console.error('Failed to create the battle view', error);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      destroy?.();
    };
  }, [session, battleView]);

  return <div ref={hostRef} className="h-full w-full touch-none" />;
}
