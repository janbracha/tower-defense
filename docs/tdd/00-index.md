# Guardians of the Nexus — Technical Design Document

**Version:** 0.1
**Parent document:** [Game Design Document](../gdd/00-index.md)
**Scope:** Architecture and design of every runtime system needed to ship the GDD. No implementation code is included; interfaces are described as tables and diagrams.

---

## How This Document Is Organised

| Topic requested | Section | File |
|---|---|---|
| Folder structure | 1 | [01-folder-structure-and-domain.md](01-folder-structure-and-domain.md) |
| Domain architecture | 2 | [01-folder-structure-and-domain.md](01-folder-structure-and-domain.md) |
| State management | 3 | [02-state-events-save.md](02-state-events-save.md) |
| Event bus | 4 | [02-state-events-save.md](02-state-events-save.md) |
| Save system | 5 | [02-state-events-save.md](02-state-events-save.md) |
| Rendering pipeline | 6 | [03-rendering-pipeline.md](03-rendering-pipeline.md) |
| Entity system (ECS + Effect Engine) | 7 | [04-entity-system.md](04-entity-system.md) |
| Tower, Hero, Enemy (and Boss) frameworks | 8–10 | [05-tower-hero-enemy-frameworks.md](05-tower-hero-enemy-frameworks.md) |
| Combat calculations | 11 | [06-combat-calculations.md](06-combat-calculations.md) |
| Balancing architecture | 12 | [07-balancing-architecture.md](07-balancing-architecture.md) |

## Guiding Principles (Inherited from the GDD)

| # | Principle | Consequence in the design |
|---|---|---|
| 1 | Deterministic simulation | Fixed 30 Hz tick, seeded RNG streams, ordered iteration, precomputed curve tables; replays are `setup + seed + command log` |
| 2 | Clean Architecture | Pure TypeScript domain packages with no browser, React or Pixi imports; adapters at the edge |
| 3 | Data-driven content | Towers, enemies, heroes, relics, maps and waves are validated data; engine code only changes for genuinely new behavior |
| 4 | Small engine, wide content | ~25 effect primitives and a finite behavior registry compose all 30 towers, 60 evolutions, 15 heroes, 120 enemies |
| 5 | Never lose a save | Versioned envelope, migration chain, atomic writes, rolling backups |
| 6 | Explainable numbers | Every stat is a modifier stack with source tracking, powering tooltips, debugging and balance reports |
| 7 | Balance is a pipeline | Balance data is versioned, linted, bot-tested and gated in CI |

## Architecture Decision Records (Summary)

| ADR | Decision | Rationale | Alternatives rejected |
|---|---|---|---|
| ADR-01 | Split GDD's single `domain` package into **`sim`** (battle) and **`meta`** (progression) | Worker bundle stays small; bounded contexts stay isolated; sim has no dependency on profile concepts | One monolithic domain package |
| ADR-02 | Simulation runs in a **Web Worker** at a fixed **30 Hz** | Keeps main thread free for React/Pixi; deterministic stepping independent of frame rate | Same-thread loop; variable timestep |
| ADR-03 | **Custom data-oriented ECS** with typed-array storage | Throughput and determinism control; tiny API surface; serializable | Off-the-shelf OOP entity classes |
| ADR-04 | **Replays store commands, not events** | Small, stable across event schema changes, enables server verification | Event sourcing |
| ADR-05 | Content expressed as **Trigger → Condition → Effect** with a **behavior registry** escape hatch | Keeps engine small; designers add variants without code | Per-entity subclasses |
| ADR-06 | **Precomputed curve tables**; sim performs only IEEE basic ops, lookups and interpolation | `Math.pow`/trig may differ across engines in the last bit | Calling transcendental functions in sim |
| ADR-07 | Worker→main protocol: **static state via events, dynamic state via SoA snapshots** | Minimises per-frame transfer; trivial interpolation | Full world serialization per frame |
| ADR-08 | **Zustand stores hold plain snapshots only**, never sim objects | Prevents re-render storms; clean serialization | Sim state in React state |
| ADR-09 | Saves are **single-writer, atomic, versioned**; battle suspend is replay-based | Integrity and tiny payloads | Raw world dumps as saves |
| ADR-10 | **Balance bundles are immutable and versioned**; replays reference a `balanceVersion` | Server can verify old replays; leaderboards stay fair | Mutating live tuning in place |
| ADR-11 | **Rewind** (Orrin's *Second Chance*) uses a **keyframe ring buffer** inside the sim | Deterministic, replay-safe | Ad-hoc undo logs |

## Naming and ID Conventions

| Thing | Convention | Example |
|---|---|---|
| Content ID | `namespace:kind.name` snake_case, never reused | `core:tower.arcane_tower` |
| Evolution ID | Parent ID + `.` + name | `core:tower.arcane_tower.archmage_spire` |
| Enemy ID | `core:enemy.<faction>_<name>` | `core:enemy.vrd_thornling_scout` |
| Event type | `Domain.PastTense` PascalCase | `Combat.EnemyKilled` |
| Command type | Imperative PascalCase | `PlaceTower` |
| Stat key | `category.name` lowercase | `weapon.attack_speed`, `resist.fire` |
| Package | `@gotn/<name>` | `@gotn/sim` |
| Tick values | Suffix `Ticks` | `cooldownTicks` |
| Distances | Tiles; suffix `Tiles` | `rangeTiles` |

## Global Technical Constants

| Constant | Value | Notes |
|---|---|---|
| Simulation rate | 30 ticks/s (33.33 ms) | Game speeds 0.5×–3× scale ticks per frame, not tick length |
| Max catch-up | 6 ticks per rendered frame | Beyond that the sim yields (slows) rather than spiral |
| Tile unit | 1.0 = one build-pad width | Pixel size derived by renderer |
| Max entities (hard cap) | 4,096 live (enemies ≤ 1,200) | Pools sized accordingly |
| Max attack rate | 15 shots/s per weapon | Prevents tick aliasing |
| Replay checkpoint | State hash every 300 ticks (10 s) | For verification and desync diagnosis |
| Rewind window | 15 s (450 ticks), keyframes every 30 ticks | 16 keyframes in ring |

## Traceability Matrix (GDD → TDD)

| GDD section | TDD coverage |
|---|---|
| 2.6 Combat rules | 06 Combat calculations |
| 2.9 No mandatory build order | 07 Balancing architecture (power budget, bot) |
| 5 Towers | 05 Tower framework; 04 Effect Engine |
| 6 Heroes | 05 Hero framework |
| 7 Enemies / 8 Bosses | 05 Enemy and Boss frameworks |
| 9 Resources | 06 §Economy; 02 Save (meta currencies) |
| 10–11 Progression / Research | 01 `meta` context; 02 Save; 07 Balancing |
| 12 Base building | 01 `meta` context (Citadel aggregate) |
| 13 Maps | 05 Enemy framework (pathing, waves); 03 Rendering (layers) |
| 14 Endgame | 01 `rift`, `competition` contexts; 02 Save (replays) |
| 15 Monetization | 01 Entitlement port |
| 16 Technical architecture | Whole TDD (refines it) |
| 17–21 Roadmap | Each section lists the milestone in which it is first required |

## Milestone Annotation Legend

Throughout this document, requirements are tagged with the first milestone that needs them: **[MVP]**, **[Alpha]**, **[Beta]**, **[1.0]**, **[Post]**.
