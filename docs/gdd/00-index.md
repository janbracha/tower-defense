# Guardians of the Nexus — Game Design Document

**Version:** 0.1 (Foundation Draft)
**Genre:** Strategic Tower Defense / RPG / Rogue-lite
**Platforms:** PC Browser (launch) → Steam → Mobile
**Tech:** Next.js, React, TypeScript, Tailwind, Zustand, PixiJS

---

## How This Document Is Organised

| GDD Section | File |
|---|---|
| 1. Executive Summary, 2. Core Gameplay Loop (incl. combat rules) | [01-vision-and-core-loop.md](01-vision-and-core-loop.md) |
| 3. Complete Worldbuilding | [02-worldbuilding.md](02-worldbuilding.md) |
| 4. Factions | [03-factions.md](03-factions.md) |
| 5. Towers (30 base + 60 evolutions) | [04-towers.md](04-towers.md) |
| 6. Heroes (15) | [05-heroes.md](05-heroes.md) |
| 7. Enemies (100) | [06-enemies.md](06-enemies.md) |
| 8. Bosses (20) | [07-bosses.md](07-bosses.md) |
| 9. Resources, 10. Progression, 11. Research | [08-economy-progression-research.md](08-economy-progression-research.md) |
| 12. Base Building, 13. Maps (50 + procedural) | [09-citadel-and-maps.md](09-citadel-and-maps.md) |
| 14. Endgame, 15. Monetization | [10-endgame-and-monetization.md](10-endgame-and-monetization.md) |
| 16. Technical Architecture | [11-technical-architecture.md](11-technical-architecture.md) |
| 17. Content Roadmap, 18. MVP, 19. Alpha, 20. Beta, 21. Release | [12-roadmap-and-milestones.md](12-roadmap-and-milestones.md) |

## Content Totals (Target for 1.0)

| Content | Count |
|---|---|
| Factions | 10 |
| Base towers | 30 |
| Tower evolutions | 60 |
| Heroes | 15 |
| Standard enemies | 100 |
| Bosses | 20 |
| Handcrafted maps | 50 (10 acts × 5) |
| Biomes | 8 |
| Relics | 120 |
| Nexus Spells | 12 |

## Design Pillars

1. **Every choice is a trade-off, never a trap.** No tower is strictly best; no tower is dead weight.
2. **Counters are soft, not hard.** Every enemy has at least three viable answers; none has exactly one.
3. **Experimentation is rewarded.** Loadouts are chosen before each battle from a large pool, so the player re-solves the puzzle every map.
4. **Progression widens, it does not only heighten.** Meta power is capped; most long-term growth is new options, not bigger numbers.
5. **Respect the player's time.** No wall-clock timers, no energy, no paywalled power, no artificial difficulty spikes.
6. **Readable chaos.** The screen can be busy, but threats are always telegraphed and attributable.

## Glossary

| Term | Meaning |
|---|---|
| Nexus | The reality-anchoring core the player defends |
| Integrity | Nexus hit points in a battle (default 100) |
| Act | A 5-map campaign chapter built around one faction |
| School | A group of 3 towers sharing an element/theme (10 schools) |
| Evolution | A Tier IV specialization of a base tower (2 per tower) |
| Loadout | Towers, hero, relics and Nexus Spells brought into a battle |
| Rift | A rogue-lite run mode with drafted upgrades |
| Axiom | One of the ten fundamental principles that hold reality together |
| Citadel | The between-battle hub |
