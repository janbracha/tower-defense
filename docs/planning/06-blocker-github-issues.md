# GitHub Issues: Resolving the Blockers

Issues for the three blockers (T-01 entity ID layout, MS-01 contract schemas, S-02 art plan) and the Stage 1 spikes, based on the [blocker review](05-blocker-review.md). Each issue is written to be pasted into GitHub as-is.

## Conventions

| Item | Value |
|---|---|
| ID | `BLK-nn` (placeholder; replace with the GitHub issue number after creation) |
| Epics | `BLK-E1` … `BLK-E4`, label `epic` |
| Labels | `blocker`, `p0`, `ms:pre-m0`, plus one of `area:sim`, `area:contracts`, `area:art`, `area:tools`, `area:render`, `area:ui`, `area:docs`, and a type (`task`, `spike`, `decision`) |
| Dependencies | Use GitHub "blocked by" relationships between issues |
| Milestone | `Pre-M0 (Stage 0–1)` |

### Complexity Scale

| Size | Meaning |
|---|---|
| **XS** | About half a coding session |
| **S** | One coding session (one PR) |
| **M** | 2–3 sessions; split into session-sized tasks when pulled |
| **L** | 4–6 sessions; split into tasks when pulled |

### Index

| ID | Title | Epic | Complexity | Depends on |
|---|---|---|---|---|
| BLK-E1 | Resolve T-01: entity ID layout | – | S + XS | – |
| BLK-01 | Decide entity ID layout (ADR-12) | E1 | S | – |
| BLK-02 | Amend documents for the ID layout | E1 | XS | 01 |
| BLK-E2 | Resolve MS-01: freeze contract schemas v0.1 | – | ≈ 30 sessions | – |
| BLK-03 | Decide contracts package and schema tooling (ADR-13) | E2 | M | – |
| BLK-04 | Add `@gotn/contracts` to the scaffold and amend the import matrix | E2 | S | 03 |
| BLK-05 | Contract foundations: primitives, versions, canonical serialization | E2 | M | 01, 04 |
| BLK-06 | `ModifierSpec` schema | E2 | M | 05 |
| BLK-07 | `HeroSpec` and `SkillSpec` schemas | E2 | M | 06 |
| BLK-08 | `BattleSetup` schema | E2 | M | 05, 06, 07 |
| BLK-09 | Command catalog and `CommandResult` | E2 | M | 05 |
| BLK-10 | Event envelope and core event payloads | E2 | M | 05 |
| BLK-11 | Snapshot layout and worker protocol | E2 | L | 01, 05, 09, 10 |
| BLK-12 | `BattleResult` and `ReplayFile` v0 | E2 | M | 08, 09 |
| BLK-13 | Contract validation, golden fixtures and compatibility CI | E2 | M | 08–12 |
| BLK-14 | Contract governance and `simVersion` policy | E2 | S | 05, 13 |
| BLK-E3 | Resolve S-02: art production plan | – | ≈ 10 sessions | – |
| BLK-15 | Appoint art owner and decide sourcing model (ADR-14) | E3 | S | – |
| BLK-16 | Asset inventory and budget model | E3 | M | 15 |
| BLK-17 | Style guide and technical art specification | E3 | M | 15, 16 |
| BLK-18 | Asset manifest and view-mapping contract | E3 | M | 05, 17 |
| BLK-19 | Staffing and capacity plan | E3 | S | 16 |
| BLK-E4 | Resolve Stage 1 spikes | – | ≈ 20 sessions | – |
| BLK-20 | Spike harness, browser matrix and ADR/issue templates | E4 | M | – |
| BLK-21 | Spike S1: cross-engine determinism (ADR-15) | E4 | L | 20 |
| BLK-22 | Spike S2: ECS build vs buy (ADR-16) | E4 | L | 01, 20 |
| BLK-23 | Spike S3: snapshot transport (ADR-17) | E4 | M | 11, 20 |
| BLK-24 | Spike S4: Pixi batching and scaffold validation (ADR-18) | E4 | M | 20 |
| BLK-25 | Spike S5: HUD update rate (ADR-19) | E4 | S | 20 (soft: 11) |
| BLK-26 | Stage 1 exit review | E4 | S | 13, 21–25 |

