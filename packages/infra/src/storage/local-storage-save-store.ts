import { err, ok, type Result } from '@gotn/kernel';
import type { SaveDocument, SaveStore, SaveStoreError } from '@gotn/app';

/** The subset of the Web Storage API this adapter needs. */
export interface StorageLike {
  readonly length: number;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string | null;
}

const KEY_PREFIX = 'gotn.';

function browserStorage(): StorageLike | null {
  try {
    return (globalThis as { localStorage?: StorageLike }).localStorage ?? null;
  } catch {
    // Access itself throws when storage is blocked by browser settings.
    return null;
  }
}

function isQuotaError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const { name, code } = error as { name?: unknown; code?: unknown };
  return name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED' || code === 22 || code === 1014;
}

function toStoreError(error: unknown): SaveStoreError {
  const message = error instanceof Error ? error.message : String(error);
  return isQuotaError(error) ? { kind: 'quota', message } : { kind: 'io', message };
}

/** Save store backed by `localStorage`; storage is looked up on every call so server rendering is safe. */
export class LocalStorageSaveStore implements SaveStore {
  constructor(private readonly getStorage: () => StorageLike | null = browserStorage) {}

  async read(key: string): Promise<Result<SaveDocument | null, SaveStoreError>> {
    const storage = this.getStorage();
    if (!storage) return err({ kind: 'io', message: 'Storage is unavailable' });
    try {
      const raw = storage.getItem(key);
      if (raw === null) return ok(null);
      let envelope: unknown = null;
      try {
        envelope = JSON.parse(raw);
      } catch {
        // Handled below: unparseable text is passed up as-is.
      }
      if (
        typeof envelope === 'object' &&
        envelope !== null &&
        typeof (envelope as { body?: unknown }).body === 'string' &&
        typeof (envelope as { revision?: unknown }).revision === 'number'
      ) {
        const { body, revision } = envelope as { body: string; revision: number };
        return ok({ key, revision, body });
      }
      // Not our envelope: hand the raw text up so the caller can quarantine it.
      return ok({ key, revision: 0, body: raw });
    } catch (error) {
      return err(toStoreError(error));
    }
  }

  async write(document: SaveDocument): Promise<Result<void, SaveStoreError>> {
    const storage = this.getStorage();
    if (!storage) return err({ kind: 'io', message: 'Storage is unavailable' });
    try {
      storage.setItem(document.key, JSON.stringify({ revision: document.revision, body: document.body }));
      return ok(undefined);
    } catch (error) {
      return err(toStoreError(error));
    }
  }

  async remove(key: string): Promise<Result<void, SaveStoreError>> {
    const storage = this.getStorage();
    if (!storage) return err({ kind: 'io', message: 'Storage is unavailable' });
    try {
      storage.removeItem(key);
      return ok(undefined);
    } catch (error) {
      return err(toStoreError(error));
    }
  }

  async listKeys(): Promise<Result<readonly string[], SaveStoreError>> {
    const storage = this.getStorage();
    if (!storage) return err({ kind: 'io', message: 'Storage is unavailable' });
    try {
      const keys: string[] = [];
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (key?.startsWith(KEY_PREFIX)) keys.push(key);
      }
      return ok(keys.sort((a, b) => a.localeCompare(b)));
    } catch (error) {
      return err(toStoreError(error));
    }
  }
}
