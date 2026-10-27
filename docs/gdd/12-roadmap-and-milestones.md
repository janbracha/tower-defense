# 17. Content Roadmap

Milestones are defined by **content and quality gates**, not by dates. Each milestone must pass its exit criteria before the next begins.

## 17.1 Content Ramp

| Content | MVP | Alpha | Beta | Release 1.0 |
|---|---|---|---|---|
| Acts / maps | 1 / 3 | 3 / 15 | 7 / 35 | 10 / 50 |
| Base towers | 8 | 16 | 24 | 30 |
| Evolutions | 8 (4 towers × 2) | 32 | 48 | 60 |
| Heroes | 1 | 5 | 11 | 15 |
| Standard enemies | 10 | 30 | 70 | 100 |
| Bosses | 1 | 6 | 14 | 20 |
| Relics | 0 | 30 | 80 | 120 |
| Nexus Spells | 3 | 6 | 10 | 12 |
| Citadel buildings | 0 (menu only) | 3 | 6 | 6 + Core + later structures |
| Research nodes | 5 | 40 | 110 | 152 |
| Modes | Campaign | Campaign + basic Endless | + Rift + Weekly prototype | + Survival, Boss Rush, Mythic, Prestige |
| Platforms | Web | Web | Web + Steam playtest | Web + Steam |

## 17.2 Production Pipeline Principles

1. **Vertical slice before breadth.** Every system is proven with minimal content before content scales.
2. **Content is data.** After MVP, adding a tower/enemy is a data + art + audio task, not an engineering task (unless it introduces a new behavior).
3. **Effort classes** for planning (relative, not time):

| Item | Design | Engineering | Art | Audio | QA/Balance |
|---|---|---|---|---|---|
| New tower (base + 2 evolutions) | M | S (reuse) to L (new behavior) | L | M | M |
| New enemy | S | S to M | M | S | S |
| New boss | L | L | L | M | L |
| New map | M | S | L | S | M |
| New hero | L | M | L | M | M |
| New relic | S | S | S | S | S |

4. **Art strategy (scope control):** stylized 2D with modular tilesets per biome, palette swaps across factions, shared enemy rigs, VFX from a shared library, and hero/boss premium animation only. Tower evolutions share base silhouettes with distinct add-ons.
5. **Audio strategy:** a small set of faction music motifs with layered stems; shared SFX library with per-damage-type signature sounds.
6. **Tooling first:** content CLI, balance bot, replay verifier and map editor are built before Beta content ramps.

## 17.3 Cut Lines (If Scope Must Shrink)

Ordered from least painful to most painful:

1. Mobile port (post-1.0).
2. Seasonal events beyond the first.
3. Survival mode.
4. Prestige cycles beyond Cycle 5.
5. Mythic levels 11–20 (ship 1–10).
6. Procedural Rift generator variety (fewer templates).
7. Second evolution for 8 least-distinct towers (ship at 1.1).
8. Heroes 13–15 (ship as 1.1 content).
9. Hero Banner and cosmetic slots.
10. Acts IX–X compressed to 3 maps each (keeping boss maps).

**Never cut:** the fairness rules, save versioning, determinism, accessibility baseline, boss telegraphs, and the free demo's quality.

## 17.4 Team Assumptions

A lean team is assumed: Game Director/Designer, 2 engineers, 1–2 artists, 1 audio (contract), 1 QA/community (part-time). Scope should be re-checked against the actual team before locking Beta targets. Art is the largest scope risk; consider asset packs and contractors for tilesets and VFX.

---

# 18. MVP Definition

## 18.1 Purpose

**Prove the fun and the architecture.** The MVP answers: is placing, upgrading and evolving towers satisfying, and does the technical foundation (deterministic sim, worker, Pixi, content data, saves) hold?

## 18.2 Scope

| Area | MVP scope |
|---|---|
| **Maps** | 3 Verdant Covenant maps (Greenwood Gate, Mossroot Crossing, Sporefall Hollow) |
| **Towers** | 8 starters: Arcane Tower, Ballista Post, Garrison Barracks, Flame Forge, Frost Spire, Mana Font, Nature Grove, Tesla Coil (Tiers I–III) |
| **Evolutions** | 8: Arcane Tower, Frost Spire, Flame Forge and Tesla Coil with A/B |
| **Hero** | Aelara Voss (Q/W/E, Ultimate, no tree) |
| **Enemies** | 10 Verdant enemies |
| **Boss** | Sporemother Myra |
| **Systems** | Gold, Mana, Integrity; wave preview; damage types and resistances; core statuses; targeting modes; early-call; speed control |
| **Meta** | Shard reward, 5 simple permanent upgrades, 1 profile slot, save v1 |
| **UI** | Main menu, map select, loadout (8 slots), HUD, results, settings (volume, speed, colour-blind mode) |
| **Tech** | Domain package, deterministic fixed-step sim in a worker, command log, event bus, Pixi renderer, content registry with schemas, Zustand stores, persistence adapter |
| **Out of scope** | Citadel buildings, research, relics, prestige, procedural maps, other modes, audio beyond placeholder |

