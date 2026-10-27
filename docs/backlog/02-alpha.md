# Alpha Backlog

**Goal:** prove the loop and the meta (GDD §19). Closed alpha cohort of ≥ 50 players.
**Scope:** Acts I–III (15 maps) · 16 base towers + 32 evolutions · 5 heroes with trees and basic gear · 30 enemies · 6 bosses · Citadel (Research Lab, Hero Hall, Forge to level 10) · account levels 1–30 · Nexus skill tree (1 tree) · research (40 nodes) · 30 relics · 6 Nexus Spells · Campaign Normal/Veteran · basic Endless · Practice mode · balance bot in CI · save migrations.
**Prerequisite:** MVP exit checklist complete.

Epic note: from here, **EP-6** carries handcrafted maps and enemy rosters; **EP-13** carries map *systems* (events, hazards, branching, Rift).

---

## EP-1 Foundation, Tooling and Guardrails

### FT-1.4 Release engineering — `P2`

- [ ] **US-1.4.1** As the team, builds are versioned and traceable.
  - [ ] Stamp `appVersion`, `simVersion`, `contentVersion`, `balanceVersion` into builds and the About screen
  - [ ] Automated changelog generation from PR labels
  - [ ] Nightly build workflow publishing a staging channel
  - [ ] Feature-flag system (build-time + remote JSON) with content gates

---

## EP-2 Simulation Core

### FT-2.5 Engine observability — `P1`

- [ ] **US-2.5.1** As an engineer, I can see what the sim is doing.
  - [ ] Per-system timing instrumentation exported to the debug overlay
  - [ ] Dev-build invariant checks (NaN/Infinity, hp ≤ maxHp, bounds, free-list consistency)
  - [ ] Entity inspector data feed (components, `explain` breakdown)
  - [ ] Order-independence test: shuffled same-tick commands yield identical hashes

---

## EP-3 Combat and Effect Engine

### FT-3.5 Effect engine extensions — `P0`

- [ ] **US-3.5.1** As a designer, I have the primitives Alpha content needs.
  - [ ] Primitive: `Mark` (school-scoped vulnerability)
  - [ ] Primitive: `Taunt` (forced target with expiry)
  - [ ] Primitive: `Revive`
  - [ ] Primitive: `Execute` with boss alternative rules
  - [ ] Primitive: `SetTargetMode`
  - [ ] Primitive: `TimeScale` (local speed/attack-rate scaling)
- [ ] **US-3.5.2** As a designer, I have the triggers and selectors Alpha content needs.
  - [ ] Triggers: OnDamaged, OnHpBelow, OnStatusApplied/Expired, OnWaveStart/End, OnLeaveZone, OnBlocked
  - [ ] Selectors: InLane, AllWithTag, LinkedTowers, Hero, Nexus, MapWide
  - [ ] Conditions: first-hit-this-wave, adjacent-school, distance, wave index

### FT-3.6 Post-damage handlers — `P1`

- [ ] **US-3.6.1** As a designer, combat has secondary effects.
  - [ ] Lifesteal and thorns/reflect with the `Reflected` flag
  - [ ] On-hit status application hooks with proc chance
  - [ ] Overkill-based effects hook
  - [ ] Mastery/Codex counter observers feeding `BattleResult`

---

## EP-4 Content Pipeline and Balance Data

### FT-4.4 Content tooling v1 — `P1`

- [ ] **US-4.4.1** As a designer, I can author at scale.
  - [ ] CSV import/export for balance tables with validation
  - [ ] i18n key extraction and missing-key lint (EN bundle)
  - [ ] Content lint: wave `mechanicTag` rules and introduction-before-danger across full wave scripts
  - [ ] Content lint: map pad density and lane-length checks for all maps
  - [ ] Lint: evolution parity (cost multipliers, cap on stat patches) per TDD

---

## EP-5 Towers

### FT-5.4 Weapon archetype extensions — `P0`

- [ ] **US-5.4.1** As a designer, additional weapon archetypes exist.
  - [ ] Lob (artillery arc, AoE, falloff, min range)
  - [ ] Pulse (radial burst on interval)
  - [ ] Beam (line hit, tick interval, ramp)
  - [ ] Trap Layer (n triggers on lane, re-arm)
  - [ ] Debuffer (low damage + status per hit)
  - [ ] Flying Summoner (patrol with weapon)
