# Architecture Validation Report

**Scope:** Game Design Document (`docs/gdd`), Technical Design Document (`docs/tdd`), Development Backlog (`docs/backlog`).
**Reviewer role:** Lead Software Architect and Engineering Manager.
**Status:** Conditionally approved. The architecture is sound and the three documents are largely coherent. **3 blockers** must be resolved before the first line of production code, and **24 major findings** must be resolved before the milestone that depends on them.

---

## 1. Method

| Activity | Result |
|---|---|
| Read all 13 GDD files, 8 TDD files and 6 backlog files | Complete |
| Reconciled content counts (GDD tables vs backlog tasks) | See §3 |
| Traced every TDD subsystem to at least one backlog story | 9 subsystems have no or partial coverage (§6) |
| Traced the TDD effect primitives (26) and behavior roster (≈ 40 named behaviors) to backlog milestones | All scheduled |
| Checked backlog ID integrity | 276 stories, 1,083 tasks, 0 duplicate feature or story IDs |
| Re-derived GDD numeric rules against the GDD's own tables | 3 rules fail (C-01, C-02, C-03) |
| Rough-modelled the shard economy against the hours budget | Does not close (C-07) |
| Assessed technical feasibility of the TDD against browser/runtime constraints | 3 blockers/majors identified (§7) |

### Severity Scale

| Severity | Meaning |
|---|---|
| **Blocker** | Must be resolved before work on the affected area starts; rework cost grows sharply otherwise |
| **Major** | Must be resolved before the milestone named in *Fix by* |
| **Minor** | Fix opportunistically; low risk if deferred |

## 2. Scorecard

| Dimension | Verdict | Blockers | Major | Minor |
|---|---|---|---|---|
| Feature consistency | Mostly consistent; several design rules are not met by the roster | 0 | 8 | 5 |
| Scope consistency | Art/audio production scope is missing; MVP is not minimal | 1 | 1 | 1 |
| Milestone consistency | Content gating and platform risks misaligned in places | 0 | 3 | 0 |
| Story consistency | Stories lack acceptance criteria; dependencies and sizing need work | 0 | 3 | 1 |
| Technical feasibility | Feasible; 1 decision to change now, 4 risks to manage | 1 | 4 | 2 |
| Missing systems | 9 gaps, 1 blocker | 1 | 4 | 4 |
| Missing dependencies | 5 gaps | 0 | 1 | 4 |
| **Total** | | **3** | **24** | **17** |

## 3. Inventory Reconciliation

### 3.1 GDD Totals Verified in Source Tables

| Item | GDD target | Verified in tables |
|---|---|---|
| Factions | 10 | 10 |
| Base towers / evolutions | 30 / 60 | 30 rows / 60 evolutions (30 pairs) |
| Heroes | 15 | 15 |
| Standard enemies | 100 (10 per faction) | 100 (10 × 10) |
| Bosses | 20 (2 per Act) | 20; boss maps 3 and 5 of each Act match the map table |
| Handcrafted maps | 50 | 50 |
| Relics / Spells / Research nodes | 120 / 12 / 152 | Declared; research node count not reconcilable (C-09) |

### 3.2 Cumulative Content by Milestone (GDD vs Backlog)

| Item | MVP (GDD / backlog) | Alpha | Beta | 1.0 | Consistent? |
|---|---|---|---|---|---|
| Towers | 8 / 8 | 16 / 16 | 24 / 24 | 30 / 30 | Yes (after the backlog's resolution of the GDD's 17-vs-16 conflict) |
| Evolutions | 8 / 8 | 32 / 32 | 48 / 48 | 60 / 60 | Yes |
| Heroes | 1 / 1 | 5 / 5 | 11 / 11 | 15 / 15 | Yes (Zephyra pulled forward) |
| Enemies | 10 / 10 | 30 / 30 | 70 / 70 | 100 / 100 | Yes |
| Bosses | 1 / 1 | 6 / 6 | 14 / 14 | 20 / 20 | Yes |
| Maps | 3 / 3 | 15 / 15 | 35 / 35 | 50 / 50 | Yes |
| Relics | 0 / 0 | 30 / 30 | 80 / 80 | 120 / 120 | Yes |
| Nexus Spells | not stated / 3 | 6 / 6 | 10 / 10 | 12 / 12 | Yes (MVP count added by backlog) |
| Research nodes | 5 upgrades / 5 | 40 / 40 | 110 / ≈ 110 | 152 / 152 | **Partial** (C-09) |
| Citadel buildings | 0 / 0 | 3 / 3 | 6 / 6 | 6+ / 6+ | Yes, but relic/Armory features precede their buildings (C-12) |

