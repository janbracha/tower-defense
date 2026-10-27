# Beta Backlog

**Goal:** prove scale, endgame and polish with a public audience (GDD §20): browser + Steam Playtest.
**Scope:** Acts I–VII (35 maps) · 24 towers + 48 evolutions · 11 heroes · 70 enemies · 14 bosses · all six Citadel buildings to level 20 · account 1–70 · 4 skill trees · research 110 nodes with doctrines · 80 relics · 10 Nexus Spells · Rift mode · Endless/Weekly/Boss Rush prototype · Mythic 1–5 · prestige Cycles 1–3 · services (leaderboards, replay verification, weekly seeds, cloud saves) · localization EN + 3 · Steam Playtest.
**Prerequisite:** Alpha exit checklist complete.

---

## EP-2 Simulation Core

### FT-2.6 Keyframes, rewind and resume — `P0`

- [ ] **US-2.6.1** As an engineer, I can serialize and restore the whole world.
  - [ ] Component serializers (dense, sparse, tags) with versioned layout
  - [ ] Object-component and behavior-state serializers
  - [ ] RNG, timers, directors, economy and event-sequence serialization
  - [ ] Keyframe save/restore round-trip test (hash equality after restore + N ticks)
- [ ] **US-2.6.2** As a player, Orrin's Second Chance can rewind 15 seconds.
  - [ ] Keyframe ring buffer (every 30 ticks, 16 slots, ≤ 8 MB budget)
  - [ ] `RestoreKeyframe` primitive with deterministic RNG re-salt
  - [ ] Replay verification test covering a rewind

---

## EP-3 Combat and Effect Engine

### FT-3.7 Beta primitives and behaviors — `P0`

- [ ] **US-3.7.1** As a designer, Beta mechanics are expressible.
  - [ ] Primitive: `ConvertDamage`
  - [ ] Primitive: `Echo` (record and delayed replay of effects)
  - [ ] Primitive: `Link` (linked-tower relations with break handling)
  - [ ] Primitive: `Reveal`
  - [ ] Interceptors: `LeakRequested`, `StatusRequested`, `PlacementRequested` coverage tests
  - [ ] Meta modifier buckets (research, mastery, relic, gear) cap enforcement tests

---

## EP-4 Content Pipeline and Balance Data

### FT-4.5 Balance Console and bundle governance — `P1`

- [ ] **US-4.5.1** As a designer, I can tune with instant feedback.
  - [ ] Balance Console: table editor with range validation
  - [ ] Live sandbox (spawn enemy and tower, damage trace of the pipeline steps)
  - [ ] DPS/Gold charts with reference band overlay
  - [ ] Counter-matrix heatmap and wave-curve plotter
  - [ ] Bundle diff view with affected-content list
- [ ] **US-4.5.2** As the team, balance bundles are immutable and archived.
  - [ ] `balance-cli gate` with annotated diffs vs previous bundle
  - [ ] Publish pipeline: immutable bundle on CDN + verifier archive
  - [ ] `rulesEpoch` field and leaderboard bucketing rules
  - [ ] Knob registry (key, unit, range, safeStep, owner, risk) and validation

---

## EP-5 Towers

### FT-5.8 Beta base towers (8) — `P0`

- [ ] **US-5.8.1** As a player, I unlock Act III–VII towers.
  - [ ] Tower: Thunder Drum (pulse stun; surfaces burrowed units at III)
  - [ ] Tower: Mortar Emplacement (Large pad; armor shred at III)
  - [ ] Tower: Sanctuary Shrine (aura heal, Integrity regen, periodic Cleanse)
  - [ ] Tower: Permafrost Totem (slow + DoT aura)
  - [ ] Tower: Hailstorm Battery (Large pad; 5-hail volley)
  - [ ] Tower: Crystal Cannon (Large pad; armor pierce 40%)
  - [ ] Tower: Resonance Pylon (sonic bonus vs Crystalline/Mechanical)
  - [ ] Tower: Anchor Pillar (anti-blink/phase aura, evasion strip)

### FT-5.9 Beta evolutions (16) — `P1`