## 18.3 Exit Criteria

| Category | Criteria |
|---|---|
| **Fun** | 10 external playtesters; ≥ 70% finish Map 3; ≥ 60% say they would play more; ≥ 3 distinct winning builds observed |
| **Clarity** | 8/10 testers explain resistances and statuses after Map 2 without prompts |
| **Performance** | 60 FPS with 300 enemies on target low-end laptop; sim ≤ 4 ms |
| **Determinism** | Golden replays reproduce across Chromium/Firefox/Safari |
| **Stability** | Zero data-loss bugs; save round-trip test suite green |
| **Content pipeline** | A new enemy added through data + art only, without engine changes |

---

# 19. Alpha Version

## 19.1 Purpose

**Prove the loop and the meta.** The Alpha validates the full macro loop (battle → Citadel → progression) on a representative slice of content.

## 19.2 Scope

| Area | Alpha scope |
|---|---|
| **Campaign** | Acts I–III (Verdant, Ashen, Ember): 15 maps with 3 weather types and branching paths (Path Switches) |
| **Towers** | 16 base towers (starters + Act I–III unlocks and 4 extras) with tiers; 32 evolutions |
| **Heroes** | 5 (Aelara, Rook, Gorrum, Thorn, Nefari) with skill trees (3 branches) and 5 equipment slots (basic gear) |
| **Enemies** | 30 (Verdant, Ashen, Ember) |
| **Bosses** | 6 (Myra, Gnarl, Anuket-Zar, Khet-Ra, Grashka, Pyrrax) |
| **Citadel** | Research Lab, Hero Hall, Forge (levels 1–10) |
| **Meta** | Account levels 1–30; Nexus Skill Tree (1 tree, 40 nodes); Research (40 nodes); 30 relics; 3 Nexus Spells (6 by end of Alpha); Tower unlocks via Shards |
| **Modes** | Campaign (Normal/Veteran), Endless (basic), Practice mode (Armory) |
| **Dynamic content** | 6 events, hazards for each biome |
| **Tech** | Save versioning with migration tests; balance bot in CI; telemetry opt-in; content CLI; first replay verifier prototype |
| **Art/Audio** | Final-quality art for Act I, placeholder-plus for Acts II–III; faction music for Act I |
| **Accessibility** | Colour-blind palettes, UI scale, rebinding |

## 19.3 Exit Criteria

| Category | Criteria |
|---|---|
| **Retention** | Closed alpha cohort (≥ 50): ≥ 40% reach Act III; median first-session length 35–50 min |
| **Balance** | Bot: every map winnable by ≥ 5 loadouts; no tower used by > 40% of winning loadouts |
| **Economy** | Median time to first tower unlock after the starters ≈ 60–90 min of play |
| **Quality** | No Sev-1 bugs; crash-free sessions ≥ 99% |
| **Design** | All 6 bosses passed with ≥ 3 distinct strategies (observed in playtests) |
| **Tech** | Save migration from every previous Alpha build passes; replays valid across 3 browsers |

---

# 20. Beta Version

## 20.1 Purpose

**Prove scale, endgame and polish.** The Beta opens to a public audience (browser + Steam Playtest) to test long-term engagement, balance at scale, and the business model.

## 20.2 Scope

| Area | Beta scope |
|---|---|
| **Campaign** | Acts I–VII (35 maps), 4 difficulty tiers (Normal–Mythic 1–5) |
| **Towers** | 24 base towers, 48 evolutions; tower mastery 1–10 |
| **Heroes** | 11 with full trees and gear; Heroic Mastery 1–5 |
| **Enemies** | 70 |
| **Bosses** | 14 (through Act VII) |
| **Citadel** | All six buildings to level 20; Armory; Wayroad Gate |
| **Meta** | Account level 1–70; 4 skill trees; Research 110 nodes with doctrines; 80 relics; 10 Nexus Spells; prestige draft (Cycles 1–3) |
| **Modes** | Campaign, Rift (rogue-lite) with procedural generator and validation, Endless with leaderboards, Weekly Challenge (first seeds), Boss Rush prototype |
| **Services** | Leaderboard and replay verification, weekly seed publishing, optional cloud save |
| **Platform** | Steam Playtest build via wrapper, achievements, cloud saves |
| **Monetization** | Demo/full split, cosmetics shop (limited), purchase flow tested |
| **Localization** | EN + 3 languages (priority by wishlist data) |
| **Polish** | Final UI pass, tutorial pass, audio pass for all factions in scope, performance optimization, accessibility audit |

