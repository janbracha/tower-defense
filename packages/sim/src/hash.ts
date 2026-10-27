const scratch = new Float64Array(1);
const words = new Uint32Array(scratch.buffer);

function mix(hash: number, value: number): number {
  let k = Math.imul(value, 0xcc9e2d51);
  k = (k << 15) | (k >>> 17);
  k = Math.imul(k, 0x1b873593);
  let h = hash ^ k;
  h = (h << 13) | (h >>> 19);
  return (Math.imul(h, 5) + 0xe6546b64) | 0;
}

function finalize(hash: number): number {
  let h = hash ^ (hash >>> 16);
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

const hex = (value: number): string => value.toString(16).padStart(8, '0');

/** 64-bit non-cryptographic hash (two 32-bit lanes) over a stream of numbers. */
export class StateHasher {
  private laneA = 0x9747b28c;
  private laneB = 0x1f83d9ab;
  private count = 0;

  add(value: number): this {
    scratch[0] = value;
    const low = words[0] ?? 0;
    const high = words[1] ?? 0;
    this.laneA = mix(mix(this.laneA, low), high);
    this.laneB = mix(mix(this.laneB, high ^ 0x5bd1e995), low);
    this.count += 1;
    return this;
  }

  digest(): string {
    return hex(finalize(this.laneA ^ this.count)) + hex(finalize(this.laneB + this.count));
  }
}
