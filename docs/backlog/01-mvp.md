# MVP Backlog

**Goal:** prove the fun and the architecture (GDD §18, TDD).
**Scope:** 3 Verdant maps · 8 starter towers (Tiers I–III) · 8 evolutions · hero Aelara Voss · 10 Verdant enemies · boss Sporemother Myra · 3 Nexus Spells · Gold/Mana/Integrity/Nexus Energy · 5 permanent upgrades · save v1 · programmer art.
**Out of scope:** Citadel buildings, research, relics, prestige, procedural maps, other modes, final art/audio.

## Suggested Build Sequence

| Wave | Focus | Outcome |
|---|---|---|
| **A** | EP-1 scaffold, guardrails, spikes | Repo, CI, decisions recorded |
| **B** | EP-2 core, EP-4 schemas | Deterministic loop with content registry |
| **C** | **Walking skeleton** (stories tagged ★) | One lane, one tower, one enemy, rendered and playable |
| **D** | Breadth: statuses, towers, enemies, maps, hero, boss | Full MVP content |
| **E** | Meta, save, UI polish, audio placeholders | Complete loop |
| **F** | Validation against exit criteria | Playtest-ready |

★ = required for the walking skeleton.

---

## EP-1 Foundation, Tooling and Guardrails

### FT-1.1 Monorepo and project scaffold — `P0`

- [ ] **US-1.1.1 ★** As a developer, I can install, build, test and lint the whole repo with single commands.
  - [ ] Initialize pnpm workspace, root scripts and Turborepo pipeline (build, typecheck, lint, test)
  - [ ] Add shared tsconfig bases (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) with project references
  - [ ] Scaffold packages with `exports` maps: `kernel`, `content-schema`, `content-core`, `sim`, `meta`, `app`
  - [ ] Scaffold packages: `sim-host`, `render`, `stores`, `ui`, `infra/*`, `testkit`, `tools`
  - [ ] Scaffold `apps/web` (Next.js App Router, Tailwind, `(marketing)` and `(game)` route groups, client-only `/play`)
  - [ ] Add shared ESLint, Prettier and `.editorconfig`
  - [ ] Add Vitest workspace config with one smoke test per package
- [ ] **US-1.1.2 ★** As a maintainer, every PR is validated automatically.
  - [ ] GitHub Actions workflow: cached install, typecheck, lint, unit tests
  - [ ] Add Playwright smoke test (loads `/play`, no console errors) and CI job
  - [ ] Add PR preview deployment workflow (static host)
  - [ ] Add PR template, issue templates (epic, feature, story, task, spike, bug), label sync file, CODEOWNERS
- [ ] **US-1.1.3** As a contributor, I can onboard quickly.
  - [ ] Write CONTRIBUTING (setup, scripts, branch/commit conventions, task sizing rule)
  - [ ] Add `docs/adr/` with ADR template and import ADR-01…ADR-11 from the TDD summary

### FT-1.2 Architecture guardrails — `P0`

- [ ] **US-1.2.1 ★** As an architect, forbidden imports fail the build.
  - [ ] Configure boundaries lint encoding the package import matrix (TDD §1.3)
  - [ ] Add lint rule banning deep imports (outside package `exports`)
  - [ ] Add dependency-graph cycle check script and CI step
- [ ] **US-1.2.2 ★** As an engineer, non-deterministic APIs cannot enter the sim.
  - [ ] Add "sim-safe" lint rule for `kernel`, `sim`, `meta`: ban `Math.random`, `Date`, `performance`, DOM globals
  - [ ] Extend rule: ban `Math.pow`/`**` with non-integer exponents, trig/log/exp functions
  - [ ] Extend rule: require comparator in `.sort()`; ban iteration over `Map`/`Set` without ordered keys in hot paths
  - [ ] Add lint rule tests with positive/negative fixtures

### FT-1.3 Technical spikes — `P0`

- [ ] **US-1.3.1** As the team, we decide risky technology choices with evidence.
  - [ ] Spike: Float64 determinism harness (same seed and commands ⇒ same hash) on Chromium, Firefox, WebKit; write ADR-12
  - [ ] Spike: custom SoA ECS vs a library at 1,200 entities, 30 Hz, ≤ 4 ms; write ADR-13
  - [ ] Spike: transferable triple-buffer vs SharedArrayBuffer snapshots (COOP/COEP implications); write ADR-14
  - [ ] Spike: Pixi with 1,200 animated sprites + 200 projectiles on an integrated GPU (draw calls, frame time); write ADR-15
  - [ ] Spike: React HUD updates at 10 Hz from Zustand with selectors (render counts); write ADR-16

