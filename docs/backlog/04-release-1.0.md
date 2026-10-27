# Release 1.0 Backlog

**Goal:** complete the game and launch (GDD §21).
**Scope:** 10 Acts / 50 maps · 30 towers + 60 evolutions · 15 heroes · 100 enemies + 20 bosses · account 1–100 · 152 research nodes · 120 relics · 12 Nexus Spells · Rift, Endless, Survival, Weekly, Boss Rush, Mythic 1–20 · Prestige Cycles 1–10 · three endings · browser + Steam · ≥ 4 languages · ≈ 80 achievements.
**Prerequisite:** Beta exit checklist complete.

**Cut lines (if scope must shrink, in order):** mobile (already Post) → seasonal events beyond the first → Survival → Prestige Cycles 6–10 → Mythic 11–20 → fewer Rift templates → second evolutions for the 8 least-distinct towers → heroes 13–15 → Acts IX–X compressed to 3 maps each (keep boss maps). Never cut: fairness rules, save versioning, determinism, accessibility baseline, boss telegraphs, demo quality.

---

## EP-3 Combat and Effect Engine

### FT-3.8 Corpse system and final mechanics — `P0`

- [ ] **US-3.8.1** As a designer, corpse-based mechanics are supported.
  - [ ] Corpse entity, registry (cap 200, oldest-first removal) and lifetime rules
  - [ ] Corpse consumers: Feed, Raise, Ossuary, Mass Raise effect hooks
  - [ ] `CorpseBurn` effect tag (Fire/Radiant area clear)
  - [ ] Soul Bind damage-redistribution interceptor
  - [ ] Soul counter resource (`GrantResource(Soul)`)

---

## EP-5 Towers

### FT-5.10 Final base towers (6) — `P0`

- [ ] **US-5.10.1** As a player, I unlock the last six towers.
  - [ ] Tower: Shard Harvester (kill-gold aura, passive Gold, end-of-battle Shard counter)
  - [ ] Tower: Chrono Pendulum (slow, 5% rewind chance)
  - [ ] Tower: Shadow Obelisk (Souls counter and damage scaling)
  - [ ] Tower: Nightblade Den (stealth hunters, backstab, Assassinate)
  - [ ] Tower: Truth Lantern (reveal + mark)
  - [ ] Tower: Void Rift (gravity pull + tick damage)

### FT-5.11 Final evolutions (12) — `P1`

- [ ] **US-5.11.1** As a player, I can evolve the Act VI–IX towers.
  - [ ] Evolutions: Gem Exchange (`gem_exchange`), Prismatic Reactor (`reactor_overcharge`)
  - [ ] Evolutions: Epoch Engine (`time_stop_pulse`), Paradox Loom (`echo_replay`)
  - [ ] Evolutions: Soulreaver Monolith, Eclipse Pillar
  - [ ] Evolutions: Phantom Guild, Shadowstep Sanctum
  - [ ] Evolutions: Lighthouse of Verity, Prismatic Lantern (`prismatic_convert`)
  - [ ] Evolutions: Singularity Engine (`singularity`), Event Horizon Gate (`horizon_gate`)
- [ ] **US-5.11.2** As a designer, all 60 evolutions are verified.
  - [ ] Evolution uniqueness audit (mechanic, geometry, trade-off documented)
  - [ ] Evolution usage test matrix in the bot (each evolution ≥ 3% of winners)

---

## EP-6 Enemies, Waves, Navigation and Handcrafted Maps

### FT-6.14 Hollow Court enemies (10) — `P0`

- [ ] **US-6.14.1** As a player, I face the Hollow Court dead.
  - [ ] Enemy: Skeletal Footman (Reassemble)
  - [ ] Enemy: Grave Ghoul (Feed on corpses)
  - [ ] Enemy: Shade Stalker (Stealth; disable on first hit)
  - [ ] Enemy: Plague Crow (flying; Pestilence)
  - [ ] Enemy: Wailing Banshee (flying; Wail stun)