**Suggested creation order:** epics, then BLK-01, 03, 15, 20 (no dependencies), then the rest.

---

# Epic E1: Entity ID Layout (T-01)

## BLK-E1: Resolve T-01, entity ID layout

**Labels:** `epic`, `blocker`, `p0`, `area:sim`
**Objective:** Fix the entity identity design before any ECS, event, command, snapshot or replay code is written.
**Acceptance criteria**
- [ ] BLK-01 and BLK-02 closed.
- [ ] No document references the 20-bit/12-bit layout.
- [ ] ADR-12 accepted and linked from the TDD.

**Dependencies:** none.
**Estimated complexity:** S + XS.

## BLK-01: Decide entity ID layout (ADR-12)

**Labels:** `decision`, `blocker`, `p0`, `area:sim`, `area:docs`
**Objective:** Choose and record the entity ID layout and allocation policy so ECS, snapshots, events, commands and replays share one definition.

**Acceptance criteria**
- [ ] `docs/adr/ADR-12-entity-id-layout.md` exists with options A–D from the review, evidence, decision, consequences and fallback.
- [ ] The wrap-time analysis is reproduced with stated assumptions (10 and 30 spawns/s; LIFO vs FIFO; 12-bit vs 16-bit) and attached as a table or small script output.
- [ ] The decision states: bit layout, storage type (`Uint32`), null sentinel, free-list policy, retire-on-exhaustion rule, live-entity cap, and what happens when slots retire (telemetry/QA reporting threshold).
- [ ] The rule "allocation order is part of the simulation contract" is recorded, with the golden-replay test that will enforce it.
- [ ] The command-addressing rule is agreed: commands use pads, slots and content IDs; the list of commands allowed to carry a raw `EntityId` is enumerated.
- [ ] Reviewed and approved by the sim lead and the client/render lead.

**Dependencies:** none.
**Estimated complexity:** S.

## BLK-02: Amend documents for the ID layout

**Labels:** `task`, `blocker`, `area:docs`
**Objective:** Make every document consistent with ADR-12.

**Acceptance criteria**
- [ ] TDD §7.1 (identity table), §4.2 (event envelope source/target and null encoding) and §6.3 (snapshot header field renamed `bufferSerial`; ID columns typed `Uint32`) updated.
- [ ] Backlog task text under US-2.2.1 updated; backlog and planning documents contain no remaining "20-bit" or "12-bit" references (verified with a search).
- [ ] ADR numbering table added to the backlog index (ADR-12 … ADR-19).
- [ ] A changelog line is added to each edited document.

**Dependencies:** BLK-01.
**Estimated complexity:** XS.

---

# Epic E2: Contract Schemas (MS-01)

## BLK-E2: Resolve MS-01, freeze contract schemas v0.1

**Labels:** `epic`, `blocker`, `p0`, `area:contracts`
**Objective:** Deliver a versioned, validated, tested `@gotn/contracts` package so `sim`, `meta`, `app`, worker host, renderer and tools can be built in parallel.

**Acceptance criteria**
- [ ] BLK-03 … BLK-14 closed.
- [ ] Contracts declared "v0.1 frozen for M0" in the governance document.
- [ ] Compatibility CI is green and required on `main`.
- [ ] All 14 review findings F-01 … F-14 are marked resolved in the review document.

**Dependencies:** none (children carry the real dependencies).
**Estimated complexity:** ≈ 30 sessions in total.

## BLK-03: Decide contracts package and schema tooling (ADR-13)

**Labels:** `decision`, `blocker`, `p0`, `area:contracts`, `area:docs`
**Objective:** Decide where contract types live, how they are validated, and the conventions (hashing, seeds, canonical serialization, versioning) before any contract is written.

