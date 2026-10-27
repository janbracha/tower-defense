import type { Result } from '@gotn/kernel';

export interface SaveDocument {
  readonly key: string;
  readonly revision: number;
  readonly body: string;
}

export type SaveStoreError =
  | { readonly kind: 'io'; readonly message: string }
  | { readonly kind: 'quota'; readonly message: string };

export interface SaveStore {
  read(key: string): Promise<Result<SaveDocument | null, SaveStoreError>>;
  write(document: SaveDocument): Promise<Result<void, SaveStoreError>>;
  remove(key: string): Promise<Result<void, SaveStoreError>>;
  listKeys(): Promise<Result<readonly string[], SaveStoreError>>;
}