- [ ] **US-5.9.1** As a player, I can evolve Act III–IV towers.
  - [ ] Evolutions: Earthshaker Gong, Stormcaller Choir
  - [ ] Evolution: Siege Howitzer (`manual_aim` behavior); Evolution: Cluster Pit
  - [ ] Evolution: Aegis Sanctum (`aegis_barrier`); Evolution: Resurrection Altar (`rebuild_once`)
- [ ] **US-5.9.2** As a player, I can evolve Act V–VII towers.
  - [ ] Evolutions: Whiteout Monolith, Cryo Anchor
  - [ ] Evolutions: Avalanche Cannon (Large pad), Frostbite Gatling
  - [ ] Evolution: Prism Destroyer (Large pad); Evolution: Nexus Artillery (`manual_aim`)
  - [ ] Evolutions: Harmonic Shatterer, Echo Spire (`echo_replay`)
  - [ ] Evolution: Reality Stake; Evolution: Planar Lock (`planar_lock_bubble`)

---

## EP-6 Enemies, Waves, Navigation and Handcrafted Maps

### FT-6.9 Iron Collective enemies (10) — `P0`

- [ ] **US-6.9.1** As a player, I face Iron infantry and drones.
  - [ ] Enemy: Rivet Trooper (Formation armor)
  - [ ] Enemy: Clockwork Sapper (Sabotage disable)
  - [ ] Enemy: Repair Drone (flying healer)
  - [ ] Enemy: Gearwright Engineer (Scrap Barricade)
  - [ ] Enemy: Dynamo Hound (Storm immunity, shock aura)
  - [ ] Enemy: Gyrocopter Bomber (flying bomb drops)
- [ ] **US-6.9.2** As a player, I face Iron heavies.
  - [ ] Enemy: Steam Walker (Steam Vent shield, Frost reduction)
  - [ ] Enemy: Siege Crawler (long-range Bombard with telegraph)
  - [ ] Enemy: Plated Juggernaut (armor 50, knockback immune)
  - [ ] Enemy: Aegis Pylon Walker (barrier dome)

### FT-6.10 Frostbound Reach enemies (10) — `P0`

- [ ] **US-6.10.1** As a player, I face Frostbound infantry.
  - [ ] Enemy: Frostbite Raider (Chill Touch)
  - [ ] Enemy: Shieldmaiden (Frontal Block vs single-target projectiles)
  - [ ] Enemy: Snow Wolf (Pack Hunter)
  - [ ] Enemy: Hailcaster Archer (ranged, chills hero)
  - [ ] Enemy: Rimecaster (Flash Freeze on towers)
- [ ] **US-6.10.2** As a player, I face Frostbound heavies and spirits.
  - [ ] Enemy: Glacial Behemoth (Ice Armor melted by Burn)
  - [ ] Enemy: Yeti Berserker (Rampage)
  - [ ] Enemy: Tundra Mammoth (Trample)
  - [ ] Enemy: Blizzard Harpy (flying; range-debuff screech)
  - [ ] Enemy: Whiteout Wraith (Fog Cloak stealth)

### FT-6.11 Crystalline Choir enemies (10) — `P0`

- [ ] **US-6.11.1** As a player, I face Crystalline soldiers.
  - [ ] Enemy: Shard Sprite (flying; Refraction deflect)
  - [ ] Enemy: Prism Knight (Mirror Plating reflect)
  - [ ] Enemy: Geode Crawler (Shell Curl)
  - [ ] Enemy: Gem Thief (Pilfer steals Gold)
  - [ ] Enemy: Crystal Wyrmlet (flying Shard Breath)
- [ ] **US-6.11.2** As a player, I face Crystalline singers and echoes.
  - [ ] Enemy: Resonant Cantor (Chord Aura stacking)
  - [ ] Enemy: Harmonic Siren (Shatter Note silence)
  - [ ] Enemy: Mirror Dancer (Mirror Step decoy)
  - [ ] Enemy: Quartz Colossus (Geode Heart split on death)
  - [ ] Enemy: Fractal Echo (Split at 50% HP)

### FT-6.12 Arcane Dominion enemies (10) — `P0`