**Acceptance criteria**
- [ ] `docs/adr/ADR-13-contracts.md` records: package name and allowed imports (`kernel`, `content-schema`), the full amended import matrix, and which packages may import it.
- [ ] Decision on where `TICKS_PER_SECOND` and `SIM_VERSION` live.
- [ ] Schema library decision (Zod 4 vs Valibot vs hand-rolled) supported by a short benchmark: gzip size in the worker bundle, parse time of a representative `BattleSetup` fixture, TypeScript inference quality. Results attached.
- [ ] Decisions recorded for: 64-bit hash algorithm and encoding, seed format and expansion, canonical JSON rules, enum registry strategy, replay binary encoding approach, version stamps (`contractVersion`, `simVersion`, `contentVersion`, `balanceVersion`).
- [ ] Hot-path vs cold-path validation policy is explicit (which contracts use hand-written codecs).
- [ ] The list of TDD sections to amend (§1.1, §1.3, §2.4, §3.6, §3.7, §4.2, §5.7, §6.3, §9) is attached.
- [ ] Approved by the lead architect and the sim, client and tools leads.

**Dependencies:** none (soft input from BLK-01 for `EntityId`).
**Estimated complexity:** M.

## BLK-04: Add `@gotn/contracts` to the scaffold and amend the import matrix

**Labels:** `task`, `blocker`, `p0`, `area:contracts`, `area:tools`
**Objective:** Create the package skeleton and enforce its position in the architecture, with no contract content yet.