- [ ] **US-6.14.2** As a player, I face Hollow Court elites and casters.
  - [ ] Enemy: Bone Collector (Ossuary armor)
  - [ ] Enemy: Wraith Knight (Ethereal Step)
  - [ ] Enemy: Soul Binder (link damage sharing)
  - [ ] Enemy: Lich Acolyte (Raise)
  - [ ] Enemy: Hollow Gatekeeper (Gate Portal teleport; Anchor interaction)

### FT-6.15 Celestial Order enemies (10) — `P0`

- [ ] **US-6.15.1** As a player, I face Celestial infantry and flyers.
  - [ ] Enemy: Zealot Initiate (Faith Shield)
  - [ ] Enemy: Halo Archer (ranged Holy Arrow)
  - [ ] Enemy: Wingblade Seraph (flying Dive)
  - [ ] Enemy: Cherub Swarm (flying Blessing heal)
  - [ ] Enemy: Gryphon Knight (flying Lance Dive disable)
- [ ] **US-6.15.2** As a player, I face Celestial elites and priests.
  - [ ] Enemy: Temple Guardian (Divine Shield invulnerability stages)
  - [ ] Enemy: Lightbringer Priest (Mass Heal)
  - [ ] Enemy: Inquisitor Seraph (Purge; Curse immunity)
  - [ ] Enemy: Aureate Automaton (Mirror Plating)
  - [ ] Enemy: Radiant Avatar (Judgment marks highest-DPS tower)

### FT-6.16 Void Swarm enemies (10) — `P0`

- [ ] **US-6.16.1** As a player, I face Void swarms and stalkers.
  - [ ] Enemy: Voidling (Hive Mind swarm)
  - [ ] Enemy: Rift Stalker (Rift Step blink)
  - [ ] Enemy: Phase Hound (Phase Shift on burst)
  - [ ] Enemy: Spore Drone (flying; Nullspores Mana suppression)
  - [ ] Enemy: Singularity Larva (Event Horizon pull)
- [ ] **US-6.16.2** As a player, I face Void elites and parasites.
  - [ ] Enemy: Maw Crawler (Gorge)
  - [ ] Enemy: Psion Husk (Mind Seize)
  - [ ] Enemy: Void Carapace (`adaptive_armor`)
  - [ ] Enemy: Dimensional Leech (Mana Drain attach)
  - [ ] Enemy: Reality Shredder (Tear portals)

### FT-6.17 Handcrafted maps 36–50 — `P0`

- [ ] **US-6.17.1** As a player, I can play Act VIII (Hollow Court).
  - [ ] Map 36 Gravebloom Fields (corpse tutorial)
  - [ ] Map 37 Catacomb Crossroads (4 lanes, tomb-door switches)
  - [ ] Map 38 Malgrave's Mausoleum (boss map)
  - [ ] Map 39 Bone Orchard (bone fog)
  - [ ] Map 40 The Hollow Throne (boss map)
- [ ] **US-6.17.2** As a player, I can play Act IX (Celestial Order).
  - [ ] Map 41 Cloudstep Landing (wind gusts)
  - [ ] Map 42 Windbridge Spans (collapsing bridges)
  - [ ] Map 43 Auriel's Aerie (boss map)
  - [ ] Map 44 Radiant Cascade (lightning storms)
  - [ ] Map 45 The Tribunal Spire (boss map)
- [ ] **US-6.17.3** As a player, I can play Act X (Void Swarm).
  - [ ] Map 46 Fractured Threshold (drifting pads)
  - [ ] Map 47 Hive of Nowhere (null zones)
  - [ ] Map 48 Xyrrith's Brood Nest (boss map)
  - [ ] Map 49 Unwritten Expanse (terrain rewrites)
  - [ ] Map 50 The Unmaker's Throne (final boss map)
- [ ] **US-6.17.4** As a veteran, every map has a Mythic remix.
  - [ ] Mythic remix hazard + boss rule for Maps 1–25
  - [ ] Mythic remix hazard + boss rule for Maps 26–50
  - [ ] Full-campaign bot balance sign-off on all 50 maps × 4 difficulties

