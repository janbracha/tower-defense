# Guardians of the Nexus: MVP Visual Specification

**Version:** 1.0 · **Scope:** First playable (Greenwood Gate, 3 towers, 5 enemies, Spore Pod, Sporemother Myra)
**Parent document:** [Art Bible](01-art-bible.md). When this file and the Art Bible disagree, fix this file.
**Gameplay data source:** [definitions in `greenwood-gate.ts`](../../packages/content-core/src/greenwood-gate.ts) (HP, speed, range, timers).

This document lists **every visual asset in the MVP** and describes each one in enough detail to be handed to an AI image tool, a contractor, or to be hand-drawn. It contains no images.

---

## Table of Contents

0. [How to Use This Specification](#0-how-to-use-this-specification)
1. [Shared Prompt Kit](#1-shared-prompt-kit)
2. [Towers](#2-towers) (Arcane Tower, Ballista Post, Frost Spire)
3. [Enemies](#3-enemies) (Thornling Scout, Bark Guard, Druid Warden, Mossback Brute, Pollen Wisp)
4. [Boss Encounter](#4-boss-encounter) (Spore Pod, Sporemother Myra)
5. [Map: Greenwood Gate](#5-map-greenwood-gate)
6. [Shared Effects, Overlays and Markers](#6-shared-effects-overlays-and-markers)
7. [Asset Manifest](#7-asset-manifest)
8. [Acceptance Checklist](#8-acceptance-checklist)

---

## 0. How to Use This Specification

### 0.1 Units and Conventions

| Item | Value |
|---|---|
| Logical tile | **64 px** (1×). Master art is drawn at **256 px per tile (4×)**; export 1×, 2×, 4× |
| Sizes in this document | In **tiles** (and px at 1×) |
| Light | Key from **top-left (315°, 45° elevation)**, warm `#FFD9A0`; fill cool `#6C7BD8` |
| Outline | **2 px at 1×**, dual-tone: dark outer line plus a 1 px light rim on the lit side |
| View | Ground is top-down. **Units are upright miniatures seen from a 3/4 front view (≈ 35° elevation)** |
| Facing | Enemies drawn **facing right**; the engine flips them for leftward movement |
| Anchor | Towers: bottom-center of the base plinth. Enemies: **center of mass** (this is the simulation position); the contact shadow sits 0.15 tile below it |
| Layers | Every asset is delivered as separate transparent layers (listed per asset) so Pixi can animate them procedurally |
| Background for generation | Flat `#FF00FF` magenta (key it out) or transparent |
| Hex values | All hex codes come from the Art Bible palette (§2 there) |

### 0.2 Reading Order of Each Asset Entry

1. **Role** and **gameplay facts** the art must support
2. **Silhouette** (the 24 px read)
3. **Size** (tiles and px)
4. **Colors** (primary, secondary, accent)
5. **Materials**
6. **Layers** to deliver
7. **Visual effects**
8. **Animation ideas** (procedural values)
9. **Icon concept**
10. **AI generation prompt** (positive and extra negative)

### 0.3 Prototype Shapes Being Replaced

The current renderer draws shapes (diamond, rectangle, triangle towers; circles and triangles for enemies; arcs for pod timers). The final art **keeps those shape codes**, so nothing about readability changes:

| Prototype | Final art keeps |
|---|---|
| Arcane = diamond | Diamond core on a stalk |
| Ballista = rectangle | Horizontal T frame |
| Frost = triangle | Spike stack |
| Armor = grey ring | Grey segmented ring |
| Slow = blue ring | Cyan orbiting ring |
| Flyer = triangle | Moth-triangle with detached shadow |
| Pod timer = orange arc | Orange shrinking arc |
| Boss phase 2 = red ring | Red-hot veins plus red ring |

---

## 1. Shared Prompt Kit

Paste the **Style Prefix** at the start of every prompt and the **Global Negative** into the negative field. Then add the asset-specific text from §2 to §6.

### 1.1 Style Prefix

```
Game asset sprite for a top-down fantasy tower defense game, "Woven Light" style:
hand-sculpted tabletop miniature seen from a 3/4 front view, matte surfaces,
dusk lighting with warm key light from the top left and cool violet-blue fill light,
3-step cel shading (shadow, base, light) with a thin bright rim light on the lit edge,
thin dark outline, soft contact shadow ellipse under the figure,
simple bold shapes, limited palette, readable silhouette at 24 pixels,
cloth, thread, stone, crystal and bark materials, mythic and calm mood,
centered on a plain flat magenta background, no scenery, single object, full body visible
```

### 1.2 Global Negative

```
photorealistic, 3D render, glossy plastic, thick black cartoon outline, chibi, big cartoon eyes,
comic face, text, letters, watermark, signature, busy background, scenery, ground texture,
multiple objects, cropped, blurry, noisy, over-detailed, gradients everywhere, lens flare,
pixel art, anime, blood, gore, skull
```

### 1.3 Consistency Rules for the Generator

| Rule | How |
|---|---|
| Same lighting in every image | Always include "warm key light top left" |
| Same outline weight | Fix the outline in post with the 2 px script, not by prompt |
| Same palette | Snap to the palette in post (Art Bible §2.8); in prompts, list hex colors as words plus hex |
| Same scale | Generate at 1024 × 1024, subject filling 70 to 80% of the frame |
| Silhouette control | Use a rough black silhouette sketch as a structure/reference input |
| Batch | Generate 8 variants, pick by the 24 px silhouette test |
| Reference images | Feed the approved Arcane Tower as the style reference for every later tower; the approved Thornling for every enemy |

### 1.4 Color Cheat Sheet (MVP Subset)

| Name | Hex | Used for |
|---|---|---|
| Linen | `#EDE6D4` | Tower stone highlight |
| Weave-stone shade | `#B9AF98` | Tower stone base shade |
| Weave-stone shadow | `#6F6A7A` | Tower stone shadow |
| Threadgold | `#F2C14E` | Trim, gold ring, selection |
| Gold Light | `#FFE3A0` | Gold highlight |
| Arcane core | `#A66BFF` / glow `#D4B5FF` | Arcane Tower |
| Martial amber | `#E08A1E`, bronze `#C98A3B`, steel `#9AA5B8` | Ballista Post |
| Frost core | `#4CC9F0` / glow `#B8EEFF` | Frost Spire |
| Emerald | `#2E8B57` | Verdant primary |
| Moss-brown | `#6B5A2E` | Verdant secondary |
| Deep moss | `#1F5E3B` | Brute body |
| Bio-teal | `#2DD4BF` | Verdant accent, eyes |
| Mend Green | `#3DDC97` | Heal aura |
| Pollen | `#F5D547` | Wisp dust |
| Pod teal | `#0F766E` | Spore Pod |
| Timer amber | `#FB923C` | Pod countdown |
| Myra magenta | `#8E2A9E` | Myra primary |
| Spore magenta | `#C026D3` | Spore dust |
| Fracture Red | `#E5484D` | Phase 2, damage |
| Night Loom | `#12162E` | Defender outline, UI |
| Void Ink | `#0B0E1F` | Deep shadow |

---

## 2. Towers

### 2.0 Shared Tower Rules

| Property | Value |
|---|---|
| Canvas (1×) | **128 × 192 px** (2 tiles wide, 3 tiles tall); anchor bottom-center |
| Footprint | Fits inside the **0.84 tile** pad circle (pad radius 0.42 tile) |
| Common base | A **round stone plinth** 0.8 tile wide, 0.12 tile tall, with a **thin Threadgold ring**; the school-colored ring on the plinth edge is the pad ring |
| Body | Weave-stone (Linen / `#B9AF98` / `#6F6A7A`) with matte Threadgold thread bands |
| Core | The only saturated element: a faceted crystal in the school color |
| Outline | Night Loom `#12162E` outside, warm rim `#FFE3A0` inside on the lit side |
| Tier pips | Drawn by the engine: 1 to 4 small gold dots under the plinth (already in the prototype) |
| Tier II | +1 gold band, +2 small satellite crystals or a second element (see each tower) |
| Contact shadow | Ellipse 60% of plinth width, 35% opacity, `#0B0E1F` |

**Shared tower layers:** `plinth`, `body`, `trim`, `core`, `core_glow` (additive), `moving_part` (bow arms, orbit shards, etc.), `rim_light`.

**Shared tower animation principle:** towers are **never still**: the core breathes (glow ±10% at 0.6 Hz) and bobs (±2 px). Fire = anticipation (core brightens and recoils 4 px for 60 ms), flash, recovery over 120 ms.

---

### 2.1 Arcane Tower

**Role:** All-purpose, reliable single-target damage. Cost 100, range 5.0 tiles, 1.2 shots/s (one shot every 0.83 s), homing orb, ignores armor, hits air and ground.

#### Silhouette
- **A diamond floating over a thin stalk.** Tall, narrow, perfectly symmetrical.
- Reads at 24 px as "a needle with a gem". Aspect ratio about 1 : 2.2.
- The diamond is the widest part at the top; the stalk tapers inward, then flares into the plinth.

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Total visible height | 1.75 | 112 |
| Widest width (diamond) | 0.8 | 51 |
| Stalk width (mid) | 0.28 | 18 |
| Plinth diameter | 0.8 | 51 |
| Floating diamond | 0.5 wide × 0.7 tall | 32 × 45 |
| Gap between stalk top and diamond | 0.12 | 8 |
| Canvas | 2 × 3 | 128 × 192 |

#### Colors
| | Colors |
|---|---|
| **Primary** | Linen `#EDE6D4` (stone), Arcane violet `#A66BFF` (core) |
| **Secondary** | Weave-stone shade `#B9AF98`, shadow `#6F6A7A`, Threadgold `#F2C14E` (thread) |
| **Accent / glow** | `#D4B5FF` core highlight and glow, white `#FFFFFF` hot center |
| **Outline** | `#12162E` |

#### Materials
- Matte weave-stone with a fine vertical grain, like carved limestone.
- A single **gold thread spiralling up the stalk** 5 turns (matte, thin, slight sheen).
- Faceted crystal diamond: 8 visible facets, inner glow brighter at the center, no refraction realism.
- Plinth with a subtle woven pattern carved along the edge.

#### Layers
`plinth`, `stalk` (stone), `thread` (gold spiral), `diamond` (crystal), `diamond_glow` (additive), `orbit_shard_a`, `orbit_shard_b` (Tier II only), `rim_light`.

#### Visual Effects
| Effect | Description | Colors | Size / Duration |
|---|---|---|---|
| Idle | Diamond slowly rotates around the vertical axis (squash-scale X 100% → 80% → 100%) and glows | `#D4B5FF` | 4 s loop |
| Orbit sparks | 3 tiny violet sparks circle the diamond | `#D4B5FF` | 2 s loop |
| Charge | Diamond brightens and shrinks 10% just before firing | `#FFFFFF` core | 60 ms |
| Projectile | **Homing orb** (0.2 tile) with a **single tapered violet thread trail** that curls slightly | Orb `#A66BFF`, glow `#D4B5FF`, trail `#A66BFF` to 0% | Trail 0.15 s; speed 12 tiles/s |
| Muzzle flash | 6 short radial lines from the diamond | `#D4B5FF` / white | 100 ms |
| Hit | **Knot burst**: tiny knot with 6 radial threads | `#D4B5FF` | 0.5 tile, 200 ms |
| Place | Gold thread loops up around the stalk and settles | `#F2C14E` | 500 ms |
| Upgrade | Ring of light climbs the stalk; second gold band "stitches in" | `#F2C14E`, `#D4B5FF` | 600 ms |
| Sell | Thread unwinds into the pad; the tower folds into the plinth | `#F2C14E` | 400 ms |
| Range preview | Dashed gold stitch circle (radius 5 tiles) at 20% fill | `#F2C14E` | While selected |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Diamond bob | ±3 px vertical, sinusoidal, 0.6 Hz |
| Diamond spin (fake 3D) | Scale X oscillates 100% to 80%, 0.25 Hz |
| Glow breathe | ±10% alpha, 0.6 Hz |
| Recoil on fire | Diamond moves down 4 px over 60 ms, returns over 120 ms |
| Aim | Diamond tilts 10° toward the target (rotation only) |
| Tier II shards | Two shards orbit at radius 0.35 tile, 1.5 s per revolution |
| Build-in | Scale from 0 to 1.05 to 1.0 over 300 ms with an ease-out |

#### Icon Concept
- **Hexagon medallion** (tower icon), Night Loom field.
- Glyph: **a single violet diamond above a thin line** (stalk), with one tiny gold thread wrap.
- Rim: Threadgold. Accent: a Parchment dot at the diamond's upper left.
- Must read at 24 px as "gem on a stick".

#### AI Generation Prompt
```
{Style Prefix}
A slender magical pylon tower, a thin tapering pale cream limestone spindle column
standing on a small round stone plinth with a thin gold ring,
a single fine matte gold thread spirals up the column in five turns,
above the column a floating faceted violet crystal diamond (#A66BFF) with an inner glow
and a white hot center, small gap between the column and the diamond,
perfectly symmetrical, tall and narrow, aspect ratio one to two,
carved stone with subtle vertical grain, polished crystal facets,
violet rim light on the diamond, cool violet fill, warm key light from the top left,
palette: linen cream, weave-stone shadow grey-violet, threadgold, arcane violet
```
**Extra negative:** `wizard hat, castle, brick wall, window, door, flags, gears, base pedestal with steps`
**Tier II prompt addition:** `a second gold band around the column and two small floating violet crystal shards orbiting the diamond`

---

### 2.2 Ballista Post

**Role:** Long-range physical, pierces up to 3 enemies. Cost 130, range 7.5 tiles, 0.6 shots/s (one every 1.67 s), straight bolt, reduced by armor.

#### Silhouette
- **A wide horizontal T**: two bow arms spread left and right across a short central stalk, with a **loaded bolt pointing up-right** along the axis.
- The only tower that is **wider than it is tall at its widest** (bow span 1.4 tiles), so it reads as "weapon, not magic".
- Angular, chunky, asymmetric details (rope, bolt) inside a symmetric frame.
- Aspect ratio about 1 : 1.07 (it is the one exception to the 1.3 rule; see Art Bible §11.3).

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Bow span (arm tip to arm tip) | 1.4 | 90 |
| Total visible height (plinth to top of bolt) | 1.5 | 96 |
| Central post width | 0.3 | 19 |
| Plinth diameter | 0.84 | 54 |
| Bolt length | 0.9 | 58 |
| Canvas | 2 × 3 | 128 × 192 (use the lower two thirds) |

#### Colors
| | Colors |
|---|---|
| **Primary** | Linen stone `#EDE6D4` (plinth and post base), bronze `#C98A3B` (bow fittings) |
| **Secondary** | Pale bleached wood `#D9C9A3`, steel `#9AA5B8`, rope tan `#B89A5E`, Threadgold trim |
| **Accent** | Martial amber `#E08A1E` (fletching, small banner), highlight `#F5C27A` |
| **Outline** | `#12162E` |

#### Materials
- Bleached timber with visible grain and wrapped rope joints.
- Hammered bronze brackets with bright edge highlights only.
- A steel bolt tip.
- Weave-stone plinth identical to the other towers (family look).
- **No glowing crystal.** The only "core" is a small amber stitched flag and amber fletching.

#### Layers
`plinth`, `post`, `bow_arm_left`, `bow_arm_right`, `string` (separate for stretch), `bolt` (separate), `fittings`, `banner` (Tier II), `rim_light`.

#### Visual Effects
| Effect | Description | Colors | Size / Duration |
|---|---|---|---|
| Idle | String vibrates slightly; banner flutters | `#E08A1E` | Loop |
| Draw | String pulls back; arms bend 6°; bolt retracts 4 px | n/a | 1.0 s before firing (builds up over the reload) |
| Fire | Bolt launches with a **short amber streak**; arms spring forward and wobble 3 times | `#F5C27A`, white | 150 ms |
| Projectile | **Bolt** (0.6 tile long, 0.08 thick) with a **thin straight amber trail** | Bolt bronze + steel tip, trail `#E08A1E` to 0% | Trail 0.15 s; speed 18 tiles/s |
| Pierce | Each hit emits **a small splinter burst** and the bolt continues; the trail brightens after each hit | `#F5C27A` | 150 ms per hit |
| Hit | Splinters and dust (3 chips) | `#D9C9A3`, `#E08A1E` | 0.3 tile, 200 ms |
| Armor spark | If damage was reduced by armor: 3 grey sparks | `#CBD5E1` | 150 ms |
| Place | Frame assembles: arms swing out from the post, string snaps taut | `#F2C14E` | 500 ms |
| Upgrade | Second bow pair slides in below the first; bronze shield plate "stitches" onto the post | `#F2C14E` | 600 ms |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Idle string | ±0.5 px vibration, 3 Hz, decaying |
| Aim | Entire bow assembly rotates up to ±35° toward the target (rotation of `bow_*`, `string`, `bolt`) |
| Draw cycle | Over the 1.67 s reload: string and bolt translate back 4 px (ease-in) |
| Release | Arms rotate forward 8° for 50 ms, then wobble with a damped spring (3 oscillations) |
| Recoil | Whole tower shifts 2 px away from the target and back |
| Banner | Sine flutter 1.2 Hz, amplitude 5° |
| Build-in | Arms unfold from 0° to rest over 400 ms |

#### Icon Concept
- **Hexagon medallion**, Night Loom field.
- Glyph: **a horizontal bow with a single vertical bolt**, drawn as a T with a pointed tip.
- Color: amber `#E08A1E` glyph with a steel `#9AA5B8` bolt tip. Rim Threadgold.
- Must read at 24 px as "crossbow".

#### AI Generation Prompt
```
{Style Prefix}
A wide ballista crossbow tower, a low round pale cream stone plinth with a thin gold ring
supporting a short sturdy bleached-timber post, two broad curved bow arms spreading
left and right with hammered bronze brackets and wrapped rope, a taut string,
a large steel-tipped bolt with amber fletching loaded and pointing up and to the right,
a small amber stitched banner on a short pole at the back,
the overall shape is a wide horizontal T, wider than the plinth, chunky and practical,
visible wood grain, matte bronze, steel highlights, no glowing parts,
warm key light from the top left, cool fill,
palette: bleached wood, bronze, steel grey, amber accents, linen stone, gold thread
```
**Extra negative:** `magic crystal, glowing orb, castle, cannon, gun, modern, laser`
**Tier II prompt addition:** `a second pair of bow arms stacked below the first, a bronze shield plate on the post, a larger banner`

---

### 2.3 Frost Spire

**Role:** Control. Slows the target 30% (Tier II 40%) for 2 s. Cost 120, range 5.0 tiles, 1.0 shots/s, homing ice shard, hits air and ground.

#### Silhouette
- **A tall isosceles triangle built from three stacked spikes**, with a fringe of small icicles hanging from the middle spike.
- Sharp, pointed, symmetrical, the **only tower with a pointed apex and notched sides**.
- Reads at 24 px as "ice spike". Aspect ratio about 1 : 2.

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Total visible height | 1.7 | 109 |
| Widest width (lower spike base) | 0.85 | 54 |
| Mid spike width | 0.55 | 35 |
| Top spike width | 0.28 | 18 |
| Icicle fringe length | 0.18 | 12 |
| Plinth diameter | 0.84 | 54 |
| Canvas | 2 × 3 | 128 × 192 |

#### Colors
| | Colors |
|---|---|
| **Primary** | Frosted Linen `#EDE6D4` mixed with ice white `#F3FAFF` (stone), Frost core `#4CC9F0` |
| **Secondary** | Cold shade `#9FB6CC`, shadow `#5C6F9A`, Threadgold trim |
| **Accent / glow** | `#B8EEFF` glow, white `#FFFFFF` hot center, mist `#DFF6FF` at 30% |
| **Outline** | `#12162E` |

#### Materials
- Pale stone coated in a **thin frost crust** (speckled, fine granular texture).
- **Translucent ice facets** (the three spikes' inner cores are cyan crystal with white veins).
- A single gold thread wraps the lowest spike (matte, slightly dulled by frost).
- Icicle fringe: glassy, pointed, slightly irregular.

#### Layers
`plinth`, `spike_low` (stone and frost), `spike_mid`, `spike_top`, `ice_core` (crystal inside), `icicles`, `thread`, `mist` (additive), `ring_tier2` (Tier II), `rim_light`.

#### Visual Effects
| Effect | Description | Colors | Size / Duration |
|---|---|---|---|
| Idle mist | Soft cold breath drifts down from the icicles | `#DFF6FF` at 30% | 3 s loop |
| Twinkle | A glint travels up the spikes every 4 s | white | 400 ms |
| Charge | Ice core brightens; icicles tremble | `#B8EEFF` | 80 ms |
| Projectile | **Ice shard** (a small pointed crystal 0.22 tile) spinning slowly, with a **trail of 3 to 4 snow flecks** | Shard `#4CC9F0` / white, flecks `#B8EEFF` | Speed 10 tiles/s; trail 0.2 s |
| Hit | **Snowflake burst** (6-point) plus a brief frost ring on the enemy | `#B8EEFF`, `#7DD3FC` | 0.5 tile, 250 ms |
| **Slow applied** | **Thin cyan ring orbiting the enemy**, 2 s; fades when the slow ends; thicker at 40% (Tier II) | `#7DD3FC` | Ring radius = enemy radius + 5 px; 1 px stronger at Tier II |
| Slow tint | Enemy sprite gets a 15% cyan multiply tint | `#7DD3FC` | While slowed |
| Place | Frost spreads over the plinth, spikes rise in sequence | `#B8EEFF` | 500 ms |
| Upgrade | Lower spike ring of 4 small spikes grows around the base | `#4CC9F0` | 600 ms |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Spike breathe | Top spike scale ±2% at 0.5 Hz |
| Icicle shiver | Icicles rotate ±4° at 3 Hz on fire for 150 ms |
| Core pulse | Ice core alpha 80% to 100%, 0.6 Hz |
| Mist | 6 soft sprites drift downward, 2 s lifetime |
| Aim | Top spike tilts 8° toward the target |
| Recoil | Whole spire compresses 3% vertically for 80 ms |
| Build-in | Spikes grow from the base up in 3 steps, 120 ms apart |

#### Icon Concept
- **Hexagon medallion**, Night Loom field.
- Glyph: **a tall cyan triangle made of three stacked spikes** with two tiny icicles.
- Color: `#4CC9F0` glyph, `#B8EEFF` highlight edge. Rim Threadgold.
- Must read at 24 px as "ice spike".

#### AI Generation Prompt
```
{Style Prefix}
A tall narrow ice spire tower, a pale cream frosted stone plinth with a thin gold ring,
three stacked pointed spikes forming a tall isosceles triangle, pale frosted stone coated
in fine frost crust, a glowing translucent cyan ice crystal core (#4CC9F0) visible inside
the spikes with white veins, a fringe of small glassy icicles hanging from the middle spike,
a thin matte gold thread wrapped around the lowest spike, a faint cold mist at the base,
perfectly symmetrical, sharp pointed apex, notched sides, aspect ratio one to two,
cool cyan rim light, warm key light from the top left,
palette: frosted linen, ice white, cyan, cold grey-blue shadow, threadgold
```
**Extra negative:** `snowman, igloo, penguin, snow ground, castle, wooden parts, fire, steam`
**Tier II prompt addition:** `a ring of four small spikes around the lowest spike and a brighter, larger cyan core`

---

## 3. Enemies

### 3.0 Shared Enemy Rules

| Property | Value |
|---|---|
| Facing | Right (engine flips) |
| Body value | L* 25 to 40 (dark vs the bright path); only the accent is bright |
| Accent | One glowing mark, **bio-teal `#2DD4BF`** (eyes, veins, runes) |
| Outline | Tinted near-black: body color at 12% lightness, 2 px |
| Asymmetry | Mandatory; one visible loose thread or torn edge trailing from the rear |
| Face | A mask, hood or plate with a single glowing mark; no cartoon face |
| Contact shadow | Ellipse under the body, `#0B0E1F` at 40% |
| Health bar | Engine-drawn: thin bar above the head (0.8 tile wide), Threadgold frame |
| Dying | **Unravel**: sprite splits into 5 to 8 threads that rise and fade over 0.5 s; the accent dot lingers 0.2 s longer; a gold bounty thread flies to the gold counter |
| Leaking | The enemy fades into the Nexus (0.3 s); the Nexus flashes red |

**Shared enemy layers:** `body`, `limbs_near`, `limbs_far`, `head`, `accent_glow` (additive), `threads` (trailing loose ends), `shadow`.

**Shared walk logic (procedural):** body bob = `amplitude × sin(2π × freq × t)`; legs or limbs oscillate ±20° in antiphase; frequency scales with speed (listed per enemy).

---

### 3.1 Thornling Scout

**Role:** Fast, fragile infantry. HP 80, speed 1.6 tiles/s, armor 0, threat 1, bounty 8. Teaches range and burst. Appears in groups of 6 to 14.

#### Silhouette
- **A small crouched runner with a row of spikes along its back**, a long forward-leaning body and two long thin legs.
- Reads at 24 px as "small spiky sprinter". Lowest and smallest shape in the game.
- The **spiky back line** (5 triangle thorns) is the signature.

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Body length (nose to tail) | 0.8 | 51 |
| Body height | 0.56 | 36 |
| Leg length | 0.3 | 19 |
| Thorn height | 0.14 | 9 |
| Canvas | 1 × 1 | 64 × 64 |
| Simulation radius | 0.28 | (collision; the sprite is drawn to match) |

#### Colors
| | Colors |
|---|---|
| **Primary** | Emerald `#2E8B57` |
| **Secondary** | Moss-brown `#6B5A2E` (thorns, belly, limbs) |
| **Accent** | Bio-teal `#2DD4BF` (two small eye slits) |
| **Outline** | `#0F2A1B` (emerald at 12% lightness) |

#### Materials
- Rough **bark skin** with vertical cracks.
- Dry **thorn quills** (brown, pointed, slightly translucent at the tips).
- A strip of **frayed moss-green cloth** knotted at the neck that trails behind.
- Matte; no shine.

#### Layers
`body`, `thorns`, `leg_near`, `leg_far`, `head_mask`, `eyes_glow`, `trail_cloth`, `shadow`.

#### Visual Effects
| Effect | Description | Colors | Duration |
|---|---|---|---|
| Run dust | Two tiny puffs per second at the feet | `#6B5A2E` at 40% | 300 ms |
| Spawn | Steps out of the spawn rift; threads whip behind it | `#2DD4BF` flash | 400 ms |
| Death | **Unravel**: 5 to 6 green threads rise; thorns drop and fade | `#2E8B57`, `#2DD4BF` | 500 ms |
| Hatch (from a pod) | Pops out of the pod with 3 spores | `#2DD4BF`, `#C026D3` | 400 ms |
| Slow | Cyan ring, legs animate at 60% speed | `#7DD3FC` | While slowed |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Run bob | ±3 px, **4.0 Hz** (fast, light) |
| Leg swing | ±30°, antiphase, 4.0 Hz |
| Body lean | Forward 12° |
| Tail cloth | Sine flutter 6 Hz, amplitude 10° |
| Squash/stretch | Body scale Y 95% on each footfall |
| Spawn pop | Scale 0 to 1.1 to 1.0 over 200 ms |
| Death | Body alpha 100% to 0% over 400 ms while 5 thread sprites rise 0.6 tile |

#### Icon Concept
- **Circle medallion** (enemy / codex icon), Night Loom field.
- Glyph: **a spiky-backed crouching silhouette** in emerald with two teal eye dots.
- Rim: Threadgold (codex) or faction-colored rim (in-game wave preview). Must read at 24 px as "small spiked critter".

#### AI Generation Prompt
```
{Style Prefix}
A small fast forest creature, a crouched runner facing right with a long forward-leaning body
and two long thin legs mid-stride, rough emerald green bark skin (#2E8B57) with vertical cracks,
a row of five dry brown thorn quills along its back, a simple mask-like head with two tiny
glowing teal eye slits (#2DD4BF), a strip of frayed moss-green cloth knotted at its neck
trailing behind in the wind, asymmetric, dark and textured, no cartoon face, no mouth,
very small and low, matte bark, dusk key light from the top left,
palette: emerald, moss brown, dark outline, teal glow
```
**Extra negative:** `cute, smiling, cartoon eyes, human face, clothes, weapon, large, tall, tree monster`

---

### 3.2 Bark Guard

**Role:** Armored infantry. HP 220, speed 0.8, **armor 20**, threat 1, bounty 20. Teaches Arcane vs Ballista.

#### Silhouette
- **A wide trapezoid**: broad at the shoulders with a large slab of bark held as a shield on the left, narrowing to short legs.
- Squarer and heavier than the Thornling; **flat-topped shield slab** is the signature.
- Reads at 24 px as "small walking wall".

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Width (including shield) | 0.9 | 58 |
| Height | 0.8 | 51 |
| Shield slab | 0.45 wide × 0.7 tall | 29 × 45 |
| Canvas | 1 × 1 | 64 × 64 |
| Simulation radius | 0.34 | (sprite matched) |

#### Colors
| | Colors |
|---|---|
| **Primary** | Moss-brown `#6B5A2E` (bark body) |
| **Secondary** | Steel-grey plates `#9AA5B8` (armor plates riveted onto the bark), emerald `#2E8B57` moss patches |
| **Accent** | Bio-teal `#2DD4BF` (a single eye slit in a bark helm) |
| **Outline** | `#241D0F` |
| **Armor ring (engine)** | `#CBD5E1` segmented ring around the body |

#### Materials
- Thick **layered bark** with deep grooves.
- Dull **riveted grey plates** (stolen/forged metal pieces bolted on; the only metal in Act I).
- Moss patches on the shoulders.
- Frayed rope belt with loose ends.

#### Layers
`body`, `shield`, `plates`, `leg_near`, `leg_far`, `helm`, `eye_glow`, `trail_rope`, `shadow`.

#### Visual Effects
| Effect | Description | Colors | Duration |
|---|---|---|---|
| Armor ring | Grey **segmented ring** around the unit (always visible) | `#CBD5E1` | Constant |
| Armor hit (Ballista) | 3 grey sparks and a small "clink" ring; damage number is smaller | `#CBD5E1` | 150 ms |
| Arcane hit | Violet knot burst passes cleanly (armor is ignored) | `#D4B5FF` | 200 ms |
| Footstep | Faint dust ring | `#6B5A2E` | 300 ms |
| Death | **Unravel**: bark plates fall off as 3 chips, then green threads rise | `#6B5A2E`, `#2E8B57` | 600 ms |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Walk bob | ±3 px, **2.0 Hz** (steady, heavy) |
| Shield sway | Shield rotates ±4° opposite the stride |
| Leg swing | ±15°, 2.0 Hz |
| Footfall | Body scale Y 96% each step; tiny 1 px screen-space ground shake (disabled in Reduce Motion) |
| Hit reaction | Body flashes white for 60 ms; plate rattles 2 px |
| Spawn | Walks in from the rift; no pop |

#### Icon Concept
- **Circle medallion**, Night Loom field.
- Glyph: **a squat trapezoid with a flat slab shield** in brown with a grey plate and a teal eye dot.
- Add a **tiny segmented ring** to hint at armor. Must read at 24 px as "shield bearer".

#### AI Generation Prompt
```
{Style Prefix}
A squat armored forest soldier facing right, wide trapezoid body, a large flat slab of
layered dark moss-brown bark (#6B5A2E) held as a shield on its left arm, dull grey steel plates
riveted onto the bark shoulders and chest, moss patches (#2E8B57) on the shoulders,
a bark helm with a single glowing teal eye slit (#2DD4BF), short thick legs mid-step,
a frayed rope belt with loose ends trailing behind, heavy and slow looking, asymmetric,
mask-like face, no mouth, deep bark grooves, matte, dusk key light from the top left,
palette: moss brown, steel grey, emerald moss, teal glow, dark outline
```
**Extra negative:** `knight, medieval armor, human, sword, shiny armor, cartoon, cute, helmet visor, large, tall`

---

### 3.3 Druid Warden

**Role:** Healer, priority target. HP 160, speed 0.9, armor 0, threat 2, bounty 18. **Heals allies within 2.5 tiles for 4% of their max HP per second.** Category: Magical.

#### Silhouette
- **A tall thin robed figure with a branching antler crown and a staff**, wider at the hem, narrow at the shoulders.
- Distinctly **taller and thinner** than every other Act I ground unit. The antler crown is the signature top shape.
- A **floating teal orb** hovers above the crown (Magical category cue).
- Reads at 24 px as "tall antlered figure".

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Total height (hem to antler tip) | 1.1 | 70 |
| Robe hem width | 0.68 | 44 |
| Shoulder width | 0.32 | 20 |
| Antler span | 0.7 | 45 |
| Staff height | 1.0 | 64 |
| Floating orb | 0.2 | 13 |
| Canvas | 1.25 × 1.5 | 80 × 96 |
| Simulation radius | 0.34 | |

#### Colors
| | Colors |
|---|---|
| **Primary** | Emerald `#2E8B57` (robe) |
| **Secondary** | Moss-brown `#6B5A2E` (antlers, staff), dark leaf green `#1F5E3B` (inner robe) |
| **Accent** | Bio-teal `#2DD4BF` (eye slit, antler tip glows); **heal aura Mend Green `#3DDC97`** |
| **Category base** | **Violet ring with a dot** `#A66BFF` (Magical) on the ground |
| **Outline** | `#0F2A1B` |

#### Materials
- Layered **leaf-cloth robes** that look woven from overlapping leaves.
- **Antlers** of pale bleached branch wood with tiny teal buds.
- Gnarled staff with a loose-thread wrap.
- Smooth bark **mask** with a single teal slit.

#### Layers
`robe_back`, `robe_front`, `arms`, `staff`, `mask`, `antlers`, `eye_glow`, `orb` (floating), `orb_glow` (additive), `aura_ring` (engine), `trail_threads`, `category_ring`, `shadow`.

#### Visual Effects
| Effect | Description | Colors | Size / Duration |
|---|---|---|---|
| **Heal aura** | Soft **pulsing circle** on the ground, radius **2.5 tiles**, with slow-rising "+" beads | Circle `#3DDC97` at 12% fill + 1 px edge; beads `#3DDC97` | Pulse 1.5 s; beads rise 0.4 tile over 0.6 s |
| Heal pulse on an ally | Small "+" and a green sparkle on the healed enemy | `#3DDC97` | 400 ms every 1 s while healing |
| Category ring | Violet ring with a center dot at the feet | `#A66BFF` | Constant |
| Orb idle | Orb bobs and emits tiny teal motes | `#2DD4BF` | Loop |
| Staff glow | Staff tip pulses on each heal | `#3DDC97` | 300 ms |
| Death | **Unravel**: robe splits into leaf threads that rise; antlers fade last; the aura collapses | `#2E8B57`, `#3DDC97` | 600 ms |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Glide (no visible steps) | Body bob ±2 px at **1.5 Hz**, hem sways ±6° |
| Orb | Orbits above the crown 0.15 tile at 1 Hz |
| Staff | Taps the ground in rhythm with each bob (tilts 5°) |
| Antlers | Tiny sway ±2°, 0.5 Hz |
| Aura pulse | Scale 95% to 105%, 1.5 s; alpha 10% to 16% |
| Heal cast | Staff raises 10° for 200 ms |
| Spawn | Rises up from the spawn rift (scale Y 0.6 to 1.0 over 300 ms) |

#### Icon Concept
- **Circle medallion**, Night Loom field, with a **small violet dot** at the top (Magical cue).
- Glyph: **an antler crown above a leaf-shaped robe** in emerald with a green plus.
- Must read at 24 px as "antlered healer".

#### AI Generation Prompt
```
{Style Prefix}
A tall thin forest healer facing right, a long robe that looks woven from overlapping
emerald green leaves (#2E8B57) and darker inner leaf green, wider at the hem and narrow
at the shoulders, a smooth bark mask face with a single glowing teal eye slit (#2DD4BF),
a branching crown of pale bleached antlers with tiny glowing teal buds, a gnarled wooden staff
held in one hand wrapped with loose threads, a small floating teal glowing orb above the antlers,
asymmetric robe edges with frayed trailing threads, calm and sorrowful, gliding pose,
matte leaf-cloth, dusk key light from the top left,
palette: emerald, moss brown, bleached antler, teal glow, mend green accents
```
**Extra negative:** `wizard hat, human face, beard, witch, cartoon, cute, fire, large muscular body`

---

### 3.4 Mossback Brute

**Role:** Elite. HP 650, speed 0.7, armor 10, threat 3, bounty 55. **Regenerates 3% max HP/s if undamaged for 3 s.** Teaches sustained damage and slow.

#### Silhouette
- **A hunched boulder**: a huge rounded mossy back, tiny head low in front, two short thick arms dragging near the ground.
- The **largest, roundest, lowest-to-ground shape** in Act I apart from the boss. **Big half-circle top line.**
- Reads at 24 px as "big mossy rock with legs".

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Width | 1.0 | 64 |
| Height | 0.9 | 58 |
| Back hump height | 0.7 | 45 |
| Head | 0.25 | 16 |
| Canvas | 1.5 × 1.5 | 96 × 96 |
| Simulation radius | 0.46 | |

#### Colors
| | Colors |
|---|---|
| **Primary** | Deep moss `#1F5E3B` |
| **Secondary** | Moss `#4E8A4F` (patches), stone grey-brown `#5A5148`, root brown `#3B2A1A` |
| **Accent** | Bio-teal `#2DD4BF` (single eye in a small mask); **regen glow** `#3DDC97` between rock plates |
| **Category base** | **Double Threadgold ring** `#F2C14E` (Elite) on the ground |
| **Outline** | `#0A1F14` |

#### Materials
- Boulder-like **stone plates** overgrown with thick moss and small ferns.
- **Root tendons** for arms, gnarled and knotted.
- **Hanging moss strands** (loose threads) swaying behind.
- Matte and heavy.

#### Layers
`back_hump`, `moss_overlay`, `arm_near`, `arm_far`, `head_mask`, `eye_glow`, `regen_veins` (additive), `hanging_moss`, `leg_near`, `leg_far`, `category_ring`, `shadow`.

#### Visual Effects
| Effect | Description | Colors | Duration |
|---|---|---|---|
| Elite ring | **Double gold ring** under the feet | `#F2C14E` | Constant |
| **Regen glow** | Green veins between the plates pulse; small "+" beads rise **only while regenerating** (undamaged ≥ 3 s) | `#3DDC97` | 1 s pulse loop |
| Regen interrupted | Veins flash off when hit | n/a | 100 ms |
| Footstep | Dust ring and 3 moss clumps fall | `#4E8A4F` | 400 ms |
| Ground shake | 1 px tremor per step (off in Reduce Motion) | n/a | 120 ms |
| Death | **Unravel**: the hump cracks into 4 plates, moss threads rise and drift; a larger bounty thread | `#1F5E3B`, `#4E8A4F`, `#F2C14E` | 800 ms |
| Slow | Cyan ring; steps lengthen visually | `#7DD3FC` | While slowed |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Heavy bob | ±4 px, **1.2 Hz** (slow, ponderous) |
| Back sway | Hump rotates ±3° opposite the stride |
| Arm drag | Arms swing ±12° and scrape at the low point |
| Footfall squash | Body scale Y 94% per step, then 102% rebound |
| Moss flutter | Hanging strands sine ±8°, 1 Hz |
| Idle breath | Hump scale ±1.5% at 0.4 Hz |
| Regen veins | Alpha 40% to 90% at 1 Hz |
| Spawn | Walks in, no pop; ground tremor once |

#### Icon Concept
- **Circle medallion**, Night Loom field, with a **double gold rim** (Elite cue).
- Glyph: **a big round hump with a tiny head**, deep moss, one teal dot, tiny fern on the hump.
- Must read at 24 px as "big round brute".

#### AI Generation Prompt
```
{Style Prefix}
A huge hunched forest brute facing right, a massive rounded boulder-like back covered in thick
green moss (#1F5E3B and #4E8A4F) and small ferns, grey-brown stone plates showing through,
a tiny low head with a smooth bark mask and a single glowing teal eye (#2DD4BF),
two short thick gnarled root arms dragging near the ground, short stubby legs,
faint green glowing veins between the stone plates, strands of hanging moss trailing behind,
slow and heavy, half-circle silhouette, asymmetric, matte stone and moss,
dusk key light from the top left,
palette: deep moss green, lighter moss, stone brown-grey, root brown, teal and green glow
```
**Extra negative:** `ogre, troll, human face, club, weapon, cartoon, cute, horns, tall, thin`

---

### 3.5 Pollen Wisp

**Role:** Flyer. HP 100, speed 1.4, armor 0, threat 2, bounty 12. **Flies in a straight line from spawn to Nexus.** Teaches anti-air coverage.

#### Silhouette
- **A moth-like triangle**: a small round body with two broad, pointed wings that make a wide upward-pointing triangle, trailing a plume of dust behind.
- The **only enemy with a detached ground shadow** and a **self-lit body**, so it reads over the dark ground.
- Reads at 24 px as "glowing triangle with a trail".

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Wingspan | 0.9 | 58 |
| Body length | 0.4 | 26 |
| Total height (wings up) | 0.7 | 45 |
| Dust plume | 0.8 long | 51 |
| Canvas | 1 × 1 | 64 × 64 |
| **Ground shadow** | Ellipse 0.55 wide, offset **0.5 tile down-right** from the body | |
| Simulation radius | 0.28 | |

#### Colors
| | Colors |
|---|---|
| **Primary** | Pale pollen yellow-white `#FFF3A8` (body, self-lit, higher value than other enemies) |
| **Secondary** | Pollen `#F5D547` (wing edges, dust), soft green `#A3D977` (wing veins) |
| **Accent** | Bio-teal `#2DD4BF` (two tiny eye dots) |
| **Shadow (ground)** | `#0B0E1F` at 50% |
| **Outline** | `#4A3F10` (darker warm, thin, so the glow stays soft) |

#### Materials
- **Translucent wing membrane** with visible veins, like thin silk.
- Fuzzy **pollen-dusted body** (soft granular texture).
- Trailing **pollen dust** made of fine specks and a loose thread.

#### Layers
`wing_near`, `wing_far`, `body`, `eyes`, `glow` (additive), `dust_trail`, `ground_shadow` (separate sprite drawn on the ground layer).

#### Visual Effects
| Effect | Description | Colors | Duration |
|---|---|---|---|
| Glow | Soft warm halo, 0.6 tile radius | `#FFF3A8` at 30% additive | Constant |
| **Dust trail** | 6 to 10 tiny motes shed per second; they fall slowly and fade | `#F5D547` | 800 ms |
| Wing flicker | Wings alternate scale X 100% / 60% | n/a | 10 Hz |
| **Ground shadow** | Mirrors the flight, slightly darker when the wisp is over the path | `#0B0E1F` | Constant |
| Hit | Yellow puff and 3 dust specks | `#F5D547` | 200 ms |
| Death | **Unravel**: wings split into threads; a burst of pollen drifts down and fades | `#FFF3A8`, `#F5D547` | 600 ms |
| Spawn | Lifts off the spawn rift and rises 0.2 tile | `#2DD4BF` flash | 300 ms |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Flight bob | ±5 px vertical, **1.5 Hz**, body tilts 6° with the bob |
| Wing flap | 10 Hz alternating scale (see above) |
| Banking | Rotation toward the movement direction ±10° |
| Shadow lag | Shadow follows with 3 frames of lag and scales ±5% with the bob |
| Dust | Particle spawn at the rear anchor |
| Spawn | Scale 0.5 to 1.0 with a vertical rise over 300 ms |

#### Icon Concept
- **Circle medallion**, Night Loom field.
- Glyph: **a wing-pair triangle with a tiny body and 3 specks** in pale yellow-white.
- A **tiny "wing" corner mark** to flag Flying. Must read at 24 px as "flier".

#### AI Generation Prompt
```
{Style Prefix}
A small glowing pollen moth creature seen from the side facing right, a round fuzzy pale
yellow-white body (#FFF3A8) with two broad pointed translucent wings forming a wide triangle,
delicate soft green wing veins (#A3D977), two tiny teal eye dots (#2DD4BF),
a trailing plume of fine golden pollen dust (#F5D547) and one loose thread behind it,
self-lit with a soft warm halo, light and airy, frozen mid-flap with wings raised,
silk-like wing membrane, powdery fuzz, no ground, floating,
dusk key light from the top left, palette: pale yellow, pollen gold, soft green, teal eyes
```
**Extra negative:** `butterfly with colorful pattern, fairy, human body, bee, insect legs detail, cartoon, cute face, ground, shadow baked in`
*(Generate the ground shadow separately as a flat dark ellipse.)*

---

## 4. Boss Encounter

### 4.1 Spore Pod

**Role:** Objective, not an enemy type. Spawned by Myra every 15 s (10 s in phase 2) **beside the path** (1.2 tiles off the path, 1 to 4 tiles ahead of Myra). HP 150, **8 s countdown**, hatches 3 Thornlings if it survives. Stationary. Towers prefer pods. No bounty.

#### Silhouette
- **A round bulb with a short stalk on a small mound**, a slightly lopsided onion-dome shape with a pointed top tip.
- Reads at 24 px as "egg with a stem". **Must read differently from every enemy: stationary, round, with an orange ring.**

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Bulb diameter | 0.6 | 38 |
| Total height (with stalk and tip) | 0.8 | 51 |
| Mound | 0.8 wide × 0.15 tall | 51 × 10 |
| Countdown ring radius | bulb radius + 5 px (≈ 0.46 tile) | |
| Canvas | 1 × 1 | 64 × 64 |
| Simulation radius | 0.3 | |

#### Colors
| | Colors |
|---|---|
| **Primary** | Pod teal `#0F766E` |
| **Secondary** | Deep teal shade `#0A4A45`, soft highlight `#2DD4BF` |
| **Accent** | Bio-teal veins `#2DD4BF`; **spore magenta** speckles `#C026D3` |
| **Timer ring** | `#FB923C`; in the last 2 s pulses and shifts to `#FFB020` |
| **Mound** | Moss `#2E8B57` with brown soil `#3B2A1A` |
| **Outline** | `#052926` |

#### Materials
- **Wet fungal skin** (slightly glossy highlights only along the lit edge), with visible veins.
- Velvety mound of moss.
- A few small **glowing spore specks** inside the skin.

#### Layers
`mound`, `bulb`, `veins_glow` (additive), `specks`, `tip`, `timer_arc` (engine vector), `crack_overlay` (appears in the last 2 s), `shadow`.

#### Visual Effects
| Effect | Description | Colors | Size / Duration |
|---|---|---|---|
| Spawn | Mound bursts out of the cloth; bulb inflates | `#2DD4BF` flash | 400 ms |
| Pulse | Bulb swells 6% with a vein flash | `#2DD4BF` | 1 s (speeds to 0.4 s in the last 2 s) |
| **Countdown ring** | Orange arc shrinks clockwise from 12 o'clock to zero over 8 s | `#FB923C` | 8 s |
| Last 2 s | Ring turns amber and pulses; cracks glow across the bulb | `#FFB020`, `#2DD4BF` | 2 s |
| Hit | Teal puff and 3 wet droplets | `#2DD4BF` | 200 ms |
| **Destroyed** | Pod collapses; **harmless spore puffs** fade (no hatchlings); a small "safe" gold sparkle | `#2DD4BF`, `#F2C14E` | 500 ms |
| **Hatch** | Bulb **bursts**; magenta spores burst outward; 3 Thornlings spill out | `#C026D3`, `#2DD4BF` | 500 ms |
| Targeting hint | A faint thread line from the nearest tower when it targets the pod | `#F2C14E` at 30% | While targeted |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Pulse | Scale 100% to 106% at 1 Hz, speeds up as the timer drains |
| Tip sway | Tip rotates ±5° at 0.7 Hz |
| Tremble in the last 2 s | ±1.5 px jitter at 12 Hz |
| Destroyed | Scale Y 100% to 20% over 300 ms, alpha to 0 |
| Hatch | Scale 100% to 130% over 100 ms, burst |
| Spawn | Scale 0 to 1.15 to 1.0 over 300 ms |

#### Icon Concept
- **Circle medallion**, Night Loom field.
- Glyph: **a teal round bulb with a tiny stalk and an orange arc ring** around it.
- Orange arc is mandatory (it tells "timer").

#### AI Generation Prompt
```
{Style Prefix}
A fungal spore pod growing on a small round mound of moss, a lopsided onion-shaped
translucent bulb of deep teal wet fungal skin (#0F766E) with glowing bright teal veins
(#2DD4BF) and tiny magenta spore specks (#C026D3) visible inside, a short curled stalk and a
small pointed tip on top, soft glossy highlight only on the lit edge, round and plump,
stationary, ominous but gentle, matte moss mound with a little brown soil,
dusk key light from the top left,
palette: deep teal, bright teal veins, magenta specks, moss green, soil brown
```
**Extra negative:** `egg with a face, eyes, mouth, monster, tentacles, cartoon, cute, skull, alien`
*(The orange countdown ring is drawn by the engine, not generated.)*

---

### 4.2 Sporemother Myra

**Role:** The boss. HP 6,000, speed 0.5 (0.65 in phase 2), armor 10, **threat 20 (leaking her is an instant defeat)**, slow capped at 40%, spawns with 6 Thornlings, drops Spore Pods. **Phase 2 below 50% HP.** Killing her ends the battle in victory.

#### Silhouette
- **A tall bell shape**: a **wide scalloped mushroom dome** crowns a narrower body that flares into layered cap-skirts at the base. Mycelium threads trail asymmetrically behind.
- **3.5 tiles tall, the largest object on the map.** The dome is wider than the body (dome 2.4 tiles, body 1.3 tiles).
- The scalloped dome edge and trailing thread tail give a unique silhouette no other unit shares.
- Reads at 24 px as "giant mushroom queen".

#### Size
| Item | Tiles | px at 1× |
|---|---|---|
| Total height | 3.5 | 224 |
| Dome width | 2.4 | 154 |
| Dome height | 1.0 | 64 |
| Body width at the waist | 0.9 | 58 |
| Skirt width at the base | 1.4 | 90 |
| Face plate | 0.4 × 0.5 | 26 × 32 |
| Thread tail length | 1.5 | 96 |
| Canvas | 4 × 4 | 256 × 256 |
| Simulation radius | 0.65 (hit and movement); sprite is much larger by design, the **base ring** matches the radius |

#### Colors
| | Colors |
|---|---|
| **Primary** | Myra magenta `#8E2A9E` (dome top), emerald `#2E8B57` (body moss) |
| **Secondary** | Bone cap underside `#E6D5C0` (gills region), dark plum shade `#4A1457`, root brown `#3B2A1A` |
| **Accent** | Bio-teal `#2DD4BF` (gill glow and face-plate slit), spore magenta `#C026D3` (spore dust) |
| **Phase 2** | Gills, veins and eye shift to **Fracture Red `#E5484D`**; dome edge gains a red-hot rim |
| **Category base** | **Large ornamented plinth ring** `#12162E` with a gold-edged faction glyph (a spiral) |
| **Outline** | `#2A0B30` |

#### Materials
- **Velvety mushroom caps** (dome and skirt layers) with soft speckles.
- **Wet glowing gills** under the dome edge.
- Moss and root-like body with a bark **face plate (mask)**.
- **Mycelium threads**: white-teal fibres that trail and reach toward the pods.
- A **crown of small mushroom buds**.

#### Layers
`threads_back`, `skirt_layers` (3 separate), `body`, `face_plate`, `eye_glow`, `dome`, `dome_speckles`, `gills`, `gills_glow` (additive), `crown_buds`, `threads_front`, `phase2_veins` (additive, hidden in phase 1), `base_ring` (engine), `shadow` (large soft ellipse).

#### Visual Effects
| Effect | Description | Colors | Size / Duration |
|---|---|---|---|
| **Intro** | Spawn rift widens; she rises from the gate; boss banner slides in ("Sporemother Myra"); screen vignette tints magenta | `#C026D3` | 1.5 s |
| Aura glow | Dome backlit by a soft magenta halo, 2 tiles radius | `#C026D3` at 15% | Constant |
| Gill glow | Gills pulse slowly | `#2DD4BF` | 2 s loop |
| **Spore drift** | Magenta and teal motes fall from the dome and drift | `#C026D3`, `#2DD4BF` | Constant, 20 motes |
| **Pod cast** | Mycelium threads shoot from her tail to the pod location; a stitched dashed arc shows the throw; the pod rises | `#2DD4BF`, `#C026D3` | 500 ms |
| Footfall | Soft ground pulse; 1 px shake (off in Reduce Motion) | n/a | 200 ms |
| Hit | Magenta puff; armor makes a small grey spark for physical hits | `#C026D3`, `#CBD5E1` | 200 ms |
| **Phase 2 trigger** | Shockwave ring expands; dome edge flashes; veins, gills and eye turn red; threads whip; vignette tint shifts to magenta-red; banner "Myra is enraged" | `#E5484D`, `#C026D3` | 800 ms |
| Phase 2 loop | Red veins pulse faster (1.2 s); more spores | `#E5484D` | Constant |
| Slow | Cyan ring (large) and a thick-ring cue when at the 40% cap | `#7DD3FC` | While slowed |
| **Death** | She **unravels**: dome cracks into 5 caps that drift up, threads spiral toward the Nexus, spores glow then fade; gold-white wash and victory | `#C026D3`, `#2DD4BF`, `#F2C14E` | 2.5 s |

#### Animation Ideas (Procedural)
| Motion | Value |
|---|---|
| Glide | Body bob ±4 px at **0.8 Hz** (stately); phase 2: 1.1 Hz |
| Skirt sway | 3 skirt layers rotate ±5° with a 0.2 s phase offset each |
| Dome breathe | Scale Y ±2% at 0.4 Hz |
| Gill pulse | Alpha 50% to 100%, 2 s (phase 2: 1.2 s) |
| Thread tail | 4 segments follow with lag; sine amplitude 12°, 1 Hz (phase 2: 1.5 Hz, 18°) |
| Pod cast | Skirt lifts 6 px; threads fire; dome tilts 5° toward the target for 300 ms |
| Phase 2 | Body scale 100% to 108% to 104% over 400 ms; permanent stronger sway |
| Face plate | Static (mask), only the slit glows |
| Hit | White flash 50 ms, 1 px squash |
| Death | Over 2.5 s: caps separate with gravity-free drift, threads fly to the Nexus, body alpha fades |

#### Icon Concept
- **Octagon medallion** (boss), Night Loom field, **gold-edged double rim**.
- Glyph: **a bell-shaped mushroom queen: wide scalloped dome over a narrow body**, in magenta with a teal gill line.
- Phase 2 variant: same glyph with red gills.
- Boss bar icon: the same glyph at 32 px. Must read at 24 px as "mushroom queen".

#### AI Generation Prompt
```
{Style Prefix}
A towering fungal queen facing right, bell-shaped silhouette, a very wide scalloped mushroom
cap dome crown in deep magenta (#8E2A9E) with soft pale speckles, glowing teal gills (#2DD4BF)
visible under the dome edge, a narrow mossy emerald body (#2E8B57) with a smooth bark mask
face plate and a single glowing teal slit eye, layered mushroom-cap skirts flaring at the base,
a crown of small mushroom buds on top, long white-teal mycelium threads trailing behind her
asymmetrically and reaching forward with one thread, drifting magenta spores,
sorrowful and dignified rather than monstrous, regal, much larger than a normal enemy,
velvety caps, wet glowing gills, matte moss, dusk key light from the top left with a magenta
backlight halo, palette: magenta, plum, emerald, bone cream, teal glow
```
**Extra negative:** `monster mouth, teeth, scary face, tentacles, cartoon, cute, human woman, witch, skull, blood`
**Phase 2 variant prompt:** `the same fungal queen with glowing red veins and red-hot gills and eye, red rim along the dome edge, threads whipping, more spores`

---

## 5. Map: Greenwood Gate

**Role:** Tutorial map. Forest biome. **21 × 12 tiles**, one lane, 12 tower pads, 15 waves ending with Myra. Starting gold 250, lives 20.

### 5.1 Silhouette and Composition
- **A winding "S" thread road** enters from the left through a **gate of two living arches**, runs right, switchbacks left, then down, right, and up to end at the **Nexus** on the right.
- The road is the **brightest ground element**; the Nexus is the brightest object.
- Composition: heavy decoration only at the **corners and edges**; the center stays open for gameplay.
- Reads at a glance as "a stitched road on a dark cloth".

### 5.2 Size and Layout (Tiles)
| Item | Value |
|---|---|
| Map area | 21 × 12 tiles (1344 × 768 px at 1×) |
| Frayed border | Extra 1 to 1.5 tiles on all sides (visible on wide screens) |
| Path width | **0.9 tile** (center line, double-stitched edges) |
| Path corner radius | ≥ 1 tile (rounded joins) |
| Path polyline | (0,2) → (9,2) → (9,6) → (3,6) → (3,10) → (14,10) → (14,5) → (19,5) |
| Spawn rift | Center (0,2), 1.5 × 1.5 tiles |
| Nexus | Center (19.8, 5), 2.5 × 3 tiles (the path ends at its base) |
| Pads | Radius 0.42 tile (0.84 diameter) |
| UI-safe zones | Top 8% and bottom 14% of the screen (no pads or key objects there) |

**Pad positions (tiles):**

| Pad | x | y | Pad | x | y |
|---|---|---|---|---|---|
| p1 | 3 | 3.5 | p7 | 8 | 8 |
| p2 | 6 | 4 | p8 | 11.5 | 11.5 |
| p3 | 11 | 4 | p9 | 16 | 8 |
| p4 | 7.5 | 0.5 | p10 | 16.5 | 3 |
| p5 | 1 | 8 | p11 | 12 | 6.5 |
| p6 | 5 | 8 | p12 | 9 | 11.5 |

### 5.3 Colors
| | Colors |
|---|---|
| **Primary** | Ground dark moss weave `#1E3B2A`; path pale thread-sand `#C9AA6B` |
| **Secondary** | Ground second tone `#2F5B3C` (embroidery), fern `#4E8A4F`, bark `#6B4423`, path edge stitch `#6E5530`, center thread `#E0C48A` |
| **Accent** | Nexus Prism `#6FF3E3` / white `#E9FFFB`, Threadgold `#F2C14E` (pad rings), lantern glow `#FFD9A0`, mist `#7FD6B0`, spawn rift Void Ink `#0B0E1F` with teal edge `#2DD4BF` |
| **Void / border** | `#0B0E1F` fading to ground; border threads `#2F5B3C` |
| **Value check** | Ground L* ≈ 22; path ≈ 70; pads ≈ 45; decor ≤ ground + 10% |

### 5.4 Materials
- **Ground:** dark woven cloth, fine cross-hatch weave, subtle fern and spiral embroidery in a slightly lighter green, **flat**, with no cast shadows.
- **Path:** a **woven ribbon** of pale thread, double stitched edges (dashed stitches 4 px long, 3 px gap), a thin center thread.
- **Pads:** embroidered round patches with a **gold-thread ring** and a small neutral rune in the middle.
- **Nexus:** faceted glass crystal, 10 visible facets, inner glow.
- **Gate arches and trees:** cut-paper style layered bark and leaf shapes with a soft rim light.
- **Border:** frayed loose threads and a torn weave edge fading to void.
- **Lanterns:** small bulb glass with a warm glow.

### 5.5 Layers (Delivered Separately)
`void_background`, `ground_weave` (tileable 256 × 256 at 1×), `ground_embroidery` (large decals), `border_fray`, `path` (one continuous art piece or tileable segments: straight, corner, end), `path_edge_stitches`, `pad_free`, `pad_hover`, `pad_selected`, `pad_invalid`, `decor_back` (trees, props), `decor_front` (only items above the units, very sparse), `gate_arches` (back and front pieces so units pass between them), `spawn_rift`, `nexus_base`, `nexus_crystal`, `nexus_glow` (additive), `lanterns`, `light_shafts` (additive), `mist` (additive), `vignette`.

### 5.6 Component Specs

#### Ground
- **Silhouette:** flat rectangle with a ragged frayed edge.
- Weave tile 256 × 256 px at 1× (seamless); embroidery decals: spiral fern ×4, small leaf sprig ×6, tiny mushroom ring ×2, all **within ±8% value of the ground**.
- **Prompt:** `seamless tileable dark green woven cloth texture, fine cross-hatch weave, very subtle, low contrast, color #1E3B2A, matte, top-down, no objects, no pattern repeats visible`
- **Embroidery prompt:** `top-down embroidered spiral fern pattern in muted green thread (#2F5B3C) on dark green woven cloth (#1E3B2A), flat, low contrast, stitched lines, isolated motif on a plain background`

#### Path
- **Silhouette:** continuous ribbon with rounded corners and slight organic width variation (±4%).
- **Prompt:** `top-down woven ribbon road of pale sandy thread (#C9AA6B) with double dashed stitched edges in brown (#6E5530) and a thin lighter center thread (#E0C48A), gentle rounded curve, flat, matte, on a plain background`
- Provide segments: straight (256 px long), corner 90° (radius 1 tile), corner 90° mirrored, end cap at the Nexus, start cap at the spawn.

#### Pads
- **Silhouette:** circle (0.84 tile) with a gold ring; subtle inner rune.
- States: **free** (soft gold ring 60%), **hover** (bright ring + 10% fill), **selected** (double ring), **invalid** (red crossed ring `#E5484D`), **occupied** (ring hidden, the tower plinth covers it).
- **Prompt:** `top-down round embroidered patch on dark green woven cloth, a thin gold thread ring (#F2C14E), a small simple rune in the center, darker green fill, stitched edge, flat, centered, plain background`

#### Nexus
- **Silhouette:** a tall irregular **crystal knot** with a wider base: a central tall facet flanked by 2 to 3 shorter shards; ten visible facets; two soft light beams rise from the top.
- **Size:** 2.5 × 3 tiles (160 × 192 px at 1×); glow radius 4 tiles.
- **Colors:** Nexus Prism `#6FF3E3`, Nexus Deep `#1FA6A0`, Nexus White `#E9FFFB`, base stone Linen `#EDE6D4` with gold bands.
- **Effects:** slow pulse 0.5 Hz; the facets shimmer in sequence; **life loss**: red flash, crack lines; **cracks accumulate in 3 stages** at lives 15, 10, 5; at 0 it shatters.
- **Icon concept (lives):** a **faceted crystal heart** in cyan.
- **Prompt:** `a tall glowing crystal knot made of ten faceted cyan crystals (#6FF3E3 with white hot center) rising from a pale cream stone base with thin gold bands, a central tall shard flanked by shorter shards, glowing inner light, faceted glass, warm key light from the top left, matte stone, magical beacon, plain background`

#### Spawn Rift and Gate Arches
- **Spawn rift:** a **torn gap in the cloth** with a dark swirl, loose threads whipping outward, a teal edge glow. Size 1.5 × 1.5 tiles.
  **Prompt:** `top-down tear in dark green woven cloth, ragged loose threads curling outward, a dark indigo-black swirl in the gap with faint teal glowing edges, plain background`
- **Gate arches:** two **living arches** of interwoven branches and leaves framing the road at x ≈ 0.5 to 1.5, each 1.2 tiles wide × 2.5 tall, with small hanging bulb lanterns.
  **Prompt:** `two tall living arches made of interwoven bark branches and leaves in layered cut-paper style, dark emerald and bark brown, hanging small glowing bulb lanterns with warm light, symmetrical gate frame, tabletop miniature, plain background`

#### Decoration (Placement Zones)
| Decor | Count | Zones (tiles, all **≥ 1 tile from the path**, not on pads) | Notes |
|---|---|---|---|
| Large tree cluster (3 stacked rounded canopies) | 3 | (10.5–13.5, 0.2–1.6), (17.8–20.5, 0.3–2.2), (16.5–20.5, 10.3–11.8) | Silhouette: 3 stacked rounded shapes; value +8% |
| Small tree | 4 | (0.2–1.8, 10.5–11.8), (4.5–6.5, 0.2–1.2), (0.3–1.5, 4.2–5.4), (19–20.5, 7.8–9.2) | |
| Mushroom clusters | 4 | (18.5–20, 8.5–9.5), (6–8, 11–11.8), (12–13, 8–9), (0.8–2, 6.8–7.6) | Teal-glow caps `#2DD4BF` at 30% |
| Rocks (3 facets) | 5 | scatter, ≥ 1.2 tiles from path | Value +6% |
| Fern clumps (flat embroidery) | 10 | anywhere on dark cloth | Merge into the ground layer |
| Hanging bulb lanterns | 4 | corners at (10.2,1.0), (7.8,7.0), (2.0,5.0), (12.8,9.2) | Warm glow `#FFD9A0` 20%; **only at path corners**, 1.2 tiles from the path |
| Fallen log | 2 | (1.5–3, 0.3–0.9), (17–19, 11) | |

**Decor prompts**
- Tree cluster: `three stacked rounded canopy layers forming a tree, dark emerald and moss greens, layered cut-paper style, bark brown trunk, low contrast, soft rim light from the top left, tabletop miniature, plain background`
- Mushroom cluster: `small cluster of three mushrooms with deep teal caps and pale stems, faint teal glow on the cap undersides, matte, tabletop miniature, plain background`
- Rocks: `three faceted mossy rocks, grey-brown stone with moss patches, matte, low contrast, tabletop miniature, plain background`

### 5.7 Visual Effects (Map)
| Effect | Description | Colors | Specs |
|---|---|---|---|
| Light shafts | 3 soft diagonal light bands from the top left | `#FFD9A0` at 8% | Additive; behind units |
| Mist | Slow drifting veil along the bottom edge and around the Nexus | `#7FD6B0` at 12% | Max 25% opacity over the path |
| Pollen motes | Small floating specks | `#F5D547` at 40% | Max 30 on screen |
| Fireflies | 8 slow teal dots near the arches and lanterns | `#2DD4BF` | Blink 0.3 Hz |
| Nexus beams | 2 soft vertical beams | `#6FF3E3` at 20% | Additive |
| Border fray | Thread ends gently wave | `#2F5B3C` | 0.2 Hz |
| Vignette | Edge darkening | `#0B0E1F` at 25% | Constant |
| Wave start | Spawn rift widens; threads whip outward | `#2DD4BF` | 600 ms |
| Victory | Threads re-weave across the border; gold motes rise; Nexus beams widen | `#F2C14E`, `#6FF3E3` | 2 s |
| Defeat | Nexus shatters; threads unravel from the border inward; desaturate 40% | `#E5484D` | 2 s |

### 5.8 Animation Ideas (Map)
| Element | Motion |
|---|---|
| Tree canopies | Sway ±1.5° at 0.3 Hz, offset per tree |
| Lanterns | Swing ±4° at 0.5 Hz; glow flicker ±10% |
| Pads | Free pads breathe (ring alpha 55% to 70% at 0.5 Hz) |
| Nexus crystal | Scale ±1.5% at 0.5 Hz; facet glints every 3 s |
| Spawn rift | Swirl rotates 5°/s; threads whip every few seconds |
| Mist | Parallax drift 2 px/s |
| Pollen and fireflies | Slow random drift |

### 5.9 Icon Concept (Map)
- **Rounded-square medallion** (map select), Night Loom field.
- Glyph: **a mini S-shaped pale road on dark green with two arches at the left and a cyan crystal at the right.**
- Rim: Threadgold. Used in the menu and results.

### 5.10 Whole-Map Concept Prompt (for Mood Reference Only)
```
Top-down view of an embroidered tapestry map laid on a dark table, dusk lighting,
a pale sandy thread road with stitched edges winding in an S shape across dark green woven cloth
with faint spiral fern embroidery, two living arches of branches with hanging glowing lanterns
framing the road start on the left, a tall glowing cyan crystal knot at the end of the road
on the right, twelve round embroidered gold-ring patches along the road, sparse low-contrast
trees and mushrooms at the corners and edges, frayed loose threads at the borders fading to
deep indigo void, golden light shafts from the top left, soft teal mist, calm mythic mood,
tabletop diorama, no characters, no UI
```
**Use only as a moodboard.** Build the map from the component layers above so the road and pads remain exact.

---

## 6. Shared Effects, Overlays and Markers

### 6.1 Overlays and Rings (Engine-Drawn, Vector)

| Overlay | Look | Colors |
|---|---|---|
| Range ring (selected tower) | Dashed stitched circle, 20% fill | `#F2C14E` |
| Hover ring on pad | Bright 2 px ring | `#FFFFFF` at 70% |
| Selection | Double ring | `#F2C14E` |
| Placement ghost | 50% opacity tower + ring and range preview; valid green, invalid red with a crossed ring | `#3DDC97` / `#E5484D` |
| Armor ring | Grey segmented ring | `#CBD5E1` |
| Slow ring | Thin cyan ring | `#7DD3FC` |
| Heal aura | Pulsing green circle | `#3DDC97` |
| Pod timer | Orange shrinking arc | `#FB923C` |
| Phase 2 ring | Thick red ring around Myra's base | `#E5484D` |
| Health bars | Red back `#7F1D1D`, Mend Green fill `#22C55E`, Threadgold frame | as listed |

### 6.2 Projectile Sprites (Atlas)

| Projectile | Size | Description | Prompt snippet |
|---|---|---|---|
| Arcane orb | 0.2 tile (13 px) | Violet faceted orb with a white core and 3 trailing threads | `small glowing violet faceted orb with white center, comet thread tail, plain background` |
| Ballista bolt | 0.6 × 0.08 tile (38 × 5 px) | Bronze shaft, steel tip, amber fletching | `side view of a short crossbow bolt with steel tip, wooden shaft and amber fletching, plain background` |
| Ice shard | 0.22 tile (14 px) | Spinning pointed cyan crystal with white veins | `small pointed ice crystal shard, cyan with white veins, glowing, plain background` |
| Spore burst (pod hatch) | 0.8 tile | Magenta and teal spores radiating | `burst of tiny glowing magenta and teal spores radiating outward, plain background` |

### 6.3 Death and Reward Effects

| Effect | Description | Specs |
|---|---|---|
| **Unravel** | Sprite → 5 to 8 curling threads rising 0.6 tile; alpha 100% to 0% | 500 ms; threads are 2 px, faction primary color; accent dot lingers 200 ms |
| **Bounty thread** | Gold thread arcs from the corpse to the gold counter; counter flashes | 400 ms; `#F2C14E` |
| Wave cleared | Small gold ring ripple at the Nexus and "+bonus" label | 600 ms |
| Leak | Enemy dissolves into the Nexus; red flash; hairline crack | 400 ms; `#E5484D` |

### 6.4 Tier Pips and Upgrade Marks

- **Pips:** 1 or 2 small Threadgold dots below the plinth (MVP towers have 2 tiers).
- **Upgrade mark:** a tiny knot badge at the plinth when upgrades are affordable (optional hint, `#F2C14E`).

---

## 7. Asset Manifest

Naming: `kind_name_variant@scale.png`. Deliver at 1×, 2×, 4× (master).

| # | Asset | Canvas (1×) | Layers | Count of files (excl. scales) |
|---|---|---|---|---|
| 1 | `tower_arcane_t1`, `tower_arcane_t2` | 128 × 192 | 8 | 2 |
| 2 | `tower_ballista_t1`, `tower_ballista_t2` | 128 × 192 | 9 | 2 |
| 3 | `tower_frost_t1`, `tower_frost_t2` | 128 × 192 | 10 | 2 |
| 4 | `enemy_thornling` | 64 × 64 | 8 | 1 |
| 5 | `enemy_bark_guard` | 64 × 64 | 9 | 1 |
| 6 | `enemy_druid_warden` | 80 × 96 | 12 | 1 |
| 7 | `enemy_mossback_brute` | 96 × 96 | 12 | 1 |
| 8 | `enemy_pollen_wisp` (+ `shadow_flyer`) | 64 × 64 | 7 | 2 |
| 9 | `pod_spore` (+ `pod_cracks`) | 64 × 64 | 7 | 2 |
| 10 | `boss_myra` (+ `phase2_overlay`) | 256 × 256 | 14 | 2 |
| 11 | `map_gg_ground_weave`, `map_gg_embroidery_*` | 256 × 256 tile; decals 64–256 | n/a | 1 + 14 |
| 12 | `map_gg_path_*` (straight, corner L, corner R, caps) | 256 × 256 segments | n/a | 5 |
| 13 | `map_gg_pad_*` (free, hover, selected, invalid) | 64 × 64 | n/a | 4 |
| 14 | `map_gg_nexus` (+ cracks 1–3, glow) | 192 × 256 | 5 | 5 |
| 15 | `map_gg_spawn_rift` | 96 × 96 | 3 | 1 |
| 16 | `map_gg_gate_arches` (back, front) | 192 × 192 | 2 | 2 |
| 17 | `map_gg_decor_*` (trees, mushrooms, rocks, logs, lanterns) | 64–192 | n/a | ≈ 14 |
| 18 | `fx_*` (orb, bolt, shard, spores, glow, thread, knot burst, rings) | 16–64 | n/a | ≈ 18 |
| 19 | `icon_*` (see §7.1) | 128 master (24/32/48/64/96) | n/a | 24 |

### 7.1 Icon List (MVP)

| Group | Icons | Medallion |
|---|---|---|
| Towers | Arcane Tower, Ballista Post, Frost Spire | Hexagon |
| Enemies | Thornling Scout, Bark Guard, Druid Warden, Mossback Brute, Pollen Wisp | Circle |
| Boss and objective | Sporemother Myra (and phase 2), Spore Pod | Octagon (boss), Circle (pod) |
| Map | Greenwood Gate | Rounded square |
| Resources and HUD | Gold, Lives (crystal heart), Wave, Start/Call wave, Speed, Pause, Upgrade, Sell | Circle / Rounded square |
| Status | Armor, Slow, Heal, Flying | Shield |

**Generic icon prompt template**
```
Game UI icon, a single bold flat symbol of {glyph description} in {glyph color},
inside a {medallion shape} medallion with a dark navy field (#12162E) and a thin gold rim (#F2C14E),
simple shapes, one small accent dot, thin dark outline, subtle 1 pixel highlight on the top left edge,
cut-paper look, no gradients, no text, readable at 24 pixels, centered, plain background
```

---

## 8. Acceptance Checklist

Run for **every** asset before it enters the atlas (see Art Bible §11).

| # | Check | Pass criteria |
|---|---|---|
| 1 | **Silhouette at 24 px** | 5 of 5 testers name the asset in 3 s |
| 2 | **Grayscale** | Towers lighter than enemies; enemies darker than the path; path lighter than ground |
| 3 | **Size** | Matches the size table and the simulation radius |
| 4 | **Colors** | All colors snap to the palette ramps; one accent only on enemies; school color only on tower cores |
| 5 | **Lighting** | Key light top left on every asset; rim light on the lit edge |
| 6 | **Outline** | 2 px, dual-tone, consistent |
| 7 | **Thread Rule** | Towers: taut gold thread; enemies: loose frayed ends |
| 8 | **Layers** | All layers delivered and named; additive layers separate |
| 9 | **Category cues** | Ring or base matches category (Warden violet ring, Brute double gold ring, Wisp detached shadow, Pod orange ring) |
| 10 | **Clutter test** | 40 enemies + 8 towers at 2× speed: every elite, pod and the boss still locatable |
| 11 | **Color-vision test** | Protan, deutan, tritan: towers and categories still distinct by shape and ring |
| 12 | **No faces** | No cartoon face, no mouth, no text, no watermark |
| 13 | **Provenance** | A row in `provenance.csv` (tool, version, prompt, seed, edits) |

### 8.1 Build Order Recommendation

1. Arcane Tower (sets the family look), then Thornling Scout (sets the enemy look). Lock both as style references.
2. Greenwood Gate ground, path, pads, Nexus (replaces the prototype map).
3. Ballista Post, Frost Spire, then Bark Guard, Pollen Wisp.
4. Druid Warden, Mossback Brute.
5. Spore Pod, Sporemother Myra, boss intro and phase 2 effects.
6. HUD icons and projectile and effect sprites.
7. Decor, lanterns, atmosphere layers, final polish.
