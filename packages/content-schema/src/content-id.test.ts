import { describe, expect, it } from 'vitest';
import { parseContentId } from './index';

describe('parseContentId', () => {
  it('accepts namespaced ids', () => {
    expect(parseContentId('core:tower.arcane_tower').ok).toBe(true);
    expect(parseContentId('core:tower.arcane_tower.archmage_spire').ok).toBe(true);
  });

  it('rejects malformed ids', () => {
    expect(parseContentId('Arcane Tower').ok).toBe(false);
    expect(parseContentId('core:tower').ok).toBe(false);
  });
});
