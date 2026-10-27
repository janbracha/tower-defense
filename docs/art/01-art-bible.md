# Guardians of the Nexus: Art Bible

**Version:** 1.0 · **Status:** Art direction baseline for the MVP and the full 10-act game
**Audience:** the solo developer, AI image tools, and any future contractor
**Related:** [GDD index](../gdd/00-index.md) · [Factions](../gdd/03-factions.md) · [Towers](../gdd/04-towers.md) · [Enemies](../gdd/06-enemies.md) · [Bosses](../gdd/07-bosses.md) · [Maps](../gdd/09-citadel-and-maps.md) · [Rendering pipeline](../tdd/03-rendering-pipeline.md)

This document decides **how the game looks**. It does not contain images. Every rule is written so that it can be checked on a finished asset (a number, a shape, a hex value, a test).

---

## Table of Contents

1. [Visual Style](#1-visual-style)
2. [Color Palette](#2-color-palette)
3. [Atmosphere](#3-atmosphere)
4. [World Architecture](#4-world-architecture)
5. [Tower Architecture](#5-tower-architecture)
6. [Enemy Design Language](#6-enemy-design-language)
7. [Map Design Language](#7-map-design-language)
8. [UI Style](#8-ui-style)
9. [VFX Style](#9-vfx-style)
10. [Icon Style](#10-icon-style)
11. [Readability Standard and QA](#11-readability-standard-and-qa)
12. [Production: AI-Assisted Pipeline and Technical Specs](#12-production-ai-assisted-pipeline-and-technical-specs)
13. [Do and Don't](#13-do-and-dont)

---

## 1. Visual Style

### 1.1 Style Name and One-Line Pitch

**"Woven Light."** The world is a **tapestry stitched by the First Guardian**, and the Fracture is **unravelling it**. The player's side is built from tight, golden thread and glowing crystal. The invaders are grown, forged or summoned from the loose, frayed ends.

> *A tabletop diorama of cloth, crystal and light: calm and handmade at rest, luminous and sharp in combat.*

### 1.2 Art Pillars

| # | Pillar | What it means on screen | Test |
|---|---|---|---|
| 1 | **Readable first, beautiful second** | Gameplay information (who, where, how dangerous) is always legible at the far camera. Decoration yields to it. | 24 px silhouette test (§11) |
| 2 | **Light is ours, dark is theirs** | Defenders are the lightest, most luminous objects on dark ground. Invaders are dark shapes on a light path. | Grayscale test (§11) |
| 3 | **The Thread Rule** | Taut, straight, golden thread means *order and the Guardian*. Frayed, curling, loose thread means *the Fracture and the invaders*. | Any asset can be sorted "ours/theirs" without color |
| 4 | **Handmade, not rendered** | Visible stitching, cut-paper edges, hand-sculpted forms, matte surfaces. No glossy plastic, no photoreal PBR. | Material checklist (§1.6) |
| 5 | **Few shapes, big ideas** | Each object is 2 to 4 large shapes plus 1 accent. Detail lives inside shapes, never on the outline. | Squint test (§11) |

### 1.3 The Look in One Paragraph

A fixed, slightly tilted camera looks down on a **dusk-lit embroidered tapestry**. The ground is dark, matte cloth with a faint weave. A bright, stitched **thread road** winds across it. **Pale stone-and-gold defenders** stand on embroidered **pads**, each with a glowing, school-colored crystal core. **Dark, textured invaders** crawl along the road, each on a small **category base** (round, square, crowned) so their type reads from far away. The map ends in **frayed threads** that dissolve into indigo nothing, the *Unwritten*. At the far end, the **Nexus**, a faceted crystal knot, glows cyan-white and is the brightest thing on the screen.

### 1.4 Camera, Perspective, Lighting and Line

| Property | Decision | Reason |
|---|---|---|
| Camera | Fixed orthographic, **top-down map, upright "miniature" sprites** (tilt ≈ 35° for sprites, 90° for the ground) | Matches the current Pixi renderer and keeps pathing readable |
| Ground | Flat top-down plane (a cloth laid on a table) | Tapestry concept; no perspective distortion on the path |
| Units | Drawn as small standing figurines seen from a 3/4 front view, each on a **base token** | Silhouettes read like board-game miniatures |
| Light direction | **Top-left, 315°, 45° elevation** for every asset | One shadow direction everywhere keeps sprites consistent |
| Light color | Warm key `#FFD9A0`, cool fill `#6C7BD8` | Dusk look; warm on lit sides, cool in shadow |
| Shading | **3-step cel shade** (shadow, base, light) plus a 1 to 2 px **rim light** on the lit side | Cheap to author, survives scaling, works with AI-generated bases |
| Outline | **Dual-tone**: a 2 px dark outer line (`#12162E` for defenders, a tinted near-black for enemies) plus an inner rim light | Keeps units readable on both dark ground and bright path |
| Shadows | A soft **contact shadow** ellipse under every unit (flyers: shadow offset 0.5 tile down-right) | Grounds units; shows altitude for flyers |
| Texture | Subtle fabric weave on ground only; units are mostly flat with 1 texture accent | Avoids noise that fights readability |
| Detail budget | Max 4 secondary details per tower, 3 per enemy, 6 for a boss | Anything more is lost at far zoom |

### 1.5 What Makes It Ours (Differentiation)

| Axis | Kingdom Rush family (avoid) | Cursed Treasure family (avoid) | **Guardians of the Nexus** |
|---|---|---|---|
| Overall feel | Bright, saturated, painterly cartoon with heavy outlines and chibi proportions | Flat, dark-comedy cartoon, thick outlines, villain-keeper tone | **Dusk-lit cloth diorama, mythic and calm, luminous crystal** |
| Palette logic | High-saturation everything, green meadows, blue skies | Dark, muted dungeon tones with spot colors | **Dark ground + warm path + glowing cores; saturation reserved for gameplay** |
| Proportions | Big heads, short bodies, comic faces | Exaggerated comic silhouettes | **Tall, slender, symbolic forms; faces are masks and sigils, not cartoon faces** |
| Surface | Painted, soft gradients | Flat vector fills | **Stitched cloth, cut paper, faceted crystal, matte stone** |
| Signature | Heroic barracks and stone keeps | Evil lair gags | **Thread language, category bases, unravelling deaths, frayed map edges** |
| Mood | Adventurous, jokey | Mischievous, cynical | **Mythic, hopeful, morally nuanced** (see [worldbuilding tone](../gdd/02-worldbuilding.md)) |

Rules that protect the difference:

1. **No heavy black cartoon outlines.** Outlines are thin and dual-tone.
2. **No tower is a generic stone keep, barracks or wizard hat.** Every tower is an object built from the **loom, spindle, needle and crystal** vocabulary (§5).
3. **No comic faces.** Humanoid enemies have masks, hoods or abstract face plates. Eyes are a single glowing mark.
4. **Backgrounds are never scenery paintings.** They are cloth with embroidery, so the camera never fights a detailed landscape.

### 1.6 Material Vocabulary (Global)

| Material | Where | Look |
|---|---|---|
| **Weave** (cloth) | Ground, banners, enemy wrappings | Matte, fine cross-hatch, desaturated, low contrast |
| **Thread** | Path edges, tower trims, FX lines, UI trim | Thin, tapered, slight sheen. Gold = ours, frayed fibre = theirs |
| **Weave-stone** | Defender bodies | Pale cream limestone, soft bevel, gold inlay |
| **Crystal** | Tower cores, Nexus, pads | Faceted (6 to 12 planes), inner glow, no refraction realism |
| **Cut paper** | Decorative props, UI cards | Hard edge, slight drop shadow, 1 px lighter edge |
| **Organic growth** | Verdant enemies | Bark, moss, fungus: lumpy, matte, soft rim |
| **Forged metal** | Mechanical, martial | Dark, low-sheen, bright edge highlights only |

### 1.7 References (Overall Style)

Study the *principles*; never trace or copy.

| Reference | Take from it |
|---|---|
| **Bayeux Tapestry**, **Unicorn Tapestries (The Hunt of the Unicorn)** | Narrative cloth, flat figures, border ornaments, stitched outlines |
| **William Morris** textiles and wallpapers | Dense natural pattern that stays calm; ideal for Verdant ground embroidery |
| **Sashiko and boro mending** (Japan) | Visible mending stitches; the "repair vs unravel" metaphor |
| **Bad North** (game) | Diorama islands, minimal shapes, strong readability |
| **Monument Valley** (game) | Clean planes, restrained palettes, confident color blocking |
| **Hades** (game) | Rim light, silhouette priority, saturated accent on dark backgrounds |
| **Dorfromantik** (game) | Tabletop tile diorama feeling |
| **Moebius (Jean Giraud)** | Thin line, flat color, mythic calm |
| **Stained glass, Gothic rose windows** | Crystal facets and luminous color on dark frames |

---

## 2. Color Palette

### 2.1 Principles

1. **Value before hue.** Design in grayscale first. Hue only confirms what value already says.
2. **Value ladder** (from lowest to highest brightness): *void < ground < enemies < path < defenders < UI text < FX cores < Nexus.*
3. **Saturation is a budget.** Ground: low. Path: medium. Defenders: medium with one high-saturation core. Enemies: medium, one accent. FX: highest.
4. **60 / 30 / 10 rule** per screen: 60% dark ground and void, 30% path and mid-tones, 10% luminous accents (cores, FX, UI gold).
5. **One shift rule for ramps:** shadows shift cooler and slightly more saturated, highlights shift warmer and slightly lighter (see §2.8).
6. **Gold is trim, school color is glow.** Gold appears as thin matte bands everywhere. Emissive saturation belongs only to school cores and projectiles.

### 2.2 Master Palette (Global Roles)

| Role | Name | Hex | Use |
|---|---|---|---|
| Deepest | **Void Ink** | `#0B0E1F` | Outside the map, the Unwritten, screen vignette |
| UI base | **Night Loom** | `#12162E` | Panels, outlines on defenders |
| UI mid | **Indigo Deep** | `#1B2146` | Panel fills, hover states |
| UI raised | **Indigo Mid** | `#2A3166` | Cards, selected states |
| UI line | **Slate Dusk** | `#4A5280` | Borders, secondary text, disabled |
| Soft text | **Mist** | `#A9B0D6` | Secondary text, captions |
| Light neutral | **Linen** | `#EDE6D4` | Weave-stone highlights, primary text on dark |
| Brightest neutral | **Parchment** | `#F6EFD9` | Headlines, key numbers |
| Primary accent | **Threadgold** | `#F2C14E` | Gold currency, trims, primary buttons, selection |
| Gold shade | **Gold Deep** | `#B8862B` | Gold shadows, pressed state |
| Gold light | **Gold Light** | `#FFE3A0` | Gold highlights, hover |
| Nexus | **Nexus Prism** | `#6FF3E3` | The Nexus crystal, lives, friendly objectives |
| Nexus shade | **Nexus Deep** | `#1FA6A0` | Nexus shadow facets |
| Nexus core | **Nexus White** | `#E9FFFB` | Nexus hot center |
| Danger | **Fracture Red** | `#E5484D` | Damage taken, low lives, leaks, errors |
| Heal / OK | **Mend Green** | `#3DDC97` | Healing, success, valid placement |
| Caution | **Warning Amber** | `#FFB020` | Warnings, timers about to expire |
| Slow / status | **Frost Ring** | `#7DD3FC` | Slow ring and status indicators (matches prototype) |

### 2.3 Tower School Colors (Core and Projectile)

The **body** of every tower is Weave-stone (`#EDE6D4`, shade `#B9AF98`, shadow `#6F6A7A`) with Threadgold trim. **Only the core crystal, the projectile and the base-pad ring use the school color.** This lets 30 towers share one family look while 10 schools stay distinguishable.

| School | Core | Glow | Shape cue (see §5) | Notes |
|---|---|---|---|---|
| Arcane | `#A66BFF` | `#D4B5FF` | Diamond on a stalk | Prototype `#C084FC` is the same hue family |
| Martial | `#E08A1E` | `#F5C27A` | Horizontal T/L frame | No glow core; uses bronze and steel `#9AA5B8` |
| Flame | `#FF5A36` | `#FFB199` | Open bowl with a flame lick | Warm, asymmetric |
| Frost | `#4CC9F0` | `#B8EEFF` | Stacked spike | Prototype `#38BDF8` family |
| Storm | `#F2F542` | `#FFFDB0` | Forked double prong | Brightest yellow; never used for gold |
| Nature | `#6FD36B` | `#C4F5B0` | Round canopy mound | Ensure green body is never used (body stays stone) |
| Shadow | `#2B1245` (dark gem) | `#E040A0` rim | Obelisk with a cut-out | **Dark core with a bright rim**: distinct by value |
| Radiant | `#FFF8E0` | `#FFFFFF` | Starburst crown | Near-white, radial rays |
| Crystal | `#F2B8E6` to `#BDE9FF` | `#FFFFFF` | Cluster of hex shards | Prismatic gradient, the only multi-hue core |
| Void and Time | `#1FD1A5` ring | `#0A0F14` hole | Ring with an empty center | Green-teal; never mixed with the cyan-white Nexus |

### 2.4 Faction (Enemy) Palettes

Enemy bodies follow the faction identity from [03-factions.md](../gdd/03-factions.md). The **accent** is the small glowing mark (eyes, runes, veins). Enemies stay **dark to mid value**; the accent is the only bright pixel cluster.

| Act / Faction | Primary | Secondary | Accent | Mood word |
|---|---|---|---|---|
| I Verdant Covenant | Emerald `#2E8B57` | Moss-brown `#6B5A2E` | Bio-teal `#2DD4BF` | Gentle, overgrown |
| II Ashen Sultanate | Dusk gold `#A67C2E` | Lapis `#2C4A9A` | Ash `#C9C3B8` | Eternal noon |
| III Ember Clans | Obsidian `#1C1417` | Iron `#4B3A3A` | Ember `#FF7A2E` | Willful, fierce |
| IV Iron Collective | Brass `#B08A3C` | Soot `#2B2A2C` | Steam white `#EDEDED` | Efficient, mechanical |
| V Frostbound Reach | Ice `#8FB8D8` | Indigo `#26306B` | Aurora `#7CFFD0` | Still, austere |
| VI Crystalline Choir | White glass `#E8EEF8` | Violet `#7A5FD0` | Prism pink `#FF9AD5` | Resonant |
| VII Arcane Dominion | Violet `#5B3FA8` | Midnight `#171B3D` | Silver `#C8D0E6` | Calculated |
| VIII Hollow Court | Charcoal `#2A2F2E` | Bone `#D9D2BE` | Soul green `#9BE85A` | Solemn |
| IX Celestial Order | Marble `#E6E1D3` | Sky `#5E9BE0` | Halo gold `#FFD65E` | Judging |
| X Void Swarm *(proposed)* | Oil black `#0D0A14` | Bruise `#4B2C6B` | Sodium lime `#C7F23A` | Hungry |

### 2.5 Biome Ground and Path Keys

**Every biome is shown at its dusk hour** (desert and tundra are not bright). That keeps the value ladder (§2.1) valid across the whole game.

| Biome | Ground (dark weave) | Path (thread road) | Path edge stitch | Atmosphere tint |
|---|---|---|---|---|
| Forest (Verdancy) | `#1E3B2A` | `#C9AA6B` | `#6E5530` | Mist teal `#7FD6B0` |
| Desert (Ashen Expanse) | `#4A3B34` | `#E0C48A` | `#8A6A3A` | Dusk rose `#E8A9A0` |
| Volcano (Cinderhold) | `#2A1A1E` | `#E8A56A` | `#8A3A22` | Ash orange `#FF7A2E` |
| Smelter Badlands | `#2B2A2C` | `#C98B5B` | `#5A4636` | Steam grey `#BFC4CC` |
| Tundra (Fimbul Reach) | `#1F3350` | `#CFE4F2` | `#6A8CAA` | Aurora `#7CFFD0` |
| Crystal Wastes | `#2B2442` | `#E9DDF7` | `#8A78B8` | Prism pink `#FF9AD5` |
| Ruins: Academy | `#232047` | `#D8D2E8` | `#6A62A0` | Silver violet `#C8D0E6` |
| Ruins: Necropolis | `#1C2224` | `#BFC8B8` | `#5A6A5C` | Soul green `#9BE85A` |
| Sky Islands | `#26406B` | `#F3E6C4` | `#B89A5E` | Gold haze `#FFD65E` |
| Void Realm | `#120C1F` | `#B9A7E8` | `#5B4A8A` | Sodium lime `#C7F23A` |

### 2.6 Status and Feedback Colors

| Meaning | Color | Shape (never color alone) |
|---|---|---|
| Slowed | Frost Ring `#7DD3FC` | Thin ring around the enemy |
| Armored | Linen-grey `#CBD5E1` | Thick segmented ring |
| Healing aura | Mend Green `#3DDC97` | Rising "+" beads and a pulsing circle |
| Burning / damage over time | Flame `#FF5A36` | Flicker above the unit |
| Pod hatching timer | Warning Amber `#FB923C` | Shrinking arc ring (as in the prototype) |
| Valid placement | Mend Green `#3DDC97` | Ghost tower plus a solid ring |
| Invalid placement | Fracture Red `#E5484D` | Ghost plus a crossed ring |
| Selected | Threadgold `#F2C14E` | Double ring |

### 2.7 Accessibility

- **Never use color alone.** Every state also has a shape, pattern or icon (the tables above list each).
- Test every sprite set under **protanopia, deuteranopia and tritanopia** simulations (§11).
- **Text contrast** at least 4.5:1; **icons and large UI** at least 3:1 against their panel.
- Provide a **High-Contrast Outline** setting that thickens outlines to 3 px and adds a white inner rim to enemies.
- **Red/green pairs** (Fracture Red and Mend Green) always carry an icon (heart-crack, plus sign).

### 2.8 Ramp Recipe (for Hand and Script Use)

Create every material as a **5-step ramp** from its base color, in HSL:

| Step | Lightness | Hue shift | Saturation |
|---|---|---|---|
| Shadow (−2) | −24% | +12° toward blue/violet | +6% |
| Shade (−1) | −12% | +6° | +3% |
| **Base (0)** | 0 | 0 | 0 |
| Light (+1) | +10% | −5° toward yellow | −2% |
| Highlight (+2) | +20% | −10° | −6% |

A palette-lock script (§12.3) snaps AI output to these ramps.

### 2.9 Prototype to Bible Mapping

The current programmer art in [styles.ts](../../packages/render/src/scene/styles.ts) already uses compatible hues. Target changes when real art lands:

| Prototype | Now | Bible target |
|---|---|---|
| Ground | `#1D3A26` | `#1E3B2A` (Forest ground) |
| Path fill | `#7A6338` | `#C9AA6B` (brighter, to carry the value ladder) |
| Nexus marker | `#22D3EE` | `#6FF3E3` with white core |
| Arcane / Physical / Frost | `#C084FC` / `#F59E0B` / `#38BDF8` | `#A66BFF` / `#E08A1E` / `#4CC9F0` |
| Thornling | `#84CC16` | `#2E8B57` body, `#2DD4BF` eyes |
| Druid Warden | `#D946EF` (magenta) | Teal accent; magenta is reserved for Myra and Shadow |
| Pollen Wisp | `#FDE047` | Pale yellow-white glow body with a darker shadow |

---

## 3. Atmosphere

### 3.1 Artistic Description

**"The held breath before the storm."** Each battle is a **golden-hour dusk**: long, soft light from the upper left, deep blue-violet shadows, motes of thread-light drifting upward. The mood is **mythic and hopeful**, never grim or gory. The Nexus is the warm heart of the scene; the Unwritten at the borders is cold and quiet. Combat adds light, not darkness.

### 3.2 Layers of Atmosphere (Back to Front)

| Layer | Content | Rules |
|---|---|---|
| 0 Void | Void Ink background, faint star-threads | Never brighter than `#161B3A` |
| 1 Frayed border | The tapestry edge: loose threads, torn weave, fade to the Unwritten | 1 to 1.5 tiles wide; no gameplay objects inside |
| 2 Ground | Dark weave with biome embroidery | Value within ±8% of the ground key |
| 3 Path and pads | Thread road, pad patches, Nexus | Highest-value ground elements |
| 4 Units | Towers, enemies, projectiles | The gameplay layer |
| 5 Light | Soft additive glow, god-rays from the top left | Max 12% opacity over the path |
| 6 Particles | Dust motes, pollen, embers (biome-specific) | Max 40 on screen, low contrast |
| 7 Vignette | Void Ink at 25% on the edges | Keeps eyes in the center |

### 3.3 Mood Per Phase of a Battle

| Phase | Light | Saturation | Motion | Audio sync |
|---|---|---|---|---|
| **Prep / break** | Warm, bright, motes drift slowly | Base | Idle sways | Calm theme |
| **Wave in progress** | Cooler fill, path glows slightly | +5% | Enemy movement, pulses | Rhythm layer |
| **Elite / mini-boss** | Spotlight pool on the unit, sky dims 10% | +8% | Slow heartbeat pulse in the vignette | Low strings |
| **Boss phase 2** | Faction accent bleeds into vignette | +10% | Frayed threads whip in | Full theme |
| **Low lives (≤ 25%)** | Hairline cracks at the screen edge, desaturate 10% | −10% | Nexus flicker | Muffled pad |
| **Victory** | Gold-white wash, threads re-weave across the border | +10% | Motes rise | Resolve |

### 3.4 Weather and Hazards (Visual Language)

Weather is drawn as **thread patterns**, not realistic particles, so it never hides units.

| Effect | Visual | Gameplay-safe rule |
|---|---|---|
| Rain | Thin diagonal silver threads, sparse | Never cross the path with more than 15 lines |
| Fog | Soft cloth veil in the biome tint | Opacity ≤ 25% over the path; towers stay above the fog layer |
| Sandstorm / ash / blizzard | Wide horizontal ribbons moving across | Ribbons are **behind** units; max 20% opacity |
| Lava / vents | Pulsing stitched circles that glow before erupting | A 1 s warning ring always precedes damage |
| Night / eclipse | Value drop of 15% on the ground only | Path and units keep their value |

### 3.5 Per-Biome Atmosphere

| Biome | Light | Motes | Border fray | Signature |
|---|---|---|---|---|
| Forest | Golden shafts, teal mist | Pollen, fireflies | Moss and root threads | Spiral-motif embroidery, hanging lanterns |
| Desert | Rose dusk, long shadows | Sand sparks | Bandage-like frayed linen | Sun-disc and glyph embroidery |
| Volcano | Orange under-light | Embers | Burnt, curling edges | Ember stitches that glow |
| Badlands | Steam haze | Sparks, steam puffs | Wire and thread tangles | Rivet-stitched seams |
| Tundra | Aurora ribbons | Snow flecks | Icicle-fringed edge | Hexagonal frost embroidery |
| Crystal | Prismatic refractions | Light prisms | Glass-thread splinters | Rainbow caustics on the path |
| Academy | Candle warm, violet shade | Floating script | Page-edge torn paper | Circular sigil embroidery |
| Necropolis | Lantern green, cold | Soul wisps | Ash threads | Funerary border patterns |
| Sky Islands | High bright, gold haze | Feathers | Cloud wisps | Halo and wing motifs |
| Void | Inverted: dark light | Reverse-falling motes | The edge *eats* the cloth | Stitches coming undone |

### 3.6 References (Atmosphere)

| Reference | Take from it |
|---|---|
| **Studio Ghibli background art** (golden hour skies) | Warm dusk light, gentle mood |
| **Hades** | Rim light and luminous accents on dark scenes |
| **Gris** (game) | Color mood as emotion |
| **Journey** (game) | Warm light against vast calm emptiness |
| **Edward Gorey**-like crosshatch fog (for texture only) | Sparse line-based atmosphere |
| **Japanese ukiyo-e sunset gradients** | Flat banded gradients instead of smooth blurs |

---

## 4. World Architecture

### 4.1 Artistic Description

Two construction philosophies share every map:

- **Guardian architecture ("Loomwork")**: built *by order*. Symmetric, tapering, vertical, bound with gold thread. Pale weave-stone, gold inlay, crystal. Shapes borrow from **looms, spindles, shuttles, needles, spools and warp frames**.
- **Invader architecture**: built *by growth, forging or belief*. Each faction builds in its own material (§4.4), but always **asymmetric, heavier at the base, with loose, trailing ends**.

The **Nexus** is the keystone of the whole language: a crystalline knot where ten threads meet, so every Guardian structure references the number ten in some way (ten bands, ten facets, ten spokes).

### 4.2 Loomwork Shape Grammar

| Element | Form | Use |
|---|---|---|
| **Spindle** | Tall tapered cylinder with a bulb | Towers, pillars, banner poles |
| **Warp frame** | Rectangular frame with vertical strings | Gates, arches, UI frames |
| **Shuttle** | Pointed oval | Projectiles, leaf motifs, wave icons |
| **Spool** | Stacked discs with a wound band | Bases, pads, currency icon |
| **Needle** | Long thin spike with an eye | Spires, markers, cursors |
| **Knot** | Interwoven loop | Nexus, evolution badges |
| **Selvage** | Border band with repeating stitch | Map edges, panel trims |

### 4.3 Primary Colors, Secondary Colors

| | Colors |
|---|---|
| **Primary** | Linen `#EDE6D4`, Threadgold `#F2C14E`, Night Loom `#12162E` |
| **Secondary** | Weave-stone shade `#B9AF98`, shadow `#6F6A7A`, Nexus Prism `#6FF3E3`, school accents (§2.3) |

### 4.4 Silhouettes and Materials by Faction Architecture

| Faction | Silhouette keywords | Materials | Recurring motif |
|---|---|---|---|
| **Guardian (Loomwork)** | Tapering, vertical, symmetrical, ten-banded | Weave-stone, gold thread, crystal | Warp frame, spindle, knot |
| Verdant Covenant | Arching roots, bulb lanterns, mushroom domes | Living wood, moss, bio-lamps | Spiral, petal, seed |
| Ashen Sultanate | Stepped blocks, obelisks, sun discs | Sandstone, bandage cloth, lapis | Scarab, glyph row |
| Ember Clans | Jagged blades, banner poles, forge chimneys | Obsidian, hammered iron, ember glass | Fang, flame banner |
| Iron Collective | Stacked boxes, pipes, gears | Brass, copper, riveted plate | Cog, rivet line |
| Frostbound Reach | Hexagonal columns, long spears | Ice, fur, carved rime stone | Hexagon, rune |
| Crystalline Choir | Clustered shards, tuning-fork spires | White glass, prism | Facet, wave |
| Arcane Dominion | Circular halls, floating tomes | Violet marble, silver, rune glass | Circle sigil |
| Hollow Court | Hooded arches, lanterns, tombs | Charcoal stone, bone, funerary iron | Lantern, crow |
| Celestial Order | Angular colonnades, winged gates | White marble, gold, cloud | Halo, wing |
| Void Swarm | Sprawling, drooping, wrongly angled | Oil-black membranes | Eye, tear |

### 4.5 Scale and Placement

| Object | Size (in tiles) | Rule |
|---|---|---|
| Nexus | 2.5 × 3 | Largest friendly object; glow radius 4 tiles |
| Spawn rift | 1.5 × 1.5 | Frayed tear in the weave, dark swirl |
| Large background props | up to 2 × 2 | Must be at least 1 tile from the path |
| Small props | 0.3 to 0.8 | Embroidered *flat* into the ground wherever possible |
| Tower footprint | 1 × 1 (small pad), 2 × 2 (large pad) | See §5 |

### 4.6 References (World Architecture)

| Reference | Take from it |
|---|---|
| **Loom, spindle and bobbin forms** (real textile tools) | The Guardian shape grammar |
| **Gothic tracery and rose windows** | Crystal frames and ten-fold symmetry |
| **Art Nouveau (Mucha, Guimard)** | Organic ornamental lines for Verdant |
| **Egyptian and Mesopotamian relief architecture** | Ashen stepped blocks |
| **Brutalist and industrial design** (Soviet, Victorian ironwork) | Iron Collective mass |
| **Ghibli's *Castle in the Sky*** | Floating ruins for Sky Islands |

---

## 5. Tower Architecture

### 5.1 Artistic Description

Towers are **Guardian-crafted instruments**: pale weave-stone bodies with a **gold thread band** per tier, topped by a **school-colored crystal core**. They are the **tallest, lightest, most symmetric** objects on the field after the Nexus. A viewer can say *what a tower does* from its top shape alone.

### 5.2 The Tower Rules

1. **Towers rise, enemies crawl.** Tower aspect ratio (height : width) ≥ 1.3. Enemies (non-boss, non-flying) ≤ 1.1.
2. **Each school owns one top silhouette** (§5.4). Within a school, towers differ by *body* shape.
3. **Body is stone, core is color.** School color only on core, projectile, pad ring.
4. **Tier tells size and ornament**: I plain, II gold band and a satellite crystal, III a floating halo ring, IV (A or B) a unique crown silhouette.
5. **Idle motion**: the core bobs (±2 px at 0.6 Hz) and breathes (glow ±10%). A dead-still tower looks like a prop.
6. **Fire feedback**: a 3-frame anticipation (core brightens and recoils 4 px), a muzzle flash in school color.
7. **Dual-tone outline**: Night Loom `#12162E` outside, white-warm rim inside on the lit side.

### 5.3 Dimensions and Layers

| Property | Value |
|---|---|
| Canvas | 2 tiles wide × 3 tiles tall at 1× (128 × 192 px at 64 px/tile) |
| Footprint | 1 tile (small pad), 2 × 2 (large pad) |
| Visible height | 1.4 to 1.8 tiles for small pads, up to 2.6 for large |
| Layers | (1) Pad ring, (2) body, (3) trim, (4) core, (5) glow overlay, (6) tier pips |
| Tier pips | 1 to 4 small gold dots under the base (as already drawn in the prototype) |
| Contact shadow | Ellipse, 60% base width, 35% opacity |

### 5.4 School Silhouette Table

| School | Top silhouette (the "read") | Body architecture | Idle effect | Projectile |
|---|---|---|---|---|
| Arcane | **Diamond or sphere on a slender stalk** | Spindle pylon | Core bobs, orbiting sparks | Homing orb with a comet thread |
| Martial | **Wide T or L (horizontal bar)** | Wooden-and-bronze frame, braced legs | Bow arms creak | Straight bolt or shell |
| Flame | **Open bowl with one flame lick, asymmetric** | Squat brazier, soot-streaked stone | Heat shimmer | Fire blob or arc |
| Frost | **Tall triangle, stacked spikes** | Narrow spire with icicle fringe | Frost breath | Ice shard |
| Storm | **Forked double prong with a gap** | Tripod coil | Arc crackle between prongs | Chain-lightning line |
| Nature | **Round canopy mound** | Rooted stump with leaf crown | Sway | Seed or thorn |
| Shadow | **Obelisk with a hollow cut-out** | Black-veined stone slab | Smoke downward | Bolt that dims light |
| Radiant | **Starburst crown (radial rays)** | Pillar with a sun-disc | Pulsing rays | Beam |
| Crystal | **Cluster of 5 to 7 hex shards** | Shard outcrop | Refraction sparkle | Prismatic beam |
| Void and Time | **Ring with an empty center** | Floating torus on a thin base | Ring rotates slowly | Warp pulse |

### 5.5 MVP Towers in Detail

#### Arcane Tower

- **Artistic description:** A thin weave-stone **spindle pylon** wrapped by a single gold thread, topped by a **floating violet diamond**. Reads as "the clean, reliable wizard's needle".
- **Primary colors:** Linen `#EDE6D4`, Arcane core `#A66BFF`
- **Secondary colors:** Threadgold `#F2C14E`, shadow `#6F6A7A`, glow `#D4B5FF`
- **Silhouette:** Tall, narrow, symmetrical; a small floating diamond above a stalk. Aspect 1:2.2.
- **Materials:** Matte weave-stone, matte gold thread, faceted crystal with an inner glow.
- **Tier II / III:** II adds a second gold band and 2 orbiting shards. III adds a thin floating ring halo.
- **References:** Needle and spindle forms; Gothic pinnacle finials; *Hades* spell orbs.

#### Ballista Post

- **Artistic description:** A **low, wide crossbow frame** of pale timber and bronze on a stone plinth, with a visible loaded bolt. Reads as "heavy, practical, long range".
- **Primary colors:** Linen `#EDE6D4` stone, bronze `#C98A3B`
- **Secondary colors:** Martial amber `#E08A1E` (fletching and banner), steel `#9AA5B8`, Threadgold trim
- **Silhouette:** Wide **T**: horizontal bow arms across a short stalk. Aspect 1:1.4. The only tower wider than it is tall.
- **Materials:** Bleached wood grain, hammered bronze, rope, stone.
- **Tier II / III:** II adds a second bow pair and a bronze shield plate. III adds a banner pole.
- **References:** Roman *scorpio* and medieval arbalest diagrams; Bayeux Tapestry siege engines; *Bad North* wooden props.

#### Frost Spire

- **Artistic description:** A **narrow stack of three pale-blue spikes** rising from a stone base, hung with a fringe of icicle shapes and breathing a faint cold mist. Reads as "sharp, cold, controlling".
- **Primary colors:** Linen `#EDE6D4` (frosted), Frost core `#4CC9F0`
- **Secondary colors:** Glow `#B8EEFF`, Threadgold trim, shadow `#6F6A7A`
- **Silhouette:** Isosceles triangle with notched sides. Aspect 1:2.
- **Materials:** Frosted stone, translucent ice facets, thin gold thread.
- **Tier II / III:** II adds a lower ring of spikes. III adds a floating snow-crystal halo.
- **References:** Nordic stave-church pinnacles; ice formations; Fimbul Reach hex motifs.

### 5.6 Evolutions (Tier IV A or B)

- A and B must differ by **silhouette**, not only color: one **wider/lower**, one **taller/narrower** (for example Archmage Spire is tall with a crown of rings; Temporal Beacon is a wide disc with a hanging pendulum).
- Evolution accent: the gold trim shifts to **Gold Light `#FFE3A0`** and a **knot badge** appears at the base.
- Large-pad (2 × 2) towers get a **plinth** of 2 stacked steps so they never read as two small towers.

### 5.7 Materials and References (Towers, Overall)

| Materials | References |
|---|---|
| Weave-stone, gold thread, crystal, bronze, ice | Chess pieces (silhouette variety), shogi and Go stones, Moebius machines, Bad North props, *Monument Valley* geometry, Gothic finials, Tiffany lamp glass |

---

## 6. Enemy Design Language

### 6.1 Artistic Description

Invaders are **dark, textured, slightly broken-looking figures** with **one luminous mark**. They do not wear the Guardian's order: their forms are **asymmetric, heavier at the bottom and leaning forward**, with **loose thread ends** trailing from limbs and cloth. They are *people with reasons* (see [tone](../gdd/02-worldbuilding.md)): masks, hoods and sigils, not snarling cartoon monsters.

### 6.2 The Enemy Rules

1. **Dark on the path.** Body value L* 25 to 40; the path is 60 to 72. Always.
2. **One accent.** A single glowing mark (eyes, veins, rune) in the faction accent color.
3. **Asymmetry** is mandatory; a mirrored enemy is a failed design.
4. **Frayed ends:** at least one loose thread, torn cloth or splinter trailing from the rear. This is the "theirs" cue without color.
5. **Category base** under every enemy (§6.3). This is what lets the player read category from the far camera.
6. **Size encodes threat:** infantry 0.6 to 0.8 tile, elite 1.0 to 1.3, flyer 0.8 + shadow, mechanical 0.9 to 1.2, boss 3 to 4.
7. **Motion encodes speed:** fast enemies lean and stretch; slow enemies bob heavily and shake the ground slightly.
8. **Health bar** is a thin Threadgold-framed bar: red back, Mend Green fill (as in the prototype); elites get a second pip row.

### 6.3 Category Language

Categories from [06-enemies.md](../gdd/06-enemies.md). Each has a unique **silhouette**, **base token** and **motion**.

| Category | Silhouette | Base token | Motion | Palette note |
|---|---|---|---|---|
| **Infantry (I)** | Small biped or crawler, forward lean, single feature | No base; thin contact shadow | Quick bob, 1.0 | Faction primary |
| **Elite (E)** | Wide shoulders, 1.5× mass, trapezoid or boulder | **Double gold ring** | Heavy sway, slight ground shake | Faction primary, darker |
| **Magical (M)** | Tall, thin, **floating halo or orb** above the head | **Violet ring with a dot** | Hover bob, halo spin | Accent more saturated |
| **Flying (F)** | **Triangle or wing spread**, light body | **Detached shadow 0.5 tile down-right**, no base | Flap flicker, glow trail | Self-lit pale body so it reads on dark ground |
| **Mechanical (Mc)** | **Boxy, modular, hard angles**, rivets | **Square steel plate** | Steady, metronome | Metal desaturated, accent = steam or sparks |
| **Dimensional (D)** | **Doubled outline**, partial transparency, offset ghost copy | **Dashed ring** | Flicker and slide | Cool tint, glitch edges |
| **Boss (B)** | **Crowned crest silhouette**, 3 to 4 tiles | **Large ornamented plinth ring** with faction glyph | Slow, rhythmic | Backlit by an accent halo |

### 6.4 Primary and Secondary Colors (By Category Role)

| Role | Primary | Secondary |
|---|---|---|
| Body | Faction primary (§2.4), darkened to the value band | Faction secondary |
| Accent | Faction accent (§2.4) | None (one accent only) |
| Category base | Elite `#F2C14E`, Magical `#A66BFF`, Mechanical `#9AA5B8`, Dimensional `#7DD3FC` (dashed), Boss faction glyph on `#12162E` | Base shadow `#0B0E1F` at 50% |
| Outline | Tinted near-black: faction primary at 12% lightness | n/a |

### 6.5 Verdant Covenant Roster (Act I, MVP)

| Enemy | Category | Silhouette | Primary | Secondary / accent | Materials | Notes |
|---|---|---|---|---|---|---|
| **Thornling Scout** | Infantry | Small, crouched, spiky back, long legs | `#2E8B57` | `#6B5A2E`, eyes `#2DD4BF` | Bark skin, thorn quills | Smallest unit, fastest bob |
| **Bark Guard** | Infantry (armored) | Wide trapezoid with a shield-bark slab | `#6B5A2E` | Plates `#9AA5B8`, eyes `#2DD4BF` | Bark plates, resin | Grey **armor ring** shows armor value |
| **Druid Warden** | Magical (healer) | Tall, antler crown, trailing robes | `#2E8B57` | Robe `#6B5A2E`, aura `#3DDC97` | Leaf cloth, antler | **Healing aura ring** pulsing 2.5 tiles; violet category ring |
| **Mossback Brute** | Elite | Hunched boulder with a mossy back, small head | `#1F5E3B` | Moss `#4E8A4F`, eyes `#2DD4BF` | Stone, moss, roots | Double gold ring; regen glow when idle 3 s |
| **Pollen Wisp** | Flying | Moth-triangle with long trailing dust | Body `#FFF3A8` | Dust `#F5D547`, shadow `#0B0E1F` | Pollen, wing membrane | **Detached ground shadow** |
| **Spore Pod** | Objective | Round teal bulb with veins | `#0F766E` | Veins `#2DD4BF`, timer `#FB923C` | Wet fungal skin | **Countdown ring** shrinks over 8 s |

### 6.6 Boss: Sporemother Myra

- **Artistic description:** A towering fungal queen, her body a **gown of layered mushroom caps** crowned with a **great domed cap** hung with glowing gills. **Mycelium threads** trail behind her, spreading toward the pods. She is sorrowful rather than monstrous: a gardener whose garden is being ignored.
- **Primary colors:** Deep magenta `#8E2A9E`, moss `#2E8B57`
- **Secondary colors:** Bone cap underside `#E6D5C0`, bio-teal `#2DD4BF`, spore dust `#C026D3`
- **Silhouette:** Tall bell (crown dome wider than the body), 3.5 tiles; unmistakable among 1-tile enemies. The dome edge is **scalloped**; trailing threads form an asymmetric tail.
- **Materials:** Soft fungal flesh, velvety caps, wet gills, glowing veins.
- **Phase 2 cue (below 50% HP):** gills and veins turn **Fracture Red `#E5484D`**, the outline ring flares red (as in the prototype), threads whip faster, vignette tint shifts to magenta.
- **UI link:** boss bar in the same magenta, red in phase 2.
- **References:** *Mycena* bioluminescent mushrooms, *Princess Mononoke* forest spirits (mood only), Art Nouveau mushroom lamps, Moebius botanical monsters.

### 6.7 Faction-Level Silhouette Cues (Beyond Act I)

| Faction | Shape bias | Texture |
|---|---|---|
| Ashen Sultanate | Narrow, wrapped, ceremonial | Bandage stripes |
| Ember Clans | Jagged, forward-lunging | Hammered, cracked glow |
| Iron Collective | Rectangles, cylinders | Rivets, steam |
| Frostbound Reach | Long, hexagonal, shield wall | Fur and facets |
| Crystalline Choir | Fractured, symmetrical shards | Glass |
| Arcane Dominion | Robed, circular sigils | Rune glow |
| Hollow Court | Hooded, tall, lantern | Mist trails |
| Celestial Order | Angular, winged | Marble and gold |
| Void Swarm | Wrong-angled, dripping, many eyes | Membrane |

### 6.8 References (Enemies)

| Reference | Take from it |
|---|---|
| **Moebius creature design** | Elegant, strange silhouettes |
| **Hollow Knight** | Silhouette-first enemy shape language |
| **Princess Mononoke / Nausicaä** (Ghibli) | Dignified "monsters with reasons" |
| **Medieval bestiary marginalia** | Naive, flat, strange animals |
| **Mycological illustration (Ernst Haeckel plates)** | Fungal and organic forms |
| **Wayang kulit shadow puppets** | Expressive flat silhouettes with fine cut-outs |

---

## 7. Map Design Language

### 7.1 Artistic Description

Maps are **embroidered tapestries laid on a dark table**. The ground is a **muted woven cloth** with biome embroidery kept at low contrast. The **path is a bright, stitched thread road**. **Pads are embroidered patches** with a gold-thread ring. The map ends in **frayed threads** and dissolves into the Unwritten. The Nexus sits at the road's end as a **lit crystal knot**. The whole map should look like a **handmade board game**, not a landscape painting.

### 7.2 Gameplay Layers and Contrast Budget

| Layer | Value (L*) | Saturation | Contrast to ground | Detail allowed |
|---|---|---|---|---|
| Void and border | 5 to 12 | Low | n/a | Fray lines only |
| Ground | 20 to 30 | Low | n/a | Weave, large embroidery at ±8% value |
| Decor (trees, rocks, props) | 24 to 36 | Low to medium | ≤ +10% | Silhouette-simple; ≥ 1 tile from path |
| **Path** | **60 to 72** | Medium | **+35%** | Edge stitches, thin center thread |
| Pads | 40 to 55 | Medium | +20% | Gold ring, rune |
| Towers | 70 to 90 | Medium + core | +50% | See §5 |
| Enemies | 25 to 40 | Medium | −30% vs path | See §6 |
| Nexus | 85 to 100 | High | Brightest | Glow |

### 7.3 Components

| Component | Design | Colors | Silhouette | Materials |
|---|---|---|---|---|
| **Ground** | Woven cloth, biome embroidery (spirals, glyphs, hexes) | Biome ground key (§2.5) plus a second tone at +6% | Flat plane | Fine weave texture |
| **Path** | Bright thread road, double-stitched edges, a thin center thread; wider at corners | Path and edge keys (§2.5) | Smooth, rounded corners (radius ≥ 1 tile) | Woven ribbon |
| **Pads** | Round embroidered patch 0.9 tile, gold ring, small school-neutral rune; large pads 2 × 2 octagon | Ring Threadgold `#F2C14E`, fill ground +15% | Circle (small), octagon (large) | Embroidery |
| **Pad states** | Free (soft gold), hover (bright ring), selected (double ring), invalid (red crossed), occupied (ring hidden) | §2.6 | Ring variants | Thread |
| **Nexus** | Faceted crystal knot, 10 visible facets, beams to the sky, glow radius 4 tiles | Nexus Prism, Nexus White, Nexus Deep | Tall irregular crystal cluster | Faceted glass |
| **Spawn rift** | Torn weave with a dark swirl and loose threads | Void Ink center, faction accent edge | Ragged oval | Torn cloth |
| **Frayed border** | Loose threads fading to void | Ground → Void Ink | Irregular scallops | Thread |
| **Hazards** | Stitched circles that glow before activation | Biome hazard hue | Circles | Embroidery plus glow |
| **Decor** | Simple silhouettes: trees as 3 stacked rounded shapes, rocks as 3 facets | Ground +10% | Distinct per type | Cut paper |

### 7.4 Layout Rules

1. **Path is the hero.** It must be traceable at a glance: no overlaps except designed crossings, which use a raised "bridge" with a bright edge.
2. **Corners are for towers.** Place 2 to 3 pads at each corner; spacing ≥ 1.5 tiles between pads (matches Greenwood Gate's current layout).
3. **Safe margins:** keep gameplay inside a 0.5-tile margin from the border, leaving 1 tile for the fray.
4. **Aspect:** design for 16:9 (21 × 12 tiles in the MVP map); the fray extends to any wider display.
5. **UI-safe areas:** top 8% and bottom 14% of the screen may be covered by HUD; keep no pads and no spawn/Nexus there.
6. **Decor density:** at most 1 prop per 6 tiles of ground; none on the path.
7. **Landmark rule:** each map has one memorable feature (Greenwood Gate: a great gate frame of living arches; Sporefall Hollow: a glowing pod garden).

### 7.5 Greenwood Gate (Map 1, MVP)

- **Artistic description:** A dusk forest clearing embroidered in spirals and ferns. A pale road enters from the left through two **living arches** (the "gate"), switchbacks across the clearing and ends at a cyan Nexus on the right. Hanging bulb-lanterns mark corners.
- **Primary colors:** Ground `#1E3B2A`, path `#C9AA6B`
- **Secondary colors:** Fern `#4E8A4F`, Bark `#6B4423`, mist `#7FD6B0`, Nexus Prism `#6FF3E3`
- **Silhouettes:** Arches (inverted U), round-canopy trees, mushroom clusters, flat embroidered ferns.
- **Materials:** Dark weave, bark cut-paper, moss, lantern glass.
- **Atmosphere:** golden shafts from the top left, pollen motes, light teal mist at the lower edge.

### 7.6 References (Maps)

| Reference | Take from it |
|---|---|
| **Embroidered maps and samplers** | Stitch textures, borders |
| **Dorfromantik, Bad North, Mini Motorways** (games) | Clean, readable board-like composition |
| **Medieval illuminated manuscript borders** | Decorative frames that do not intrude |
| **William Morris "Acanthus" and "Willow Bough"** | Calm, dense natural pattern |
| **Hand-drawn dungeon maps (old-school RPG style)** | Landmarks and clarity |

---

## 8. UI Style

### 8.1 Artistic Description

**"Loom UI."** Dark indigo cloth panels with **Threadgold stitched trim** and cut-paper cards. Elements feel like **labels sewn onto a tapestry**: slightly notched corners, thin double borders, tiny stitch marks. Numbers are big and calm. Nothing blinks except real alerts.

### 8.2 Design Tokens

Map these to Tailwind v4 theme variables in `globals.css` (the existing `nexus-*` indigo scale becomes the Night Loom and Indigo family).

| Token | Hex | Role |
|---|---|---|
| `surface-0` | `#0B0E1F` | App background |
| `surface-1` | `#12162E` | Panels |
| `surface-2` | `#1B2146` | Cards, inputs |
| `surface-3` | `#2A3166` | Selected, hover |
| `border` | `#4A5280` | Dividers |
| `text` | `#F6EFD9` | Primary text |
| `text-soft` | `#A9B0D6` | Secondary text |
| `accent` | `#F2C14E` | Primary actions, gold |
| `accent-hover` | `#FFE3A0` | Hover |
| `accent-press` | `#B8862B` | Pressed |
| `nexus` | `#6FF3E3` | Lives, objectives |
| `danger` | `#E5484D` | Damage, errors |
| `success` | `#3DDC97` | Valid, healing |
| `warning` | `#FFB020` | Caution |

### 8.3 Typography

| Use | Typeface (open licence) | Style |
|---|---|---|
| Display (titles, Victory/Defeat, boss names) | **Fraunces** (variable, soft axis) | Warm serif with calligraphic flavor; 600 to 700 |
| UI text | **Atkinson Hyperlegible Next** | Highly legible sans; 400 to 600 |
| Numbers (gold, lives, wave) | Atkinson Hyperlegible with **tabular figures** | Prevents jitter when values change |

Sizes (at 1080p): HUD numbers 28 px, labels 11 px uppercase tracking +6%, body 15 px, headings 28 to 40 px. UI scale options: 75% to 150%.

### 8.4 Components

| Component | Description | Colors | Silhouette | Materials |
|---|---|---|---|---|
| **Panel** | Indigo cloth with a 1 px `border` and a 1 px inner Threadgold dashed "stitch" 4 px inset | `surface-1`, `border`, `accent` at 40% | Rectangle with 8 px **notched** corners | Cloth |
| **Primary button** | Gold fill, dark text, 2 px lighter top edge | `accent`, text `#12162E` | Rounded 8 px; a small spool dot on the left edge | Cut gold paper |
| **Secondary button** | Transparent, gold outline, gold text | `accent` outline | Same | Thread outline |
| **Disabled** | `surface-2` fill, diagonal stitch hatch, `text-soft` | `surface-2`, `border` | Same | Cloth |
| **Focus ring** | 3 px Nexus Prism ring, 2 px offset | `nexus` | Follows the shape | Light |
| **Tower card** | Icon medallion, cost chip, school-color stripe on the left edge | Stripe from §2.3 | Vertical card, 96 × 120 | Cut paper |
| **Cost chip** | Gold spool icon plus number; red when unaffordable | `accent` / `danger` | Pill | Gold |
| **Tooltip** | Panel with an arrow notch, 200 ms delay | `surface-2` | Rectangle | Cloth |
| **Modal** | Centered panel, dark scrim 60% | Void Ink scrim | Larger notched rectangle | Cloth |

### 8.5 HUD Layout

| Zone | Content | Style notes |
|---|---|---|
| **Top-left** | Gold (spool icon), Lives (crystal heart), Wave n / N | Big tabular numbers; Lives crystal **cracks** in 3 stages as lives fall |
| **Top-center** | Wave track: thread timeline with beads per wave; the current bead glows; boss bead is a crown | Replaces plain text where possible |
| **Top-right** | Pause, speed, settings | Small icon buttons |
| **Bottom** | Tower cards (1 to 9 hotkeys shown) and the selected tower panel | Cards show cost and disabled reason |
| **Boss bar** | Top-center under the wave track, faction-colored, phase marker at 50% | Name in Fraunces |
| **Debug panel** | Mono text, translucent | Dev only |
| **Notices** | Small stitched label near the bottom; fades after 3 s | Danger color only for errors |

### 8.6 Screens

| Screen | Look |
|---|---|
| **Main menu** | The Nexus crystal glowing in the center of a frayed tapestry; title in Fraunces; New Game (gold), Continue with run summary; best result as a small embroidered plaque |
| **Results** | Victory: gold-white wash and threads re-weaving; Defeat: threads unravelling in Fracture Red. Stats as an embroidered table. Retry (primary), Back to menu (secondary) |
| **Pause** | Dimmed battlefield, centered panel |
| **Boss intro banner** | A wide ribbon sliding across the top with the boss name in Fraunces |

### 8.7 Motion (UI)

- **Durations:** hover 120 ms, press 80 ms, panel open 180 ms, banner 600 ms in / 3 s hold / 400 ms out.
- **Easing:** ease-out for entrances, ease-in for exits; no bounces on gameplay-critical numbers.
- **Number changes:** count to the new value over 250 ms; a brief gold flash on gain, red on loss.
- **Reduce Motion** setting disables crack shake, banners slide and shimmer.

### 8.8 References (UI)

| Reference | Take from it |
|---|---|
| **Hades**, **Inscryption** (UI) | Dark panels with warm accents and ornament |
| **Slay the Spire** | Card readability, clear affordances |
| **Mini Metro / Mini Motorways** | Calm, legible information design |
| **Embroidery labels and woven patches** | Stitch trims, notched shapes |
| **Art Nouveau posters** (Mucha) | Frames and lettering |
| **Atkinson Hyperlegible** specimens | Accessibility |

---

## 9. VFX Style

### 9.1 Artistic Description

**"Thread-light."** Magic and impact are drawn with **thin glowing threads, knots and ribbons**, not generic particles. Projectiles trail a **single tapered thread**. Hits tie a **small knot burst**. Dying enemies **unravel into threads that drift up and vanish**. Gold from kills **flies to the counter as a golden thread**. Effects are bright and short, never obstructing units.

### 9.2 Rules

1. **Short and bright:** most VFX last 0.15 to 0.5 s.
2. **Line language:** trails, rings, spirals and radial lines; avoid blobs of smoke.
3. **School colors only for school effects** (§2.3). Faction accent for enemy effects.
4. **Additive glow behind, solid core in front**: every effect has a glow layer (additive) and a core (normal).
5. **Never cover the path.** Persistent effects (zones, auras) use 15 to 25% opacity and dashed or stitched edges.
6. **Telegraph before damage:** a stitched dashed outline grows for 0.5 to 1.0 s before any area hazard.
7. **Photosensitivity:** no more than 3 full-screen flashes per second; no red-white strobing; flash effects ≤ 25% screen area.
8. **Performance caps** (browser): 300 live particles, 60 sprites in effects, 1 additive full-screen layer max.

### 9.3 Effect Catalogue

| Effect | Description | Primary colors | Secondary colors | Silhouette | Duration |
|---|---|---|---|---|---|
| **Projectile trail** | Tapered thread behind the projectile | School glow | School core | Thin comet | Fades over 0.15 s |
| **Muzzle flash** | Radial line burst on the core | School glow | White | 5 to 7 short rays | 0.1 s |
| **Hit (knot burst)** | Small knot and 6 radial threads | School glow | White | Star knot, 0.5 tile | 0.2 s |
| **Pierce (Ballista)** | Streak line along the bolt path | Martial amber | Bronze | Long thin line | 0.15 s |
| **Slow** | Thin cyan ring orbiting the enemy | Frost Ring | White | Ring | While active |
| **Heal pulse** | Rising "+" beads in a circle | Mend Green | White | Beads | 0.6 s |
| **Armor spark** | Gray sparks on a hit that is reduced | Linen-grey | White | 3 sparks | 0.15 s |
| **Death: unravel** | Enemy sprite splits into 5 to 8 threads rising and fading; the faction accent dot lingers | Faction primary | Faction accent | Curling threads | 0.5 s |
| **Bounty thread** | Gold thread arcs from the corpse to the gold counter | Threadgold | Gold Light | Single arc | 0.4 s |
| **Leak** | Enemy dissolves into the Nexus; Nexus crystal flashes red; hairline crack | Fracture Red | Nexus White | Crack lines | 0.4 s |
| **Wave start** | Spawn rift widens, threads whip outward | Faction accent | Void Ink | Ragged ring | 0.6 s |
| **Tower placed** | Gold thread loops up around the base, then settles | Threadgold | Gold Light | Spiral | 0.5 s |
| **Tower upgraded** | Ring of light climbs the body; new trim "stitches" in | Threadgold | School glow | Ascending ring | 0.6 s |
| **Tower sold** | Thread unwinds back into the pad | Threadgold | Linen | Spiral | 0.4 s |
| **Pod timer** | Orange arc shrinks around the pod; last 2 s it pulses | Warning Amber | White | Arc | 8 s |
| **Pod hatch** | Pod bursts into spores and 3 enemies spill out | Bio-teal | Spore magenta | Burst | 0.5 s |
| **Boss phase change** | Ring of red-magenta shockwave; vignette tint | Fracture Red | Faction accent | Expanding ring | 0.8 s |
| **Victory** | Threads re-weave across the border; gold motes | Threadgold | Nexus Prism | Wave of weaving | 2 s |

### 9.4 Per-School Signature

| School | Trail | Impact | Ambient |
|---|---|---|---|
| Arcane | Violet thread with a curl | Violet knot | Orbiting sparks |
| Martial | Straight amber streak | Splinter and dust | Rope creak |
| Flame | Short ember trail | Fire flick | Heat shimmer |
| Frost | Ice flakes | Snowflake burst | Cold breath |
| Storm | Zig-zag arc | Bright fork | Crackle |
| Nature | Leaf and seed spin | Leaf burst | Pollen |
| Shadow | Negative-space trail (darkens) | Ink splat | Smoke |
| Radiant | Clean beam | Star flare | Rays |
| Crystal | Prismatic ribbon | Shard fan | Sparkles |
| Void and Time | Warping ripple | Collapse ring | Slow orbit |

### 9.5 Materials and Technique

| Item | Spec |
|---|---|
| Glow | Pre-baked soft radial sprite, additive blend |
| Threads | Pixi `Graphics` or `SimpleRope` with a tapered mesh; 6 to 12 segments |
| Particles | Pixi ParticleContainer, sprite sheets from the atlas |
| Rings and arcs | Vector draw (as in the prototype) for exact timers |
| Frame rate | VFX sprite sheets 8 to 12 fps, simulation stays 30 Hz |
| Quality tiers | High (all glow), Medium (no additive full-screen), Low (no particles, rings only) |

### 9.6 References (VFX)

| Reference | Take from it |
|---|---|
| **Hades** | Short, punchy, colored hits that never hide the characters |
| **Spiritfarer / Ori** | Soft light and floating motes |
| **Kintsugi (gold repair)** | Golden thread language for repair and rewards |
| **Constellation line art and string art** | Thread geometry |
| **Sashiko stitch patterns** | Dashed telegraphs |
| **Japanese hanabi (fireworks) diagrams** | Radial burst shapes |

---

## 10. Icon Style

### 10.1 Artistic Description

**"Sigil medallions."** Every icon is a **single bold glyph inside a medallion**, with a thin Threadgold rim and a Night Loom outline. The glyph is **one color on a dark field**, plus a single accent. Icons must be recognized at **24 px**. They are **not** miniature sprites: they are **symbols**, simpler than the in-world art.

### 10.2 Medallion Shapes by Type

| Type | Medallion | Reason |
|---|---|---|
| Towers | **Hexagon** | Distinct from round enemies; matches tower plinths |
| Enemies (codex) | **Circle** | Matches enemy bases |
| Spells and abilities | **Diamond** | Active, angular |
| Resources and currency | **Circle with a spool rim** | Familiar and tactile |
| Status effects | **Small shield** | Reads as "state" |
| Upgrades and meta | **Rounded square** | UI-neutral |
| Achievements and relics | **Octagon** | Collectible feel |

### 10.3 Construction Rules

| Rule | Value |
|---|---|
| Master size | 128 × 128 (export 24, 32, 48, 64, 96) |
| Glyph area | 60% of the medallion; 8 px padding at 64 px |
| Shapes | 1 to 3 shapes; no fine detail under 2 px at 64 px |
| Stroke | Min 3 px at 128; consistent weight within a set |
| Colors | Field `#12162E`, glyph school or semantic color, rim Threadgold `#F2C14E`, one accent |
| Lighting | Subtle top-left highlight only (a 1 px lighter edge) |
| Perspective | Flat, front-on |
| Text in icons | Never |
| Corner style | Rounded joins; no spikes thinner than 3 px |

### 10.4 Primary and Secondary Colors

| | Colors |
|---|---|
| **Primary** | Field Night Loom `#12162E`, rim Threadgold `#F2C14E`, glyph by category: school color (towers), faction accent (enemies), semantic color (resources) |
| **Secondary** | Glyph highlight (+1 ramp step), accent dot Parchment `#F6EFD9`, locked state: Slate Dusk `#4A5280` glyph and a small lock |

### 10.5 Core Icon Set (Glyphs)

| Icon | Glyph | Color |
|---|---|---|
| Gold | Spool coin with a spiral | `#F2C14E` |
| Lives (Nexus integrity) | Faceted crystal heart | `#6FF3E3` |
| Wave | Shuttle (pointed oval) with 3 thread lines | `#F6EFD9` |
| Start wave / early call | Right-pointing needle with a thread | `#F2C14E` |
| Speed | Double chevron of threads | `#A9B0D6` |
| Pause | Two vertical needles | `#A9B0D6` |
| Upgrade | Up arrow made of a thread loop | `#3DDC97` |
| Sell | Coin returning along a curve | `#F2C14E` |
| Damage | Starburst knot | `#E5484D` |
| Range | Dashed circle | `#A9B0D6` |
| Armor | Segmented ring | `#CBD5E1` |
| Slow | Snail-curl spiral | `#7DD3FC` |
| Heal | Plus within a leaf | `#3DDC97` |
| Flying | Wing pair | `#F6EFD9` |
| Boss | Crown on a skull-less mask | faction accent |
| School icons (10) | Each school's top silhouette (§5.4) as a glyph | School colors |

### 10.6 Silhouettes and Materials

- **Silhouette test:** each glyph, filled black at 24 px, is identifiable by name by 5 of 5 testers in 3 seconds.
- **Materials:** drawn as **cut gold-and-color paper on a dark cloth patch**. No gradients except a single 1 px highlight; no glow.

### 10.7 References (Icons)

| Reference | Take from it |
|---|---|
| **Game-icons.net style** (silhouette glyphs) | Single-shape clarity |
| **Heraldry and tarot symbols** | Simple, symbolic medallions |
| **Slay the Spire relic icons** | Instant recognition |
| **Otl Aicher pictograms** | Reduction to essentials |
| **Hand-embroidered patches** | Rims and stitches |

---

## 11. Readability Standard and QA

### 11.1 Camera Zoom Levels

| Level | Share of play time | What must read |
|---|---|---|
| **Far (default)**: tile ≈ 64 px at 1080p / 21 × 12 map | 90% | Tower school, tower tier, enemy category, path, health bars, Nexus lives |
| **Mid**: tile ≈ 96 px | 8% | Enemy type, armor ring, slow ring, boss phase |
| **Near**: tile ≈ 128 px (Steam 4K) | 2% | Details, textures, trims |

### 11.2 Mandatory Tests (Run on Every New Asset)

| Test | Method | Pass |
|---|---|---|
| **Silhouette** | Fill black, scale to 24 px | 5 of 5 testers name the type in 3 s |
| **Grayscale** | Desaturate full screen | Ladder holds: ground < enemies < path < towers; towers and enemies separable |
| **Squint** | Gaussian blur 6 px | Towers still look like light objects; enemies like dark objects |
| **Color-vision** | Protan, deutan, tritan simulations | School and category still distinguishable by shape and ring |
| **Clutter** | 50 enemies + 20 projectiles + 8 towers at 2× speed | Boss, pods and elites remain locatable |
| **Contrast** | Check text and icons | ≥ 4.5:1 text, ≥ 3:1 icons |
| **Consistency** | Overlay on the reference sheet | Light direction, outline weight and palette ramps match |

### 11.3 Numeric Limits

| Item | Limit |
|---|---|
| Tower silhouette aspect | ≥ 1.3 (Martial T-frame: ≥ 1.0 and the widest) |
| Enemy infantry size | 0.6 to 0.8 tile |
| Outline | 2 px at 1×, 3 px in high-contrast mode |
| Distinct tower tops visible at once | Up to 10 schools: each must pass the silhouette test against all others |
| Max accent colors on one enemy | 1 |
| Max school colors on one tower | 1 (+ glow variant) |
| Max simultaneous full-screen effects | 1 |

---

## 12. Production: AI-Assisted Pipeline and Technical Specs

### 12.1 Strategy for a Solo Developer

1. **Lock the style once, then generate inside the lock.** One reference sheet, one palette, one prompt prefix, one lighting rule.
2. **AI proposes, you decide.** AI creates *concept bases* and textures; you do the **silhouette selection, cleanup, palette snapping and consistency passes**.
3. **Procedural animation first.** Bob, squash, rotate, flash, rings and threads are done in Pixi code, so each unit needs **one clean sprite** (or 2 to 4 key poses), not full animation sets.
4. **Reuse by recolor.** Faction palettes, school cores and tiers are **palette swaps and overlays** on shared base meshes.
5. **Small, deep, then wide.** Finish the Verdant slice (3 towers, 5 enemies, Myra, Greenwood Gate, UI, VFX) before any other biome.

### 12.2 Style Lock Kit (Create Once)

| Item | Content |
|---|---|
| **Reference sheet** | 12 golden images: 3 towers, 5 enemies, boss, map, UI panel, VFX frame |
| **Palette file** | `palette.json` with all hex values and ramps from §2 |
| **Prompt prefix** | See template below |
| **Negative prompt** | `photorealistic, glossy plastic, 3D render, thick black outline, cartoon face, chibi, comic eyes, text, watermark, busy background, blurry` |
| **Lighting rule** | Key from the top left, warm; fill cool; no cast shadows beyond contact shadow |
| **Sprite background** | Flat `#FF00FF` or transparent for easy keying |
| **Seed and model log** | Record model, version, seed, prompt, edits per asset |

**Prompt template (towers):**

```
single game sprite of a {tower name}, {silhouette description from §5.4},
pale cream weave-stone body with thin gold thread bands, {school} crystal core glowing {core hex},
faceted crystal, matte stone, hand-sculpted miniature on a round stone base,
top-left warm key light, soft cool fill, 3-step cel shading, thin dark outline,
dusk fantasy tabletop miniature, centered, plain background, game asset
```

**Prompt template (enemies):**

```
single game sprite of a {enemy name}, {category silhouette from §6.3},
dark {faction primary} body with {materials}, one glowing {accent} mark, asymmetric,
frayed loose threads trailing from the back, mask-like face, matte textured,
hand-sculpted miniature, top-left warm key light, 3-step cel shading,
thin tinted near-black outline, plain background, game asset
```

### 12.3 Pipeline (Per Asset)

| Step | Action | Tool (suggested) | Output |
|---|---|---|---|
| 1 | Silhouette thumbnails (6 to 12) | Pencil or quick block-in; or AI at low resolution | Chosen silhouette |
| 2 | AI base generation at 1024 using the lock kit and silhouette as a control image | Image model with structure/reference control | 8 variants |
| 3 | Select by **silhouette test** and fit to rules | You | 1 base |
| 4 | Clean-up and redraw problem areas, fix hands/faces, remove text and noise | Krita, Photopea, Aseprite | Clean master |
| 5 | **Palette snap** to the ramps in §2.8 | Script (Node `sharp` or Python PIL) in `packages/tools` | Palette-locked PNG |
| 6 | **Outline normalize**: auto 2 px dual-tone outline | Script | Consistent edges |
| 7 | Contact shadow and base token | Script or compositor | Layered sprite |
| 8 | Slice into layers (body, core, glow) for procedural effects | You | Layered PSD/PNG |
| 9 | Atlas pack at 1×, 2×, 4× | The existing `packages/tools/src/atlas-packer` | Atlases + JSON |
| 10 | Run the QA tests (§11) at far zoom in the game | In-game debug view | Pass or redo |
| 11 | Log provenance | A `provenance.csv` row | Legal record |

### 12.4 Technical Specs

| Item | Spec |
|---|---|
| Logical tile | 64 px |
| Master authoring scale | **256 px per tile (4×)** for Steam 4K |
| Export scales | 1× (browser low DPI), 2× (browser default and 1440p), 4× (Steam 4K, loaded on demand) |
| Tower canvas (1×) | 128 × 192 |
| Enemy canvas (1×) | Infantry 64 × 64, elite 96 × 96, boss 256 × 256 |
| Directions | Ground units: 1 side-view sprite, flipped for left/right; no 8-direction sets |
| Animation | Procedural (bob, squash, tilt); idle and walk cycles of 4 to 6 frames only for the 5 most visible enemies |
| Atlas | ≤ 2048² (mobile and browser), ≤ 4096² (Steam); PNG then compress to WebP/Basis for the web |
| Color space | sRGB, premultiplied alpha |
| Filters | Linear; mipmaps on for the ground only |
| Budget (MVP slice) | ≤ 12 MB downloaded art at 2×; ≤ 64 MB GPU memory |
| File naming | `kind_name_variant_scale.png` (for example `tower_arcane_t2@2x.png`) |

### 12.5 Production Order (Phases)

| Phase | Deliverables | Done when |
|---|---|---|
| **A: Lock** | Reference sheet, palette JSON, prompt kit, UI tokens and fonts, icon template | Pillars and tests approved |
| **B: MVP slice** | Greenwood Gate ground, path, pads, Nexus, frayed border; 3 towers (Tier I to II); 5 enemies; spore pod; Myra; HUD skin; 20 icons; core VFX (hit, trail, death unravel, bounty thread) | Playable slice passes §11 |
| **C: Polish** | Tier III, atmosphere layers, weather, menu and results screens, boss banner, audio-synced pulses | Screenshot-ready |
| **D: Act II expansion** | Desert biome, 30 tower variants via school recolors, 10 enemies | Style holds under a new biome |
| **E: Steam** | 4× atlases, UI scaling, controller prompts, capsule and trailer art (hand-polished) | Store-quality |

### 12.6 Legal and Platform Notes

- **Keep a provenance log** (model, license, prompt, seed, edits) for every shipped asset.
- Use only tools whose **terms allow commercial use**, and re-check the terms before the Steam release.
- **Steam requires disclosing AI-generated content** used in the shipped game on the store page; plan the wording early. Hand-finish and store capsule art are recommended to carry the most human work.
- **Do not prompt with living artists' names or copyrighted game characters.** Use the reference vocabulary in this document (textiles, forms, materials), not people or products.
- Fonts: use only SIL OFL fonts (Fraunces, Atkinson Hyperlegible) so Steam redistribution is clear.

### 12.7 How to Add a New Asset (Checklist)

1. Pick the category and read its section (silhouette, colors, materials).
2. Do silhouette thumbnails; choose by the **24 px test**.
3. Generate with the lock kit; select; clean.
4. Palette snap; outline normalize.
5. Place in the debug scene at **far zoom** next to the existing set; run §11.2.
6. Atlas, commit, log provenance.

---

## 13. Do and Don't

| Do | Don't |
|---|---|
| Design in grayscale first; check the value ladder | Rely on hue to separate towers from enemies |
| Keep defenders light and luminous, enemies dark and textured | Make enemies bright or defenders dark |
| Give every tower one unmistakable top silhouette | Reuse the same silhouette across schools |
| Use the Thread Rule (taut gold = ours, frayed = theirs) | Use gold thread on enemies |
| Put category on a base token under every enemy | Encode category only by color |
| Keep decoration at ≤ +10% contrast from the ground | Put high-contrast detail near the path |
| Use short, bright, thread-like VFX | Fill the screen with smoke and blobs |
| Keep school color on the core only | Paint whole tower bodies in the school color |
| Use faces as masks and sigils | Use cartoon faces and comic eyes |
| Keep animation procedural | Commission full frame-by-frame sets for every unit |
| Log every AI asset | Ship unlogged assets |
| Test with colorblind simulations | Assume red/green is fine |

---

### Appendix A: Quick Reference Card

| Question | Answer |
|---|---|
| Style in 3 words | Woven, luminous, handmade |
| Ours vs theirs | Light + taut gold thread vs dark + frayed thread |
| Tower read | Top silhouette (school) + gold bands (tier) |
| Enemy read | Base token (category) + size (threat) + accent (faction) |
| Path | Brightest ground element, stitched edges |
| Nexus | Brightest object, cyan-white crystal knot |
| Accent colors | Threadgold UI/trim, school core glow, one accent per enemy |
| Fonts | Fraunces (display), Atkinson Hyperlegible (UI) |
| VFX | Thread-light: tapered trails, knot bursts, unravel deaths |
| Icons | Hex medallion (towers), circle (enemies), diamond (spells), 24 px readable |

### Appendix B: Open Decisions

| Item | Default for now | Decide by |
|---|---|---|
| Void Swarm palette | Proposed in §2.4 | Before Act X art |
| Exact font licenses in Steam build | Fraunces + Atkinson (OFL) | Phase E |
| Sprite scale for Steam 4K | 4× master, load on demand | Phase D |
| Whether the frayed border animates with wave progress | Static in MVP; re-weave on victory | Phase C |