- [ ] **US-5.4.2** As a designer, terrain modifies towers.
  - [ ] Elevated pad range bonus and terrain tag modifiers
  - [ ] Large-pad footprint and per-map limits

### FT-5.5 Alpha base towers (8 new) — `P0`

- [ ] **US-5.5.1** As a player, I unlock Act I–III towers.
  - [ ] Tower: Plague Bloom (poison stacks, heal reduction at III)
  - [ ] Tower: Beastcaller Lodge (2 beasts, Bleed at III)
  - [ ] Tower: Gale Perch (air priority, knockback)
  - [ ] Tower: Sun Beacon (piercing beam; bonus vs Shadow/Void)
  - [ ] Tower: Rune Warden (rune traps; Echo Glyph re-arm)
  - [ ] Tower: Cursed Idol (Curse vulnerability)
  - [ ] Tower: Ember Brazier (lob, ground fire zone)
  - [ ] Tower: Wyrmling Roost (2 flying whelps)

### FT-5.6 Evolutions for remaining starter towers — `P1`

- [ ] **US-5.6.1** As a player, I can evolve Ballista Post and Garrison Barracks.
  - [ ] Evolutions: Siege Repeater, Dragonbane Rail
  - [ ] Evolutions: Shieldwall Bastion (Large pad), Vanguard Lancers
- [ ] **US-5.6.2** As a player, I can evolve Mana Font and Nature Grove.
  - [ ] Evolution: Leyline Nexus (`leyline_links` behavior)
  - [ ] Evolution: Spellforge Engine (`spellforge_overcharge` behavior)
  - [ ] Evolutions: Ancient Heart, Thornwarden

### FT-5.7 Evolutions for new towers — `P1`

- [ ] **US-5.7.1** As a player, I can evolve Act I and II towers.
  - [ ] Evolutions: Pandemic Orchid, Neurotoxin Vine
  - [ ] Evolutions: Alpha Den, Mammoth Shrine
  - [ ] Evolution: Cyclone Tower (`tornado_loop` behavior); Evolution: Skyhammer Aviary
  - [ ] Evolutions: Dawnbreaker Prism, Judgment Beam
  - [ ] Evolution: Glyph Labyrinth (`glyph_network` behavior); Evolution: Sigil Executioner
  - [ ] Evolutions: Doomsayer Effigy, Withering Throne
- [ ] **US-5.7.2** As a player, I can evolve Act III towers.
  - [ ] Evolutions: Lavafall Caldera, Solar Pyre
  - [ ] Evolutions: Elder Wyrm Aerie (Large pad), Drake Brood

---

## EP-6 Enemies, Waves, Navigation and Handcrafted Maps

### FT-6.5 Navigation extensions — `P0`

- [ ] **US-6.5.1** As a designer, lanes can branch.
  - [ ] Route policy: Path Switch (player toggle, effect on arrival)
  - [ ] Route policy: Weighted fork (RNG `ai`) and ShortestCost
  - [ ] Dynamic reroute on `Map.PathChanged` with reverse/open-edge fallback
  - [ ] Optional lanes per faction and blockable lanes
  - [ ] Fail-safe: reopen shortest route if all are closed (with warning event)
  - [ ] `TogglePathSwitch` command and UI affordance data

### FT-6.6 Ashen Sultanate enemies (10) — `P0`

- [ ] **US-6.6.1** As a player, I face the Ashen Sultanate (infantry and swarms).
  - [ ] Enemy: Dune Skirmisher (Sand Veil evasion on sand tiles)
  - [ ] Enemy: Mummified Legionnaire (Dry Wraps Burn vulnerability)
  - [ ] Enemy: Scarab Swarm (6-body group)
  - [ ] Enemy: Serpent Adept (ranged Venom Spit)
