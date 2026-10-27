import { ok, type Result } from '@gotn/kernel';
import type { SaveDocument, SaveStore, SaveStoreError } from '@gotn/app';

/** Volatile store for tests and as the default until the IndexedDB adapter exists. */
export class InMemorySaveStore implements SaveStore {
  private readonly documents = new Map<string, SaveDocument>();

  async read(key: string): Promise<Result<SaveDocument | null, SaveStoreError>> {
    return ok(this.documents.get(key) ?? null);
  }

  async write(document: SaveDocument): Promise<Result<void, SaveStoreError>> {
    this.documents.set(document.key, document);
    return ok(undefined);
  }

  async remove(key: string): Promise<Result<void, SaveStoreError>> {
    this.documents.delete(key);
    return ok(undefined);
  }

  async listKeys(): Promise<Result<readonly string[], SaveStoreError>> {
    return ok([...this.documents.keys()].sort((a, b) => a.localeCompare(b)));
  }
}
