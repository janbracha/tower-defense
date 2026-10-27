import type { Clock, Logger, SaveStore } from './ports';

/** Everything the application layer needs from the outside world, wired by the composition root. */
export interface AppServices {
  readonly clock: Clock;
  readonly logger: Logger;
  readonly saveStore: SaveStore;
}