- [ ] **US-6.6.2** As a player, I face Ashen casters and elites.
  - [ ] Enemy: Sandstorm Priest (range-debuff zone)
  - [ ] Enemy: Sphinx Guard (`riddle_shell` behavior)
  - [ ] Enemy: Canopic Wraith (flying; Soul Jar revive)
  - [ ] Enemy: Chariot of the Sun (Sun Charge, first-CC immunity)
  - [ ] Enemy: Dust Djinn (Phase intangibility)
  - [ ] Enemy: Sandstone Golem (armor 35; Crumble)

### FT-6.7 Ember Clans enemies (10) — `P0`

- [ ] **US-6.7.1** As a player, I face Ember infantry and beasts.
  - [ ] Enemy: Cinder Raider (Overheat torch)
  - [ ] Enemy: Slagthrower (ranged tower disable with telegraph)
  - [ ] Enemy: Lava Hound (Pounce)
  - [ ] Enemy: Imp Swarm (flying kamikaze)
- [ ] **US-6.7.2** As a player, I face Ember elites and shamans.
  - [ ] Enemy: Magma Brute (Lava Trail)
  - [ ] Enemy: Ember Shaman (War Cry aura)
  - [ ] Enemy: Obsidian Berserker (Enrage, stun immunity below 30%)
  - [ ] Enemy: Drake Rider (flying Bomb Run)
  - [ ] Enemy: Standard-Bearer (Banner of Cinders)
  - [ ] Enemy: Phoenix Hatchling (Rebirth)

### FT-6.8 Handcrafted maps 4–15 — `P0`

- [ ] **US-6.8.1** As a player, I can play the rest of Act I.
  - [ ] Map 4 The Canopy Run (elevated pads, Path Switch gates)
  - [ ] Map 5 Heart of the Greenwood (3 forking lanes; boss map)
- [ ] **US-6.8.2** As a player, I can play Act II.
  - [ ] Map 6 Dustwind Caravan (sandstorm weather)
  - [ ] Map 7 Scarab Oasis (oasis pads)
  - [ ] Map 8 Tomb of Whispers (boss map)
  - [ ] Map 9 Sunscar Ramparts (mirrored lanes, heat wave)
  - [ ] Map 10 Pyramid of Khet-Ra (boss map)
- [ ] **US-6.8.3** As a player, I can play Act III.
  - [ ] Map 11 Cinderpath Pass (lava vents)
  - [ ] Map 12 Obsidian Switchbacks (ashfall)
  - [ ] Map 13 Warchief's Forge (destructible bridges; boss map)
  - [ ] Map 14 Magma Rivers (toggling bridges)
  - [ ] Map 15 Caldera Heart (eruption; boss map)
- [ ] **US-6.8.4** As a player, I can play Veteran difficulty.
  - [ ] Veteran difficulty profile live; stars tracked per difficulty
  - [ ] Wave-script tuning pass for Maps 1–15 using the balance bot

---

## EP-7 Heroes and Nexus Spells

### FT-7.4 Hero progression — `P0`

- [ ] **US-7.4.1** As a player, my heroes level independently.
  - [ ] `HeroProfile` aggregate (level 1–30, XP, benched XP share 40%)
  - [ ] Growth curves baked from balance tables
  - [ ] `HeroCompiler` full pipeline (growth, tree, gear, bonds, relics)
  - [ ] Hero XP rewards in `RewardCalculator`
- [ ] **US-7.4.2** As a player, I can allocate hero skill points.
  - [ ] Tree schema: branches, tiers, node kinds (Stat, SkillMod, SkillAdd, Passive, Keystone)
  - [ ] Tree validator (prereqs, tier gating, one keystone per branch, point cap)
  - [ ] `AllocateHeroPoint` and `RespecHero` use cases
  - [ ] Apply SkillMod/SkillAdd patches in `HeroCompiler`
- [ ] **US-7.4.3** As a player, I can equip gear.
  - [ ] `GearItem` schema with affix ranges and rarity (Common–Rare for Alpha)
  - [ ] Equipment slots (Weapon, Armor, Trinket, Sigil, Banner) and equip use cases
  - [ ] Sigil: modify a skill `patchPoint`
  - [ ] Banner: aura effect on towers/allies
  - [ ] Gear stat budget cap (±15%) validator

### FT-7.5 Heroes Rook, Gorrum, Thorn, Nefari — `P1`

