'use client';

import type { BattleSession } from '@gotn/app';
import { Button, useAppStores, useBattleView } from '@gotn/ui';
import { placeTower, runCommand } from './commands';

/** Tower type picker and the panel for the selected pad. */
export function BuildBar({ session }: { session: BattleSession }) {
  const { battleView } = useAppStores();
  const model = useBattleView((state) => state.model);
  const buildTowerId = useBattleView((state) => state.buildTowerId);
  const selectedPadId = useBattleView((state) => state.selectedPadId);
  const notice = useBattleView((state) => state.notice);
  const setBuildTower = useBattleView((state) => state.setBuildTower);
  if (!model) return null;

  const selectedTower = model.towers.find((tower) => tower.padId === selectedPadId);
  const canPlaceOnSelected = selectedPadId !== null && !selectedTower && buildTowerId !== null;

  return (
    <div className="flex flex-wrap items-center gap-4" data-testid="build-bar">
      <div className="flex gap-2">
        {session.content.towers.map((tower, index) => {
          const armed = buildTowerId === tower.id;
          const affordable = model.gold >= tower.cost;
          return (
            <button
              key={tower.id}
              type="button"
              aria-pressed={armed}
              onClick={() => setBuildTower(armed ? null : tower.id)}
              className={`rounded-md border px-3 py-1.5 text-left text-sm transition ${
                armed ? 'border-yellow-300 bg-nexus-800' : 'border-nexus-800 hover:bg-nexus-900'
              } ${affordable ? '' : 'opacity-60'}`}
            >
              <span className="block font-semibold">
                {index + 1}. {tower.name}
              </span>
              <span className="block text-xs text-nexus-200">
                {tower.cost} gold · {tower.damageType}
                {affordable ? '' : ' · too expensive'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-sm">
        {selectedTower ? (
          <>
            <span>
              {selectedTower.name} · tier {selectedTower.tier + 1}
            </span>
            <Button
              disabled={selectedTower.upgradeCost === null}
              onClick={() => runCommand(session, battleView, { type: 'upgradeTower', padId: selectedTower.padId })}
            >
              {selectedTower.upgradeCost === null ? 'Max tier' : `Upgrade (${selectedTower.upgradeCost})`}
            </Button>
            <Button
              variant="ghost"
              onClick={() => runCommand(session, battleView, { type: 'sellTower', padId: selectedTower.padId })}
            >
              Sell (+{selectedTower.sellValue})
            </Button>
          </>
        ) : selectedPadId ? (
          <>
            <span>Pad {selectedPadId} is empty</span>
            <Button disabled={!canPlaceOnSelected} onClick={() => placeTower(session, battleView, selectedPadId)}>
              Build here
            </Button>
          </>
        ) : (
          <span className="text-nexus-400">Pick a tower, then click a pad.</span>
        )}
      </div>

      {notice ? (
        <span role="status" className="text-sm text-red-300">
          {notice}
        </span>
      ) : null}
    </div>
  );
}