---

## EP-2 Simulation Core

### FT-2.1 Kernel primitives — `P0`

- [ ] **US-2.1.1 ★** As an engine developer, I have deterministic building blocks.
  - [ ] Add branded ID types, `Result`, `assert` and logger interface to `kernel`
  - [ ] Implement seeded PRNG with named-stream splitting; tests for reproducibility and stream independence
  - [ ] Implement tick constants (30 Hz) and seconds↔ticks helpers
  - [ ] Implement deterministic math helpers (clamp, lerp, table lookup with linear interpolation)
  - [ ] Implement min-heap timer scheduler ordered by `(dueTick, seq)`
  - [ ] Implement fractional accumulator for integer resources
  - [ ] Implement fast state-hash utility over ordered numeric arrays

### FT-2.2 Entity-component store — `P0`

- [ ] **US-2.2.1 ★** As an engine developer, entities and components are stored deterministically and efficiently.
  - [ ] Entity store: 20-bit index + 12-bit generation, free list recycled at end of tick
  - [ ] Dense typed-array component storage and component registry
  - [ ] Sparse-set component storage
  - [ ] Tag bitset storage and the tag catalog
  - [ ] Deferred command buffer for create/destroy applied at phase end
  - [ ] Ascending-index query iteration helpers
- [ ] **US-2.2.2 ★** As a gameplay developer, I can query nearby entities deterministically.
  - [ ] Uniform spatial hash grid with layers (ground, air, underground, soldiers, towers, objectives)
  - [ ] Circle, ring and nearestN queries returning results sorted by `(distance, index)`
  - [ ] Cone and line queries
- [ ] **US-2.2.3 ★** As a gameplay developer, the core components exist.
  - [ ] Components batch 1: Identity, Transform, PathFollower, Health, Resists, Bounty, Threat
  - [ ] Components batch 2: StatBlock link, StatusSet, Weapon, Targeting, Tower, Hero
  - [ ] Components batch 3: Projectile, Zone, Summon, Lifetime, Objective, Anim

### FT-2.3 Simulation loop and infrastructure — `P0`

- [ ] **US-2.3.1 ★** As an engine developer, the world steps in a fixed, ordered schedule.
  - [ ] World with ordered system scheduler implementing the 14 phases (TDD §7.3)
  - [ ] Fixed-step driver: 30 Hz, speed multipliers 0.5×–3×, catch-up cap of 6 ticks
  - [ ] Command queue: executeTick assignment, sequence ordering, `CommandResult` with typed rejection reasons
  - [ ] Wire named RNG streams (`spawn`, `combat`, `status`, `ai`, `loot`, `events`) into the world
  - [ ] Integrate the timer scheduler for delayed effects
- [ ] **US-2.3.2 ★** As a gameplay developer, I can react to events deterministically.
  - [ ] Sim event bus: envelope, `seq`, breadth-first queue, depth guard
  - [ ] Interceptor / handler / observer phases with priority ordering
  - [ ] Subscription ownership and automatic cleanup on owner death
  - [ ] Core event type catalog (Battle, Wave, Combat, Entity, Tower, Resource, Nexus, Boss, Map)
- [ ] **US-2.3.3** As a QA engineer, battles are reproducible from setup + commands.
  - [ ] Command log recorder
  - [ ] State-hash checkpoints every 300 ticks
  - [ ] Headless replay runner CLI in `tools` (setup + log ⇒ final hash)
  - [ ] Golden-replay harness in `testkit` with the first golden scenario
  - [ ] CI job running golden replays in Node

### FT-2.4 Snapshots and worker host — `P0`

- [ ] **US-2.4.1 ★** As a renderer, I receive per-tick snapshots without blocking the sim.
  - [ ] Snapshot SoA layout and writer (movers, projectiles, zones, towers, objectives)
  - [ ] Triple-buffer pool and `SnapshotReady` signalling
  - [ ] Worker protocol message types and validators (Init, Command, SetSpeed, Pump, Ready, SnapshotReady, EventBatch, HudPatch, CommandResult, Checkpoint, BattleEnded, Fault)