- [ ] **US-7.5.1** As a player, I can play Captain Rook Halloran.
  - [ ] Rook: definition, Q Marked Shot, W Caltrops, E Grapple Dash
  - [ ] Rook: passives Sharpshooter, Bounty Hunter; Ultimate Dead Eye Barrage
  - [ ] Rook: progression tree data (Marksman, Trapper, Contractor)
- [ ] **US-7.5.2** As a player, I can play Gorrum Stonehide.
  - [ ] Gorrum: definition, Q Taunt Roar, W Seismic Slam, E Bulwark
  - [ ] Gorrum: passives Granite Skin, Unmoving; Ultimate Mountain's Wrath (rock walls)
  - [ ] Gorrum: progression tree data (Bastion, Tremor, Anvil)
- [ ] **US-7.5.3** As a player, I can play Thorn Mossbark.
  - [ ] Thorn: definition, Q Entangle, E Regrowth
  - [ ] Thorn: W Shapeshift (`form_shift` behavior; Bear/Hawk forms)
  - [ ] Thorn: passives Rootbound, Wild Instinct; Ultimate Avatar of the Greenwood
  - [ ] Thorn: progression tree data (Wildshape, Warden, Seedcaller)
- [ ] **US-7.5.4** As a player, I can play Nefari Sunscar.
  - [ ] Nefari: definition, Q Dune Dash, W Sandblade Flurry, E Mirage (decoy + stealth)
  - [ ] Nefari: passives Executioner's Eye, Desert Veil; Ultimate Eclipse Dance
  - [ ] Nefari: progression tree data (Duelist, Shadowrunner, Sandweaver)
- [ ] **US-7.5.5** As a player, Aelara has a full tree.
  - [ ] Aelara: progression tree data (Evoker, Loremaster, Spellblade)
  - [ ] Hero bonds data and bond bonus application

### FT-7.6 Nexus Spells 4–6 — `P1`

- [ ] **US-7.6.1** As a player, I have six Nexus Spells.
  - [ ] Spell: Meteor Call (telegraphed AoE)
  - [ ] Spell: Arcane Surge (Mana refill, cooldown)
  - [ ] Spell: Summon Wardens (spectral blockers)
  - [ ] Nexus Core attunement data (Pulse, Stasis, Rebirth Surge variants — first two live)

---

## EP-8 Bosses

### FT-8.3 Alpha bosses (5) — `P0`

- [ ] **US-8.3.1** As a player, I can fight Old Gnarl.
  - [ ] Gnarl: `rootwall_reroute` behavior (3,000-HP rootwalls, path re-route)
  - [ ] Gnarl: Heartwood weak-point exposure window and wildfire hazard
- [ ] **US-8.3.2** As a player, I can fight Anuket-Zar.
  - [ ] Zar: rotating immunity glyphs (resist 90% for 3 damage types, 12 s rotation)
  - [ ] Zar: optional Silent Question UI flow (flow event + boon/debuff rules)
- [ ] **US-8.3.3** As a player, I can fight Khet-Ra.
  - [ ] Khet-Ra: `day_night_cycle` behavior and shade-zone map state
  - [ ] Khet-Ra: Night-phase sarcophagus hordes and Eclipse Form Sun Beams
- [ ] **US-8.3.4** As a player, I can fight Warchief Grashka.
  - [ ] Grashka: `rage_charge` (meter, charge path, tower trample)
  - [ ] Grashka: interrupt rule (stun/root breaks charge, 4 s stagger) and Battle Horn adds
- [ ] **US-8.3.5** As a player, I can fight Pyrrax.
  - [ ] Pyrrax: aerial phase and landing phase with wing weak points
  - [ ] Pyrrax: Lava Flood lane hazard (tower disable, speed buff)

---

## EP-9 Rendering, Input and Audio

### FT-9.4 Environment rendering — `P1`

- [ ] **US-9.4.1** As a player, weather and hazards are legible.
  - [ ] Weather overlay renderer (rain, sandstorm, heat haze, ashfall) with quality tiers
  - [ ] Hazard telegraph variants (vent, eruption, falling rock, quicksand)
  - [ ] Path Switch and lane-state visuals
  - [ ] Elevated-pad and terrain-tag visuals
  - [ ] Objective entity visuals (pods, nodes, rootwalls)

