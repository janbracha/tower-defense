import { Application } from 'pixi.js';

export interface StageOptions {
  readonly background?: number;
  readonly maxResolution?: number;
}

export interface StageHandle {
  destroy(): void;
}

/** Creates a Pixi application that fills `host`; shared by every scene in this package. */
export async function mountApplication(
  host: HTMLElement,
  options: StageOptions = {},
): Promise<Application> {
  const app = new Application();
  await app.init({
    resizeTo: host,
    background: options.background ?? 0x0b1020,
    antialias: true,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio, options.maxResolution ?? 2),
  });
  host.appendChild(app.canvas);
  return app;
}

/** Mounts an empty Pixi stage into `host`; scene content is added by later render modules. */
export async function createStage(host: HTMLElement, options: StageOptions = {}): Promise<StageHandle> {
  const app = await mountApplication(host, options);

  return {
    destroy: () => {
      app.destroy({ removeView: true }, { children: true });
    },
  };
}