- [ ] **US-2.4.2 ★** As a UI developer, I can drive a battle through a host client.
  - [ ] Worker bootstrap: load registry bundle and build the world from `BattleSetup`
  - [ ] Host client API (init, command, pump, speed, dispose) and snapshot reader
  - [ ] Inline fallback host with per-frame time budget
  - [ ] Outbound event batcher with cosmetic back-pressure rule
  - [ ] HUD patch publisher (≤ 10 Hz, changed fields only)
- [ ] **US-2.4.3** As a player, a crash produces a useful report instead of a frozen screen.
  - [ ] Emit `Fault` with tick/hash on exceptions; stop the battle safely
  - [ ] Offer replay export (setup + log) from the fault screen data model

---

## EP-3 Combat and Effect Engine

### FT-3.1 Stats and modifiers — `P0`

- [ ] **US-3.1.1 ★** As a designer, stats combine through a layered, explainable stack.
  - [ ] Implement ModifierStack (base, flat, additive %, multiplicative, override, clamp) with source tracking and dirty recompute
  - [ ] Implement `explain(stat)` breakdown API
  - [ ] Implement stat key registry and default clamp table loader
  - [ ] Implement modifier bucket caps (skilltree, research, mastery, relic, gear) validation

### FT-3.2 Damage pipeline — `P0`

- [ ] **US-3.2.1 ★** As a player, damage follows consistent, learnable rules.
  - [ ] DamageRequest and flags types; pre-checks (alive, targetable, invulnerable)
  - [ ] Interceptor integration for `DamageRequested`
  - [ ] Immunity mask, resist and penetration (cap 75%, floor −100%)
  - [ ] Apply to HP, overkill, death mark, `DamageApplied` events
- [ ] **US-3.2.2** As a designer, armor, crits, shields and vulnerability work per the TDD.
  - [ ] Accuracy and evasion roll
  - [ ] Critical roll using the `combat` stream
  - [ ] Vulnerability bucket with tag-scoped contributions and +100% cap
  - [ ] Armor, shred, pierce and the 10% floor
  - [ ] Damage-taken multipliers and total DR cap
  - [ ] Shield pools (priority, bypass fraction, `ShieldBroken`)
  - [ ] DoT/HoT tick helper (15-tick interval) and healing rules
- [ ] **US-3.2.3** As a QA engineer, combat math is locked by tests.
  - [ ] Golden vectors for TDD Examples A–D
  - [ ] Property tests (resist monotonicity, armor floor, no NaN, damage ≥ 0)

### FT-3.3 Status engine — `P0`

- [ ] **US-3.3.1 ★** As a designer, statuses apply, stack, tick and expire predictably.
  - [ ] Status definition loader and stacking rules (Refresh, StackToMax, Independent, StrongestWins)
  - [ ] Apply pipeline: immunity, chance roll, tenacity, boss rules
  - [ ] Tick and expiry processing
  - [ ] Slow combination formula and movement integration
- [ ] **US-3.3.2** As a designer, MVP statuses exist.
  - [ ] Statuses: Burn, Chill (slow), Freeze, Stun, Root
  - [ ] Statuses: Poison, Bleed, Brittle, Disable (with Overheat variant), Regen-block
  - [ ] Hard-CC diminishing returns table and elite tenacity
  - [ ] Write `statusMask` bits for the snapshot

### FT-3.4 Effect engine — `P0`

- [ ] **US-3.4.1 ★** As a designer, I can compose Trigger → Condition → Selector → Effect.
  - [ ] Trigger registry and dispatch (OnInterval, OnAttack, OnHit, OnKill, OnDeath, OnSpawn, OnBuild, OnUpgrade, OnCast, OnEnterZone)
  - [ ] Condition evaluators (tags, status, hp%, resource, chance, count-in-radius, All/Any/Not)
  - [ ] Selectors (Self, Owner, EventSource/Target, NearestN, RandomN, InRadius, InCone, InLine, ChainFrom, AdjacentTowers)
- [ ] **US-3.4.2** As a designer, amounts are formulas.
  - [ ] Spike + implement allocation-free expression evaluator (+ − × ÷ min max clamp lerp, table lookups); write ADR
  - [ ] Tests for formulas used by MVP content