---

## EP-10 UI, Game Flow and Accessibility

### FT-10.4 Citadel hub UI — `P0`

- [ ] **US-10.4.1** As a player, I can navigate the Citadel.
  - [ ] Citadel scene shell with building hotspots and Keeper dialogue panel
  - [ ] Building detail panel (level, upgrade cost, unlocks, construction cycles)
  - [ ] Construction progress and completion banners

### FT-10.5 Progression UIs — `P0`

- [ ] **US-10.5.1** As a player, I can manage progression screens.
  - [ ] Research UI (tracks, queue, prerequisites, preview)
  - [ ] Nexus skill tree UI (nodes, points, respec)
  - [ ] Hero Hall UI (roster, level, tree, gear)
  - [ ] Forge UI (craft, upgrade, equip)
  - [ ] Relic Vault UI (collection, slots, levels)
  - [ ] Tower unlock/Armory shop UI

### FT-10.6 Codex, Practice and Endless UI — `P1`

- [ ] **US-10.6.1** As a player, I can learn and practice.
  - [ ] Codex UI with progressive reveal levels
  - [ ] Practice mode (Armory) UI: pick any unlocked tower/evolution on a practice map
  - [ ] Endless entry and results UI

### FT-10.7 Rebinding and difficulty UI — `P1`

- [ ] **US-10.7.1** As a player, I can customize controls and difficulty.
  - [ ] Key rebinding UI with conflict detection
  - [ ] Difficulty selector with star sets per tier
  - [ ] Assist options panel with leaderboard-eligibility notice

---

## EP-11 Meta Progression

### FT-11.3 Account levels — `P0`

- [ ] **US-11.3.1** As a player, I earn account levels 1–30.
  - [ ] `xpToNext` baked curve and `AccountProgress` aggregate
  - [ ] Level rewards (Nexus Points, milestone unlocks)
  - [ ] XP sources: battle completion, stars, first-clears

### FT-11.4 Nexus skill tree — `P0`

- [ ] **US-11.4.1** As a player, I can spend Nexus Points in the Bastion tree.
  - [ ] Tree schema, validator and `AllocateNexusPoint`/`RespecNexusTree` use cases
  - [ ] Bastion nodes batch 1–4 (10 nodes each, 5 tiers, capstone Unbreakable Nexus)
  - [ ] Convert allocation to `ModifierSpec` with `skilltree` bucket cap

### FT-11.5 Research v1 — `P0`

- [ ] **US-11.5.1** As a player, I can research with Battle Cycles.
  - [ ] `ResearchBook` aggregate, queue slots and `ResearchScheduler` (cycle advance per battle)
  - [ ] `QueueResearch`/`CancelResearch` use cases and cost spending
  - [ ] Evolution unlock nodes (all 32 Alpha evolutions) and tower unlock gating
  - [ ] Research effect application (ModifierSpecs and unlocks)
- [ ] **US-11.5.2** As a designer, research content exists.
  - [ ] Ballistics & Engineering nodes (20)
  - [ ] Elemental Sciences nodes (20)
  - [ ] Doctrine choice stub (exclusive nodes data, UI deferred to Beta)

### FT-11.6 Relics v1 — `P1`

- [ ] **US-11.6.1** As a player, I can collect and equip relics.
  - [ ] `RelicVault` aggregate (instances, levels, slots)
  - [ ] Relic runtime: register listeners/interceptors from definitions at battle start
  - [ ] Drop tables, `BattleResult.drops` seed, bad-luck protection counters
  - [ ] Duplicate leveling (Lv 1–5)
  - [ ] `EquipRelic` use case and loadout integration
- [ ] **US-11.6.2** As a designer, 30 relics exist.
  - [ ] Relics batch 1–6 (5 each: Common ×15, Uncommon ×10, Rare ×5), including boss relics from Myra, Gnarl, Anuket-Zar, Khet-Ra, Grashka, Pyrrax

### FT-11.7 Gear crafting — `P1`

- [ ] **US-11.7.1** As a player, I can craft and upgrade hero gear.
  - [ ] Seeded gear generation stored in save
  - [ ] Forge crafting recipes and upgrade costs (Common–Rare)
  - [ ] Gear salvage and duplicate handling rules