---

## EP-7 Heroes and Nexus Spells

### FT-7.10 Final heroes (4) — `P0`

- [ ] **US-7.10.1** As a player, I can play Morrigan Hollowmere.
  - [ ] Morrigan: definition, Q Raise Thrall, W Soul Lantern, E Grave Chill
  - [ ] Morrigan: passives Death's Tithe, Spectral Pact; Ultimate Legion of the Fallen
  - [ ] Morrigan: progression tree data
- [ ] **US-7.10.2** As a player, I can play Seraphine Dawnward.
  - [ ] Seraphine: definition, Q Smite, W Aegis Dome, E Consecrate
  - [ ] Seraphine: passives Oath of Light, Halo; Ultimate Heaven's Judgment
  - [ ] Seraphine: progression tree data
- [ ] **US-7.10.3** As a player, I can play Vael the Unbound.
  - [ ] Vael: definition, Q Rift Step (along-lane teleport), W Gravity Well, E Phase Cloak
  - [ ] Vael: passives Between Worlds, Entropic Touch; Ultimate Collapse (boss-exempt execute)
  - [ ] Vael: progression tree data
- [ ] **US-7.10.4** As a player, I can play Auren Echo after the campaign.
  - [ ] Auren Echo: definition and `axiom_shift` behavior (kit swap per wave)
  - [ ] Ten Axiom kits (Growth, Entropy, Will, Craft, Stillness, Harmony, Knowledge, Memory, Order, Change) — batch 1 (5)
  - [ ] Ten Axiom kits — batch 2 (5)
  - [ ] Passives Echo of Ten, Weaver's Hand; Ultimate Weave Reality
  - [ ] Progression tree data and post-campaign unlock

### FT-7.11 Nexus Spells 11–12 — `P1`

- [ ] **US-7.11.1** As a player, I have all twelve Nexus Spells.
  - [ ] Spell: Lockdown (disable immunity window)
  - [ ] Spell: Sanctify Ground (buff/debuff zone)
  - [ ] Spell fusion (Arcane Academy level 15) rules and data

### FT-7.12 Heroic Mastery 6–10 — `P2`

- [ ] **US-7.12.1** As a player, hero mastery completes.
  - [ ] Heroic Mastery 6–10 rewards and Soul Essence curve
  - [ ] Heroic Trials content for all 15 heroes
  - [ ] Mythic gear and Forge Contracts

---

## EP-8 Bosses

### FT-8.5 Final bosses (6) — `P0`

- [ ] **US-8.5.1** As a player, I can fight Lich-Baron Malgrave.
  - [ ] Malgrave: Mass Raise from corpses (15 s) and phylactery lanterns (−60% damage link)
- [ ] **US-8.5.2** As a player, I can fight the Hollow Queen Nythra.
  - [ ] Nythra: `soul_link_lanterns` occupying tower pads (refund and free-up rules)
  - [ ] Nythra: Memory Fields (replay ghosts of earlier enemies)
  - [ ] Nythra: Final Lullaby global slow
- [ ] **US-8.5.3** As a player, I can fight Seraph Auriel.
  - [ ] Auriel: divine shield cycle with Shadow/Void bypass
  - [ ] Auriel: Sanctify zones and Wing Slash disable
- [ ] **US-8.5.4** As a player, I can fight the Arbiter.
  - [ ] Arbiter: `verdict_scales` per-school damage tracker and resist modifier
  - [ ] Arbiter: Appeal spell hook and Condemned tower status
  - [ ] Arbiter: Verdict meter UI data
- [ ] **US-8.5.5** As a player, I can fight Hivemother Xyrrith.
  - [ ] Xyrrith: egg objectives with spawn-rate coupling and Devour healing
  - [ ] Xyrrith: Null Pulse Mana suppression