- [ ] **US-6.12.1** As a player, I face Dominion soldiers and constructs.
  - [ ] Enemy: Apprentice Spellblade (Cantrip Ward)
  - [ ] Enemy: Arcane Construct (explodes on death)
  - [ ] Enemy: Rune Golem (`rune_plating` rotating immunity)
  - [ ] Enemy: Battlemage Phalanx (`phalanx_formation`)
- [ ] **US-6.12.2** As a player, I face Dominion casters.
  - [ ] Enemy: Spell Thief (Mana siphon)
  - [ ] Enemy: Warded Magister (Ward Bubble)
  - [ ] Enemy: Blink Mage (Blink ignoring blockers)
  - [ ] Enemy: Aether Familiar (damage sharing bond)
  - [ ] Enemy: Tome Wraith (Page Storm silence zone)
  - [ ] Enemy: Dominion Inquisitor (Dispel of tower buffs)

### FT-6.13 Handcrafted maps 16–35 — `P0`

- [ ] **US-6.13.1** As a player, I can play Act IV (Iron).
  - [ ] Map 16 Brass Gate Outpost (mine carts)
  - [ ] Map 17 Foundry Row (conveyor lanes)
  - [ ] Map 18 The Assembly Line (conveyor spawns; boss map)
  - [ ] Map 19 Steamworks Junction (steam vents, rail switches)
  - [ ] Map 20 Leviathan Rails (looped moving train; boss map)
- [ ] **US-6.13.2** As a player, I can play Act V (Frostbound).
  - [ ] Map 21 Rimefrost Fjord (slippery ice lanes)
  - [ ] Map 22 Howling Pass (blizzard)
  - [ ] Map 23 Skadi's Hall (duel arena; boss map)
  - [ ] Map 24 Glacier Labyrinth (4 lanes, shatterable walls)
  - [ ] Map 25 Wintermaw's Lake (thin ice; boss map)
- [ ] **US-6.13.3** As a player, I can play Act VI (Crystalline).
  - [ ] Map 26 Shardfields (lens pads)
  - [ ] Map 27 Resonant Canyons (echo stun events)
  - [ ] Map 28 Cantor's Spire (chord puzzle; boss map)
  - [ ] Map 29 Prism Maze (mirrors redirect paths)
  - [ ] Map 30 The Grand Prism (spectrum phases; boss map)
- [ ] **US-6.13.4** As a player, I can play Act VII (Dominion).
  - [ ] Map 31 Broken Academy (Mana surges)
  - [ ] Map 32 Leyline Terraces (leyline nodes)
  - [ ] Map 33 Archmagus Vault (warded rooms; boss map)
  - [ ] Map 34 Obsidian Library (shifting shelves reroute)
  - [ ] Map 35 Archon's Sanctum (Counterspell Circle; boss map)
- [ ] **US-6.13.5** As a player, Heroic difficulty is available.
  - [ ] Heroic profile live; star sets and rewards per tier
  - [ ] Balance-bot tuning pass for Maps 1–35 on Normal/Veteran/Heroic

---

## EP-7 Heroes and Nexus Spells

### FT-7.7 Beta heroes (6) — `P0`

- [ ] **US-7.7.1** As a player, I can play Kyra Emberhand.
  - [ ] Kyra: definition, Q Cinder Cleave, W Molten Leap, E War Cry
  - [ ] Kyra: passives Burning Blood, Cauterize (once-per-battle lethal save); Ultimate Wildfire Avatar
  - [ ] Kyra: progression tree data
- [ ] **US-7.7.2** As a player, I can play Brannoc Ironvein.
  - [ ] Brannoc: definition, Q Deploy Sentry (capped turrets), W Overclock, E Demolition Charge
  - [ ] Brannoc: passives Field Repair, Efficient Design; Ultimate Mk-X Titan Frame
  - [ ] Brannoc: progression tree data
- [ ] **US-7.7.3** As a player, I can play Isolde Winterwake.
  - [ ] Isolde: definition, Q Frost Nova, E Glacial Prison
  - [ ] Isolde: W Ice Wall (path blocker entity with nav recompute)
  - [ ] Isolde: passives Cold Heart, Chill Mastery; Ultimate Absolute Zero
  - [ ] Isolde: progression tree data