- [ ] **US-3.4.3 ★** As a designer, effect primitives exist.
  - [ ] Primitives batch 1: Damage, Heal, ApplyStatus, RemoveStatus/Cleanse, ModifyStat
  - [ ] Primitives batch 2: SpawnProjectile, SpawnZone, SpawnEntity, Displace
  - [ ] Primitives batch 3: GrantResource, SpendResource, Shield, Transform, Emit
  - [ ] Aura membership system (membership refresh every 5 ticks)
- [ ] **US-3.4.4** As an engineer, specials can be coded without breaking determinism.
  - [ ] Behavior registry skeleton with lifecycle hooks (`init`, `onTick`, `onEvent`, `onDestroy`)
  - [ ] Behavior state serialization contract and tests

---

## EP-4 Content Pipeline and Balance Data

### FT-4.1 Schemas and registry — `P0`

- [ ] **US-4.1.1 ★** As a content author, definitions are validated at build time.
  - [ ] Schemas: Status, Effect (trigger, condition, selector, primitive, formula)
  - [ ] Schemas: Tower and TowerVariant
  - [ ] Schemas: Enemy, Boss, Hero/Skill, Spell
  - [ ] Schemas: Map, WaveScript, View
  - [ ] Cross-reference validator (evolution→parent, summon→def, status refs, behavior ids)
- [ ] **US-4.1.2 ★** As the sim, I read compiled content by index.
  - [ ] ID interning and registry bundle compiler
  - [ ] Alias table support for ID renames
  - [ ] Registry loader usable in worker, main thread and Node

### FT-4.2 Balance data — `P0`

- [ ] **US-4.2.1 ★** As a designer, numbers live in balance tables, not structure files.
  - [ ] Balance table format and `$bal:` key resolver
  - [ ] Curve baker (waveScalar, bounty decay, xpToNext) producing lookup tables
  - [ ] Difficulty profiles (Normal live; Veteran placeholder)
  - [ ] `balanceVersion` hashing and bundle metadata
- [ ] **US-4.2.2** As a designer, I get feedback on tower power.
  - [ ] Power-budget lint v0 (DPS-per-Gold vs reference band, tier monotonicity)

### FT-4.3 Content CLI and lint — `P1`

- [ ] **US-4.3.1** As a content author, I can validate and build content from the CLI.
  - [ ] `content-cli validate` and `content-cli build` commands
  - [ ] Lint v0: ≥ 3 counters per enemy, telegraph ≥ 60 ticks for disables, resist cap/immune mask, registered behaviors
  - [ ] Dev hot-reload of definitions into a running battle
  - [ ] Authoring guide: add a tower, add an enemy, add a status

---

## EP-5 Towers

### FT-5.1 Tower runtime — `P0`

- [ ] **US-5.1.1 ★** As a player, I can place, upgrade, evolve and sell towers.
  - [ ] Pad model and map pad loader
  - [ ] PlacementService validation (pad free, size, unlocked, gold)
  - [ ] `PlaceTower` command and tower assembler from `TowerDefinition`
  - [ ] `UpgradeTower` command applying tier patches and perks
  - [ ] `EvolveTower` command using `Transform` while preserving entity id and counters
  - [ ] `SellTower` command with refund windows (100% prep, 85% for 10 s, otherwise 70%)
  - [ ] Tower state machine (constructing, idle, disabled, upgrading, selling)
- [ ] **US-5.1.2 ★** As a player, towers acquire targets and shoot.
  - [ ] Targeting service with 8 modes and deterministic tie-breaks
  - [ ] Target stickiness and 3-tick retarget interval
  - [ ] Weapon system with cooldown accumulator timing
  - [ ] Projectile system: travel, homing, lead prediction, hit resolution, pierce
  - [ ] Instant hit types: chain, cone, pulse and aura ticks
- [ ] **US-5.1.3** As a player, I can overcharge towers and recover from disables.
  - [ ] `Overcharge` command (20 Mana, +50% rate for 6 s, 30 s cooldown)
  - [ ] Disabled-tower handling (pause cooldowns/overcharge) and cleanse integration

### FT-5.2 MVP base towers — `P0`

