# 7. Enemies

**100 standard enemy types** (10 per faction) plus **20 bosses** (see [07-bosses.md](07-bosses.md)).

## 7.1 Categories

| Category | Code | Design purpose |
|---|---|---|
| Infantry | I | Baseline pressure, teach positioning |
| Elite | E | High HP threats and mechanics checks |
| Magical | M | Support casters, debuffers, healers |
| Flying | F | Bypass blockers; require anti-air |
| Mechanical | Mc | Armored; immune to some statuses; weak to Storm/Arcane |
| Dimensional | D | Phase, blink, teleport, stealth; require reveal/anchor |
| Boss | B | Unique mechanics (separate document) |

Each faction has 10 enemies spanning at least four categories. Some entries carry two tags (e.g., Elite + Mechanical); the first tag is primary.

## 7.2 Stat Conventions

- **HP** is the base value at Normal wave 1 equivalent; actual HP = HP × `waveScalar(w)` × `difficultyScalar`.
- **Spd** is in tiles per second (0.4 very slow … 2.2 very fast).
- **Threat** (Integrity lost on leak): Infantry 1, Magical 2, Flying 2, Mechanical 2, Elite 3–5, Dimensional 2, swarm units 1 per 3 bodies.
- **Armor** is flat Physical reduction (see combat rules).
- **R:** resist values (default %). **W:** weakness (+25% damage unless a number is given).
- **Counterplay** lists soft counters; there are always three or more viable answers.

## 7.3 Wave Composition Principles