## 20.3 Exit Criteria

| Category | Criteria |
|---|---|
| **Engagement** | D7 retention ≥ 25%; median total playtime of top-decile players ≥ 40 h |
| **Economy** | Player-reported "grind" score ≤ 2.5/5; no currency stockpiled > 5× its sinks |
| **Balance** | Win-rate telemetry: no tower/evolution used in > 35% of winning loadouts; every evolution used in ≥ 3% |
| **Stability** | Crash-free ≥ 99.5%; zero known save-loss bugs |
| **Fairness** | Leaderboard cheat reports verified < 0.5%; replay verification pass rate ≥ 99.9% |
| **Performance** | 60 FPS on target hardware at max-scale wave; mobile build prototype at 30 FPS (informational) |
| **Business** | Demo→Full conversion within the validated target range; refund rate < 8% |

---

# 21. Release Version (1.0)

## 21.1 Scope (Complete Game)

| Area | Release scope |
|---|---|
| **Campaign** | 10 Acts, 50 handcrafted maps, full narrative, 3 endings, all dynamic events, weather and hazards |
| **Towers** | 30 base, 60 evolutions, mastery 1–20 |
| **Heroes** | 15 with full progression and Heroic Mastery 1–10 |
| **Enemies** | 100 standard, 20 bosses |
| **Meta** | Account 1–100; 4 trees; 152 research nodes; 120 relics; 12 Nexus Spells; Prestige Cycles 1–10 |
| **Modes** | Campaign, Rift, Endless, Survival, Weekly Challenges, Boss Rush, Mythic 1–20 |
| **Platforms** | Browser, Steam |
| **Services** | Leaderboards, weekly seeds, cloud saves |
| **Monetization** | Free demo, full game, cosmetic shop, Supporter Pack |
| **Quality** | Accessibility complete, localization ≥ 4 languages, achievement set (≈ 80), full audio pass |

## 21.2 Launch Checklist

- [ ] All exit criteria from Beta satisfied; no open Sev-1/Sev-2 bugs.
- [ ] Save migration verified from Beta builds.
- [ ] Balance bot reports green across all 50 maps × 5 archetypes.
- [ ] Steam page, trailer, capsule art, and wishlist campaign in place.
- [ ] Press/creator kits; community Discord and moderation guidelines.
- [ ] Support documentation, FAQ, and in-game feedback links.
- [ ] Rollback and hotfix procedure rehearsed.
- [ ] Performance validation on minimum-spec hardware.
- [ ] Legal: privacy policy, EULA, age rating, regional pricing.

## 21.3 Post-Launch Plan

| Phase | Content |
|---|---|
| **1.1** | Quality-of-life, balance patch, deferred evolutions/heroes (if cut), Workshop tooling groundwork |
| **1.2 – First Season** | Seasonal Rift variant, season cosmetics, weekly cadence stabilized |
| **Dimension Pack 1** | New faction Act (see monetization) |
| **Mobile** | Touch UX pass, performance tiering, store release |
| **Community** | Custom seed sharing, content pack support (Workshop), mod API |

## 21.4 Long-Term Vision

The Nexus is a platform: new factions, towers and relics can be added indefinitely without engine changes, supporting years of seasonal content while keeping the core experience premium, fair and respectful of the player's time.

---

## Appendix A: Open Questions for the Next Design Iteration

1. Should Rifts allow hero swaps between stages, or lock the starting hero for strategic commitment?
2. Should Path Switches cost Mana or have a cooldown only? (Prototype both.)
3. Final decision between Tauri and Electron for Steam (Steamworks bridge maturity, bundle size).
4. Should Mythic affixes be player-chosen to allow custom difficulty (with rating multipliers)?
5. How much narrative cutscene budget is feasible (comic panels vs. animated)?
6. Is a 2-player co-op mode worth a post-launch investigation (deterministic sim helps)?
7. Which three languages bring the highest wishlist coverage at Beta?
