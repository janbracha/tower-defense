import { describe, expect, it } from 'vitest';
import { StateHasher } from './hash';
import { Rng } from './rng';

describe('Rng', () => {
  it('produces the same sequence for the same seed', () => {
    const a = new Rng(1234);
    const b = new Rng(1234);
    const left = Array.from({ length: 20 }, () => a.next());
    const right = Array.from({ length: 20 }, () => b.next());
    expect(left).toEqual(right);
  });

  it('produces different sequences for different seeds', () => {
    const a = new Rng(1);
    const b = new Rng(2);
    expect(a.next()).not.toBe(b.next());
  });

  it('stays within [0, 1) and nextInt stays within range', () => {
    const rng = new Rng(99);
    for (let i = 0; i < 1000; i += 1) {
      const value = rng.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      const integer = rng.nextInt(7);
      expect(integer).toBeGreaterThanOrEqual(0);
      expect(integer).toBeLessThan(7);
    }
  });

  it('can be saved and restored mid-sequence', () => {
    const rng = new Rng(7);
    rng.next();
    rng.next();
    const saved = rng.getState();
    const expected = [rng.next(), rng.next(), rng.next()];

    const restored = new Rng(0);
    restored.setState(saved);
    expect([restored.next(), restored.next(), restored.next()]).toEqual(expected);
  });

  it('matches known mulberry32 output for seed 1', () => {
    const rng = new Rng(1);
    expect(rng.next()).toBeCloseTo(0.6270739405881613, 12);
  });
});

describe('StateHasher', () => {
  const hashOf = (values: readonly number[]): string => {
    const hasher = new StateHasher();
    for (const value of values) hasher.add(value);
    return hasher.digest();
  };

  it('is stable for the same inputs', () => {
    expect(hashOf([1, 2, 3.5])).toBe(hashOf([1, 2, 3.5]));
  });

  it('is sensitive to values, order and length', () => {
    const base = hashOf([1, 2, 3]);
    expect(hashOf([1, 2, 4])).not.toBe(base);
    expect(hashOf([3, 2, 1])).not.toBe(base);
    expect(hashOf([1, 2, 3, 0])).not.toBe(base);
  });

  it('produces 16 hex characters', () => {
    expect(hashOf([42])).toMatch(/^[0-9a-f]{16}$/);
  });
});