- [ ] **US-7.7.4** As a player, I can play Lyric Prismvale.
  - [ ] Lyric: definition, Q Resonant Chord, W Dissonance, E Crystal Cascade
  - [ ] Lyric: passives Perfect Pitch, Harmony; Ultimate Symphony of Spheres
  - [ ] Lyric: progression tree data
- [ ] **US-7.7.5** As a player, I can play Orrin Quill.
  - [ ] Orrin: definition, Q Rewind (tower state restore), W Temporal Snare, E Hastening
  - [ ] Orrin: passives Borrowed Time, Foresight (wave preview extension)
  - [ ] Orrin: Ultimate Second Chance wired to `RestoreKeyframe`
  - [ ] Orrin: progression tree data
- [ ] **US-7.7.6** As a player, I can play Zephyra Skyborne.
  - [ ] Zephyra: definition, Q Lightning Dive, W Updraft, E Static Field
  - [ ] Zephyra: passives Windborne, Stormheart; Ultimate Tempest Sovereign
  - [ ] Zephyra: progression tree data and Citadel quest unlock (Beta pull-forward)

### FT-7.8 Gear and mastery expansion — `P1`

- [ ] **US-7.8.1** As a player, gear and hero mastery deepen.
  - [ ] Gear rarities Epic and Legendary with affix pools
  - [ ] Heroic Mastery 1–5 (Soul Essence sinks, cosmetics, capped sidegrades)
  - [ ] Heroic Trials (hero challenge battles) framework
  - [ ] Soul Essence acquisition rules from elites/bosses/Shadow effects

### FT-7.9 Nexus Spells 7–10 — `P1`

- [ ] **US-7.9.1** As a player, I have ten Nexus Spells.
  - [ ] Spell: Cleansing Light
  - [ ] Spell: Gravity Snare
  - [ ] Spell: Greed's Bargain
  - [ ] Spell: Chain Storm
  - [ ] Nexus Core Rebirth Surge variant and attunement unlock

---

## EP-8 Bosses

### FT-8.4 Beta bosses (8) — `P0`

- [ ] **US-8.4.1** As a player, I can fight Foreman Mk-7.
  - [ ] Foreman: conveyor objectives spawning Rivet Troopers
  - [ ] Foreman: `tower_hijack` (temporary tower team swap, cleansable)
  - [ ] Foreman: Overtime phase
- [ ] **US-8.4.2** As a player, I can fight Leviathan Mk-IX.
  - [ ] Leviathan: `train_cars` multi-entity boss framework
  - [ ] Leviathan: car modules (Shield, Artillery, Repair, Drone, Boiler)
  - [ ] Leviathan: head vulnerability after 3 cars; civilian-car choice outcome
- [ ] **US-8.4.3** As a player, I can fight Jarl Skadi.
  - [ ] Skadi: `arena_lock` duel with hero (spectral duelist fallback)
  - [ ] Skadi: Ice Floor lane modifier and Frostbrand tower freeze
- [ ] **US-8.4.4** As a player, I can fight Wintermaw.
  - [ ] Wintermaw: `thin_ice` tile destruction with pad/tower refund on loss
  - [ ] Wintermaw: breach attack and Blizzard escalation
- [ ] **US-8.4.5** As a player, I can fight Cantor Prime.
  - [ ] Cantor: `chord_crystals` ordered-objective stun mechanic
  - [ ] Cantor: Dissonance silence pulse
- [ ] **US-8.4.6** As a player, I can fight the Grand Prism.
  - [ ] Prism: `spectrum_phase` damage-group vulnerability table
  - [ ] Prism: reflection beam hazards with 3 s lane telegraphs
- [ ] **US-8.4.7** As a player, I can fight Archmagus Veyron.
  - [ ] Veyron: `spell_mirror` (copy strongest tower attack onto it)
  - [ ] Veyron: Counter-Spell Arcane immunity window and Mark of Study
- [ ] **US-8.4.8** As a player, I can fight High Archon Thaumos.
  - [ ] Thaumos: `counterspell_circle` hero-occupancy objective and Arcane Lockdown
  - [ ] Thaumos: Rune Golem summons and Final Equation puzzle