- [ ] **US-5.2.1 ★** As a player, I have the 8 starter towers (Tiers I–III).
  - [ ] Tower: Arcane Tower (Projectile, homing; Dual Bolt perk) — definition, balance rows, tests
  - [ ] Tower: Ballista Post (pierce 3; Bleed at III)
  - [ ] Tower: Garrison Barracks (Summoner archetype, rally, respawn between waves)
  - [ ] Tower: Flame Forge (Cone; Burn stacks)
  - [ ] Tower: Frost Spire (slow; Brittle at III)
  - [ ] Tower: Mana Font (Generator + aura; Overflow perk)
  - [ ] Tower: Nature Grove (Root/Vine every 4th hit)
  - [ ] Tower: Tesla Coil (Chain 3, −20% per jump)
- [ ] **US-5.2.2** As a designer, the Summoner sub-framework works.
  - [ ] Summon spec, leash, rally and respawn rules
  - [ ] Soldier AI FSM (return, engage, chase, return)
  - [ ] Blocker slots on lanes and engagement caps

### FT-5.3 MVP evolutions — `P1`

- [ ] **US-5.3.1** As a player, I can evolve four towers into specializations.
  - [ ] Evolution: Archmage Spire (every 5th bolt Arcane Nova; Mana-scaled damage)
  - [ ] Evolution: Temporal Beacon (Time-Lash slow; haste aura; −30% damage)
  - [ ] Evolution: Glacier Citadel (freeze chance; shatter vulnerability)
  - [ ] Evolution: Blizzard Engine (global weak slow; Whiteout pulse every 25 s)
  - [ ] Evolution: Inferno Foundry (Burn spread on death; % max HP vs bosses)
  - [ ] Evolution: Phoenix Kiln (`phoenix_ash` behavior; Ash counter; Phoenix entity)
  - [ ] Evolution: Storm Conductor (chain 7, returns)
  - [ ] Evolution: Overload Pylon (charge and discharge stun every 10 s)

---

## EP-6 Enemies, Waves and Navigation

### FT-6.1 Navigation and movement — `P0`

- [ ] **US-6.1.1 ★** As a player, enemies follow lanes to the Nexus.
  - [ ] Nav graph and lane polyline loader
  - [ ] PathFollower movement system (speed × slows, per-tick advance)
  - [ ] Junction merging and edge-chain traversal
  - [ ] Leak system: Integrity loss, interceptors, Nexus Energy gain
  - [ ] Displacement along lanes (knockback, pull) with clamps
- [ ] **US-6.1.2 ★** As a player, soldiers and heroes block ground enemies.
  - [ ] Blocking system: block slots, contact and engagement
  - [ ] Bypass rules (leap, flying, burrow)
  - [ ] Flying movement mode
  - [ ] Ranged enemy target acquisition and attack hook

### FT-6.2 Waves — `P0`

- [ ] **US-6.2.1 ★** As a player, waves spawn per script and scale fairly.
  - [ ] WaveScript runtime (groups, delays, intervals, formations)
  - [ ] Spawn scaling with baked curves and difficulty profile
  - [ ] Swarm group spawning with deterministic offsets
- [ ] **US-6.2.2 ★** As a player, the economy responds to waves.
  - [ ] Bounty, wave bonus, early-call bonus and interest
  - [ ] Battle end conditions and `BattleResult` assembly
- [ ] **US-6.2.3** As a player, I can read upcoming waves.
  - [ ] Wave preview generator (host-side) with `Wave.PreviewChanged`
  - [ ] Lint: one `mechanicTag` per wave; new enemies appear ≥ 1 wave before danger

### FT-6.3 Verdant enemies (10) — `P0`

- [ ] **US-6.3.1 ★** As a player, I face the Verdant Covenant.
  - [ ] Enemy: Thornling Scout (Regrow)
  - [ ] Enemy: Bark Guard (armor 20)
  - [ ] Enemy: Wolf-Rider Hunter (Leap over first blocker)
  - [ ] Enemy: Briar Burrower (Burrow, underground layer)
- [ ] **US-6.3.2** As a player, I face Verdant support and elite enemies.
  - [ ] Enemy: Spore Carrier (Spore Cloud on death)
  - [ ] Enemy: Druid Warden (Rejuvenation Aura)
  - [ ] Enemy: Gloomcap Shaman (Rot Bloom range debuff)
  - [ ] Enemy: Mossback Brute (Regenerate, Ground Slam)
  - [ ] Enemy: Treant Colossus (Overgrowth; spawn on 50% HP)
  - [ ] Enemy: Pollen Wisp (flying; Dust accuracy debuff)

### FT-6.4 MVP maps and weather — `P0`