**Acceptance criteria**
- [ ] `packages/contracts` exists with package manifest, `exports` map, TypeScript config and an entry point; its folder layout matches the inventory (primitives, modifiers, hero, setup, commands, events, snapshot, protocol, result, replay, fixtures).
- [ ] `tooling/eslint/layers.mjs` allows `contracts` to import only `kernel` and `content-schema`, applies the deterministic-code rules to it, and permits importers per ADR-13.
- [ ] Lint fixtures prove: `sim` → `meta` still fails; `render` → `contracts` passes; `contracts` → `sim` fails.
- [ ] `TICKS_PER_SECOND` (and any other shared constants) moved per ADR-13; `sim` still exports `SIM_VERSION`.
- [ ] `apps/web` transpile list and README layer table updated.
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm test` and `pnpm build` pass.
- [ ] No gameplay and no contract schemas included.

**Dependencies:** BLK-03.
**Estimated complexity:** S.

## BLK-05: Contract foundations: primitives, versions, canonical serialization

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Define the shared building blocks every contract uses.

**Acceptance criteria**
- [ ] Types and validators for `Tick`, `EntityId` (per ADR-12) with `NULL_ENTITY`, `Seed`, `BattleId`, `Hash64`, `ContentId` references and the four version stamps.
- [ ] A single enum registry that generates string unions and numeric codes from one source; tests prove codes are stable and unique.
- [ ] Canonical JSON serializer and 64-bit hash implemented per ADR-13 with at least 20 cross-environment test vectors that pass in Node and in Chromium, Firefox and WebKit.
- [ ] Numeric validators (finite, safe integer, ranges), size-limit constants and a structured-clone-safety checker, each with tests.
- [ ] Contract unit conventions documented in the package README: ticks for time, tiles for distance, fractions for percentages.
- [ ] Rejects `-0`, `NaN`, `Infinity`, `undefined`, class instances and `Map`/`Set` in contract data (tests).

**Dependencies:** BLK-01, BLK-04.
**Estimated complexity:** M.

## BLK-06: `ModifierSpec` schema

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Specify the single path by which all meta power (skill tree, research, mastery, relics, gear, boons, echoes) enters a battle.

**Acceptance criteria**
- [ ] Schema defines layer (flat, additive %, multiplicative, override), stat key, scope (global, school, tower id, hero, enemy tag), bucket, `sourceId`, label key, optional duration in ticks and optional condition reference.
- [ ] A stat-key registry exists covering the key families in TDD §7.15; unknown stat keys are rejected.
- [ ] The Power Ledger bucket caps (GDD §10.1) are data, and a validator rejects a modifier set exceeding any bucket cap.
- [ ] Documentation specifies how `explain()` will consume `sourceId` and label keys.
- [ ] At least 10 valid and 10 invalid golden fixtures, including cap violations and unknown keys.
- [ ] No dependency on `meta` or `sim`.

**Dependencies:** BLK-05.
**Estimated complexity:** M.

## BLK-07: `HeroSpec` and `SkillSpec` schemas

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Define the compiled hero payload so `meta` can produce it and `sim` can consume it without sharing code.

**Acceptance criteria**
- [ ] `HeroSpec` covers: hero id, level/template, final base stats (HP, armor, move speed, attack), skills Q/W/E, passives, ultimate with Energy cost, optional forms, equipment-derived `ModifierSpec` list, default stance.
- [ ] `SkillSpec` covers: cast type, range, radius, shape, cast/channel/recovery ticks, cooldown ticks, cost, interrupt rules, effect references, resolved patch values.
- [ ] A content-hash definition (canonical JSON → `Hash64`) with fixture vectors.
- [ ] Contains no profile, XP or tree data (verified by a schema test).
- [ ] Fixture for the MVP hero Aelara Voss at the fixed template level, plus at least 8 invalid cases.
- [ ] Optional fields for later features (forms, bonds) exist and default safely.

**Dependencies:** BLK-06.
**Estimated complexity:** M.

## BLK-08: `BattleSetup` schema

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Define the immutable battle input accepted by the sim, replay files, the verifier and bots.

**Acceptance criteria**
- [ ] Fields cover: identity and version stamps, seed, map reference (map id **or** generated map spec), difficulty profile, Mythic level/affixes, cycle modifiers, weather/event schedule, loadout (tower ids, evolution ids, spells with levels, relics with levels, Surge type), heroes (0–2 `HeroSpec`), `modifiers` (`ModifierSpec` list), rules (assist, mode, starting resources, restrictions), optional entry state.
- [ ] **Loadout slot count is a rule value**, not a constant (resolves F-02); field naming is `modifiers` everywhere (resolves F-02).
- [ ] `contentVersion` and `balanceVersion` are the only registry selectors (resolves F-05).
- [ ] Unknown fields are rejected; size ≤ 64 KB; canonical JSON and setup hash round-trip tests pass.
- [ ] Fixtures: MVP Map 1 (Normal), Map 3 (Veteran, hero, upgrades), a generated-map placeholder, and invalid cases (cap violation, locked tower, duplicate loadout entry, wrong version).
- [ ] Contains no profile data.

**Dependencies:** BLK-05, BLK-06, BLK-07.
**Estimated complexity:** M.

## BLK-09: Command catalog and `CommandResult`

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Specify every player command and its feedback so UI, sim, replay and bots agree.

**Acceptance criteria**
- [ ] Catalog with payload schemas for: place, upgrade, evolve, sell tower; set target mode; overcharge; move hero; cast hero skill; cast ultimate; set stance; cast Nexus Spell; toggle path switch; call next wave; set game speed; revive hero. Codes are reserved for later commands.
- [ ] Towers are addressed by pad id; raw `EntityId` appears only on the commands listed in ADR-12.
- [ ] Envelope fields: `clientSeq`, `requestedTick`, `executeTick` (sim-assigned) and `hostSeq`; ordering rule `(executeTick, hostSeq)` documented (resolves F-06).
- [ ] `CommandResult` echoes `clientSeq` and carries a typed rejection reason enum (e.g., insufficient gold, pad occupied, pad size, not unlocked, not in loadout, out of range, on cooldown, invalid target, battle ended).
- [ ] Compact binary encoding for the replay stream is specified (delta tick, command code, payload) with round-trip tests.
- [ ] Hot-path validator rejects malformed commands in under a documented budget (measured, recorded).
- [ ] Valid and invalid fixtures for every command.

**Dependencies:** BLK-05.
**Estimated complexity:** M.

## BLK-10: Event envelope and core event payloads

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Define the typed event contract consumed by the renderer, UI, audio, telemetry and relic logic.

**Acceptance criteria**
- [ ] Envelope: `seq`, `tick`, `type` code, `schema`, `source`, `target`, `flags`; null entity uses `NULL_ENTITY` (resolves F-09).
- [ ] Type registry and payload schemas for at least 30 events across Battle, Wave, Combat, Entity, Tower, Hero, Resource, Nexus, Boss and Map groups (TDD §4.4).
- [ ] Interceptable request types (damage, leak, status, placement) are named, marked non-outbound and documented as requests, not facts.
- [ ] Outbound batch format specified: per-frame, ordered, aggregation rule for high-frequency hit events, back-pressure rule for cosmetic events.
- [ ] Payload constraints enforced: flat numbers and IDs only; no objects.
- [ ] Decision recorded for typed-array encoding of hot events vs object encoding of rare events.
- [ ] A consumer matrix lists which consumer reads which event types.
- [ ] Fixtures for each event group.

**Dependencies:** BLK-05.
**Estimated complexity:** M.

## BLK-11: Snapshot layout and worker protocol

**Labels:** `task`, `blocker`, `p0`, `area:contracts`, `area:render`
**Objective:** Define the binary snapshot and all worker messages so sim-host and renderer can be built and measured independently.

**Acceptance criteria**
- [ ] Snapshot layout specified: header (version byte, `bufferSerial`, tick, section counts) and sections Movers, Projectiles, Zones, Towers (dynamic), Objectives, Beams, each with column order, types (`Uint32`/`Float32`), alignment, maximum counts and a size budget ≤ 250 KB.
- [ ] A single layout table is consumed by both writer and reader (no duplicated offsets); a test fails if the layout changes without a version bump.
- [ ] Enum code tables for `animState`, flags and `statusMask` bits are defined in the enum registry.
- [ ] Worker message union defined: `Init` (setup and buffer handles; no redundant version selectors), `Command`, `SetSpeed`, `Pump`, `RequestKeyframe` (reserved), `Dispose`, `Ready`, `SnapshotReady`, `EventBatch`, `HudPatch`, `CommandResult`, `Checkpoint` (`Hash64`), `BattleEnded`, `Fault`.
- [ ] `Ready` carries a static map view schema (lanes, pads, hazards, weather slots, walkable layer).
- [ ] `HudPatch` field set is defined for the MVP HUD.
- [ ] The invariant "simulation results do not depend on how ticks are batched into `Pump` messages" is written down with a test specification (resolves F-07).
- [ ] Buffer transfer and ownership rules documented; all messages are structured-clone safe.
- [ ] Fixture: sample snapshot bytes with expected decoded values; round-trip tests in Node and one browser.

**Dependencies:** BLK-01, BLK-05, BLK-09, BLK-10.
**Estimated complexity:** L.

## BLK-12: `BattleResult` and `ReplayFile` v0

**Labels:** `task`, `blocker`, `p0`, `area:contracts`
**Objective:** Define the battle outcome and the replay file so progression, QA, bots and the future server share one format.

**Acceptance criteria**
- [ ] `BattleResult`: outcome, stats (ticks, ids and numbers only), objectives, drops with a loot roll seed and table references, mastery/Codex counters, `replayId` and `finalHash`; **no embedded replay** (resolves F-03).
- [ ] `ReplayFile` v0: magic, format version, header derived from the embedded setup (no duplicated fields, resolves F-04), setup, binary command stream (per BLK-09), checkpoints every 300 ticks, result summary.
- [ ] Compression approach chosen and measured on a synthetic 30-minute command stream (target ≤ 100 KB).
- [ ] Reader validates every section and rejects truncated or corrupted files; behavior on version mismatch is specified for the viewer and verifier.
- [ ] Reserved shape for a suspend record.
- [ ] Fixtures: valid replay, truncated, corrupted checkpoint, wrong version.

**Dependencies:** BLK-08, BLK-09.
**Estimated complexity:** M.

## BLK-13: Contract validation, golden fixtures and compatibility CI

**Labels:** `task`, `blocker`, `p0`, `area:contracts`, `area:tools`
**Objective:** Make contract drift impossible to merge silently.

**Acceptance criteria**
- [ ] Every contract has committed valid and invalid fixtures; a suite asserts expected accept/reject results.
- [ ] Canonical-hash vectors produce identical results in Node and in Chromium, Firefox and WebKit in CI.
- [ ] A schema/layout descriptor snapshot is committed; CI fails when it changes without a `contractVersion` bump and changelog entry.
- [ ] Fuzz tests: random mutations never crash validators and invalid inputs are rejected.
- [ ] A browser test round-trips each worker message through a real `Worker`.
- [ ] Size-limit tests for setup, commands and replay.
- [ ] The compatibility job is a required status check on `main`.

**Dependencies:** BLK-08, BLK-09, BLK-10, BLK-11, BLK-12.
**Estimated complexity:** M.

## BLK-14: Contract governance and `simVersion` policy

**Labels:** `task`, `p0`, `area:docs`, `area:contracts`
**Objective:** Define how contracts change safely after the freeze.

**Acceptance criteria**
- [ ] Document defines what bumps `contractVersion`, `simVersion`, `contentVersion` and `balanceVersion`, with examples and a decision table.
- [ ] Rules for additive vs breaking changes, deprecation windows and the compatibility matrix for replays and suspend records.
- [ ] Checklist for adding a command, an event or a field.
- [ ] CODEOWNERS entry for `packages/contracts` and the compatibility CI described as the gate.
- [ ] The "contracts v0.1 frozen for M0" declaration is recorded with the date and commit.

**Dependencies:** BLK-05 (draft), BLK-13 (finalize).
**Estimated complexity:** S.

---

# Epic E3: Art Production Plan (S-02)

## BLK-E3: Resolve S-02, art production plan

**Labels:** `epic`, `blocker`, `p0`, `area:art`
**Objective:** Give art a named owner, a costed inventory, a style/technical specification, a pipeline contract and a staffing plan.

**Acceptance criteria**
- [ ] BLK-15 … BLK-19 closed.
- [ ] The plan is approved by the director and the engineering manager.
- [ ] The staffing shortfall identified in the production plan is either closed or accepted explicitly.

**Dependencies:** none.
**Estimated complexity:** ≈ 10 sessions.

## BLK-15: Appoint art owner and decide sourcing model (ADR-14)

**Labels:** `decision`, `blocker`, `p0`, `area:art`
**Objective:** Establish accountability and the production approach.

**Acceptance criteria**
- [ ] A named art owner is recorded with responsibilities and decision rights.
- [ ] The sourcing model (in-house, contractors, asset packs or hybrid) is chosen against cost, schedule and quality criteria.
- [ ] Reuse strategy decided (modular towers, palette-swapped factions, shared enemy rigs, premium animation only for heroes and bosses).
- [ ] A contractor shortlist or procurement plan exists.
- [ ] `docs/adr/ADR-14-art-strategy.md` is accepted; an escalation path is defined.

**Dependencies:** none.
**Estimated complexity:** S.

## BLK-16: Asset inventory and budget model

**Labels:** `task`, `blocker`, `area:art`
**Objective:** Replace the heuristic with a costed asset list.

**Acceptance criteria**
- [ ] Inventory by Act and asset class: tower modules, evolutions, enemies, bosses, heroes, tilesets, props, UI, VFX, comics, marketing.
- [ ] Each entry has a complexity tier and artist-day estimate; reuse quotas are explicit.
- [ ] Totals reconcile with the production plan's ≈ 906 artist-days within ±10%, or the variance is explained.
- [ ] Budgets per milestone (MVP, Alpha, Beta, 1.0) are stated.
- [ ] The inventory is stored machine-readably (CSV/JSON) for tracking.
- [ ] Reviewed by the director and the engineering manager.

**Dependencies:** BLK-15.
**Estimated complexity:** M.

## BLK-17: Style guide and technical art specification

**Labels:** `task`, `blocker`, `area:art`, `area:docs`
**Objective:** Prevent style drift and pipeline rework before production starts.

**Acceptance criteria**
- [ ] Faction palettes, silhouette and readability rules (including telegraph colours and shapes, TDD §6.11).
- [ ] Sprite and tile sizes, frame budgets, atlas packing, texture format policy, naming and folder conventions.
- [ ] Animation state names align with the `animState` code table.
- [ ] Modular tower construction rules (base, tier modules, evolution add-on).
- [ ] VFX budget guidelines and colour-blind-safe requirements.
- [ ] A contractor onboarding pack.
- [ ] Reviewed with engineering.

**Dependencies:** BLK-15, BLK-16.
**Estimated complexity:** M.

## BLK-18: Asset manifest and view-mapping contract

**Labels:** `task`, `p0`, `area:art`, `area:contracts`
**Objective:** Define how art reaches the renderer so programmer art can be swapped for final art without code changes.

**Acceptance criteria**
- [ ] Manifest schema: bundles (boot, ui, biome, act, heroes, audio), hashed filenames, per-asset metadata and version.
- [ ] `ViewDefinition` mapping fields: definition id → frames/clips per `animState`, scale, anchor, shadow, health-bar mode, tint, VFX and SFX keys.
- [ ] The location of these types (`contracts` or `content-schema`) is decided and recorded.
- [ ] A worked example shows the programmer-art generator emitting a valid manifest.
- [ ] Validation rules defined (missing frames, unknown `animState`, oversize atlas) with valid and invalid fixtures.
- [ ] Packer output requirements are specified for the Alpha atlas tool.

**Dependencies:** BLK-05, BLK-17.
**Estimated complexity:** M.

## BLK-19: Staffing and capacity plan

**Labels:** `task`, `area:art`
**Objective:** Close or accept the art capacity gap.

**Acceptance criteria**
- [ ] Capacity model (artists, contractors, composer, SFX) mapped to the inventory per milestone with surplus/shortfall.
- [ ] Hiring or contracting timeline relative to gates; onboarding plan.
- [ ] Contingency levers (asset reductions, reuse increases) with their schedule effect.
- [ ] Re-forecast procedure at each gate.
- [ ] Approved by the director.

**Dependencies:** BLK-16.
**Estimated complexity:** S.

---

# Epic E4: Stage 1 Spikes

## BLK-E4: Resolve Stage 1 spikes

**Labels:** `epic`, `p0`, `area:tools`
**Objective:** Replace assumptions about determinism, ECS, snapshot transport, rendering and HUD updates with measured decisions.

**Acceptance criteria**
- [ ] BLK-20 … BLK-26 closed.
- [ ] ADR-15 … ADR-19 accepted.
- [ ] Any fallback is executed or queued as backlog tasks with owners.

**Dependencies:** none.
**Estimated complexity:** ≈ 20 sessions.

## BLK-20: Spike harness, browser matrix and ADR/issue templates

**Labels:** `task`, `p0`, `area:tools`, `area:docs`
**Objective:** Provide the shared infrastructure every spike needs.

**Acceptance criteria**
- [ ] A spikes workspace area exists that production packages cannot import (enforced by lint).
- [ ] A benchmark runner outputs machine-readable results and a Markdown summary, including CPU, GPU, OS and browser versions.
- [ ] Playwright runs Chromium, Firefox and WebKit locally and in a manual/nightly CI job.
- [ ] Instructions exist for a manual Safari run on macOS and an arm64 run.
- [ ] A result-comparison tool compares hashes across runs and environments.
- [ ] `docs/adr/` exists with an ADR template and the numbering table (ADR-12 … ADR-19).
- [ ] Issue templates exist for epic, story, task, spike, decision and bug.

**Dependencies:** none.
**Estimated complexity:** M.

## BLK-21: Spike S1, cross-engine determinism (ADR-15)

**Labels:** `spike`, `p0`, `area:sim`
**Objective:** Prove that a Float64 simulation restricted to basic operations produces identical results across engines, threads and architectures.

**Acceptance criteria**
- [ ] A synthetic simulation (≥ 600 entities, named PRNG streams, only allowed operations, state hash every 300 ticks) runs 18,000 ticks.
- [ ] It runs on Node, a Web Worker and the main thread, in Chromium, Firefox, WebKit, plus a manual Safari run, on x64 and arm64, with cold and warm JIT.
- [ ] A results table shows identical 64-bit hashes across all environments, or documents each divergence and its cause.
- [ ] A divergence catalogue records the behavior of banned functions (power, exponential, logarithm, trigonometry) across at least three engines to justify the lint rules.
- [ ] ADR-15 records the decision, evidence and, if needed, the fallback (fixed-point HP and positions).
- [ ] Reusable parts are identified and a follow-up task is created to promote them into the golden-replay harness; no spike code is imported by production packages.
- [ ] Time-boxed to the stated complexity; overruns are escalated.

**Dependencies:** BLK-20.
**Estimated complexity:** L.

## BLK-22: Spike S2, ECS build vs buy (ADR-16)

**Labels:** `spike`, `p0`, `area:sim`
**Objective:** Decide between a custom struct-of-arrays ECS and an existing library using the project's workload and ID layout.

**Acceptance criteria**
- [ ] Identical workload on both candidates: 600 enemies, 120 projectiles, 40 towers, status effects, 30 Hz, using the ADR-12 ID layout.
- [ ] Reported: tick time p50/p95/p99, GC pauses, memory, bundle size.
- [ ] Determinism check: shuffling insertion order does not change results; iteration order is documented.
- [ ] Serialization check: world round-trip with hash equality.
- [ ] Pass thresholds applied: custom ≤ 4 ms p95; a library is adopted only with deterministic iteration, serialization support, 16/16 IDs and acceptable bundle size.
- [ ] ADR-16 records the decision, ergonomics notes and fallback (adapter layer, or reduced object-component use).

**Dependencies:** BLK-01, BLK-20.
**Estimated complexity:** L.

## BLK-23: Spike S3, snapshot transport (ADR-17)

**Labels:** `spike`, `p0`, `area:sim`, `area:render`
**Objective:** Choose between transferable triple buffers and SharedArrayBuffer.

**Acceptance criteria**
- [ ] Both transports implemented against the snapshot layout from BLK-11 with 1,200 entities at 30 Hz.
- [ ] Reported: latency, jitter, main-thread cost per frame, allocations per frame.
- [ ] Pass thresholds: end-to-end latency ≤ 1 tick, ≤ 0.5 ms per frame on the main thread, zero per-frame allocations.
- [ ] A COOP/COEP impact note covers OAuth popups, embedded content, the Steam wrapper and hosting headers.
- [ ] ADR-17 records the decision; the default is transferable buffers unless evidence says otherwise.

**Dependencies:** BLK-11, BLK-20.
**Estimated complexity:** M.

## BLK-24: Spike S4, Pixi batching and scaffold validation (ADR-18)

**Labels:** `spike`, `p0`, `area:render`
**Objective:** Verify Pixi can meet the rendering budget and that the scaffolded stage works in real browsers.

**Acceptance criteria**
- [ ] Atlas-batched scene with 1,200 animated sprites, 200 projectiles, bitmap text and pooled graphics.
- [ ] Reported on an integrated GPU and a mid-range laptop: frame time p95, draw calls, memory.
- [ ] Pass thresholds: ≥ 60 FPS (p95 ≤ 20 ms), ≤ 200 draw calls, stable memory over 10 minutes.
- [ ] The scaffold's `createStage` is verified in browsers: mount/unmount, React StrictMode double mount, route navigation, no duplicate canvases, no leaks.
- [ ] The Pixi bundle impact on the `/play` route is recorded.
- [ ] ADR-18 records the decision and default quality tiers; WebGL vs WebGPU observations included.

**Dependencies:** BLK-20.
**Estimated complexity:** M.

## BLK-25: Spike S5, HUD update rate (ADR-19)

**Labels:** `spike`, `area:ui`
**Objective:** Confirm React 19 and Zustand 5 sustain 10 Hz HUD patches.

**Acceptance criteria**
- [ ] A prototype HUD with about 60 selector-subscribed components receives partial patches at 10 Hz with a realistic change mix.
- [ ] Reported: React commit time per patch and re-render counts for changed and unchanged selectors.
- [ ] Pass thresholds: ≤ 2 ms commit per patch; unchanged selectors do not re-render.
- [ ] Comparison of selector subscriptions vs transient (non-React) subscriptions for cooldown rings.
- [ ] ADR-19 states which HUD elements live in React and which on the canvas, and the fallback (throttle to 5 Hz).

**Dependencies:** BLK-20 (soft: BLK-11 for the `HudPatch` shape; a provisional shape may be used).
**Estimated complexity:** S.

## BLK-26: Stage 1 exit review

**Labels:** `task`, `p0`, `area:docs`
**Objective:** Close Stage 1 and authorize Stage 2.

**Acceptance criteria**
- [ ] ADR-12 … ADR-19 accepted and linked from the TDD.
- [ ] Spike fallbacks executed or queued as backlog tasks with owners.
- [ ] TDD and backlog updated for all decisions; the risk register is refreshed.
- [ ] Contracts v0.1 freeze verified (BLK-13 and BLK-14).
- [ ] Follow-up tasks created to promote the determinism harness and stress scene into `testkit` and performance CI.
- [ ] A Stage 2 entry checklist is signed by the lead architect and engineering manager.

**Dependencies:** BLK-13, BLK-21, BLK-22, BLK-23, BLK-24, BLK-25.
**Estimated complexity:** S.
