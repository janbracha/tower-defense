/** Wall-clock access for UI and telemetry only; never used inside the simulation. */
export interface Clock {
  nowMs(): number;
}
