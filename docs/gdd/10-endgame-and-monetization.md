# 14. Endgame

## 14.0 Endgame Philosophy

The endgame is a set of **parallel ladders** rather than one grind: a player can chase score, mastery, speed, variety or social challenges. Each ladder uses the same simulation and loadout rules, so mastery transfers.

| Ladder | Skill tested | Reward focus |
|---|---|---|
| Endless | Scaling, economy, long-term planning | Leaderboards, Mythic gear |
| Survival | Efficiency with fixed resources | Titles, cosmetics |
| Weekly Challenges | Adaptation to a fixed seed and modifiers | Relics, Shards, Prism Tokens |
| Seasonal Events | Novelty and themes | Cosmetics, limited relic skins |
| Boss Rush | Mechanical mastery | Mythic materials, titles |
| Prestige Cycles | Rule remixes | Echo Boons, cycle auras |
| Mythic Difficulty | Precision and build optimization | Mythic gear, ranks |

## 14.1 Endless Mode

- **Entry:** Void Gate (Act X cleared) or any cleared map as "Endless variant" (unlock per map).
- **Structure:** after the map's standard final wave, waves continue indefinitely.
- **Scaling (wave `w` > 40):**
  - HP multiplier: `M(w) = M(40) × 1.055^(w − 40)` (quadratic term kicks in above wave 100 to keep the curve finite).
  - Speed is capped at +20% to preserve readability.
  - Elite frequency: +2% per 5 waves up to 60% of wave composition.
  - Bounties decay −15% per wave beyond the target wave; interest is disabled after wave 60.
- **Calamity Waves:** every 10 waves a boss or boss-lite wave arrives; every 25 waves an **Interlude** offers one of 3 permanent-for-this-run Boons.
- **Score:** `Score = waves × 100 + kills × 2 + bossBonus + efficiencyBonus − leaks × 150`.
- **Leaderboards:** global, friends, and per-hero. Verified through replay re-simulation.
- **Rewards:** Shards, Research Data, Mythic Materials on milestone waves (50, 75, 100, 150, 200).

## 14.2 Survival Mode

A puzzle-like variant testing efficiency.

- No hero; limited tower slots (6).
- **Fixed resource pool:** starting Gold only plus a small wave bonus; enemies do not drop Gold.
- 50 waves; the objective is to survive with minimal leaks.
- **Twist waves:** each Survival wave has a modifier (e.g., "Armored", "Fast", "Flying only").
- **Rewards:** score by waves survived and Gold remaining; leaderboard by seed; unique titles ("Spartan", "Penny Pincher").

## 14.3 Weekly Challenges: "Wayroad Trials"

| Property | Details |
|---|---|
| Cadence | New seed every week; 3 tiers (Standard, Hard, Mythic) |
| Seed | Fixed map, wave script, loadout restrictions, 2–3 modifiers |
| Fairness | Everyone plays the same seed; replays verified |
| Rewards | Weekly Relic Cache (bad-luck protected), Shards boost, Prism Tokens, title ranking |
| Archive | Past Trials remain playable without leaderboards |
| Share codes | Any Rift or weekly can be exported as a shareable seed string |

Example modifiers: "No Frost towers", "All enemies have Phase", "Double bounties, half Integrity", "Heroes cannot attack, only cast".

## 14.4 Seasonal Events

- **Cadence:** 12-week seasons (4 per year), each with a theme tied to the world (e.g., *Festival of Lanterns* with the Hollow Court, *The Great Thaw* with the Frostbound).
- **Content:** a limited-time Rift variant, 1 themed boss, 10–15 cosmetics, 1 limited relic *skin* (no unique power), a seasonal lore thread.
- **Season Journey (free):** a free progression track; rewards are cosmetic and a small amount of Shards. No paid tier gates power.
- **Time-limited rewards** are *re-obtainable in later seasons* via a "Vault" rotation, to avoid FOMO.

## 14.5 Boss Rush

