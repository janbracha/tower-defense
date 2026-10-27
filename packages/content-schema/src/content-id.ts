import { err, ok, type Brand, type Result } from '@gotn/kernel';

/** Namespaced, never-reused content identifier, e.g. `core:tower.arcane_tower`. */
export type ContentId = Brand<string, 'ContentId'>;

const CONTENT_ID_PATTERN = /^[a-z0-9_]+:[a-z_]+(\.[a-z0-9_]+)+$/;

export function parseContentId(raw: string): Result<ContentId, string> {
  return CONTENT_ID_PATTERN.test(raw)
    ? ok(raw as ContentId)
    : err(`Invalid content id "${raw}", expected "namespace:kind.name"`);
}