### 3.3 Backlog Size

| File | Stories | Tasks |
|---|---|---|
| MVP | 77 | 296 |
| Alpha | 65 | 252 |
| Beta | 73 | 305 |
| 1.0 | 54 | 203 |
| Post-launch | 7 | 27 |
| **Total** | **276** | **1,083** |

The MVP is **27% of all tasks before 1.0** and carries half of the walking-skeleton tag (153 of 296 tasks are ★). See S-01.

---

## 4. Findings: Contradictions and Feature Consistency

| ID | Sev | Finding and evidence | Impact | Recommendation | Fix by |
|---|---|---|---|---|---|
| **C-01** | Major | GDD §2.9 rule 3: "every damage type is delivered by at least 6 towers across at least 4 schools." The roster has at most 5 towers per type (Physical 5; Arcane 4; Fire, Frost, Storm, Nature, Shadow, Radiant, Void 3 each) and no type spans 4 schools. | A promised design guarantee cannot be met; the balance bot gate based on it would always fail. | Re-state as "≥ 3 towers across ≥ 2 schools per damage type, plus at least one conversion route (Prismatic Lantern, relic or hero)". Update GDD §2.9 and TDD §12.1; encode as a lint in the power analyzer. | Before Alpha |
| **C-02** | Minor | GDD §5 intro: "each school has a damage, a control and a support/summon tower." Fails for Martial, Frost, Storm, Flame and Crystal (e.g., Frost has two damage-type towers and one aura, no support/summon). | Misleading design claim; affects build-variety expectations. | Weaken wording ("most schools") or document the role map per school. | Before Alpha |
| **C-03** | Major | GDD §8.1 rule 5: ≥ 2 bosses punish each dominant archetype. Boss table: hero-carry = Skadi only (heroes doc §6.5 names Veyron, but the boss table says "single mega-tower"); economy-turtle = Xyrrith only; tower-spam = none. | The anti-monoculture promise is unmet; leaves archetypes unpunished. | Assign: hero-carry → Skadi + Veyron (Mark of Study); economy-turtle → Xyrrith + Foreman Mk-7; tower-spam → Wintermaw + Leviathan. Reflect in boss mechanics text and the bot gate (TDD §12.8). | Before Alpha (bosses ship in Alpha) |
| **C-04** | Major | Nexus Energy caps at 100 (GDD §9.4). Hero Ultimate costs 50 (GDD §6.1); Nexus Surge costs 100. The Unmaker phase 4 requires **both** within a 15 s window (GDD §8.12). | Unwinnable or ambiguous final boss mechanic. | Decide: Ultimate uses a cooldown instead of Energy, **or** phase 4 refills Energy to 150 via an uncapped "Final Charge" pool. Update GDD §6.1/§9.4/§8.12 and TDD §11.10. | Before MVP (hero Ultimate cost model is built in MVP) |
| **C-05** | Major | Prestige unlocks at account level 60 **and** Act X Mythic 1 cleared (GDD §10.7); Mythic unlocks after Act X Heroic (GDD §14.7). Beta ships Acts I–VII only, with Mythic 1–5 and Prestige Cycles 1–3 (backlog FT-15.7, FT-11.13). | Features unreachable in Beta. | Parameterize gates as "final Act of the build"; Beta gate = Act VII Heroic cleared. Add a content-gate flag and revert for 1.0. | Before Beta |
| **C-06** | Major | Evolutions unlock through Research Lab nodes (GDD §10.5) but Lab tracks are Ballistics (Martial/Crystal/Storm) and Elemental (Flame/Frost/Nature); Arcane Theory (Beta) covers Arcane/Void; **no track covers Shadow or Radiant**. Alpha implements only Ballistics and Elemental (backlog FT-11.5) yet unlocks all 32 Alpha evolutions, including Arcane, Shadow and Radiant towers. | Alpha evolutions for Arcane Tower, Mana Font, Rune Warden, Cursed Idol and Sun Beacon have no research home. | Add an explicit "evolution-unlock owner" per school; either add a Radiant/Shadow track or create a school-agnostic "Tower Doctrine" track; build Arcane/Shadow/Radiant nodes in Alpha. | Before Alpha |
| **C-07** | Major | Shard economy does not close. GDD §9.5 sinks ≈ 240,000 Shards; supply derived from the GDD's own rates (≈ 4 Shards per wave, multipliers ×1.4/×2.0/×2.8+, stars +20, hours from §10.2) ≈ **136,000** (§8). | Players would earn ~57% of what the sinks require, i.e., the "excessive grinding" the design forbids. | Raise base rate (≈ 6–7 Shards/wave), or reduce building curve (`16 × level^1.6` → `10 × level^1.6`), or both; run the meta economy simulator at the start of Alpha, not Beta. | Before Alpha |
| **C-08** | Major | GDD §2.3: 8 tower slots. MVP has exactly 8 starter towers. | No loadout choice in MVP, which negates pillar 3 ("loadout-first strategy") in the playtest that validates fun. | Make slot count a rule parameter: MVP offers more towers than slots (see MVP Definition). | Before MVP |
| **C-09** | Minor | Research nodes: GDD tracks total 152 (24+24+24+20+20+20+20). Backlog builds Ballistics 20 and Elemental 20 in Alpha (not 24+24), and never schedules the 8 missing nodes; Beta totals are described as "110" with partial tracks. | Node accounting drifts; designers will invent nodes ad hoc. | Create a single research node ledger (spreadsheet) with IDs per track and milestone. | Before Alpha |
| **C-10** | Minor | GDD §2.3 says tower slots can reach 10 "via research", but no research node or track provides it. | Undefined feature. | Add a Hero Training or Foresight node, or an account-tree capstone. | Before Beta |
| **C-11** | Major | Counter audit (GDD §7.14) relies on **Cleansing Light "always available"**, but the backlog schedules Cleansing Light as spell #7 (Beta). Spells unlock through Arcane Academy levels (GDD §10.5), yet the Academy is built in Beta while Alpha lists six spells. Act III (Alpha) introduces tower-disabling enemies (Slagthrower, Cinder Raider); Sanctuary Shrine (the tower cleanse) arrives with Act IV (Beta). | Alpha players have no cleanse and no defined way to unlock spells 4–6. | Make Cleansing Light a starter spell (replace Summon Wardens in the Alpha six); define interim spell unlock (Shards via Research Lab) until the Academy exists. | Before Alpha |
| **C-12** | Minor | Armory (GDD: unlocked in Act II) is scheduled in Beta (FT-12.3) while Alpha ships Practice mode and an "Armory shop UI". Relics and a Relic Vault UI ship in Alpha, but the Relic Vault building ships in Beta. | Features without their host building. | Ship Relic Vault levels 1–5 and a minimal Armory in Alpha. | Before Alpha |
| **C-13** | Minor | TDD index promises milestone tags ([MVP], [Alpha], …), but only 4 tag occurrences exist across 1,900 lines. | Engineers can over-build (e.g., keyframes, cloud sync) early. | Add a TDD→milestone mapping table (this report's §9 action list). | Before MVP |

## 5. Findings: Scope, Milestone and Story Consistency

### 5.1 Scope

| ID | Sev | Finding and evidence | Impact | Recommendation | Fix by |
|---|---|---|---|---|---|
| **S-01** | Major | The MVP backlog has 77 stories / 296 tasks; ★ walking-skeleton tasks = 153. The GDD calls it "prove the fun and the architecture". It includes everything from the full engine to a boss, hero, save, meta and 8 evolutions. | Fun is validated late (after ≈ 300 tasks), the most expensive way to discover a weak core loop. | Stage the MVP: M0 (skeleton, ≈ 140 tasks) → M1 (combat slice, ≈ 70) → M2 (MVP, ≈ 75), each with a go/no-go gate. See MVP Definition. | Before MVP |
| **S-02** | **Blocker** | Art and audio production are not backlog items beyond "integration" tasks (EP-18, 37 tasks). Demand (heuristic): ≈ 910 artist-days for 120 enemies, ~90 tower visuals, 15 heroes, 20 bosses, 8 biomes, 10 acts of comics, UI and VFX, vs a GDD team of 1–2 artists. | Art is the real critical path for Beta and 1.0 (Production Plan §6). | Create an art production backlog (per Act asset lists with budgets), decide contractor/asset-pack strategy, enforce modular/palette-swap rules, and plan a third artist/contractor FTE from Beta. | Before Alpha |
| **S-03** | Minor | GDD §15.2 demo includes "Endless Lite" and "Weekly view-only" but neither is defined; backlog FT-17.4 references Endless Lite. | Demo scope ambiguity. | Define: Endless Lite = Endless on Act I maps with local best only; Weekly view-only = list of seeds, no play. | Before Beta |

### 5.2 Milestones

| ID | Sev | Finding and evidence | Impact | Recommendation | Fix by |
|---|---|---|---|---|---|
| **M-01** | Major | i18n key extraction and lint arrive in Alpha (backlog FT-4.4), but MVP/Alpha UI text is built earlier. Localization is Beta. | Retrofitting thousands of strings (menus, tooltips, tutorials, lore) is costly and error-prone. | Mandate i18n keys from the first UI string (MVP). | Before MVP |
| **M-02** | Major | Battle suspend/resume and keyframes are Beta (FT-14.3, FT-2.6). The game is browser-first with 20–30 minute battles; closing a tab loses the battle. | The closed alpha (≥ 50 testers) would hit this constantly, skewing retention data. | Pull keyframes and suspend forward to the end of Alpha, or provide a "resume from checkpoint wave" interim (replay from start at 3× speed). | Alpha |
| **M-03** | Major | The save promise "Never lose a save" (GDD pillar) vs Safari/WebKit storage eviction: script-writable storage (IndexedDB) can be purged after ~7 days without interaction. Cloud sync arrives in Beta. | Safari players can lose progress between sessions. | Request persistent storage; surface export prompts; bring a minimal opt-in cloud backup to Alpha; document the limitation in the demo. | Alpha |

### 5.3 Stories

| ID | Sev | Finding and evidence | Impact | Recommendation | Fix by |
|---|---|---|---|---|---|
| **St-01** | Major | Stories have no individual acceptance criteria and no GDD/TDD references, though the Definition of Ready requires a linked design reference. | Ambiguity in "done"; reviewers re-derive intent. | Add `AC:` (2–4 testable lines) and `Refs:` (GDD/TDD section) to every story before it enters a sprint (just-in-time). | Rolling |
| **St-02** | Major | Heuristic scan: ~85 tasks contain `;` and ~32 are multi-skill/multi-evolution tasks (e.g., "Kyra: definition, Q, W, E", "Evolutions: Earthshaker Gong, Stormcaller Choir", weather overlays for four weathers, "train_cars multi-entity boss framework"). Roughly 10–20% of tasks exceed one session. | Underestimated effort; velocity metrics skew. | Split on pull: any task with 3+ deliverables, new behavior code plus content, or a first-of-kind framework becomes 2–3 tasks. Apply a 12% inflation in estimates. | Rolling |
| **St-03** | Major | Dependencies are expressed only at epic level. Concrete defects: the ★ story US-5.2.1 includes Garrison Barracks, which needs the Summoner framework in non-★ US-5.2.2; US-6.1.2 ★ (blocking) is required by soldiers but is not ordered before them. | Parallel work stalls or is reordered mid-sprint. | Add `Needs:` metadata to every story (use GitHub issue dependencies). Seed it from §9. | Before MVP |
| **St-04** | Minor | ★ ("walking skeleton") marks all 8 towers (US-5.2.1), save v1, rewards and results, contradicting "one lane, one tower, one enemy" in the MVP file. | Skeleton not minimal. | Replace ★ with M0/M1/M2 tags (see MVP Definition). | Before MVP |

---

## 6. Findings: Missing Systems and Dependencies

### 6.1 Missing Systems

| ID | Sev | Missing system | Source requirement | Impact | Add to backlog |
|---|---|---|---|---|---|
| **MS-01** | **Blocker** | **Contract DTOs**: `BattleSetup`, `BattleResult`, `ModifierSpec`, `HeroSpec`, command and event schemas with versioning (`simVersion` stamping) | TDD §2.4, §3.6 | `sim` and `meta` cannot be built in parallel without frozen contracts; the worker and the replay header depend on them | MVP P0, before US-2.4.2: "Define and validate contract schemas (Setup, Result, ModifierSpec, HeroSpec)" |
| **MS-02** | Major | **Composition root / DI wiring** | TDD §2.6 | No owner for adapter wiring; web/tools/test compositions diverge | MVP P0: composition root for web, tests, tools |
| **MS-03** | Major | **Application event bus** (autosave triggers, achievements, toasts, telemetry) | TDD §4.7 | Event-driven features have no host | MVP: implement bus and typed events |
| **MS-04** | Major | **Map and wave authoring tool** (`tools/map-editor` appears in the TDD folder tree) | TDD §1.1, GDD §13.8 | 50 maps, Rift templates and ~1,000 wave groups authored by hand in JSON is the largest content bottleneck | Alpha P0 before Map 4: editor with pad/lane placement, validation overlay and playtest button |
| **MS-05** | Major | **Replay viewer and entity inspector UI** | TDD §6.15 | Determinism bugs will be undiagnosable without tooling | Alpha P1: replay scrubber, hash-diff viewer, inspector panel |
| **MS-06** | Minor | **Targetability layers**: Stealthed/Phased/Burrowed/Revealed rules in targeting and `hitsHidden` weapons; Anchor `NoTeleport` checks | TDD §7.1, §8.9 | Alpha Dust Djinn (Phase) and Beta Whiteout Wraith (stealth) lack a defined filter system | Alpha: targetability rules task + tests |
| **MS-07** | Minor | **Achievement engine** (≈ 80 achievements) | GDD §15/§21 | Only ports and an "initial set" exist | Beta: achievement definitions + evaluation from events/results |
| **MS-08** | Minor | **Assist rules in the sim** (slower speed, extra gold, extra Integrity) and leaderboard ineligibility flagging | GDD §2.8 | UI exists; effects and flags do not | Alpha: assist modifiers in `BattleSetup.rules` |
| **MS-09** | Minor | **`simVersion` policy** (what bumps it, retention of old sims for replay viewing/verification) | TDD §5.3 | Replays and suspends break on updates | Alpha: policy doc + CI check that fails on unannounced behavior changes (golden replays) |

### 6.2 Missing or Mis-ordered Dependencies

| ID | Sev | Dependency defect | Impact | Fix |
|---|---|---|---|---|
| **D-01** | Major | The Map schema tasks (US-4.1.1) do not mention a **hero walkable layer / nav grid**, though heroes (US-7.1.1) need it; 3 MVP maps would need data rework. | Rework of all map data | Add walkable layer, hazard hooks and branching fields to the Map schema in MVP, even if unused |
| **D-02** | Minor | MVP defines the asset manifest/loader; Alpha builds the atlas packer. | Format drift | Define the manifest schema in MVP and make the packer emit it |
| **D-03** | Minor | Beta order: cloud save (FT-14.4) requires accounts (FT-15.3). | Intra-milestone stall | Order FT-15.3 first |
| **D-04** | Minor | Mythic affixes (Beta) need enemy-schema hooks (affix modifiers, immunity to specific affixes) that Alpha enemies are authored without. | Re-edit of 30+ enemy definitions | Reserve `affixHooks` and `tags` in the Enemy schema in MVP |
| **D-05** | Minor | If the MVP drops Flame Forge evolutions (Phoenix Kiln, Inferno Foundry) as recommended, Alpha FT-5.6 must add them. | Orphaned work | Add as two Alpha tasks |

---

## 7. Findings: Technical Feasibility

### 7.1 Assessment of Core Assumptions

| Assumption | Verdict | Notes |
|---|---|---|
| Deterministic simulation in JS (Float64, restricted math, seeded RNG) | **Feasible** | IEEE-754 basic operations and `sqrt` are deterministic; ECMAScript forbids fused multiply-add. Main risk is accidental use of non-deterministic APIs, mitigated by lint rules (US-1.2.2) and cross-browser golden replays. |
| 30 Hz sim in a Web Worker with SoA snapshots | **Feasible** | Standard approach. Triple-buffered transfer is the safe default; SAB optional. |
| 4 ms/tick at 600 enemies, 40 towers | **Feasible but unproven** | Hot-path SoA is fine; object components (`StatusSet`, `AbilityBook`, behaviors) are the allocation risk (T-05). |
| Pixi at 1,200 sprites on integrated GPU | **Feasible** | Needs batching discipline (atlas, bitmap text, pooled graphics); spike in US-1.3.1. |
| Replay-based leaderboard verification | **Feasible but costly** | See T-02. |
| Next.js shell with client-only game + optional API | **Feasible with a structural change** | See T-03. |

### 7.2 Findings

| ID | Sev | Finding | Impact | Recommendation | Fix by |
|---|---|---|---|---|---|
| **T-01** | **Blocker** | **Entity ID layout**: TDD §7.1 packs 20-bit index + 12-bit generation. A slot can be recycled more than 4,096 times in a long Endless/Boss Rush session (LIFO free lists reuse hot slots), wrapping the generation and re-validating stale IDs (ABA). | Rare, nondeterministic-looking logic bugs in the longest sessions; expensive to change after components store IDs everywhere | Decide now: 16-bit index + 16-bit generation (capacity 65,536 ≫ 4,096 cap), or generation in a `Uint32Array` with IDs as float-safe integers (≤ 2^53). Update TDD §7.1 and ADR-13. | Before ECS code |
| **T-02** | Major | **Replay verification cost**: ≈ 1 ms/tick ⇒ ≈ 54 s CPU per 30-minute run; Endless/Boss Rush runs are longer. Verifying every submission scales linearly with players. | Server cost and queue latency | Verify top-N and random samples synchronously; queue the rest; cap tick counts per submission; reject oversized replays; use the bot's throughput numbers to size workers. Add to FT-15.3. | Beta |
| **T-03** | Major | **Next.js static export vs route handlers**: TDD §1.1 places `app/api/` inside the same app that Steam/mobile wrappers load via static export; static export cannot host dynamic route handlers. | Packaging failure for desktop/mobile or a forced fork of the app | Move services to a separate deployable (`apps/services`); keep `apps/web` fully static. Update TDD §1.1/§16.12 and add a task to FT-15.3. | Before Beta (decide at Alpha start) |
| **T-04** | Major | **Desktop wrapper**: the TDD leaves Tauri vs Electron open. Tauri uses the system webview (WebKitGTK on Linux/Steam Deck, WKWebView on macOS), which varies in Worker, WebGL and performance behavior; the sim's determinism and perf budgets are validated on Chromium-class engines. | Steam build behaves differently from the tested web build | Default to **Electron** (bundled Chromium) unless the spike proves WebKitGTK parity; run the determinism harness in the chosen wrapper; decide by the end of Alpha, not at Beta start. | End of Alpha |
| **T-05** | Major | **Sim performance risk concentration** in object components, hero A*, auras and per-tick `explain`-free stat recompute; at 3× speed the worker may run 90 ticks/s. | Frame stutter, "slow motion" at 3× on weak CPUs | Cap statuses per entity and abilities per tick; reduced component set for swarm units; stress scene in M0 with per-system timings; budget 3× speed as "best effort" with automatic fallback to 2×. | M0 |
| **T-06** | Minor | **Rewind side effects**: restoring a keyframe re-creates entities and re-emits state; render, audio and outbound streams need a reset path (`Battle.Rewound` event, view-registry flush, VFX purge). Not specified. | Visual/audio glitches, duplicate achievements/mastery counts | Specify in TDD §7/§9: reset protocol, mastery/achievement counters ignore rewound ticks. | Beta |
| **T-07** | Minor | **Old-sim retention**: replays require the exact `simVersion`; the client can only view replays whose sim it still ships. | Replay viewing breaks after patches | Policy: ship the last two `simVersion`s in the client; the server keeps all. | Beta |

### 7.3 Validated Strengths

- Layering and import rules are enforceable with tooling and consistent across TDD and backlog.
- Effect-primitive and behavior coverage: all 26 primitives and the named behaviors in TDD §7.13/§7.16 are scheduled in some milestone.
- Replay-based architecture simultaneously serves QA, bots, leaderboards, suspend/resume and bug reports.
- Immutable balance bundles plus `rulesEpoch` solve leaderboard fairness cleanly.

---

## 8. Supporting Analysis: Shard Economy Closure (C-07)

Assumptions: base 120 Shards per 30-wave map (≈ 4/wave), average 30 minutes per campaign battle, GDD hours (§10.2), difficulty multipliers (§9.5), stars +20 on first clear per star per difficulty.

| Source | Hours | Estimated Shards/h | Total |
|---|---|---|---|
| Campaign Normal | 25 | 240 | 6,000 |
| Campaign Veteran | 20 | 336 | 6,700 |
| Campaign Heroic | 25 | 480 | 12,000 |
| Mythic 1–20 | 30 | ≈ 910 | 27,000 |
| First-clear star bonuses (50 maps × 3 stars × 20 × 4 tiers) | — | — | 12,000 |
| Rifts | 35 | ≈ 600 | 21,000 |
| Endless / Survival | 20 | ≈ 600 | 12,000 |
| Boss Rush | 8 | ≈ 600 | 5,000 |
| Weekly / Seasonal (with boosted rewards) | 15 | ≈ 600 | 9,000 |
| Mastery challenge maps | 12 | ≈ 500 | 6,000 |
| Ascension cycles | 20 | ≈ 700 | 14,000 |
| Completionist | 10 | ≈ 500 | 5,000 |
| **Total supply** | **220** | | **≈ 136,000** |
| **Sinks (GDD §9.5)** | | | **240,000** |
| **Coverage** | | | **≈ 57%** |

*The model is deliberately simple; its purpose is to show the order-of-magnitude mismatch, not to set final numbers.*

---

## 9. Required Document Changes (Action List)

### 9.1 Before the First Line of Production Code (Blockers)

- [ ] **T-01** Fix entity ID layout (TDD §7.1, ADR-13) before the ECS spike.
- [ ] **MS-01** Add and freeze the contract-schema story (Setup, Result, ModifierSpec, HeroSpec, Command, Event) as the first story after the repo scaffold.
- [ ] **S-02** Produce the art production plan (asset list, budgets, reuse rules, sourcing) before the Alpha content ramp; assign owner now.

### 9.2 Before MVP Implementation Reaches Combat (Majors)

- [ ] **C-04** Choose Ultimate/Surge energy model.
- [ ] **C-08** Make loadout slot count a rule parameter.
- [ ] **M-01** Mandate i18n keys from the first UI string.
- [ ] **MS-02**, **MS-03** Add composition-root and application-event-bus tasks.
- [ ] **D-01** Add walkable layer/hazard hooks to the Map schema.
- [ ] **St-03**, **St-04** Replace ★ with M0/M1/M2 and add `Needs:` metadata.
- [ ] **C-13** Publish the TDD→milestone mapping.

### 9.3 Before Alpha

- [ ] **C-01**, **C-02**, **C-03** Correct the GDD rules to match the roster/boss table.
- [ ] **C-06**, **C-09**, **C-10** Create the research node ledger and assign evolution-unlock owners.
- [ ] **C-07** Re-tune shard supply/sinks; run the meta economy simulator at Alpha start.
- [ ] **C-11**, **C-12** Starter Cleansing Light, interim spell unlocks, Relic Vault L1–5, minimal Armory.
- [ ] **MS-04**, **MS-05**, **MS-06**, **MS-08**, **MS-09** Authoring tool, replay viewer/inspector, targetability layers, assist modifiers, sim-version policy.
- [ ] **M-02**, **M-03** Pull suspend/keyframes and minimal cloud backup to the end of Alpha.
- [ ] **T-03**, **T-04** Split `apps/services`; decide the desktop wrapper (default Electron).

### 9.4 Before Beta and 1.0

- [ ] **C-05** Parameterize Prestige/Mythic gating by build.
- [ ] **T-02**, **T-06**, **T-07** Verification sampling policy, rewind reset protocol, sim retention policy.
- [ ] **MS-07**, **D-03**, **S-03** Achievement engine, service ordering, demo definition.

---

## 10. Accepted Deviations Already Recorded in the Backlog

These were identified during backlog creation and are **accepted** (see [backlog index](../backlog/00-index.md)): Alpha = 16 towers (Thunder Drum → Beta); Beta towers include Anchor Pillar; Zephyra pulled into Beta; MVP includes 3 Nexus Spells; keyframes/rewind deferred to Beta (now recommended earlier, M-02); programmer art for MVP.

## 11. Overall Recommendation

Proceed to implementation after closing the 3 blockers and adopting the staged MVP in the next document. The design is unusually well specified for its stage; the principal risks are **art throughput, scope breadth and economy tuning**, not engineering feasibility.
