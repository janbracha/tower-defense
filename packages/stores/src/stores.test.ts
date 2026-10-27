import { describe, expect, it } from 'vitest';
import { createStores } from './index';

describe('createStores', () => {
  it('starts on the boot screen and navigates', () => {
    const { appFlow } = createStores();
    expect(appFlow.getState().screen).toBe('boot');

    appFlow.getState().navigate('main-menu');
    expect(appFlow.getState().screen).toBe('main-menu');
  });

  it('merges settings patches', () => {
    const { settings } = createStores();
    settings.getState().update({ masterVolume: 0.2 });

    expect(settings.getState().masterVolume).toBe(0.2);
    expect(settings.getState().language).toBe('en');
  });
});
