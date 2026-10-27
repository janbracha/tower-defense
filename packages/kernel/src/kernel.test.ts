import { describe, expect, it } from 'vitest';
import { assert, assertNever, err, ok } from './index';

describe('Result', () => {
  it('wraps values and errors', () => {
    expect(ok(1)).toEqual({ ok: true, value: 1 });
    expect(err('boom')).toEqual({ ok: false, error: 'boom' });
  });
});

describe('assert', () => {
  it('throws when the condition is falsy', () => {
    expect(() => assert(false, 'nope')).toThrow('Assertion failed: nope');
    expect(() => assert(true, 'fine')).not.toThrow();
  });

  it('assertNever always throws', () => {
    expect(() => assertNever('x' as never)).toThrow('Unexpected value: x');
  });
});