### FT-11.8 Mastery and Codex counters — `P2`

- [ ] **US-11.8.1** As a player, usage is tracked.
  - [ ] Tower mastery counters and levels 1–5 with capped perks
  - [ ] Codex counters (sighted/killed) and reveal thresholds
  - [ ] Map mastery (stars × difficulty) aggregation

---

## EP-12 Nexus Citadel

### FT-12.1 Citadel foundation and three buildings — `P0`

- [ ] **US-12.1.1** As a player, buildings level over Battle Cycles.
  - [ ] `Citadel` aggregate, `UpgradeBuilding` use case and cost curve (`16 × level^1.6`)
  - [ ] Construction cycle processing on `FinishBattle`
  - [ ] Nexus Core aggregate (attunement choice)
- [ ] **US-12.1.2** As a player, the Research Lab, Hero Hall and Forge unlock features through level 10.
  - [ ] Research Lab levels 1–10 effects (queue slots, tracks)
  - [ ] Hero Hall levels 1–10 effects (level cap, free respec, 2nd slot at 10 data hook)
  - [ ] Forge levels 1–10 effects (rarity tiers, Sigil forging)
  - [ ] Keeper dialogue data for Wick, Dame Orla, Garrick

---

## EP-13 Map Systems: Events, Hazards, Weather, Branching

### FT-13.1 Dynamic events (6) — `P1`

- [ ] **US-13.1.1** As a player, battles feature dynamic events.
  - [ ] Event director runtime (schedule, triggers, rewards)
  - [ ] Event: Ambush Portal
  - [ ] Event: Meteor Shower (telegraphed zones)
  - [ ] Event: Caravan Escort (friendly entity objective)
  - [ ] Event: Supply Drop (hero-claimed buff)
  - [ ] Event: Corrupted Shrine (channel to cleanse)
  - [ ] Event: Mana Surge

### FT-13.2 Biome hazards and weather — `P1`

- [ ] **US-13.2.1** As a player, biomes have distinct hazards.
  - [ ] Hazard runtime (telegraph → trigger → effect; affects both sides)
  - [ ] Forest: spore clouds, wildfire spread, thorn growth
  - [ ] Desert: quicksand, sun glare, scarab burrows
  - [ ] Volcano: lava vents, eruptions, falling rocks
  - [ ] Weather: Sandstorm, Heat Wave, Ashfall (modifiers and forecast data)

---

## EP-14 Save and Persistence

### FT-14.2 Save v2 (meta sections) — `P0`

- [ ] **US-14.2.1** As a player, all progression persists.
  - [ ] Payload sections: account, wallet, unlocks, campaign, citadel, research, heroes, gear, relics, mastery, codex
  - [ ] Migration v1→v2 with fixtures
  - [ ] Post-migration integrity repair pass (wallet, points, slots, orphan IDs)
- [ ] **US-14.2.2** As a maintainer, migrations are tested every build.
  - [ ] CI job migrating every historical fixture to current
  - [ ] Per-build fixture capture tool for alpha saves
- [ ] **US-14.2.3** As a player, I can back up my save.
  - [ ] Export/import with strict validation, size and depth limits
  - [ ] Imported-profile marker and leaderboard exclusion flag
  - [ ] Multi-slot support (3 slots) and slot switching UI

---

## EP-15 Endgame Modes, Competition and Services

### FT-15.1 Replay verifier prototype — `P1`

- [ ] **US-15.1.1** As the team, we can verify a replay headlessly.
  - [ ] Pinned content/balance bundle archive layout
  - [ ] Verifier CLI: load by header versions, re-simulate, compare checkpoints and result
  - [ ] Replay file format v1 (header, setup, delta-encoded commands, checkpoints) and compression
  - [ ] ReplayStore adapter with LRU cap

### FT-15.2 Basic Endless — `P2`

- [ ] **US-15.2.1** As a veteran player, I can play Endless on cleared maps.
  - [ ] Endless scaling tables (waves 41–400), bounty decay, elite frequency
  - [ ] Calamity waves every 10 waves and Interlude boons every 25
  - [ ] Score formula and local personal bests

---

