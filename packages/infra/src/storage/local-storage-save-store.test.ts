import { describe, expect, it } from 'vitest';
import { LocalStorageSaveStore, type StorageLike } from './local-storage-save-store';

class FakeStorage implements StorageLike {
  readonly data = new Map<string, string>();
  quota = Number.POSITIVE_INFINITY;

  get length(): number {
    return this.data.size;
  }
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    if (this.data.size >= this.quota && !this.data.has(key)) {
      throw Object.assign(new Error('quota'), { name: 'QuotaExceededError' });
    }
    this.data.set(key, value);
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  key(index: number): string | null {
    return [...this.data.keys()][index] ?? null;
  }
}

describe('LocalStorageSaveStore', () => {
  it('writes, reads, lists and removes documents', async () => {
    const storage = new FakeStorage();
    const withStorage = new LocalStorageSaveStore(() => storage);

    await withStorage.write({ key: 'gotn.save', revision: 3, body: '{"a":1}' });
    storage.setItem('other.app', 'x');

    const read = await withStorage.read('gotn.save');
    expect(read.ok && read.value).toEqual({ key: 'gotn.save', revision: 3, body: '{"a":1}' });
    const keys = await withStorage.listKeys();
    expect(keys.ok && keys.value).toEqual(['gotn.save']);

    await withStorage.remove('gotn.save');
    const gone = await withStorage.read('gotn.save');
    expect(gone.ok && gone.value).toBeNull();
  });

  it('maps quota failures to a quota error', async () => {
    const storage = new FakeStorage();
    storage.quota = 0;
    const result = await new LocalStorageSaveStore(() => storage).write({
      key: 'gotn.save',
      revision: 1,
      body: '{}',
    });
    expect(!result.ok && result.error.kind).toBe('quota');
  });

  it('returns foreign values unchanged so they can be quarantined', async () => {
    const storage = new FakeStorage();
    storage.setItem('gotn.save', 'not json at all');
    const result = await new LocalStorageSaveStore(() => storage).read('gotn.save');
    expect(result.ok && result.value?.body).toBe('not json at all');
  });

  it('reports unavailable storage as an io error instead of throwing', async () => {
    const store = new LocalStorageSaveStore(() => null);
    const read = await store.read('gotn.save');
    const write = await store.write({ key: 'gotn.save', revision: 1, body: '{}' });
    expect(!read.ok && read.error.kind).toBe('io');
    expect(!write.ok && write.error.kind).toBe('io');
  });
});