---

## EP-9 Rendering, Input and Audio

### FT-9.5 Beta rendering features — `P1`

- [ ] **US-9.5.1** As a player, new map mechanics are readable.
  - [ ] Lens pad and beam extension visuals
  - [ ] Reflection beam and mirror rendering
  - [ ] Thin-ice tile cracking visuals
  - [ ] Multi-car train rendering and conveyor animations
  - [ ] Blizzard, aurora, resonance and fog weather overlays

### FT-9.6 Performance optimization — `P0`

- [ ] **US-9.6.1** As a player on modest hardware, the game runs at 60 FPS.
  - [ ] Swarm LOD (simplified animation, no shadows above threshold)
  - [ ] GPU instancing for swarms and projectiles where supported
  - [ ] Particle budget profiler per recipe
  - [ ] Memory budget tracking and bundle unload on act change
  - [ ] Mobile-profile benchmark scene (informational, 30 FPS)

---

## EP-10 UI, Game Flow and Accessibility

### FT-10.8 Rift and endgame UI — `P0`

- [ ] **US-10.8.1** As a player, I can run a Rift.
  - [ ] Rift hub and node-map UI
  - [ ] Boon draft, shop, shrine and rest screens
  - [ ] Rift run summary and rewards
- [ ] **US-10.8.2** As a competitive player, I can see leaderboards.
  - [ ] Leaderboard UI (global, friends, per hero) with replay watch button
  - [ ] Weekly Trial screen (modifiers, tiers, personal result)
  - [ ] Boss Rush screen and Mythic selector

### FT-10.9 Progression UI expansion — `P1`

- [ ] **US-10.9.1** As a player, I can use the new progression systems.
  - [ ] Doctrine selection UI and respec
  - [ ] Four skill-tree views (Bastion, Arcanum, Tactician, Warbringer)
  - [ ] Prestige/Ascension UI (Hall of Echoes: Cycles, Echo Boons)
  - [ ] Observatory UI (weather forecast, hazard preview, wave preview)
  - [ ] Arcane Academy UI (spell management)

### FT-10.10 Tutorial and UX polish — `P0`

- [ ] **US-10.10.1** As a new player, onboarding is smooth.
  - [ ] Tutorial rework from alpha feedback (contextual tips, skippable)
  - [ ] Information density pass (tooltips, keyword glossary)
  - [ ] Results screen: damage breakdown by tower/hero, star objectives
  - [ ] Feedback and bug-report entry from pause menu
  - [ ] Game-feel pass: UI sounds, button states, transitions

### FT-10.11 Localization and accessibility audit — `P0`

- [ ] **US-10.11.1** As a non-English player, I can play in my language.
  - [ ] Language picker and runtime i18n loading
  - [ ] Pseudo-locale test and text-overflow layout fixes
  - [ ] Font coverage and fallback plan for CJK/Cyrillic
- [ ] **US-10.11.2** As a player with accessibility needs, the game is usable.
  - [ ] Automated colour-blind palette checks in CI
  - [ ] Screen-reader labels for menus and key HUD elements
  - [ ] Reduced-motion mode and subtitle/caption settings for dialogue
  - [ ] Accessibility audit and fix list

---

## EP-11 Meta Progression

### FT-11.9 Account 31–70 and skill trees — `P0`