- [ ] **US-6.4.1 ★** As a player, I can play Map 1 end to end.
  - [ ] Map data schema loader and validator (pads, lane lengths, pad density)
  - [ ] Map 1 Greenwood Gate: layout, pads, 15-wave script (tutorial pacing)
- [ ] **US-6.4.2** As a player, I can play Maps 2 and 3.
  - [ ] Weather system v0 (Rain: Storm +10%, Fire −10%; Fog: stealth/accuracy)
  - [ ] Map 2 Mossroot Crossing: two merging lanes, rain, 20-wave script
  - [ ] Map 3 Sporefall Hollow: fog, pod events, 25-wave script (boss wave)

---

## EP-7 Heroes and Nexus Spells

### FT-7.1 Hero framework — `P1`

- [ ] **US-7.1.1** As a player, I can control a hero on the map.
  - [ ] `HeroSpec` DTO and `HeroCompiler` (level 1 only)
  - [ ] Hero entity assembler
  - [ ] Walkable nav grid and deterministic A* (tie-break by coordinates)
  - [ ] Hero movement, stance and auto-attack AI
  - [ ] Commands: `MoveHero`, `CastHeroSkill`, `CastUltimate`, `SetHeroStance`
- [ ] **US-7.1.2** As a player, hero skills behave consistently.
  - [ ] Skill state machine (aim, cast, channel, recovery, cooldown)
  - [ ] Cooldown accumulator with `cooldown.rate`
  - [ ] Hero death, respawn timer and instant-revive cost

### FT-7.2 Aelara Voss — `P1`

- [ ] **US-7.2.1** As a player, I can play Aelara Voss.
  - [ ] Hero definition and balance rows (base stats, attack)
  - [ ] Skill Q: Arcane Barrage (3 homing bolts)
  - [ ] Skill W: Mana Rift (zone: −25% Overcharge cost)
  - [ ] Skill E: Blink (short teleport; resets Barrage)
  - [ ] Passives: Spellflow, Archivist
  - [ ] Ultimate: Cataclysm Equation (channel, chained detonations, 50 Energy)

### FT-7.3 Nexus Spells and Surge — `P1`

- [ ] **US-7.3.1** As a player, I can cast Nexus Spells and use Nexus Energy.
  - [ ] `CastNexusSpell` command and Mana spend
  - [ ] Spell: Nexus Pulse (radial damage and knockback)
  - [ ] Spell: Time Dilation (−40% enemy speed, 6 s)
  - [ ] Spell: Guardian's Bulwark (absorb next 15 Integrity of leaks)
  - [ ] Nexus Energy fill rules and basic Nexus Surge (Pulse variant)

---

## EP-8 Bosses

### FT-8.1 Boss framework — `P1`

- [ ] **US-8.1.1** As a designer, I can author multi-phase bosses.
  - [ ] Boss definition runtime: phases, entry conditions, transitions with invulnerability window
  - [ ] Boss script timeline on the timer scheduler (`every`, `after`, `on objective cleared`)
  - [ ] Objective entities (HP, group id, on-destroy effects)
  - [ ] Tenacity rules: hard-CC immunity, slow cap, diminishing returns, execute exemption
  - [ ] Telegraph event emission and lint enforcement

### FT-8.2 Sporemother Myra — `P1`

- [ ] **US-8.2.1** As a player, I can fight Sporemother Myra on Map 3.
  - [ ] Myra definition and balance rows
  - [ ] Phase 1: Spore Pods every 20 s with burst clouds
  - [ ] Phase 2: Mycelium Network nodes (healing links, stun on destroy)
  - [ ] Rewards and `BattleResult` boss stats

---

## EP-9 Rendering, Input and Audio

### FT-9.1 Renderer core — `P0`

- [ ] **US-9.1.1 ★** As a player, I see the battlefield.
  - [ ] Pixi app bootstrap in a client-only component with resize and DPR cap
  - [ ] Layer stack (terrain … world UI) and Y-sort buckets
  - [ ] Camera fit-to-map and coordinate transforms
  - [ ] Asset manifest and bundle loader with progress (boot, ui, biome:forest)
  - [ ] Programmer-art atlas generator (flat shapes per definition)
- [ ] **US-9.1.2 ★** As a player, motion is smooth at any game speed.
  - [ ] Snapshot reader and interpolation (alpha, pause freeze)
  - [ ] ViewSync with pools and lifecycle (spawn, despawn, death ghosts)
  - [ ] View definitions in content and animation clip selection from `animState`
