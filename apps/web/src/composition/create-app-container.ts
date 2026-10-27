import type { AppServices } from '@gotn/app';
import { SaveRepository } from '@gotn/app';
import { ConsoleLogger, LocalStorageSaveStore, SystemClock } from '@gotn/infra';
import { createStores, type AppStores } from '@gotn/stores';

export interface AppContainer {
  readonly services: AppServices;
  readonly stores: AppStores;
  readonly saves: SaveRepository;
}

/** Composition root: the only place where adapters are bound to application ports. */
export function createAppContainer(): AppContainer {
  const services: AppServices = {
    clock: new SystemClock(),
    logger: new ConsoleLogger(),
    saveStore: new LocalStorageSaveStore(),
  };

  return {
    services,
    stores: createStores(),
    saves: new SaveRepository(services.saveStore, services.clock, services.logger),
  };
}