- [ ] **US-8.5.6** As a player, I can fight the Unmaker.
  - [ ] Unmaker phase 1: Unraveling (pad removal with refund and telegraph)
  - [ ] Unmaker phase 2: Rewriting (path rewrite every 45 s)
  - [ ] Unmaker phase 3: Echo of Factions (spawn empowered echoes of previous bosses)
  - [ ] Unmaker phase 4: The Last Word (Surge + Ultimate window)
  - [ ] Ending-choice trigger and campaign completion flags

### FT-8.6 Boss QA — `P1`

- [ ] **US-8.6.1** As QA, all 20 bosses are verified.
  - [ ] Telegraph lint audit across all 20 bosses
  - [ ] ≥ 3 distinct archetype wins per boss (bot) and anti-monoculture checks
  - [ ] Mythic add-on rules for all bosses

---

## EP-9 Rendering, Input and Audio

### FT-9.7 Final rendering features — `P1`

- [ ] **US-9.7.1** As a player, the last acts look as designed.
  - [ ] Soul lantern, corpse and fog visuals
  - [ ] Sky-island parallax, wind and lightning storm effects
  - [ ] Void distortion, drifting pad and terrain-rewrite effects
  - [ ] Verdict scales and Unmaker phase presentation
  - [ ] Season-theme overlay support (decor, banners)

---

## EP-10 UI, Game Flow and Accessibility

### FT-10.12 Endgame and narrative UI — `P0`

- [ ] **US-10.12.1** As a player, I can see the story conclude.
  - [ ] Ending choice screen (Concord, Rewrite, Acceptance) and persisted result
  - [ ] Credits sequence
  - [ ] Post-campaign Wheel Keeper title and Codex completion display
- [ ] **US-10.12.2** As a player, I can use every mode.
  - [ ] Survival mode UI
  - [ ] Seasonal Journey UI and Vault rotation
  - [ ] Full cosmetics shop and Supporter Pack screen
  - [ ] Statistics and achievements screens

### FT-10.13 Final UX pass — `P0`

- [ ] **US-10.13.1** As a player, the UI is consistent and complete.
  - [ ] End-to-end UX review pass (flow, copy, spacing)
  - [ ] Gamepad navigation and bindings support (Steam)
  - [ ] Keyboard-only full-game playthrough test
  - [ ] Final accessibility regression checklist

---

## EP-11 Meta Progression

### FT-11.14 Account 71–100 — `P1`

- [ ] **US-11.14.1** As a player, I can reach level 100.
  - [ ] Extend XP curve and milestone rewards to 100
  - [ ] Final skill-tree node polish and capstone verification (120 point budget)

### FT-11.15 Research complete (152 nodes) — `P1`

- [ ] **US-11.15.1** As a player, I can finish the research tree.
  - [ ] Remaining Archaeology and Foresight nodes
  - [ ] Capstone techs and Doctrine pairs for all seven tracks
  - [ ] Research balance pass via the meta economy simulator

### FT-11.16 Relics complete (120) — `P1`

- [ ] **US-11.16.1** As a player, I can collect all relics.
  - [ ] Relics batch 17–24 (5 each) incl. Acts VIII–X boss relics
  - [ ] Mythic relics (2): The Last Word and one more; relic lore fragments per level
  - [ ] Drop-table audit and bad-luck protection tests

### FT-11.17 Mastery to 20 — `P2`

- [ ] **US-11.17.1** As a player, tower mastery reaches 20.
  - [ ] Tower mastery 11–20 perks and cosmetics
  - [ ] Mastery challenge maps for levels 10 and 20 (30 towers)
  - [ ] Account mastery titles and Ascension prerequisites

### FT-11.18 Prestige Cycles 4–10 — `P1`

- [ ] **US-11.18.1** As an endgame player, I can complete all Cycles.
  - [ ] Cycle modifiers 4–10 data and overlays
  - [ ] Cycle Rewards (auras, relic slots at Cycles 5 and 10)
  - [ ] Echo Boon pool completion and balance pass