- 20 bosses in a fixed sequence (or the player's selected 10 for "Short Rush").
- Between bosses: choose 1 of 3 Boons and spend accumulated Gold.
- Boss HP ×0.6 but each boss gains a **Rush Modifier** (one extra ability).
- Leaderboard by time and by leaks; ghost runs available.
- **Rewards:** Mythic Materials, titles, hero cosmetics.

## 14.6 Prestige Cycles

See [08-economy-progression-research.md](08-economy-progression-research.md#107-prestige-nexus-ascension). Each cycle remixes rules and unlocks cosmetics and Echo Boons. Cycles apply to Campaign, Rift and Weekly (as an opt-in modifier).

## 14.7 Mythic Difficulty

- **Mythic 1–20**, unlocked after clearing Act X on Heroic.
- **Mythic Affixes:** every odd Mythic level adds an affix to every enemy group; even levels increase HP/threat.

| Affix | Effect |
|---|---|
| Fortified | Enemies +20% HP |
| Volatile | Enemies explode on death, damaging nearby towers |
| Regenerating | Enemies regenerate 1%/s out of combat |
| Swift | Speed +10% (max +30% from affixes) |
| Hexed | Random tower disabled for 3 s every 20 s |
| Thorned | Enemies reflect 10% Physical |
| Anchored | Enemies immune to knockback and pull |
| Eclipsed | Stealth on 25% of units |
| Reinforced | Bosses gain a second phase |
| Siphoning | Enemies drain Mana on spawn |

- **Mythic Rating:** score for highest cleared level; the weekly "Mythic Ladder" ranks best time/Integrity at level.
- **Anti-frustration:** affixes are always visible on briefing; no hidden modifiers; a "Practice Mode" runs the same affixes with unlimited retries for no rewards.

## 14.8 Veteran Support

- **Challenge Maps:** Mastery 10/20 tower challenges, hero Heroic Trials.
- **Custom Rift Seeds:** share and replay.
- **Replays & ghost runs:** watch top players' builds.
- **Hard Mode toggles (Ironclad):** single life, no pause, no preview: rewards titles.
- **Community content (post-1.0):** Workshop-ready content packs (see technical architecture).

---

# 15. Monetization Strategy

## 15.1 Principles

1. **Pay once for the game, not forever.** Content is sold as content, never as time or power.
2. **No pay-to-win.** No currency or item purchasable with money affects battle outcomes.
3. **No artificial friction.** No energy, no wait timers, no ads, no loot boxes, no gacha.
4. **Respect the demo.** The free browser demo is a real, polished slice, not a teaser.
5. **Transparency.** Prices, contents and unlock rules are clear and stable.

## 15.2 Business Model

| Product | Platform | Proposed price (to validate) | Notes |
|---|---|---|---|
| **Free Demo** | Browser | Free | Act I (5 maps), 8 starter towers, 3 starter heroes, Endless Lite, Weekly view-only. Save carries to the full game. |
| **Full Game** | Browser / Steam | $19.99 | Acts I–X, Rift, Endless, Boss Rush, Weekly, Mythic. One-time purchase unlocks all platforms where available (Steam key + browser account entitlement). |
| **Dimension Packs (DLC)** | All | $7.99–$9.99 | A new faction Act (5 maps), 10 enemies, 2 bosses, 2–3 towers, 1 hero, relics, codex. Fully playable by anyone who owns the pack; no power advantage beyond new options. |
| **Cosmetic Bundles** | All | $1.99–$5.99 | Tower skins, hero skins, Citadel themes, VFX, music remixes. |
| **Supporter Pack** | All | $14.99 | Soundtrack, digital art book, supporter title, exclusive cosmetic. |
| **Mobile** | iOS/Android | Premium parity | Same purchase model; optional cosmetics; no ads. |

*Prices are placeholders to be validated through market research and regional pricing (Steam regional recommendations).*

## 15.3 Free Track and Cosmetics

- **Prism Tokens:** earned by achievements and the Season Journey; optional purchase. They buy cosmetics only.
- **Every cosmetic is obtainable either via direct purchase or via Prism Tokens**, but never by RNG-purchase.
- **Cosmetic parity:** cosmetics never change hitboxes, ranges or readability; a "classic look" toggle forces default skins in multiplayer-style contexts (e.g., leaderboard replays).

## 15.4 Expansion Roadmap (Post-1.0 Content)

| Pack | Faction | Biome | Hook |
|---|---|---|---|
| The Gilded Tide | Merchant Armada | Archipelago | Naval lanes, tidal hazards |
| The Mirrorfall | Reflection Court | Mirror Plane | Mirror mechanics, doubles |
| The Dreaming Wild | Dream Hunters | Dreamscape | Sleep/awake mechanics |
| The Final Stanza | Echo Choir | Resonant Waste II | Endgame crystal boss |

## 15.5 Ethical Guardrails

- No dark patterns: no countdown pressure, no confirm-shaming, no misleading currency conversions.
- Clear receipts, easy refunds (Steam refund policy; web refund within 14 days where legally applicable).
- Child-safety review for age-gating and payment flows; compliance with regional consumer regulation.
- Accessibility is not a paid feature.

## 15.6 Success Metrics (to validate during Beta)

| Metric | Target to test |
|---|---|
| Demo → Full conversion | Validate against genre benchmarks; early target range 3–6% |
| Day-7 retention (demo) | ≥ 25% |
| Refund rate (Steam) | < 8% |
| Average session length | 35–50 min |
| Weekly active ratio (post-launch) | ≥ 15% of owners |
| DLC attach rate | Validate per pack |

## 15.7 Cost and Revenue Model (Planning Heuristics)

- **Fixed costs:** art, music, engineering, QA, platform fees (Steam takes 30% at standard tier), hosting for leaderboards (small), marketing.
- **Variable costs:** cloud saves and replay verification (low per-user cost thanks to deterministic replay verification).
- **Strategy:** modest-scope premium release, long tail through weekly challenges and paid expansions; avoid operational costs requiring high concurrent users.