1. Each wave contains a **core** (60%), a **pressure** unit (20%), and a **mechanic** unit (20%) that tests a specific mechanic.
2. Never introduce two new mechanics in one wave.
3. A new enemy type appears at least one wave before it becomes dangerous.
4. Flying enemies are introduced only after the player has seen the Gale Perch or Arcane Tower.
5. Elites arrive in the second half of a battle, never within three waves of a boss.
6. Endless/Rift mode mixes factions using the interaction matrix (see [03-factions.md](03-factions.md#411-faction-interaction-matrix)).

---

## 7.4 Verdant Covenant (VRD)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| VRD-01 | Thornling Scout (I) | 80 / 1.6 | Saplings animated by Covenant seed-songs to probe defenses. | **Regrow:** +2 HP/s after 3 s without damage. | R: Nature 50. W: Fire. | Burst damage; Burn prevents regrowth. |
| VRD-02 | Bark Guard (I) | 220 / 0.8 | Veterans whose skin hardened into bark during the Locust Crusade. | **Armor 20.** | R: Phys 30, Nature 50. W: Fire, Storm. | Fire, Storm, armor-piercing Crystal. |
| VRD-03 | Spore Carrier (I) | 130 / 1.0 | Walking fungal cultures; the Covenant calls them "gentle". | **Spore Cloud** on death: towers in r1.5 −20% attack speed for 4 s. | R: Nature 75. W: Radiant, Fire. | Kill with long-range; Sanctuary cleanse. |
| VRD-04 | Mossback Brute (E) | 650 / 0.7 | Bear-sized bruisers bred for breaching walls. | **Regenerate** 3%/s when undamaged 3 s; **Ground Slam** stuns soldiers. | R: Nature 50, Phys 20. W: Fire. | Sustained DPS; Fire stops regen; avoid blockers. |
| VRD-05 | Wolf-Rider Hunter (I) | 160 / 2.2 | Light cavalry riding dire wolves. | **Leap:** jumps the first blocker once. | W: Frost. | Frost/Gale CC; Mortar splash. |
| VRD-06 | Druid Warden (M) | 180 / 0.9 | Battlefield healers who sing to wounds. | **Rejuvenation Aura** r2.5: allies heal 4%/s. | R: Arcane 25. W: Shadow, Phys. | Priority target: Nightblade, Ballista, Hero. |
| VRD-07 | Pollen Wisp (F) | 100 / 1.4 | Drifting sprites that dust towers with sleeping pollen. | **Dust:** marked tower −30% accuracy (miss chance) for 4 s. | R: Nature 50. W: Storm. | AoE/chain/homing; Gale Perch. |
| VRD-08 | Treant Colossus (E) | 2400 / 0.4 | A walking grove, ancient and unhurried. | **Overgrowth:** +10% max HP per 10 s alive; at 50% HP spawns 3 Thornlings. | R: Nature 75, Phys 30. W: Fire 50. | Fire; kill fast to prevent growth. |
| VRD-09 | Briar Burrower (I) | 200 / 1.1 | Tunnelers that sow thorns under walls. | **Burrow:** untargetable by ground-only towers for 3 s every 10 s. | R: Phys 25. W: Storm. | Thunder Drum forces surfacing; Mortar after surface. |
| VRD-10 | Gloomcap Shaman (M) | 170 / 0.9 | A fungal mystic who whispers rot into stone. | **Rot Bloom:** nearest tower −25% range for 8 s. | R: Shadow 25. W: Radiant. | Radiant/Sanctuary cleanse; focus fire. |

## 7.5 Ashen Sultanate (ASH)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| ASH-01 | Dune Skirmisher (I) | 90 / 1.8 | Nomad raiders loyal to the Sultanate's sun-oaths. | **Sand Veil:** 25% evasion vs projectiles on sand tiles. | W: Storm. | Beams, AoE, hitscan, Storm chain. |
| ASH-02 | Mummified Legionnaire (I) | 260 / 0.8 | Soldiers who preserved themselves rather than die. | **Armor 15; Dry Wraps:** take +50% Burn damage. | R: Frost 50, Shadow 50. W: Fire 50, Radiant. | Fire is excellent; Radiant; avoid Frost. |
| ASH-03 | Scarab Swarm (I) | 6 × 60 / 1.5 | Carrion beetles, loyal to whoever is dead. | **Swarm:** spawns in groups of 6; share target. | R: Phys 25. W: AoE (Fire, Storm). | Mortar, Hailstorm, Tesla chains. |
| ASH-04 | Sandstorm Priest (M) | 200 / 0.8 | Clergy who pray for wind. | **Sandstorm:** tower range −20% in r3 (moves with priest). | R: Arcane 25. W: Storm (wind). | Gale Perch; focus fire; Truth Lantern. |
| ASH-05 | Serpent Adept (M) | 140 / 1.0 | Venom casters that spit at soldiers. | **Venom Spit** (range 3): poisons soldiers/hero. | R: Nature 75. W: Frost. | Outrange (Ballista, Mortar); cleanse. |
| ASH-06 | Sphinx Guard (E) | 900 / 0.7 | Riddle-knights who never answer the same question twice. | **Riddle Shell:** after a damage type hits, gains 50% resist to that type for 4 s (up to 3 types). | R: adaptive. W: none. | Mixed damage; rotate types; burst before adaptation. |
| ASH-07 | Canopic Wraith (F) | 150 / 1.2 | A spirit carrying the jar of its own heart. | **Soul Jar:** revives the last dead ally within 4 tiles at 40% HP (15 s cooldown). | R: Phys 50, Shadow 50. W: Radiant, Arcane. | Radiant; kill the wraith first; Arcane Tower. |
| ASH-08 | Chariot of the Sun (E) | 500 / 1.8 | Golden chariots drawn by ghost-horses. | **Sun Charge:** +100% speed for 2 s; ignores the first CC after spawning. | R: Fire 25. W: Frost. | Stuns and roots after charge; Thunder Drum; Nature Grove. |
| ASH-09 | Dust Djinn (D) | 320 / 1.2 | Beings from a pocket desert dimension. | **Phase:** intangible 1.5 s every 8 s (passes soldiers). | R: Phys 50. W: Radiant. | Anchor Pillar; Truth Lantern; DoT. |
| ASH-10 | Sandstone Golem (E) | 1800 / 0.5 | Obelisk-walkers; ancient guards of buried tombs. | **Armor 35; Crumble:** below 50% HP sheds armor but gains +40% speed. | R: Phys 50, Fire 25. W: Sonic, Frost. | Crystal Cannon, Resonance Pylon, Magic. |

## 7.6 Ember Clans (EMB)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| EMB-01 | Cinder Raider (I) | 110 / 1.5 | Fire-raiders who torch everything they cannot take. | **Torch:** applies Overheat to a tower: −20% attack speed 5 s. | R: Fire 50. W: Frost. | Frost; Sanctuary cleanse. |
| EMB-02 | Magma Brute (E) | 800 / 0.7 | Molten warriors forged in caldera ritual. | **Lava Trail:** 3 s fire trail damaging soldiers/hero. | R: Fire 75. W: Frost 50 (hardens: −50% speed extra). | Frost towers; avoid Barracks. |
| EMB-03 | Slagthrower (I) | 150 / 0.9 | Siege-troops hurling molten slag. | **Slag Shot** (range 4): disables a tower 3 s per 6 s. | R: Fire 25. W: Frost. | Outrange with Ballista; Planar Lock. |
| EMB-04 | Ember Shaman (M) | 170 / 0.9 | Spiritual leaders of the war drums. | **War Cry** r3: allies +25% speed, +15% fire resist, 5 s. | R: Fire 50. W: Frost, Shadow. | Kill first; Nightblade; Ballista. |
| EMB-05 | Obsidian Berserker (E) | 700 / 1.0 | Warriors who tattooed their rage into their skin. | **Enrage:** +4% speed per 10% HP lost (max +40%); stun-immune below 30%. | R: Fire 50, Phys 25. W: Nature, Frost. | Hard CC early; burst; Roots. |
| EMB-06 | Imp Swarm (F) | 8 × 40 / 1.9 | Cinderhold imps; small, loud, gleeful. | **Kamikaze:** detonate on towers; disable 2 s. | R: Fire 75. W: Frost, AoE. | Tesla chains; Hailstorm; Gale Perch. |
| EMB-07 | Lava Hound (I) | 180 / 2.0 | Beasts bred to run through lava. | **Pounce:** leaps 2 tiles over blockers; **Burning Aura** harms soldiers. | R: Fire 50. W: Frost. | Frost, Roots; Mortar. |
| EMB-08 | Drake Rider (F, E) | 420 / 1.3 | Riders atop young drakes. | **Bomb Run:** drops fire bombs on up to 3 towers. | R: Fire 25. W: Storm, Frost. | Gale Perch; Wyrmling Roost; Ballista. |
| EMB-09 | Standard-Bearer (E) | 600 / 0.8 | Carries the clan's banner; dropping it is shame. | **Banner of Cinders** r4: allies −20% damage taken; drops banner for 5 s. | W: Shadow. | Priority kill; Curse; Truth Lantern. |
| EMB-10 | Phoenix Hatchling (M) | 200 / 1.1 | A hatchling that has burned itself before. | **Rebirth:** revives once at 50% HP after 2 s unless hit by Frost/Radiant. | R: Fire 100. W: Frost 50. | Frost/Radiant before it dies. |

## 7.7 Iron Collective (IRN)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| IRN-01 | Rivet Trooper (Mc) | 140 / 1.0 | Mass-produced infantry; every unit signs the same oath. | **Armor 10; Formation:** +5% armor per adjacent trooper. | R: Nature 100 (immune to poison). W: Storm 25. | Storm, Arcane, Crystal; AoE to split. |
| IRN-02 | Clockwork Sapper (Mc) | 100 / 1.7 | Sprinting bombs in a tin shell. | **Sabotage:** explodes on a tower: disable 4 s. | R: Nature 100. W: Storm. | Kill early; Sanctuary cleanse; Aegis Sanctum. |
| IRN-03 | Steam Walker (Mc, E) | 1100 / 0.6 | A two-story walker venting steam through its joints. | **Steam Vent:** shield +300 HP every 12 s; −50% Frost effects. | R: Nature 100, Frost 50. W: Storm 50. | Burst to break the shield; Storm; Arcane. |
| IRN-04 | Repair Drone (F, Mc) | 120 / 1.5 | Floating engineers with soldering arms. | **Repair:** mechanical allies heal 6%/s. | R: Phys 25. W: Storm. | Gale Perch; Tesla; Ballista. |
| IRN-05 | Gearwright Engineer (I) | 200 / 0.9 | A field engineer; carries tools and opinions. | **Scrap Barricade:** blocks soldiers; repairs mechanical allies 10%/s. | W: Shadow. | Kill priority; Nightblade; Mortar. |
| IRN-06 | Dynamo Hound (Mc) | 160 / 2.0 | A mechanical hound that runs on lightning. | **Static Skin:** immune to Storm; shocks adjacent soldiers. | R: Storm 100. W: Arcane 50. | Arcane, Frost, Physical; avoid Tesla. |
| IRN-07 | Siege Crawler (E, Mc) | 2200 / 0.4 | A crawling bastion that outranges towers. | **Bombard** (range 6): disables a tower 5 s every 8 s; **Armor 25.** | R: Nature 100. W: Storm 25. | Mortar/Howitzer; Nexus Artillery; Planar Lock. |
| IRN-08 | Gyrocopter Bomber (F, Mc) | 300 / 1.4 | Single-seat bombers, ridiculously noisy. | **Bomb Drop:** hits towers; **Armor 15.** | R: Nature 100. W: Storm 50. | Gale Perch; Wyrmling; Ballista. |
| IRN-09 | Plated Juggernaut (E, Mc) | 3000 / 0.5 | A walking wall designed to withstand siege fire. | **Armor 50; knockback immune.** | R: Phys 75, Nature 100. W: Storm 50, Arcane 50. | Magic, Resonance, Crystal; Plague (armor shred cannot apply). |
| IRN-10 | Aegis Pylon Walker (Mc) | 500 / 0.7 | A walker carrying a barrier pylon. | **Dome** r2: absorbs 600 damage then collapses (15 s). | W: Arcane 50. | Burst; Anchor suppresses dome; magic. |

## 7.8 Frostbound Reach (FRS)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| FRS-01 | Frostbite Raider (I) | 130 / 1.2 | Axe-raiders who chill the air around them. | **Chill Touch:** slows soldiers 30%. | R: Frost 50. W: Fire. | Fire; Barracks. |
| FRS-02 | Shieldmaiden (I) | 320 / 0.8 | The Reach's front line, shields rimmed with ice. | **Frontal Block:** single-target projectiles −60%. | R: Frost 50. W: Storm chain, AoE. | Tesla, Mortar, Hailstorm. |
| FRS-03 | Snow Wolf (I) | 100 / 2.2 | Pack hunters. | **Pack Hunter:** +10% speed per wolf nearby. | R: Frost 50. W: Fire. | Roots; Mortar; Barracks. |
| FRS-04 | Rimecaster (M) | 190 / 0.9 | Frost-priests who "calm" the machinery of foes. | **Flash Freeze:** freezes a tower 3 s (8 s cooldown). | R: Frost 75. W: Fire, Shadow. | Kill priority; Sanctuary; Planar Lock. |
| FRS-05 | Glacial Behemoth (E) | 2000 / 0.5 | A glacier-wrought giant. | **Ice Armor 30:** each Burn stack removes 3 armor. | R: Frost 75, Phys 25. W: Fire 50. | Fire; Brazier; Flame Forge. |
| FRS-06 | Blizzard Harpy (F) | 150 / 1.6 | Winged screamers in whiteout. | **Whiteout Screech** r3: tower range −15%. | R: Frost 50. W: Storm, Fire. | Gale Perch; Wyrmling; Ballista. |
| FRS-07 | Yeti Berserker (E) | 900 / 1.0 | Wild yetis who hate the sound of machines. | **Rampage:** ignores slow; +20% speed below 50% HP. | R: Frost 50. W: Fire. | Hard CC (stun/root); burst. |
| FRS-08 | Tundra Mammoth (E) | 3200 / 0.4 | A living siege engine of fur and tusks. | **Trample:** kills soldiers; knockback on towers' pads (disable 1 s). | R: Frost 50, Phys 30. W: Fire, Storm. | Sustained DPS; avoid blockers. |
| FRS-09 | Whiteout Wraith (D) | 260 / 1.1 | Spirits of the Fimbul Reach's lost expeditions. | **Fog Cloak:** invisible during blizzard weather or Fog zones. | R: Frost 75, Phys 50. W: Radiant, Fire. | Truth Lantern; Radiant; AoE. |
| FRS-10 | Hailcaster Archer (I) | 150 / 0.9 | Archers whose arrows are made of ice. | **Frost Arrow** (range 5): chills hero. | R: Frost 50. W: Fire. | Outrange; Barracks. |

## 7.9 Crystalline Choir (CRY)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| CRY-01 | Shard Sprite (F) | 70 / 1.8 | Splinters of the Choir's broken song. | **Refraction:** 30% chance to deflect Radiant/Arcane beams. | R: Arcane 50. W: Phys 25, Sonic. | Physical; Gale Perch; Resonance. |
| CRY-02 | Prism Knight (I) | 300 / 0.9 | Knights clad in cut crystal. | **Mirror Plating:** reflects 15% of beam damage back. | R: Radiant 50, Arcane 25. W: Phys, Sonic. | Physical; avoid beam spam. |
| CRY-03 | Geode Crawler (I) | 240 / 0.7 | Rock-like crawlers with hidden gem cores. | **Armor 25; Shell Curl:** invulnerable 2 s at 50% HP, then +100% damage taken. | R: Phys 50. W: Sonic. | Resonance Pylon; Crystal Cannon; patient DPS. |
| CRY-04 | Resonant Cantor (M) | 180 / 0.9 | Singers who hold a single endless note. | **Chord Aura:** allies +20% speed, −15% damage taken; stacks up to 3 Cantors. | R: Arcane 25. W: Shadow. | Priority kill; Nightblade; Curse. |
| CRY-05 | Quartz Colossus (E) | 2600 / 0.4 | Towering crystalline guardians. | **Armor 35; Geode Heart:** splits into 4 Crawlers on death. | R: Phys 50. W: Sonic 100. | Resonance Pylon; Crystal Cannon; AoE for crawlers. |
| CRY-06 | Mirror Dancer (M) | 210 / 1.4 | Dancers who step between reflections. | **Mirror Step:** blinks 2 tiles every 6 s, leaves a decoy that absorbs one shot. | W: Radiant, Truth. | Truth Lantern; Anchor; AoE. |
| CRY-07 | Crystal Wyrmlet (F) | 380 / 1.2 | Shard-winged hatchlings of the Waste. | **Shard Breath:** pierces; target tower −10% damage for 6 s. | R: Arcane 50. W: Phys, Sonic. | Ballista; Gale; Wyrmling. |
| CRY-08 | Harmonic Siren (M) | 160 / 1.0 | A singer whose voice splinters machines. | **Shatter Note:** silences tower abilities and Overcharge for 3 s. | W: Shadow. | Kill; Anchor immunity; Sanctuary. |
| CRY-09 | Gem Thief (I) | 120 / 1.9 | Opportunistic scavengers of the Waste. | **Pilfer:** on leak steals 5% of current Gold (returned ×2 if killed). | W: Frost. | Slow and kill; Frost, Roots. |
| CRY-10 | Fractal Echo (D) | 280 / 1.0 | A recursive refraction of a long-dead dancer. | **Split:** splits into two 40% HP copies at 50% HP (once). | R: Arcane 50. W: Sonic, AoE. | AoE; Resonance; Void Rift. |

## 7.10 Arcane Dominion (ARC)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| ARC-01 | Apprentice Spellblade (I) | 150 / 1.3 | Students who graduated early by the Fracture. | **Cantrip Ward:** absorbs the first spell hit. | R: Arcane 25. W: Phys. | Physical; Ballista; Barracks. |
| ARC-02 | Arcane Construct (Mc) | 450 / 0.8 | Summoned guards of animated stone. | **Anti-Magic Core:** Arcane 50. Explodes on death (600 Arcane to adjacent soldiers). | R: Arcane 50. W: Storm, Shadow. | Physical, Storm; avoid blocker clustering. |
| ARC-03 | Spell Thief (M) | 180 / 1.1 | A dropout who learned to steal spells. | **Siphon:** drains 3 Mana/s while alive within tower range; converts to shield. | R: Arcane 25. W: Phys. | Kill; Anchor; high-DPS Physical. |
| ARC-04 | Warded Magister (E, M) | 800 / 0.8 | A senior mage under a permanent ward. | **Ward Bubble:** absorbs 500 damage, recast every 12 s unless silenced. | R: Arcane 50. W: Void. | Burst; Anchor (silence); Physical. |
| ARC-05 | Aether Familiar (F) | 140 / 1.7 | Tethered spirit pets of the Dominion. | **Familiar Bond:** shares 30% damage with its master. | R: Arcane 50. W: Radiant. | Kill familiar first; AoE. |
| ARC-06 | Rune Golem (Mc, E) | 2000 / 0.5 | A golem etched with a dozen shifting runes. | **Rune Plating:** rotates immunity every 6 s (Fire → Frost → Storm); telegraphed glow. | R: rotating 100 (shown by color). W: Void. | Rotate damage types; Mixed loadouts. |
| ARC-07 | Blink Mage (M) | 160 / 1.0 | A mage who prefers not to walk. | **Blink:** teleports 3 tiles forward every 7 s, ignoring blockers. | R: Arcane 25. W: Phys. | Anchor; Chrono slow; burst. |
| ARC-08 | Battlemage Phalanx (E) | 1100 / 0.8 | Four mages marching in disciplined formation. | **Phalanx:** with 3+ nearby, −30% damage taken. | R: Arcane 25. W: Void Rift split, AoE. | Break formation with Rift/pull; Mortar. |
| ARC-09 | Tome Wraith (D) | 300 / 1.2 | A possessed grimoire trailing pages. | **Page Storm:** silences tower abilities in r2. | R: Phys 50. W: Fire 50, Radiant. | Fire; Truth Lantern; Anchor. |
| ARC-10 | Dominion Inquisitor (E) | 1300 / 1.0 | Hunters of unauthorised magic. | **Dispel:** strips buffs from towers within r3 every 10 s. | R: Arcane 50. W: Phys, Shadow. | Don't rely on buffs; outrange with Ballista. |

## 7.11 Hollow Court (HOL)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| HOL-01 | Skeletal Footman (I) | 120 / 1.0 | The remembered who refused to rest. | **Reassemble:** rises once at 30% HP unless Radiant/Fire hits within 3 s. | R: Shadow 100, Frost 50, Nature 100. W: Radiant. | Radiant; Fire; clear corpses. |
| HOL-02 | Wailing Banshee (F, M) | 140 / 1.5 | A mourner whose cry is a weapon. | **Wail:** stuns soldiers/hero 1.5 s; Phys 50 resist (ethereal). | R: Phys 50, Shadow 100. W: Radiant, Arcane. | Arcane Tower; Radiant; Gale. |
| HOL-03 | Grave Ghoul (I) | 260 / 1.4 | Eaters of the forgotten. | **Feed:** heals 20% from adjacent corpses; leaves a corpse. | R: Nature 100. W: Fire. | Burn corpses; Flame Forge; speed. |
| HOL-04 | Bone Collector (E) | 900 / 0.7 | Collects bones for its massive ossuary. | **Ossuary:** consumes nearby corpses, gaining +5 armor each (max 25). | R: Phys 25, Shadow 100. W: Fire, Radiant. | Fire; clear corpses; Mortar. |
| HOL-05 | Soul Binder (M) | 200 / 0.9 | Priest of a soul-sharing contract. | **Bind:** links 3 allies; damage is shared. | R: Shadow 50. W: Radiant, Anchor (breaks links). | Single-target burst; Anchor. |
| HOL-06 | Wraith Knight (E) | 1000 / 1.0 | A noble who answered death with a vow. | **Ethereal Step:** 40% Phys reduction; 2 s intangible every 10 s. | R: Phys 50, Shadow 50. W: Radiant, Arcane. | Radiant; Arcane; Truth Lantern. |
| HOL-07 | Plague Crow (F) | 90 / 2.0 | Crows that feed on the Court's dead. | **Pestilence:** towers hit lose 15% attack speed, stacking 3. | R: Shadow 50. W: Storm, Fire. | Gale Perch; Tesla chain. |
| HOL-08 | Lich Acolyte (M) | 230 / 0.8 | Novice liches bound to their phylactery scrolls. | **Raise:** raises 2 skeletons from corpses every 10 s. | R: Shadow 75. W: Radiant. | Kill priority; burn corpses. |
| HOL-09 | Shade Stalker (I) | 130 / 1.6 | A hunter in a forgotten face. | **Stealth:** invisible until adjacent to a tower; disables it on first hit. | R: Phys 50. W: Radiant. | Truth Lantern; Radiant. |
| HOL-10 | Hollow Gatekeeper (D) | 1500 / 0.6 | Keeper of the Court's portals. | **Gate Portal:** teleports 3 skeletons forward along the path every 15 s. | R: Shadow 75. W: Anchor, Radiant. | Anchor closes portal; Radiant. |

## 7.12 Celestial Order (CEL)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| CEL-01 | Zealot Initiate (I) | 160 / 1.2 | New recruits who know only the Order's creed. | **Faith Shield:** absorbs first 100 damage. | R: Radiant 75. W: Shadow 50. | Shadow; Void; burst. |
| CEL-02 | Wingblade Seraph (F) | 220 / 1.6 | Winged blade-dancers. | **Dive:** attacks lowest-HP soldier/hero; ignores blockers. | R: Radiant 50. W: Storm, Shadow. | Gale Perch; Wyrmling. |
| CEL-03 | Halo Archer (I) | 150 / 1.0 | Archers whose halos are focus rings. | **Holy Arrow** (range 5): burns hero 3/s. | R: Radiant 50. W: Shadow. | Outrange; Barracks. |
| CEL-04 | Cherub Swarm (F) | 10 × 40 / 1.8 | Tiny flying judges, each with a tiny verdict. | **Blessing:** heals all in r2 by 3%/s while alive. | R: Radiant 75. W: Shadow, AoE. | AoE; Tesla chain; Hailstorm. |
| CEL-05 | Temple Guardian (E) | 1700 / 0.6 | Guardians sealed inside the stone of the temple. | **Divine Shield:** invulnerable 3 s at 70/40/10% HP; **Armor 25.** | R: Radiant 75, Phys 25. W: Shadow, Void (ignores 50% of shield). | Shadow/Void; patience. |
| CEL-06 | Lightbringer Priest (M) | 220 / 0.9 | Priests of the sun's judgment. | **Mass Heal:** 20% to allies in r3 every 8 s; **Smite** hero. | R: Radiant 75. W: Shadow. | Priority kill; Nightblade; Curse. |
| CEL-07 | Gryphon Knight (F, E) | 700 / 1.3 | Knights on gryphons; honor-bound to charge. | **Armor 20; Lance Dive:** disables tower 3 s. | R: Radiant 25. W: Storm. | Ballista; Gale; Dragonbane Rail. |
| CEL-08 | Inquisitor Seraph (M) | 600 / 1.1 | A seraph tasked with purging "heresy". | **Purge:** removes debuffs (Curse, Poison, Slow) from allies in r3; immune to Curse. | R: Radiant 50. W: Void, Phys. | Burst; use hard damage over debuffs. |
| CEL-09 | Aureate Automaton (Mc) | 900 / 0.8 | Golden constructs built by Celestial artisans. | **Armor 30; Mirror Plating:** reflects 25% of magic missile damage. | R: Radiant 50. W: Storm, Shadow. | Storm; avoid homing missiles. |
| CEL-10 | Radiant Avatar (D, E) | 2400 / 0.7 | A manifest verdict of the Order. | **Judgment:** every 15 s marks highest-DPS tower; disabled 5 s unless cleansed. | R: Radiant 100, Phys 25. W: Shadow, Void 50. | Sanctuary cleanse; spread DPS; Shadow/Void. |

## 7.13 Void Swarm (VOD)

| ID | Name (Cat) | HP / Spd | Lore | Abilities | Resist / Weak | Counterplay |
|---|---|---|---|---|---|---|
| VOD-01 | Voidling (I) | 8 × 50 / 2.0 | The Swarm's smallest, mind-linked as one. | **Hive Mind:** +10% speed per 5 allies. | R: Void 25. W: AoE, Fire. | Mortar, Hailstorm, Tesla. |
| VOD-02 | Rift Stalker (D) | 210 / 1.5 | Predators that hunt between spaces. | **Rift Step:** blinks 3 tiles every 6 s. | R: Void 50. W: Anchor, Radiant. | Anchor Pillar; Chrono slow. |
| VOD-03 | Maw Crawler (E) | 1500 / 0.7 | A hungry thing that eats its own kin. | **Gorge:** consumes up to 3 nearby Voidlings, healing 10% each and growing. | R: Void 50. W: Radiant. | Kill Voidlings first; Mortar. |
| VOD-04 | Spore Drone (F) | 180 / 1.4 | A drifting seed of Null. | **Nullspores:** Mana regen −50% in r3. | R: Void 50. W: Storm. | Gale; Wyrmling; Tesla. |
| VOD-05 | Psion Husk (M) | 320 / 0.9 | A twisted telepath. | **Mind Seize:** scrambles one tower's targeting mode for 5 s; stuns hero 3 s. | R: Void 25. W: Radiant, Shadow. | Cleanse; kill priority. |
| VOD-06 | Phase Hound (D) | 190 / 2.2 | A hound that slips between layers. | **Phase Shift:** untargetable for 1 s after taking 25% HP in one burst. | R: Void 50. W: Anchor. | DoT; Anchor; steady damage. |
| VOD-07 | Singularity Larva (D) | 400 / 0.9 | A tiny gravity well. | **Event Horizon:** pulls soldiers and hero in r2 toward it. | R: Void 75. W: Radiant. | AoE as they clump; Radiant. |
| VOD-08 | Void Carapace (E) | 1900 / 0.6 | A thing that adapts to what hurts it. | **Adaptive Armor:** after 5 hits of one type, +40% resist; adapts every 8 s. | R: adaptive. W: none. | Mixed damage; Chrono reset. |
| VOD-09 | Dimensional Leech (D) | 250 / 1.2 | A parasite of reality's seams. | **Mana Drain:** −8 Mana/s while attached to a tower. | R: Void 50. W: Anchor, Radiant. | Kill; Anchor; Sanctuary. |
| VOD-10 | Reality Shredder (E) | 2800 / 0.7 | Tears holes behind it. | **Tear:** opens Rift Portals midway that spawn Voidlings every 12 s. | R: Void 50. W: Radiant, Anchor. | Anchor; Radiant; burst. |

---

## 7.14 Counter Coverage Audit (design checklist)

| Counter capability | Minimum available per Act |
|---|---|
| Anti-air (≥ 2 sources) | Act I onward (Gale Perch, Arcane Tower, Ballista, Frost Spire) |
| Anti-armor (≥ 2 sources) | Act II onward (Ballista, Plague Bloom, Crystal Cannon later) |
| Cleanse/disable-recovery | Act III onward (Sanctuary by Act IV; Hero Seraphine Act IX; Nexus Spell Cleansing Light always) |
| Reveal/anti-stealth | Truth Lantern (optimal); Hero Aelara/Zephyra AoE skills and any AoE tower also hit stealthed units once they attack |
| Anti-teleport | Chrono Pendulum, Frost slows, hard CC; Anchor Pillar is optimal |

## 7.15 Enemy Scaling

- `HP(w, d) = baseHP × (1 + 0.075 × w)^1.35 × difficultyMult(d)` for campaign waves 1–40.
- Difficulty multipliers: Normal 1.0 · Veteran 1.35 · Heroic 1.8 · Mythic 2.4 + 0.2 per Mythic level.
- Bounty = 0.12 × base HP (infantry), 0.10 (elites), 0.08 (swarm), rounded; Boss bounties are fixed per boss.
- Speed does not scale with wave; extra pressure comes from numbers and mechanics, preventing "too fast to read" spikes.
- Endless scaling (post wave 40): see [10-endgame-and-monetization.md](10-endgame-and-monetization.md#141-endless-mode).