- [ ] **US-9.1.3** As a player, I can read tower tiers and effects.
  - [ ] Modular tower view (base + tier modules + evolution add-on)
  - [ ] Status overlays from `statusMask`
  - [ ] Batched health bars and shield segments
  - [ ] Damage-number pool with per-frame merge
  - [ ] Range rings, placement ghost and target lines
- [ ] **US-9.1.4** As a player, I see threats before they land.
  - [ ] Telegraph renderer (shape + colour coding, fill over duration)
  - [ ] VFX router and recipe loader with budget caps
  - [ ] Six core VFX recipes (hit flash, fire burst, frost, lightning, spore cloud, boss telegraph)
- [ ] **US-9.1.5** As a player, performance adapts to my machine.
  - [ ] Adaptive quality controller and Low/Medium/High tiers
  - [ ] WebGL context loss/restore recovery
  - [ ] Debug overlay (FPS, sim ms, entity counts) and range/hitbox overlays

### FT-9.2 Input — `P0`

- [ ] **US-9.2.1 ★** As a player, I can issue commands with mouse and keyboard.
  - [ ] InputMapper with named actions and default bindings
  - [ ] Pad picking and entity picking via snapshot
  - [ ] Command builder and `CommandResult` feedback (toasts, invalid cursor)
  - [ ] Rebinding data model and settings integration

### FT-9.3 Placeholder audio — `P2`

- [ ] **US-9.3.1** As a player, I hear basic feedback.
  - [ ] `AudioPlayer` port and WebAudio adapter with music/sfx/ui buses and volume
  - [ ] Event→cue mapping data and voice limiting
  - [ ] Placeholder cue set (10 cues) and one music loop

---

## EP-10 UI, Game Flow and Accessibility

### FT-10.1 Flow and menus — `P0`

- [ ] **US-10.1.1 ★** As a player, I can go from launch to battle to results.
  - [ ] App flow state machine and route wiring (Boot → Menu → MapSelect → Loadout → Battle → Results)
  - [ ] Boot screen with asset progress and auto-created profile
  - [ ] Main menu
  - [ ] Map select (3 maps, stars)
  - [ ] Results screen (stats, rewards, stars, return)
- [ ] **US-10.1.2** As a player, I build my loadout.
  - [ ] Loadout screen: 8 tower slots with validation and tooltips
  - [ ] Hero and Nexus Spell selection
  - [ ] Loadout presets (single preset for MVP)
- [ ] **US-10.1.3** As a player, I can adjust settings.
  - [ ] Settings screen: volume, default game speed, colour-blind mode
  - [ ] Persist device settings via `SettingsStore`
- [ ] **US-10.1.4** As a new player, I learn by playing.
  - [ ] Tutorial prompt engine driven by outbound events
  - [ ] Map 1 prompts: place a tower, upgrade, hero, wave preview, early call
  - [ ] Error boundary and fault screen

### FT-10.2 Battle HUD — `P0`

- [ ] **US-10.2.1 ★** As a player, I can see and spend resources.
  - [ ] `battleViewStore` with selectors and HUD patch subscription
  - [ ] Top bar: Gold, Mana, Integrity, Nexus Energy, wave counter
  - [ ] Build menu and tower cards (cost, hotkeys, disabled reasons)
- [ ] **US-10.2.2** As a player, I can manage towers and heroes.
  - [ ] Tower info panel: stats via `explain()`, upgrade/evolve choice, sell, targeting mode, Overcharge
  - [ ] Hero panel with skill buttons and cooldown rings
  - [ ] Nexus Spell bar
  - [ ] Speed, pause and early-call controls
- [ ] **US-10.2.3** As a player, I can plan around enemies.
  - [ ] Wave preview panel (2 waves)
  - [ ] Enemy hover tooltip (resists, abilities, basic counters)
  - [ ] Boss bar and objective counters

### FT-10.3 Accessibility baseline — `P1`

- [ ] **US-10.3.1** As a player with accessibility needs, I can play comfortably.
  - [ ] Three colour-blind palettes via post filter and UI tokens
  - [ ] Shape-coded telegraphs and reduced-flash/screen-shake toggle
  - [ ] UI scale 75–200% and keyboard navigation for menus

---