- [ ] **US-11.9.1** As a player, I progress to level 70 with four trees.
  - [ ] Extend XP curve and level rewards to 70
  - [ ] Arcanum tree data and nodes (40, capstone Archmage's Wellspring)
  - [ ] Tactician tree data and nodes (40, capstone Perfect Plan)
  - [ ] Warbringer tree data and nodes (40, capstone Nexus Dominion)
  - [ ] Cross-tree point budgeting (120 points) and respec tests

### FT-11.10 Research expansion and doctrines — `P0`

- [ ] **US-11.10.1** As a player, research expands to 110 nodes.
  - [ ] Arcane Theory track (24 nodes)
  - [ ] Hero Training track (20 nodes)
  - [ ] Metallurgy & Enchanting track (20 nodes)
  - [ ] Archaeology track (20 nodes, partial) and Foresight track (partial)
  - [ ] Doctrines: exclusive choice nodes at 12/24 with respec fee
  - [ ] Research queue slots 2 and 3 (Lab levels 8 and 16)

### FT-11.11 Relics to 80 — `P1`

- [ ] **US-11.11.1** As a player, I find 50 more relics.
  - [ ] Relics batch 7–16 (5 each), including boss relics for Acts IV–VII
  - [ ] Relic Fusion use case and UI hook
  - [ ] Relic slot unlocks (4th at Vault 10, 5th at Vault 20)

### FT-11.12 Mastery expansion — `P2`

- [ ] **US-11.12.1** As a player, mastery deepens.
  - [ ] Tower mastery 6–10 with perks and challenge maps at 10
  - [ ] Codex levels 3–4 with lore and cosmetic rewards
  - [ ] Titles and Account Mastery tracking

### FT-11.13 Prestige draft (Cycles 1–3) — `P1`

- [ ] **US-11.13.1** As an endgame player, I can Ascend.
  - [ ] `AscensionService` (reset rules, Echo Points, preserved data)
  - [ ] Cycle modifiers 1–3 as `BattleSetup` rule overlays
  - [ ] Echo Boons (sidegrades, max 8 active) data and application
  - [ ] Save migration for prestige section

---

## EP-12 Nexus Citadel

### FT-12.2 All buildings to level 20 — `P0`

- [ ] **US-12.2.1** As a player, I can upgrade all six buildings.
  - [ ] Relic Vault levels 1–20 effects
  - [ ] Observatory levels 1–20 effects
  - [ ] Arcane Academy levels 1–20 effects
  - [ ] Research Lab, Hero Hall, Forge levels 11–20 effects
  - [ ] Keeper dialogue data for The Cartulary, Ysolde, Magister Pell

### FT-12.3 Later structures — `P1`

- [ ] **US-12.3.1** As a player, I unlock additional Citadel structures.
  - [ ] Armory (free test of unlocked towers/evolutions) integration with Practice mode
  - [ ] Wayroad Gate (Rift access, Act V unlock)
  - [ ] Hall of Echoes (Cycles/Echo Boons) with Ascension unlock
  - [ ] Keeper quests framework with decor/relic rewards

---

## EP-13 Map Systems: Events, Hazards, Weather, Branching, Rift

### FT-13.3 Rift generator — `P0`

- [ ] **US-13.3.1** As a player, Rift stages are generated fairly and deterministically.
  - [ ] Layout template library (spiral, hourglass, delta, ring, braid)
  - [ ] Lane generation with branching and length rules
  - [ ] Pad placement (density 0.18–0.30; Large pads at junctions)
  - [ ] Hazard/event selection and wave script composition from faction pool
  - [ ] Bot-validation loop (≥ 3 of 5 loadouts clear; reject trivial maps)
  - [ ] Seed → map reproducibility tests
- [ ] **US-13.3.2** As a player, Rift runs have structure.
  - [ ] `RiftRun` aggregate and node graph (Battle, Elite, Shop, Shrine, Rest, Mystery)
  - [ ] Boon definitions (≥ 20) and draft logic
  - [ ] Carry-over rules (towers, hero state, 25% Energy)
  - [ ] Rift rewards and save integration

### FT-13.4 Events, hazards and weather for Acts IV–VII — `P1`

- [ ] **US-13.4.1** As a player, Acts IV–VII have unique hazards.
  - [ ] Badlands hazards: mine carts, steam vents, conveyor belts
  - [ ] Tundra hazards: thin ice, avalanche, whiteout
  - [ ] Crystal hazards: beam refractions, resonance pulses, shard storms
  - [ ] Ruins hazards: warding runes, collapsing shelves
  - [ ] Event: Rift Tear (spawn relocation) and Reinforcement Call
  - [ ] Weather: Blizzard, Aurora, Crystal Resonance

---

## EP-14 Save and Persistence

### FT-14.3 Battle suspend and resume — `P1`

- [ ] **US-14.3.1** As a player, I can leave a battle and return.
  - [ ] Suspend record (setup, seed, command log, tick, keyframe)
  - [ ] Autosave triggers (tab hidden > 5 s, exit, every 60 s)
  - [ ] Resume via keyframe + log replay; sim-version mismatch handling
  - [ ] Size budget test (≤ 300 KB)

### FT-14.4 Cloud sync — `P1`

- [ ] **US-14.4.1** As a player, my profile syncs across devices.
  - [ ] `CloudSync` port and HTTP adapter
  - [ ] Revision-based conflict detection
  - [ ] Section merge rules (union/max for unlocks, LWW for the rest)
  - [ ] Conflict resolution UI
  - [ ] Sync state machine tests

---

## EP-15 Endgame Modes, Competition and Services

### FT-15.3 Services backend — `P0`

- [ ] **US-15.3.1** As the team, we host leaderboards and verification.
  - [ ] Spike: backend stack selection (serverless + managed DB); write ADR
  - [ ] Replay submission API with rate limiting and size limits
  - [ ] Server-side headless verification worker using the archived bundles
  - [ ] Leaderboard storage and query endpoints (global, friends, per hero)
  - [ ] Weekly seed publication endpoint (static JSON acceptable)
  - [ ] Cloud-save endpoints with auth
  - [ ] Optional account auth (OAuth/OpenID) with CSRF-safe sessions

### FT-15.4 Endless with leaderboards — `P1`

- [ ] **US-15.4.1** As a veteran, I can compete in Endless.
  - [ ] Leaderboard integration and replay submission flow
  - [ ] Milestone rewards (waves 50/75/100) and Mythic materials
  - [ ] `rulesEpoch` display and bucketing

### FT-15.5 Weekly Challenges — `P1`

- [ ] **US-15.5.1** As a player, I can play the weekly Trial.
  - [ ] Weekly definition schema (map, script, restrictions, modifiers, pinned `balanceVersion`)
  - [ ] Pinned-bundle loader with cache
  - [ ] Three tiers (Standard, Hard, Mythic) and reward cache
  - [ ] Share-code export/import for seeds
  - [ ] First four weekly seeds authored

### FT-15.6 Boss Rush prototype — `P2`

- [ ] **US-15.6.1** As a player, I can attempt a Boss Rush of available bosses.
  - [ ] Boss Rush mode profile (HP ×0.6, rush addon)
  - [ ] Between-boss boon draft and Gold spending
  - [ ] Time/leak leaderboard categories

### FT-15.7 Mythic 1–5 — `P1`

- [ ] **US-15.7.1** As a veteran, Mythic difficulty exists.
  - [ ] Mythic profile parameters and level scaling (1–5)
  - [ ] Affix engine and affixes: Fortified, Regenerating, Swift, Hexed, Thorned
  - [ ] Boss add-on abilities for Mythic ≥ 5 (for Beta bosses)
  - [ ] Mythic Practice mode (unlimited retries, no rewards)
  - [ ] Mythic ladder UI data

---

## EP-16 Balance Tooling, Telemetry and QA

### FT-16.5 Bot expansion — `P0`

- [ ] **US-16.5.1** As a designer, the bot probes all GDD risks.
  - [ ] Archetype: HeroCarry
  - [ ] Archetype: EconomyTurtle
  - [ ] Archetype: TowerSpam
  - [ ] Archetype: ControlHeavy
  - [ ] Archetype: RandomValid (fuzz)
  - [ ] Archetype: HumanReplay (re-simulate real replays under new bundles)
  - [ ] Boss-diversity and anti-monoculture gates
  - [ ] Stratified nightly sampling and weekly full-matrix workflows

### FT-16.6 Telemetry dashboards — `P1`

- [ ] **US-16.6.1** As the team, we monitor live balance.
  - [ ] Aggregation jobs (win rate, tower/evolution share, DPS share, wave-of-death)
  - [ ] Dashboards and alert thresholds from the GDD gates
  - [ ] Economy dashboards (stockpiles, time-to-unlock)

### FT-16.7 Meta economy simulator — `P1`

- [ ] **US-16.7.1** As a designer, I can simulate progression pacing.
  - [ ] Player-archetype models (casual, competent, expert)
  - [ ] Currency flow and research-queue idle analysis
  - [ ] Hours-to-level-100 and time-to-unlock outputs vs GDD targets

### FT-16.8 QA hardening — `P0`

- [ ] **US-16.8.1** As QA, regression risk is low.
  - [ ] Golden replay suite expanded to all maps and bosses
  - [ ] Visual golden-frame tests for key scenes
  - [ ] Context-loss and long-session soak tests
  - [ ] Save fuzz and migration suite over all alpha/beta fixtures
  - [ ] Crash-free-session metric reporting

---

## EP-17 Platform, Monetization and Release

### FT-17.3 Steam Playtest — `P0`

- [ ] **US-17.3.1** As a player, I can join the Steam Playtest.
  - [ ] Spike: Tauri vs Electron with Steamworks bridge; write ADR
  - [ ] Desktop wrapper build (static export of the game shell)
  - [ ] `Achievements` port + Steam adapter and initial achievement set (≈ 30)
  - [ ] Steam Cloud save adapter
  - [ ] Steam Playtest build pipeline and depot setup

### FT-17.4 Monetization (demo/full split and cosmetics) — `P1`

- [ ] **US-17.4.1** As a player, I can try the demo and buy the full game.
  - [ ] `Entitlements` port and web purchase adapter
  - [ ] Demo content gate (Act I, starters, Endless Lite) with save carry-over
  - [ ] Purchase flow and receipt handling
- [ ] **US-17.4.2** As a player, I can buy cosmetics without gaining power.
  - [ ] Cosmetic item schema and equip use case (`ApplyCosmetic`)
  - [ ] Prism Token wallet and cosmetics shop UI (limited set)
  - [ ] "Classic look" toggle for leaderboard replays
  - [ ] Test suite asserting cosmetics never change sim inputs

### FT-17.5 Localization — `P1`

- [ ] **US-17.5.1** As the team, we ship EN + 3 languages.
  - [ ] Select the three languages from wishlist data
  - [ ] Translation export/import workflow and glossary
  - [ ] Language QA pass per locale (layout and truncation)

---

## EP-18 Art, Audio and Narrative Integration

### FT-18.4 Acts IV–VII art — `P1`

- [ ] **US-18.4.1** As a player, Acts IV–VII look finished.
  - [ ] Integrate Iron enemy sets, Badlands tilesets and hazards
  - [ ] Integrate Frostbound enemy sets, Tundra tilesets and ice effects
  - [ ] Integrate Crystalline enemy sets, Crystal Waste tilesets and beam VFX
  - [ ] Integrate Dominion enemy sets, Ruins tilesets and rune VFX
  - [ ] Integrate Beta tower modules and evolution add-ons
  - [ ] Integrate Beta hero animation sets and boss visuals

### FT-18.5 Audio pass — `P1`

- [ ] **US-18.5.1** As a player, the game sounds polished.
  - [ ] Integrate faction music motifs and layered stems (Acts I–VII)
  - [ ] Damage-type signature SFX set
  - [ ] Boss music and phase transitions
  - [ ] Mix and loudness pass with ducking

### FT-18.6 Narrative content — `P2`

- [ ] **US-18.6.1** As a player, the story is present.
  - [ ] Act intro comic sequences for Acts II–VII
  - [ ] Keeper dialogue and hero banter data integration
  - [ ] Codex lore text integration for towers, enemies, heroes and relics

---

## Beta Exit Checklist (from GDD §20.3)

- [ ] **Engagement:** D7 retention ≥ 25%; top-decile median playtime ≥ 40 h
- [ ] **Economy:** player-reported "grind" score ≤ 2.5/5; no currency stockpiled > 5× sinks
- [ ] **Balance:** no tower/evolution in > 35% of winning loadouts; every evolution ≥ 3%
- [ ] **Stability:** crash-free ≥ 99.5%; zero known save-loss bugs
- [ ] **Fairness:** verified cheat reports < 0.5%; replay verification pass rate ≥ 99.9%
- [ ] **Performance:** 60 FPS on target hardware at max wave scale
- [ ] **Business:** demo→full conversion within the validated target range; refund rate < 8%