## EP-16 Balance Tooling, Telemetry and QA

### FT-16.2 Balance bot — `P0`

- [ ] **US-16.2.1** As a designer, I can run battles headlessly with bots.
  - [ ] Headless runner (Node worker threads, pinned bundle, max speed)
  - [ ] Bot policy interface and world-view adapter
  - [ ] Placement evaluator (path coverage within range, chokepoint value, Large pads)
  - [ ] Upgrade planner (focus vs spread)
  - [ ] Hero and spell policy (stance at chokepoints, cast on rules)
  - [ ] Archetype: Balanced
  - [ ] Archetype: MonoElement
  - [ ] Experiment matrix config and sharding scheduler
  - [ ] Metric collector via events and JSON/Markdown reporter
  - [ ] Gate evaluator (winnability, tower share, trivialization) and CI nightly job

### FT-16.3 Analyzers — `P1`

- [ ] **US-16.3.1** As a designer, I get automated balance insight.
  - [ ] Power analyzer (DPS/Gold per tier vs reference)
  - [ ] Counter analyzer (enemy × tower effective-DPS matrix, ≥ 3 answers)
  - [ ] Wave analyzer (effective HP spike ratio, mechanics per wave)
  - [ ] Diversity analyzer v0 (tower/evolution share among winners)

### FT-16.4 Telemetry (opt-in) — `P1`

- [ ] **US-16.4.1** As the team, we learn from alpha players with consent.
  - [ ] Consent flow and settings toggle (default off)
  - [ ] Battle-summary event schema and client emitter
  - [ ] Progression event schema (unlock times, currency milestones)
  - [ ] Ingestion endpoint stub and local export for the alpha cohort

---

## EP-17 Platform, Monetization and Release

### FT-17.2 Closed alpha operations — `P1`

- [ ] **US-17.2.1** As the team, we can run a closed alpha.
  - [ ] Access gating (invite keys) and build channel selection
  - [ ] Opt-in crash/error reporting with source maps and replay attachment
  - [ ] In-game feedback form with replay export
  - [ ] Alpha onboarding documentation

---

## EP-18 Art, Audio and Narrative Integration

### FT-18.1 Art and audio pipeline — `P0`

- [ ] **US-18.1.1** As an artist, my assets reach the game predictably.
  - [ ] Atlas packer CLI with per-biome/act bundles and manifest hashing
  - [ ] KTX2/Basis texture compression pass with PNG/WebP fallback
  - [ ] Faction tint-LUT shader for palette swaps
  - [ ] Asset budget reporter (texture memory per bundle)
  - [ ] Audio bundle packaging and loudness normalization check

### FT-18.2 Act I final art and audio — `P1`

- [ ] **US-18.2.1** As a player, Act I looks and sounds final.
  - [ ] Integrate Verdant enemy sprite sets and view definitions
  - [ ] Integrate forest tilesets, props and pads for Maps 1–5
  - [ ] Integrate tower modules for the 8 starter towers and their evolutions
  - [ ] Integrate Aelara and Thorn animation sets
  - [ ] Integrate Act I music motif layers and core SFX
  - [ ] Integrate Act I intro comic panels (6-panel viewer)

### FT-18.3 Acts II–III "art-plus" — `P2`

- [ ] **US-18.3.1** As a player, Acts II and III are presentable.
  - [ ] Integrate Ashen and Ember enemy sprite sets and view definitions
  - [ ] Integrate desert and volcano tilesets for Maps 6–15
  - [ ] Integrate Act II and III boss visuals and telegraph variants

---

## Alpha Exit Checklist (from GDD §19.3)

- [ ] **Retention:** ≥ 50 testers; ≥ 40% reach Act III; median first session 35–50 min
- [ ] **Balance:** bot verifies every map winnable by ≥ 5 loadouts; no tower in > 40% of winning loadouts
- [ ] **Economy:** median time to first post-starter tower unlock ≈ 60–90 min
- [ ] **Quality:** no Sev-1 bugs; crash-free sessions ≥ 99%
- [ ] **Design:** all 6 bosses beaten with ≥ 3 distinct strategies in playtests
- [ ] **Tech:** save migration from every previous Alpha build passes; replays valid across 3 browsers