## EP-11 Meta Progression (MVP Slice)

### FT-11.1 Profile, wallet and rewards — `P0`

- [ ] **US-11.1.1 ★** As a player, battles reward me.
  - [ ] Wallet aggregate with atomic earn/spend
  - [ ] `RewardCalculator` (Shards per TDD §11.13)
  - [ ] Star evaluation (Victory, Pristine, Challenge) and campaign progress aggregate
- [ ] **US-11.1.2** As a player, I can start and finish a battle through use cases.
  - [ ] `LoadoutValidator` and `UnlockResolver` (sequential map unlock)
  - [ ] `StartBattle` use case building `BattleSetup`
  - [ ] `FinishBattle` use case applying `BattleResult`
  - [ ] Stores: profile, loadout, settings, ui

### FT-11.2 Permanent upgrades — `P1`

- [ ] **US-11.2.1** As a player, I can buy five permanent upgrades with Shards.
  - [ ] Define upgrades: +start Gold, +Mana cap, +Integrity, −tower cost, −hero cooldown (balance rows, caps)
  - [ ] `PurchaseUpgrade` use case with cost curve
  - [ ] Convert upgrades to `ModifierSpec` entries in `BattleSetup`
  - [ ] Upgrades screen UI

---

## EP-14 Save and Persistence (MVP Slice)

### FT-14.1 Save v1 — `P0`

- [ ] **US-14.1.1 ★** As a player, my progress is saved reliably.
  - [ ] `SaveEnvelope` types, payload sections for MVP and schema validation
  - [ ] IndexedDB adapter (profiles, pointer, backups, settings) and in-memory adapter
  - [ ] Atomic write via pointer swap with rolling backups
  - [ ] Debounced autosave and flush on `pagehide`/`visibilitychange`
  - [ ] Web Lock single-writer with read-only second tab
- [ ] **US-14.1.2** As a maintainer, saves can evolve safely.
  - [ ] Migration chain scaffold, `schemaVersion`, ID alias resolution
  - [ ] Checksum and corruption recovery (restore newest valid backup)
  - [ ] Fixture save v1 in `testkit` and round-trip property tests
  - [ ] Corruption fuzz tests (truncate, bit-flip, oversize)

---

## EP-16 Balance Tooling and QA (MVP Slice)

### FT-16.1 MVP validation — `P0`

- [ ] **US-16.1.1** As QA, determinism is verified across browsers.
  - [ ] Playwright job running golden replays on Chromium, Firefox and WebKit
  - [ ] Replay hash mismatch report (first diverging tick and system)
- [ ] **US-16.1.2** As an engineer, performance budgets are enforced.
  - [ ] Stress scene (300 enemies, 120 projectiles, 40 towers) with sim ≤ 4 ms assertion
  - [ ] Nightly perf CI job capturing frame-time and GC metrics
- [ ] **US-16.1.3** As a designer, initial balance is sane.
  - [ ] Balance sheets for 8 towers (Tiers I–III) and 10 enemies; power-budget lint passes
  - [ ] Wave-curve analyzer v0 (effective HP ratio ≤ 1.18) for Maps 1–3
- [ ] **US-16.1.4** As the team, we can run playtests.
  - [ ] Playtest build distribution and feedback form
  - [ ] Replay export attached to feedback
  - [ ] Bug triage workflow and severity guide

---

## EP-17 Platform, Monetization and Release (MVP Slice)

### FT-17.1 Hosting — `P1`

- [ ] **US-17.1.1** As the team, we can ship a public MVP build.
  - [ ] Production static hosting pipeline with cache headers and COOP/COEP if SAB is chosen
  - [ ] Demo build flag (MVP content gate) and basic privacy notice

---

## MVP Exit Checklist (from GDD §18.3)

- [ ] **Fun:** 10 external playtesters; ≥ 70% finish Map 3; ≥ 60% would play more; ≥ 3 distinct winning builds
- [ ] **Clarity:** 8/10 testers explain resistances and statuses after Map 2 unprompted
- [ ] **Performance:** 60 FPS with 300 enemies on target low-end laptop; sim ≤ 4 ms
- [ ] **Determinism:** golden replays reproduce on Chromium, Firefox and Safari
- [ ] **Stability:** zero data-loss bugs; save round-trip suite green
- [ ] **Pipeline:** a new enemy added through data + art only, without engine changes