---

## EP-12 Nexus Citadel

### FT-12.4 Final Citadel structures — `P1`

- [ ] **US-12.4.1** As a player, the Citadel is complete.
  - [ ] Citadel Assault story battles (Acts IV, VII, X) as special maps
  - [ ] Void Gate (Mythic ladder, Boss Rush, Endless leaderboards access)
  - [ ] Menagerie (cosmetic pets/decor shop)
  - [ ] Keeper quest set (≥ 12 quests) and rewards

---

## EP-13 Map Systems: Events, Hazards, Weather, Branching, Rift

### FT-13.5 Acts VIII–X systems — `P1`

- [ ] **US-13.5.1** As a player, the last biomes have distinct hazards.
  - [ ] Ruins/necropolis hazards: soul fog, corpse piles
  - [ ] Sky hazards: wind gusts, collapsing bridges, lightning
  - [ ] Void hazards: gravity wells, shifting terrain, null zones
  - [ ] Weather: Thunderstorm, Void Storm, Fog variants
  - [ ] Event: Reinforcement Call variants and Rift Tear polish

### FT-13.6 Rift expansion — `P2`

- [ ] **US-13.6.1** As a Rift player, there is long-term variety.
  - [ ] Additional layout templates and biome-specific tilesets for generation
  - [ ] Boon pool expansion (≥ 40 total) and synergy sets
  - [ ] Rift Elite node variants and Mythic Rift difficulty
  - [ ] Axiom modifier from the "Rewrite" ending applied to Rift runs

---

## EP-14 Save and Persistence

### FT-14.5 Launch save readiness — `P0`

- [ ] **US-14.5.1** As a player, my beta progress carries into 1.0.
  - [ ] Final migration chain from all Beta schema versions
  - [ ] Beta → 1.0 refund/compensation rules for renamed or rebalanced content
  - [ ] Save recovery tooling and support export bundle

---

## EP-15 Endgame Modes, Competition and Services

### FT-15.8 Survival mode — `P2`

- [ ] **US-15.8.1** As a player, I can play Survival.
  - [ ] Survival profile (no hero, 6 tower slots, no bounty, fixed Gold pool)
  - [ ] Twist-wave modifiers and scoring (efficiency)
  - [ ] Survival leaderboards and titles

### FT-15.9 Boss Rush complete — `P1`

- [ ] **US-15.9.1** As a player, I can complete the 20-boss Rush.
  - [ ] Full sequence and Short Rush (10 selected bosses)
  - [ ] Rush Modifier per boss
  - [ ] Ghost-run replays and leaderboard categories

### FT-15.10 Mythic 6–20 — `P1`

- [ ] **US-15.10.1** As a veteran, Mythic reaches level 20.
  - [ ] Affixes: Volatile, Anchored, Eclipsed, Reinforced, Siphoning
  - [ ] Level scaling and affix schedule (levels 6–20)
  - [ ] Mythic rating computation and weekly Mythic Ladder
  - [ ] Ironclad hard-mode toggle (single life, no pause/preview) and titles
  - [ ] Mythic gear and materials economy balance pass

### FT-15.11 Weekly operations — `P0`

- [ ] **US-15.11.1** As the team, weekly content runs on rails.
  - [ ] Weekly authoring tool (seed, modifiers, bundle pinning) with bot validation
  - [ ] Archive mode (past Trials without leaderboards)
  - [ ] Season of 12 weekly seeds prepared before launch

### FT-15.12 Seasonal events — `P2`

- [ ] **US-15.12.1** As a player, I can join Season 1.
  - [ ] Season schema (limited Rift variant, themed boss, cosmetics, Journey track)
  - [ ] Vault rotation for past seasonal rewards
  - [ ] Season 1 content (Festival of Lanterns) integration

---

## EP-16 Balance Tooling, Telemetry and QA

### FT-16.9 Launch QA — `P0`

