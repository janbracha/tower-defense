import { describe, expect, it } from 'vitest';
import { InMemorySaveStore } from './memory-save-store';

describe('InMemorySaveStore', () => {
  it('round-trips documents and lists keys in order', async () => {
    const store = new InMemorySaveStore();
    await store.write({ key: 'b', revision: 1, body: '{}' });
    await store.write({ key: 'a', revision: 1, body: '{}' });

    const read = await store.read('a');
    expect(read).toEqual({ ok: true, value: { key: 'a', revision: 1, body: '{}' } });
    expect(await store.listKeys()).toEqual({ ok: true, value: ['a', 'b'] });
  });

  it('returns null for missing documents and supports removal', async () => {
    const store = new InMemorySaveStore();
    expect(await store.read('missing')).toEqual({ ok: true, value: null });

    await store.write({ key: 'a', revision: 1, body: '{}' });
    await store.remove('a');
    expect(await store.read('a')).toEqual({ ok: true, value: null });
  });
});
