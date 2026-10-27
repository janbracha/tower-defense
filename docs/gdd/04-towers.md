# 5. Towers

**30 base towers · 10 schools · 60 evolutions.** Each school has a **damage**, a **control** and a **support/summon** tower, so any school can anchor a build.

## 5.1 System Rules

- **Tiers:** I → II → III → IV (Evolution A or B). See cost curve in [01-vision-and-core-loop.md](01-vision-and-core-loop.md#26-combat-rules-reference).
- **Overcharge:** From Tier III every tower can be Overcharged: spend 20 Mana for +50% effect rate for 6 s (30 s cooldown). Some evolutions replace Overcharge with a unique active.
- **Stat table units:** Cost in Gold; Damage per hit (Tier I); Attack speed in attacks/s; Range in tiles. DPS = Damage × Attack speed.
- **Evolution choice is permanent for the battle** (respec by selling and rebuilding).
- **Unlock schedule:** 8 starter towers; 22 unlocked through acts (see 5.13).
- **Balance reference:** a Tier I tower yields roughly 0.11–0.16 DPS per Gold against an unarmored enemy; specialists deliberately sit below or above that, compensated by utility.

### Pad sizes
- **Small pad:** most towers.
- **Large pad (2×2):** Garrison Barracks, Mortar Emplacement, Hailstorm Battery, Crystal Cannon and any Tier IV evolution marked ◼. Large pads are limited per map and create meaningful placement choices.

---

## 5.2 School 1 — Arcane

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Arcane Tower | 120 | 18 | 1.2 | 5.0 | Arcane | Ground + Air | Single-target DPS |
| Rune Warden | 140 | 40 (trap) | 3 s re-arm | 4.0 | Arcane | Ground | Trap control |
| Mana Font | 150 | — | — | 3.0 aura | — | — | Support (Mana) |

### 1. Arcane Tower
- **Description:** A crystal-topped pylon that fires homing bolts of raw arcane energy. Reliable, all-purpose.
- **Lore:** The first tower built after the Long Quiet, made by a Citadel apprentice from a scrap of Auren's loom-thread. It hums when the Guardian is near.
- **Upgrade path:** II — *Focused Lens* (+range, bolts pierce 1 armor-pip). III — *Spellweave* (every 4th shot becomes a Dual Bolt).
- **Evolutions:**
  - **A. Archmage Spire** ◼ — Every 5th bolt casts an Arcane Nova (AoE). Damage scales +0.5% per 10 Mana in the global pool. *Trade-off:* drains Mana, weaker when Mana is low.
  - **B. Temporal Beacon** — Bolts apply Time-Lash (−30% speed) and grant towers in range +15% attack speed. *Trade-off:* −30% own damage.
- **Strengths:** Hits air and ground, good vs most armors, no ammo logic. **Weaknesses:** Arcane-resistant enemies (Dominion, Crystalline).

### 2. Rune Warden
- **Description:** Inscribes up to 3 glowing runes on the path that detonate when enemies cross them.
- **Lore:** Derived from Dominion ward-craft, repurposed by apprentices who wanted to protect villages without wands.
- **Upgrade path:** II — *Deep Etching* (runes persist through 2 triggers). III — *Echo Glyph* (runes re-arm instantly if the first victim dies).
- **Evolutions:**
  - **A. Glyph Labyrinth** — Runes link into a network; enemies crossing two linked runes take chain bursts. *Trade-off:* needs deliberate placement geometry.
  - **B. Sigil Executioner** — One huge rune executes enemies under 15% HP, 12 s recharge. *Trade-off:* single trigger; weak vs swarms.
- **Strengths:** Excellent vs bosses' predictable paths, safe from ranged saboteurs. **Weaknesses:** Blink/phase enemies, flying enemies.

### 3. Mana Font
- **Description:** A fountain that produces Mana and amplifies nearby towers' Mana-driven effects.
- **Lore:** Built over a leyline puncture; its water tastes of lightning and old libraries.
- **Upgrade path:** II — *Wellspring* (+1.0 Mana/s). III — *Overflow* (towers in aura +10% Overcharge duration).
- **Evolutions:**
  - **A. Leyline Nexus** — Links up to 4 towers; each shares the strongest buff among them. *Trade-off:* destroying/disabling one link weakens all.
  - **B. Spellforge Engine** — Converts surplus Mana (above 80%) into up to +40% tower damage in range. *Trade-off:* wasteful if Mana is needed for spells.
- **Strengths:** Fuels Overcharges and Nexus Spells. **Weaknesses:** No damage; vulnerable to Spell Thief / Leech drain.

---

## 5.3 School 2 — Martial

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Ballista Post | 130 | 55 (pierce 3) | 0.6 | 7.5 | Physical | Ground + Air | Long-range pierce |
| Garrison Barracks ◼ | 150 | 8 per soldier ×3 | 1.0 | 3.0 rally | Physical | Ground | Blockers |
| Mortar Emplacement ◼ | 160 | 70 (AoE r1.2) | 0.4 | 8.0 | Physical | Ground | Artillery |

### 4. Ballista Post
- **Description:** A fixed ballista firing heavy bolts that pierce up to three enemies.
- **Lore:** Salvaged from a Brass Rebellion barricade; the Collective's engineers refused to claim it as theirs.
- **Upgrade path:** II — *Windlass* (+25% attack speed). III — *Barbed Bolts* (pierce 5, applies Bleed).
- **Evolutions:**
  - **A. Siege Repeater** — 3× fire rate, −40% damage, no pierce; excellent vs light swarms. *Trade-off:* poor vs armor.
  - **B. Dragonbane Rail** — 3 s charge; one unlimited-pierce shot with +200% vs flying and bosses. *Trade-off:* very slow; wasted overkill vs chaff.
- **Strengths:** Outranges many saboteurs; consistent. **Weaknesses:** Low vs swarms, ineffective vs Dimensional enemies that dodge.

### 5. Garrison Barracks
- **Description:** Spawns 3 soldiers that block and fight on the path; they respawn between waves.
- **Lore:** Founded by Dame Orla Brightfen's old company. The garrison oath: "We hold until the last."
- **Upgrade path:** II — *Plate Drill* (+50% soldier HP). III — *Rally Standard* (+15% soldier damage; one more soldier).
- **Evolutions:**
  - **A. Shieldwall Bastion** ◼ — 4 heavy soldiers taunt and reduce ranged damage by 50% for those they block. *Trade-off:* lowest damage.
  - **B. Vanguard Lancers** — Mounted lancers charge down the path, trampling units; can pursue to a longer reach. *Trade-off:* fragile, leave the rally point.
- **Strengths:** Holds fast enemies; enables kill zones. **Weaknesses:** Leapers, ranged enemies, Void pulls.

### 6. Mortar Emplacement
- **Description:** Lobs explosive shells in a long arc with a small AoE splash.
- **Lore:** Foundry apprentices call it "the Whistler" because the shells scream before they land.
- **Upgrade path:** II — *Rifled Barrel* (+range). III — *High Explosive* (+AoE radius, armor shred).
- **Evolutions:**
  - **A. Siege Howitzer** ◼ — Range 12; can be manually aimed for a heavy salvo (Mana). Min range 3. *Trade-off:* cannot target near itself.
  - **B. Cluster Pit** — Shells split into bomblets that leave mines. *Trade-off:* lower per-hit damage.
- **Strengths:** Long range AoE; good vs clumps. **Weaknesses:** Slow shells miss fast enemies; no air.

---

## 5.4 School 3 — Flame

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Flame Forge | 140 | 14 (cone) | 2.0 | 2.8 | Fire | Ground | Close burst + burn |
| Ember Brazier | 130 | 26 + burn 8/s ×4 s | 0.8 | 5.0 | Fire | Ground | Area burn |
| Wyrmling Roost | 180 | 16 ×2 whelps | 1.0 | 6.0 | Fire | Ground + Air | Summons (air patrol) |

### 7. Flame Forge
- **Description:** A forge that flings fire in a cone, igniting enemies at close range.
- **Lore:** Garrick Slagbeard's first Citadel build; he named it "Old Sizzle" and refuses to upgrade it for sentimental reasons (the player does).
- **Upgrade path:** II — *Bellows* (+cone width). III — *Searing Draft* (Burn stacks to 7).
- **Evolutions:**
  - **A. Inferno Foundry** — Burning enemies spread Burn on death; Burn deals % max HP to bosses. *Trade-off:* a self-feeding combo requires kills.
  - **B. Phoenix Kiln** — Kills collect Ash; at 12 Ash a Phoenix erupts for huge AoE. *Trade-off:* depends on kill pace.
- **Strengths:** Highest short-range DPS; stops regen. **Weaknesses:** Short range; fire-immune enemies.

### 8. Ember Brazier
- **Description:** Lobs flaming coals that leave burning ground.
- **Lore:** A relic of Ember clan siege fields; the coals are legally "borrowed" from Cinderhold.
- **Upgrade path:** II — *Pitch Coals* (+burn duration). III — *Kindling Rain* (extra projectile).
- **Evolutions:**
  - **A. Lavafall Caldera** — Creates lava pools on the path for 20 s that persist. *Trade-off:* pools affect friendly soldiers.
  - **B. Solar Pyre** — Channels a long-range sun beam (Fire/Radiant) that ramps damage on a single target. *Trade-off:* beam breaks on retarget.
- **Strengths:** Zone control; synergizes with chokepoints. **Weaknesses:** Slow projectiles; fire-resistant units.

### 9. Wyrmling Roost
- **Description:** Two fire whelps patrol and attack ground and air targets.
- **Lore:** Pyrrax's discarded eggs, adopted by Citadel scouts.
- **Upgrade path:** II — *Fledged Wings* (+whelp HP, +speed). III — *Dragonfire* (whelps breathe cone attack).
- **Evolutions:**
  - **A. Elder Wyrm Aerie** ◼ — One large wyrm with devastating dive-bomb and breath cone. *Trade-off:* a single point of failure; long respawn.
  - **B. Drake Brood** — Six drakes swarm and shred fliers. *Trade-off:* individually weak; low single-target damage.
- **Strengths:** Flexible anti-air; mobile coverage. **Weaknesses:** Summons can be shot down; Frost-resistant enemies.

---

## 5.5 School 4 — Frost

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Frost Spire | 120 | 14 | 1.0 | 5.0 | Frost | Ground + Air | Slow DPS |
| Permafrost Totem | 130 | 4/s aura | — | 3.5 | Frost | Ground + Air | Slow zone |
| Hailstorm Battery ◼ | 170 | 22 ×5 hail | 0.35 | 7.0 | Frost | Ground | AoE burst |

### 10. Frost Spire
- **Description:** Fires ice shards that slow by 25% for 2 s.
- **Lore:** Isolde Winterwake's early design, grown from a single shard of the Fimbul glacier.
- **Upgrade path:** II — *Rime Tip* (slow 35%). III — *Brittle Frost* (applies Brittle).
- **Evolutions:**
  - **A. Glacier Citadel** — Chance to freeze; frozen enemies shatter for +100% Physical/Sonic damage. *Trade-off:* freeze rolls are probabilistic, bosses immune.
  - **B. Blizzard Engine** — Global weak slow; every 25 s Whiteout freezes all in range. *Trade-off:* low damage output.
- **Strengths:** Shapes enemy flow; synergy with Physical. **Weaknesses:** Frost-resistant units, Shield Maidens.

### 11. Permafrost Totem
- **Description:** An aura totem that slows and chills enemies in a radius.
- **Lore:** Carved from frozen mammoth tusk by Frostbound hunters, then confiscated by a polite Guardian.
- **Upgrade path:** II — *Deep Freeze* (slow 40%). III — *Rime Shield* (allied towers in range gain 10% Frost resist).
- **Evolutions:**
  - **A. Whiteout Monolith** — Fog: enemy ranged units cannot target towers; all enemies −10% accuracy. *Trade-off:* no damage and small radius.
  - **B. Cryo Anchor** — Pulls enemies toward center and roots at center for 1.5 s (elites 0.8 s). *Trade-off:* long cooldown.
- **Strengths:** Aura works on both ground and air. **Weaknesses:** No kill power.

### 12. Hailstorm Battery
- **Description:** Fires a volley of hail that splashes an area.
- **Lore:** A Frostbound siege weapon salvaged from the Fimbul ice lines.
- **Upgrade path:** II — *Larger Stones* (+AoE). III — *Rime Barrage* (volley +2).
- **Evolutions:**
  - **A. Avalanche Cannon** ◼ — Telegraphed 3 s massive AoE with huge damage. *Trade-off:* long warning; fast units escape.
  - **B. Frostbite Gatling** — Rapid shards stack Brittle (+3% damage taken per stack, max 20). *Trade-off:* ~60% damage per shard.
- **Strengths:** Excellent vs clumps and armored lines. **Weaknesses:** Fast enemies, flyers.

---

## 5.6 School 5 — Storm

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Tesla Coil | 150 | 30 (chain 3) | 0.9 | 4.5 | Storm | Ground + Air | Chain DPS |
| Gale Perch | 125 | 12 | 1.6 | 6.0 | Storm | Air priority + Ground | Anti-air + knockback |
| Thunder Drum | 160 | 20 pulse (r2.5) | 0.25 | 2.5 | Storm | Ground | Stun control |

### 13. Tesla Coil
- **Description:** Chain lightning leaps between enemies, ignoring shields.
- **Lore:** Built from Brannoc's early prototype; the Collective deemed it "dangerously whimsical".
- **Upgrade path:** II — *Higher Voltage* (+chain falloff improvement). III — *Capacitor Bank* (chain 5).
- **Evolutions:**
  - **A. Storm Conductor** — Chain 7 and returns; strongest in dense waves. *Trade-off:* less single-target power.
  - **B. Overload Pylon** — Charges; discharge stuns all in range for 1.5 s every 10 s. *Trade-off:* damage reduced.
- **Strengths:** Ignores frontal shields, great vs swarms. **Weaknesses:** Storm-immune machines (Dynamo Hounds).

### 14. Gale Perch
- **Description:** A wind tower that hits air hard and knocks enemies back 0.4 tiles.
- **Lore:** A shrine of a Sky Islands storm-cult; the cult has been very polite about the theft.
- **Upgrade path:** II — *Tail Wind* (+AS). III — *Crosscurrent* (knockback + minor slow).
- **Evolutions:**
  - **A. Cyclone Tower** — A tornado drags enemies in loops, wasting their time. *Trade-off:* damage low; knockback-immune bosses.
  - **B. Skyhammer Aviary** — Hawks mark and dive on fliers for critical hits. *Trade-off:* ground damage near zero.
- **Strengths:** Best early anti-air; dispels weather debuffs. **Weaknesses:** Weak vs armor.

### 15. Thunder Drum
- **Description:** Pulses shockwaves every 4 s that stun enemies in radius.
- **Lore:** Played by Ember drummers to call the clan in, now tuned to the Citadel's weather.
- **Upgrade path:** II — *Heavier Mallets* (+stun duration 0.9 s). III — *Resonant Skin* (forces burrowed units to surface).
- **Evolutions:**
  - **A. Earthshaker Gong** — Line shockwave stuns and shreds armor by 20%. *Trade-off:* narrower coverage.
  - **B. Stormcaller Choir** — Calls random lightning strikes scaling with enemy count in range. *Trade-off:* unreliable single-target.
- **Strengths:** Powerful control for its cost. **Weaknesses:** Bosses; stun diminishing returns.

---

## 5.7 School 6 — Nature

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Nature Grove | 130 | 12 | 0.8 | 4.5 | Nature | Ground | Root control |
| Plague Bloom | 140 | 12 + poison | 1.0 | 5.0 | Nature | Ground + Air | Stacking DoT |
| Beastcaller Lodge | 170 | 12 per beast ×2 | 1.2 | 3.5 rally | Physical/Nature | Ground | Summons |

### 16. Nature Grove
- **Description:** Vines lash and root enemies every 4th hit.
- **Lore:** A seedling given by Thorn Mossbark as a thank-you; it grew into a very opinionated shrub.
- **Upgrade path:** II — *Deep Roots* (root 1.4 s). III — *Briarmother* (roots deal 50% extra damage).
- **Evolutions:**
  - **A. Ancient Heart** — Roots heal Nexus Integrity slowly and regrow disabled towers faster. *Trade-off:* damage minimal.
  - **B. Thornwarden** — Thorn field reflects 15% damage and causes Bleed. *Trade-off:* only effective at short range.
- **Strengths:** Hard CC and sustain. **Weaknesses:** Fire; Verdant enemies resist Nature.

### 17. Plague Bloom
- **Description:** Spits spores that stack poison up to 5 times.
- **Lore:** A cultivar once used by Covenant healers to treat infections, now weaponised in desperation.
- **Upgrade path:** II — *Virulent Spore* (+poison duration). III — *Septic Bloom* (poison reduces healing).
- **Evolutions:**
  - **A. Pandemic Orchid** — Disease jumps to nearby enemies and to flyers. *Trade-off:* slow stacking.
  - **B. Neurotoxin Vine** — Armor shred and paralysis at max stacks. *Trade-off:* single-target focus.
- **Strengths:** Strong vs armored and healer enemies. **Weaknesses:** Nature-resistant, Rivet units (immune).

### 18. Beastcaller Lodge
- **Description:** Summons two beasts (wolf, boar) that fight along the path.
- **Lore:** Trained by Frostbound exiles who refused to freeze their companions.
- **Upgrade path:** II — *Fed Pack* (+HP). III — *Savage Bond* (beasts gain Bleed).
- **Evolutions:**
  - **A. Alpha Den** — Alpha wolf grants the pack +30% attack speed and howls (fear). *Trade-off:* alpha death disrupts the buff.
  - **B. Mammoth Shrine** — Summons a mammoth blocker and trampler. *Trade-off:* a single slow summon.
- **Strengths:** Excellent versatility; blockers. **Weaknesses:** Frost enemies; fast-leaping enemies.

---

## 5.8 School 7 — Shadow

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Shadow Obelisk | 150 | 24 siphon | 0.9 | 5.5 | Shadow | Ground + Air | Souls / scaling |
| Nightblade Den | 160 | 45 backstab ×2 | 0.7 | 4.0 | Phys/Shadow | Ground | Assassin summons |
| Cursed Idol | 140 | 8 + Curse | 1.0 | 5.0 | Shadow | Ground + Air | Debuff |

### 19. Shadow Obelisk
- **Description:** Fires drains that collect Souls on kill; Souls empower its damage (+1% per 10 souls).
- **Lore:** Carved from Hollow Court basalt; the Court's librarians call it "a stolen grief".
- **Upgrade path:** II — *Siphon Channel* (heals nearby hero 1%). III — *Soul Anchor* (Souls last across waves).
- **Evolutions:**
  - **A. Soulreaver Monolith** — Spend Souls for a burst; extra Soul Essence at end of battle. *Trade-off:* must accumulate.
  - **B. Eclipse Pillar** — An Eclipse zone: enemies −resist, lose stealth; towers inside gain lifesteal-like Mana restore. *Trade-off:* small radius.
- **Strengths:** Scaling and Soul Essence farm. **Weaknesses:** Weak early; Radiant enemies.

### 20. Nightblade Den
- **Description:** Two stealthy assassins hunt isolated enemies and strike for backstab damage.
- **Lore:** A Dominion guild who realized their targets were their own teachers.
- **Upgrade path:** II — *Venom Edge* (+poison). III — *Assassinate* (execute below 10%).
- **Evolutions:**
  - **A. Phantom Guild** — 4 phantoms attack in rapid multi-strikes. *Trade-off:* low HP; reveal.
  - **B. Shadowstep Sanctum** — Assassins teleport to the highest-HP target and hit for 150% damage. *Trade-off:* long cooldown.
- **Strengths:** Great vs healers and elites. **Weaknesses:** Swarms; revealed by Truth Lantern.

### 21. Cursed Idol
- **Description:** Applies Curse (+15% damage taken) for 6 s.
- **Lore:** A totem from a vanished tribe. The carving's eyes are always looking at the strongest enemy.
- **Upgrade path:** II — *Heavy Hex* (+20%). III — *Malediction* (Curse spreads to adjacent enemies).
- **Evolutions:**
  - **A. Doomsayer Effigy** — Stacks Doom; at 5 stacks marks target for a large burst. *Trade-off:* slow build-up.
  - **B. Withering Throne** — Aura of decay deals % max HP per second (0.5%/s vs bosses). *Trade-off:* damage plateau.
- **Strengths:** Team multiplier; boss-friendly. **Weaknesses:** Curse-immune enemies (Inquisitor Seraph).

---

## 5.9 School 8 — Radiant

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Sun Beacon | 160 | 38 pierce | 0.8 | 6.5 | Radiant | Ground + Air | Pierce DPS |
| Sanctuary Shrine | 150 | — | — | 4.0 | Radiant | — | Heal/cleanse |
| Truth Lantern | 130 | 14 | 1.0 | 5.5 | Radiant | Ground + Air | Reveal + mark |

### 22. Sun Beacon
- **Description:** A beam that pierces all enemies in a line.
- **Lore:** A Celestial defector's last gift; the lens is still warm to the touch.
- **Upgrade path:** II — *Focus Crystal* (+range). III — *Dawn Surge* (+damage vs Shadow/Void).
- **Evolutions:**
  - **A. Dawnbreaker Prism** — Beam splits into three. *Trade-off:* each beam weaker.
  - **B. Judgment Beam** — Channeled beam ramps up on a single target. *Trade-off:* interrupted by retarget.
- **Strengths:** Hard-counters Hollow and Void. **Weaknesses:** Radiant-resistant Celestial enemies.

### 23. Sanctuary Shrine
- **Description:** Heals Nexus Integrity slowly, cleanses towers of disables and heals allied units.
- **Lore:** Seraphine's field shrine, pre-blessed by pilgrims from three realms.
- **Upgrade path:** II — *Pilgrim's Rest* (heal rate). III — *Purifying Flame* (cleanse every 10 s automatically).
- **Evolutions:**
  - **A. Aegis Sanctum** — Grants barriers that absorb one large hit for towers and the hero. *Trade-off:* shorter cleanse range.
  - **B. Resurrection Altar** — Revives a fallen hero faster; rebuilds a destroyed/disabled tower free once. *Trade-off:* long cooldown.
- **Strengths:** The only reliable answer to saboteurs. **Weaknesses:** No damage.

### 24. Truth Lantern
- **Description:** Reveals hidden enemies and marks them for +10% damage.
- **Lore:** Lit with a flame taken from the Arbiter's own court; it cannot be made to lie.
- **Upgrade path:** II — *Wider Glow* (+range). III — *Clarity* (marks last longer).
- **Evolutions:**
  - **A. Lighthouse of Verity** — Global reveal and anti-illusion; strips phase/blink for 2 s on mark. *Trade-off:* low damage.
  - **B. Prismatic Lantern** — Converts damage types of towers in range to a chosen type. *Trade-off:* lose special properties.
- **Strengths:** Counters stealth/illusion. **Weaknesses:** Low DPS.

---

## 5.10 School 9 — Crystal

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Crystal Cannon ◼ | 170 | 80 (armor pierce 40%) | 0.45 | 7.0 | Arcane | Ground + Air | Heavy DPS |
| Resonance Pylon | 150 | 22 (AoE r2) | 0.7 | 3.8 | Arcane (Sonic) | Ground | Shatter AoE |
| Shard Harvester | 140 | — | — | 3.0 | — | — | Economy |

### 25. Crystal Cannon
- **Description:** A heavy cannon firing crystal slugs that ignore part of armor.
- **Lore:** Born in the Resonant Waste; legend says the first slug was the Choir's missing note.
- **Upgrade path:** II — *Cut Facets* (+pierce). III — *Resonant Core* (shots bounce once).
- **Evolutions:**
  - **A. Prism Destroyer** ◼ — Continuous prismatic laser; ramps up and splits into the spectrum (Radiant/Arcane). *Trade-off:* warm-up time.
  - **B. Nexus Artillery** ◼ — Extreme range; player-aimed barrages (Mana cost). *Trade-off:* manual and slow.
- **Strengths:** Dominates armored targets. **Weaknesses:** Slow fire rate; vulnerable to mirror reflections.

### 26. Resonance Pylon
- **Description:** Emits sonic pulses that deal bonus damage (+50%) to crystalline and mechanical enemies.
- **Lore:** Wick named the first one "the singing wire"; Iron Collective engineers called it "unfair".
- **Upgrade path:** II — *Tuned Pitch* (+AoE). III — *Harmonic Overtone* (stacks vibration debuff).
- **Evolutions:**
  - **A. Harmonic Shatterer** — Stacking vibration; at full it detonates for heavy damage on armored targets. *Trade-off:* low standalone damage.
  - **B. Echo Spire** — Repeats the last damage instance 2 s later (echo). *Trade-off:* echo only works if the target is still alive.
- **Strengths:** Hard counter to armor/crystalline. **Weaknesses:** Short range.

### 27. Shard Harvester
- **Description:** Mines crystals as enemies die nearby; +15% kill gold in range and a trickle of passive Gold.
- **Lore:** The Waste is generous with shards to anyone who sings back.
- **Upgrade path:** II — *Deep Vein* (+passive Gold). III — *Gem Cut* (adds bonus end-of-battle Crystal Shards).
- **Evolutions:**
  - **A. Gem Exchange** — Allows converting Gold ↔ Mana at a rate; stores a Reserve. *Trade-off:* conversion fees.
  - **B. Prismatic Reactor** — Converts shards into reactor power; adjacent towers periodically get free Overcharge. *Trade-off:* consumes economy.
- **Strengths:** Strongest economy scaling. **Weaknesses:** No damage; targeted by Gem Thieves.

---

## 5.11 School 10 — Void & Time

| Tower | Cost | Damage | AS | Range | Type | Targets | Role |
|---|---|---|---|---|---|---|---|
| Void Rift | 170 | 16/tick (pull) | 2.0 | 4.5 | Void | Ground | Gravity control |
| Chrono Pendulum | 160 | 12 | 1.0 | 5.0 | Void (Temporal) | Ground + Air | Slow and rewind |
| Anchor Pillar | 150 | 20 | 0.8 | 5.0 | Void/Radiant | Ground + Air | Anti-dimensional |

### 28. Void Rift
- **Description:** Opens a small rift pulling enemies toward its center while shredding them.
- **Lore:** Vael's first gift to the Citadel, with a note: "Do not stare."
- **Upgrade path:** II — *Wider Maw* (+area). III — *Collapsing Edge* (pull strength +30%).
- **Evolutions:**
  - **A. Singularity Engine** — Collapsing black hole with an execute threshold. *Trade-off:* long cooldown; clumped enemies also leave the tower's range together, so it rewards precise placement.
  - **B. Event Horizon Gate** — Portals that send enemies back along the path by N tiles. *Trade-off:* lower direct damage.
- **Strengths:** Fantastic vs mobs. **Weaknesses:** Bosses are immune to pull; Singularity Larvae interactions.

### 29. Chrono Pendulum
- **Description:** Slows enemies and has a 5% chance per hit to rewind an enemy 1 tile.
- **Lore:** Orrin Quill's desk toy. He says it "mostly works."
- **Upgrade path:** II — *Fine Calibration* (+slow). III — *Time Debt* (rewinds more often).
- **Evolutions:**
  - **A. Epoch Engine** — Time Stop pulses freeze nearby units for 1 s (elites 0.5 s). *Trade-off:* low damage.
  - **B. Paradox Loom** — Duplicates attacks of adjacent towers 1.5 s later. *Trade-off:* needs neighbors.
- **Strengths:** A flexible slow with tower synergy. **Weaknesses:** Low damage; boss-resistant.

### 30. Anchor Pillar
- **Description:** Prevents blinking, phasing and teleporting in its radius and strips evasion.
- **Lore:** The Citadel's first defense against the Interstice; hammered into the stone by Garrick.
- **Upgrade path:** II — *Deeper Foundation* (+radius). III — *Counterspell Field* (silence for casters in range).
- **Evolutions:**
  - **A. Reality Stake** — Nullifies enemy abilities (silence + shield break). *Trade-off:* very short range.
  - **B. Planar Lock** — A bubble shielding towers in range from sabotage and reflecting disables. *Trade-off:* the bubble can be overloaded by too many hits.
- **Strengths:** Essential against Dominion/Void/Djinn. **Weaknesses:** Low damage, niche otherwise.

---

## 5.12 Evolution Quick Reference (60)

| # | Base | Evolution A | Evolution B |
|---|---|---|---|
| 1 | Arcane Tower | Archmage Spire | Temporal Beacon |
| 2 | Rune Warden | Glyph Labyrinth | Sigil Executioner |
| 3 | Mana Font | Leyline Nexus | Spellforge Engine |
| 4 | Ballista Post | Siege Repeater | Dragonbane Rail |
| 5 | Garrison Barracks | Shieldwall Bastion | Vanguard Lancers |
| 6 | Mortar Emplacement | Siege Howitzer | Cluster Pit |
| 7 | Flame Forge | Inferno Foundry | Phoenix Kiln |
| 8 | Ember Brazier | Lavafall Caldera | Solar Pyre |
| 9 | Wyrmling Roost | Elder Wyrm Aerie | Drake Brood |
| 10 | Frost Spire | Glacier Citadel | Blizzard Engine |
| 11 | Permafrost Totem | Whiteout Monolith | Cryo Anchor |
| 12 | Hailstorm Battery | Avalanche Cannon | Frostbite Gatling |
| 13 | Tesla Coil | Storm Conductor | Overload Pylon |
| 14 | Gale Perch | Cyclone Tower | Skyhammer Aviary |
| 15 | Thunder Drum | Earthshaker Gong | Stormcaller Choir |
| 16 | Nature Grove | Ancient Heart | Thornwarden |
| 17 | Plague Bloom | Pandemic Orchid | Neurotoxin Vine |
| 18 | Beastcaller Lodge | Alpha Den | Mammoth Shrine |
| 19 | Shadow Obelisk | Soulreaver Monolith | Eclipse Pillar |
| 20 | Nightblade Den | Phantom Guild | Shadowstep Sanctum |
| 21 | Cursed Idol | Doomsayer Effigy | Withering Throne |
| 22 | Sun Beacon | Dawnbreaker Prism | Judgment Beam |
| 23 | Sanctuary Shrine | Aegis Sanctum | Resurrection Altar |
| 24 | Truth Lantern | Lighthouse of Verity | Prismatic Lantern |
| 25 | Crystal Cannon | Prism Destroyer | Nexus Artillery |
| 26 | Resonance Pylon | Harmonic Shatterer | Echo Spire |
| 27 | Shard Harvester | Gem Exchange | Prismatic Reactor |
| 28 | Void Rift | Singularity Engine | Event Horizon Gate |
| 29 | Chrono Pendulum | Epoch Engine | Paradox Loom |
| 30 | Anchor Pillar | Reality Stake | Planar Lock |

## 5.13 Unlock Schedule

| Unlock point | Towers |
|---|---|
| **Starter (8)** | Arcane Tower, Ballista Post, Garrison Barracks, Flame Forge, Frost Spire, Mana Font, Nature Grove, Tesla Coil |
| Act I | Plague Bloom, Beastcaller Lodge, Gale Perch |
| Act II | Sun Beacon, Rune Warden, Cursed Idol |
| Act III | Ember Brazier, Wyrmling Roost, Thunder Drum |
| Act IV | Mortar Emplacement, Sanctuary Shrine |
| Act V | Permafrost Totem, Hailstorm Battery |
| Act VI | Crystal Cannon, Resonance Pylon, Shard Harvester |
| Act VII | Chrono Pendulum, Anchor Pillar |
| Act VIII | Shadow Obelisk, Nightblade Den |
| Act IX | Truth Lantern |
| Act X | Void Rift |

Unlocks cost Crystal Shards at the Research Lab once the prerequisite Act is cleared. Towers can be bought out of order within cleared Acts. **Design rule:** every enemy in an Act has at least one counter in the starter set plus that Act's unlocks.

## 5.14 Tower Mastery

Each tower has Mastery levels 1–20 earned by use (damage dealt, kills, special triggers). Mastery grants:
- Cosmetic skins and effects (levels 5, 10, 15, 20).
- Small sidegrade perks, e.g. −3% cost, +2% range, or a tiny passive refinement. Cap: total ≤ +15% across any one stat.
- A tower-specific challenge map at Mastery 10 and 20.