- [ ] **US-16.9.1** As the team, we sign off balance and stability.
  - [ ] Full-matrix balance gate on release candidate (50 maps × archetypes × difficulties)
  - [ ] HumanReplay regression against beta replays
  - [ ] Minimum-spec hardware performance validation
  - [ ] Soak test and memory-leak audit (multi-hour sessions)
  - [ ] Final replay-verifier archive of 1.0 bundles and `rulesEpoch` set

---

## EP-17 Platform, Monetization and Release

### FT-17.6 Steam release — `P0`

- [ ] **US-17.6.1** As a player, I can buy and play on Steam.
  - [ ] Final achievement set (≈ 80) wired and tested
  - [ ] Steam store build, depots, branches and release pipeline
  - [ ] Steam rich presence and cloud-save regression
  - [ ] Controller/Steam Deck verification pass

### FT-17.7 Web release and commerce — `P0`

- [ ] **US-17.7.1** As a web player, I can play and buy.
  - [ ] Production deployment, CDN, caching and rollback procedure
  - [ ] Full-game purchase, entitlement sync with Steam, refunds handling
  - [ ] Cosmetic bundle catalog and Supporter Pack fulfilment
  - [ ] Regional pricing configuration

### FT-17.8 Legal, privacy and support — `P0`

- [ ] **US-17.8.1** As a player, my data is respected.
  - [ ] Privacy policy, EULA and age-rating metadata integrated in-game
  - [ ] Data deletion/export request path
  - [ ] Telemetry consent regression tests
  - [ ] Support documentation, FAQ and in-game feedback links

### FT-17.9 Launch operations — `P0`

- [ ] **US-17.9.1** As the team, we are ready for launch day.
  - [ ] Hotfix and rollback rehearsal
  - [ ] Press and creator kit assets and build keys process
  - [ ] Community Discord moderation guidelines and bots
  - [ ] Launch-week monitoring dashboard and on-call rota

### FT-17.10 Localization completion — `P1`

- [ ] **US-17.10.1** As a player, ≥ 4 languages are polished.
  - [ ] Final translation drops for UI, tutorial and tooltips
  - [ ] Final lore/codex translation drop
  - [ ] Locale-specific QA and regression pass

---

## EP-18 Art, Audio and Narrative Integration

### FT-18.7 Acts VIII–X art — `P1`

- [ ] **US-18.7.1** As a player, the final acts are complete visually.
  - [ ] Integrate Hollow Court enemy sets, necropolis tilesets and soul VFX
  - [ ] Integrate Celestial enemy sets, Sky Island tilesets and light VFX
  - [ ] Integrate Void enemy sets, Void Realm tilesets and distortion VFX
  - [ ] Integrate final tower modules, hero animations and boss visuals

### FT-18.8 Final audio — `P1`

- [ ] **US-18.8.1** As a player, the full soundtrack ships.
  - [ ] Faction motifs and stems for Acts VIII–X, final boss and endings music
  - [ ] Final SFX coverage audit (all towers, enemies, bosses)
  - [ ] Final mix, loudness and voice-line integration

### FT-18.9 Narrative completion — `P1`

- [ ] **US-18.9.1** As a player, the story is delivered.
  - [ ] Act intro comics for Acts VIII–X and ending sequences
  - [ ] Hero bond dialogue data for all roster pairs
  - [ ] Codex lore for all remaining content and final proof-read

---

## 1.0 Launch Checklist (from GDD §21.2)

- [ ] All Beta exit criteria satisfied; no open Sev-1/Sev-2 bugs
- [ ] Save migration verified from Beta builds
- [ ] Balance bot reports green across all 50 maps × 5 archetypes
- [ ] Steam page, trailer, capsule art and wishlist campaign in place
- [ ] Press/creator kits; community Discord and moderation guidelines
- [ ] Support documentation, FAQ and in-game feedback links
- [ ] Rollback and hotfix procedure rehearsed
- [ ] Performance validated on minimum-spec hardware
- [ ] Legal: privacy policy, EULA, age rating, regional pricing
