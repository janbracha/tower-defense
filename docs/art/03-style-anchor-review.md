# Guardians of the Nexus: Style-Anchor Design Review

**Version:** 1.0 · **Scope:** Arcane Tower and Thornling Scout (the two style anchors)
**Inputs:** [Art Bible](01-art-bible.md) · [MVP Visual Specification](02-mvp-visual-spec.md)
**Goal:** audit the two anchors as specified, then compare three complete visual directions and choose the definitive style.

This is a design review. It contains **no images**. Every claim is checkable with a number, a hex value or a test. Costs are given as relative cost indices and effort drivers, not time estimates.

---

## Table of Contents

0. [Executive Summary](#0-executive-summary)
1. [Review Method and Shared Measurements](#1-review-method-and-shared-measurements)
2. [Anchor 1: Arcane Tower](#2-anchor-1-arcane-tower)
3. [Anchor 2: Thornling Scout](#3-anchor-2-thornling-scout)
4. [Cross-Anchor Findings](#4-cross-anchor-findings)
5. [Three Visual Directions](#5-three-visual-directions)
6. [Direction Comparison and Decision](#6-direction-comparison-and-decision)
7. [The Definitive Style Card](#7-the-definitive-style-card)
8. [Anchor Approval Protocol](#8-anchor-approval-protocol)

---

## 0. Executive Summary

### 0.1 Verdict on the Anchors as Specified

Both anchors are **conceptually strong and on-brand**. The review found **six problems** that must be fixed before generation begins, because each would make the game harder to read than the Art Bible promises.

| # | Finding | Severity | Fix (details in §2 and §3) |
|---|---|---|---|
| 1 | **Arcane Tower is the thinnest silhouette in the game** (≈ 34% fill of its bounding box); the stalk and the gap are close to vanishing at small zoom | High | Thicker stalk, bigger diamond, bigger gap |
| 2 | **Stone mid-tone `#B9AF98` has the same luminance as the path `#C9AA6B`** (contrast 1.03:1). Tall towers overlap the path behind them, so the outline is the *only* separator | High | Treat the outline as load-bearing; add a continuous 2 px dark line and a dark inner contact edge |
| 3 | **Thornling body `#2E8B57` is too bright** (L* ≈ 51; the Art Bible requires 25 to 40) and has only 1.9:1 contrast against the path | High | Make `#2E8B57` the *light* ramp step; base becomes `#1B5E37` (3.5:1) |
| 4 | **Thornling and Mossback Brute nearly share a color** (`#1B5E37` vs `#1F5E3B`) | Medium | Separate by hue bias, thorn color and size, not by body color alone |
| 5 | The **gold spiral thread** on the Arcane stalk (2 px) disappears below 64 px tiles | Medium | 3 px bands, 3 of them, not 5 turns of fine spiral |
| 6 | **Eyes are 3 px** at reference zoom (< 2 px on small laptops) | Medium | Add a soft 6 px additive halo so the accent still reads |

### 0.2 Recommendation

**Choose Direction A, "Cel-Woven Miniature" (Conservative), as the production style, and spend the "premium" budget on light, motion and VFX instead of painted texture detail.** Reserve painted-level treatment for a short list of hero assets (Nexus, Sporemother Myra, menu key art).

| Direction | Weighted score (of 100) | One-line judgment |
|---|---|---|
| **A: Conservative, Cel-Woven Miniature** | **89** | Best readability, cheapest, most AI-consistent; the only one a solo developer can finish across 100 enemies and 30 towers |
| B: Premium Fantasy, Painted Relief | 62 | Gorgeous at near zoom; loses readability at far zoom and drifts into the generic "AI fantasy" look |
| C: Stylized AAA, Pre-rendered Diorama | 55 | Highest ceiling; needs a 3D pipeline that is not achievable solo, and clashes with the cloth-tapestry map concept |

The decision matrix is in §6; the final style card is in §7.

---

## 1. Review Method and Shared Measurements

### 1.1 Review Criteria (Used Throughout)

| Criterion | Meaning | Weight in the decision |
|---|---|---|
| Readability at far zoom | Type, school, category and tier identifiable at minimum zoom | 25 |
| Identity and uniqueness | Does not read as Kingdom Rush or Cursed Treasure; supports "Woven Light" | 15 |
| AI-assisted consistency | Batches look like one game; failures are cheap to fix | 20 |
| Solo production cost | Manual passes, tools and skills per asset, multiplied across all content | 20 |
| Browser performance and download | Texture size, atlas count, GPU memory | 10 |
| Steam and marketing ceiling | How good screenshots and trailers can look | 10 |

### 1.2 Zoom Matrix

The map is 21 × 12 tiles, so the on-screen tile size depends on the window. The review uses four tile sizes.

| Zoom | Tile size | Typical situation | Role |
|---|---|---|---|
| **Minimum** | 40 px | 1366 × 768 laptop with the HUD open | **Hard floor: everything critical must still read** |
| **Reference** | 64 px | 1920 × 1080 window with the HUD | Design target |
| **Large** | 85 px | 1080p full screen | Comfortable |
| **Steam 4K** | 128 px | 4K display | Detail shows |

Note: the prototype shown during development rendered at a tile size near 26 px in a small embedded window. That is **below the minimum** and must not be a design target, but it shows how tight real windows can be. The UI must offer a zoom or layout fallback below 40 px.

### 1.3 Luminance and Contrast Table (Measured)

Relative luminance (WCAG formula) of the key colors, and contrast against the **path** (`#C9AA6B`, Y = 0.421) and the **ground** (`#1E3B2A`, Y = 0.036).

| Color | Hex | Y | vs Path | vs Ground |
|---|---|---|---|---|
| Linen (stone light) | `#EDE6D4` | 0.793 | 1.79 : 1 | 9.8 : 1 |
| Stone shade | `#B9AF98` | 0.433 | **1.03 : 1** | 5.6 : 1 |
| Stone shadow | `#6F6A7A` | 0.151 | 2.34 : 1 | 2.3 : 1 |
| Threadgold | `#F2C14E` | 0.575 | 1.33 : 1 | 7.3 : 1 |
| Arcane core | `#A66BFF` | 0.258 | 1.53 : 1 | 3.6 : 1 |
| Arcane glow | `#D4B5FF` | 0.542 | 1.26 : 1 | 6.9 : 1 |
| Night Loom (outline) | `#12162E` | 0.009 | **7.98 : 1** | 1.45 : 1 |
| Thornling emerald (spec) | `#2E8B57` | 0.197 | 1.91 : 1 | 3.1 : 1 |
| Thornling base (proposed) | `#1B5E37` | 0.085 | **3.5 : 1** | 1.6 : 1 |
| Moss-brown thorns | `#6B5A2E` | 0.106 | 3.0 : 1 | 1.7 : 1 |
| Bio-teal accent | `#2DD4BF` | 0.513 | 1.2 : 1 | 6.6 : 1 |

**Reading the table:**

1. **Tower stone separates from the dark ground easily** (5.6:1 to 9.8:1) but **not from the path** (1.03:1 to 1.79:1). The 2 px Night Loom outline (8:1 against the path) is the structural element that keeps towers readable where they overlap the road.
2. **Enemies must be separated from the path by value**, which means the body base must be dark. The spec's `#2E8B57` fails; `#1B5E37` passes.
3. **Outlines work on one background only.** Night Loom is invisible on the dark ground (1.45:1), which is fine because the *rim light* does the work there. This is why the dual-tone outline is mandatory.

### 1.4 Overlap Geometry (Why the Path Matters for Tall Towers)

Towers are 1.75 tiles tall and anchored at the pad. The top of the sprite extends about **1.3 tiles upward on screen** from the pad. Many pads sit within 1.3 to 2.5 tiles below a path segment.

| Pad | Pad y | Nearest path above (y) | Does the tower top overlap the road? |
|---|---|---|---|
| p2 (6, 4) | 4 | Road at y = 2 (edge 2.45) | **Yes**: top reaches y ≈ 2.7 |
| p1 (3, 3.5) | 3.5 | Road at y = 2 | **Yes** |
| p6 (5, 8) | 8 | Road at y = 6 (edge 6.45) | **Yes** |
| p7 (8, 8) | 8 | Road at y = 6 | **Yes** |
| p3 (11, 4) | 4 | The y = 2 road ends at x = 9 | No: the tower is 2 tiles right of the road's end |

**Consequence:** the most important part of an Arcane Tower (the crystal at the top) most often sits **on top of the bright road**. The Arcane violet `#A66BFF` has only **1.53 : 1** against the path. The crystal must therefore carry its own dark outline, dark inner facets and a glow, and should be judged on the path, not on the ground.

### 1.5 Shared Test Procedure

Every analysis below is judged against these tests (Art Bible §11):

1. 24 px silhouette
2. Grayscale
3. Squint (6 px blur)
4. Path-overlap (new): place the asset on `#C9AA6B` and on `#1E3B2A` and verify both
5. Crowd (new): 14 copies (Thornlings) or 8 towers on screen

---

## 2. Anchor 1: Arcane Tower

**Role:** the style anchor for **all defenders**. Whatever the Arcane Tower looks like, the other 29 towers will look like.

### 2.1 Shape Language

| Aspect | Analysis |
|---|---|
| **Dominant geometry** | **Vertical, tapering, symmetrical**: a spindle (a thin cone widening at the base) topped by a diamond. Symmetry is the Guardian's "order" signal (Thread Rule) |
| **Primitive breakdown** | (1) Circle: plinth. (2) Tall tapered cylinder or cone: stalk. (3) Rhombus: crystal. Three primitives; the rhombus is the only angular shape |
| **Contrast of shapes** | Soft round base + straight tapering stalk + **sharp** diamond: "grounded, then reaching, then precise". The diamond is the focal point because it is the only hard-edged form |
| **Rhythm** | Wide (plinth) → narrow (stalk) → wide (diamond): an **hourglass-in-reverse rhythm** that is easy to remember |
| **Symbolism** | Spindle and needle (weaver tools), gem (arcane power). The tower says "a needle threading magic" |
| **Edge quality** | Stone: soft bevels (cut by hand). Crystal: crisp facets. The contrast of soft and crisp is a deliberate "handmade versus magical" cue |
| **Proportion system** | 1 : 2.2 (width : height). Thirds: plinth 12%, stalk 58%, gap 7%, diamond 40% overlapping a little in visual weight |
| **Differentiation from other schools** | Martial (horizontal T), Frost (solid triangle), Nature (round mound). Arcane is the only **separated top element** (negative space between stalk and gem) |

**Risk:** a spindle plus a gem is also the generic "wizard tower" trope. The distinguishing devices must be **the gap, the gold thread band and the faceted-only crystal**; avoid windows, doors, roofs, brick.

### 2.2 Silhouette Analysis

**Dimensions (spec):** height 1.75 tiles, diamond 0.5 × 0.7, stalk 0.28, gap 0.12, plinth 0.8.

| Metric | Value | Comment |
|---|---|---|
| Bounding box | 0.8 × 1.75 = 1.40 tiles² | |
| Silhouette area | ≈ 0.47 tiles² | Diamond 0.175 + stalk ≈ 0.20 + plinth ≈ 0.10 |
| **Fill ratio** | **≈ 34%** | **Lowest of the three MVP towers** (Frost ≈ 50%, Ballista ≈ 55%) |
| Negative space | Gap between stalk and gem plus the empty sides of the stalk | The gap is the identity feature |
| Aspect ratio | 1 : 2.2 | Within the tower rule (≥ 1.3) |
| Center of mass | Low (plinth), but visual weight is high (diamond) | Gives a "balloon on a string" feeling, which is good for "magic" |

**Silhouette thumbnails (analysis at 24 px tall; scale 0.21 of the 1× sprite):**

| Feature | Size at 24 px | Survives? |
|---|---|---|
| Diamond | 7 × 10 px | Yes (the strongest feature) |
| Stalk | **3.9 px wide** | Marginal |
| **Gap** | **1.6 px** | **No: it fills in; the gem fuses with the stalk** |
| Plinth | 11 px | Yes |
| Thread | < 1 px | No (expected) |

**Competing silhouettes at 24 px:**

| Compared with | Confusion risk | Cause | Mitigation |
|---|---|---|---|
| **Frost Spire** | **High** | Both are "tall thing with a pointed top" once the gap closes | Keep the gap open (≥ 2.5 px at 24 px); make the Arcane gem a clear separate shape; Frost stays a solid, stepped triangle |
| Ballista Post | Low | Horizontal T vs vertical needle | None |
| Thornling or other enemies | Low | Enemies are low and dark | None |

**Silhouette amendments (apply before generation):**

| Item | Spec now | Amended | Result |
|---|---|---|---|
| Diamond | 0.5 × 0.7 | **0.60 × 0.80** | +37% area; reads at 24 px as 8 × 11 |
| Stalk (mid-width) | 0.28 | **0.34**, tapering from 0.42 at the base to 0.26 under the gem | Thicker, still elegant |
| Gap | 0.12 | **0.18** | 2.5 px at 24 px |
| Total height | 1.75 | **1.85** (still inside the 3-tile canvas) | |
| Resulting fill | 34% | **≈ 42%** | Comparable to Frost |

**Silhouette test script (what a tester must say):** "a tall stone needle with a floating gem" (pass); "a lamp" or "a tree" (fail: stalk too thick or gem too round); "a spike" (fail: the gap closed).

### 2.3 Color Hierarchy

| Rank | Element | Role | Color | Share of the visible sprite |
|---|---|---|---|---|
| 1 | **Stone body** | Dominant, the "family" color | Linen `#EDE6D4` light, `#B9AF98` shade, `#6F6A7A` shadow | ≈ 62% |
| 2 | **Arcane crystal** | The focal accent | Core `#A66BFF`, glow `#D4B5FF` | ≈ 14% |
| 3 | **Plinth shadow and contact** | Grounding | `#6F6A7A` to `#12162E` at 40% | ≈ 12% |
| 4 | **Threadgold** | Trim, tier signal, Guardian mark | `#F2C14E` | ≈ 7% |
| 5 | **Hot center** | Micro-accent | White `#FFFFFF` | ≈ 2% |
| 6 | **Outline** | Separator on the path | `#12162E` | ≈ 3% (line) |

**Value structure (L\*):**

| Element | L\* (approx.) | On the path? |
|---|---|---|
| Hot center | 100 | Pops |
| Glow `#D4B5FF` | 78 | Fine |
| Linen | 91 | Low contrast vs path (1.79:1); relies on outline |
| Core `#A66BFF` | 57 | **Same value as the road (70) minus 13**: weak; needs outline plus dark inner facets |
| Gold | 80 | Close to the road in value; distinct by hue only |
| Shade | 72 | **Equal to the road: invisible except by outline** |
| Shadow | 45 | Distinct |
| Outline | 5 | Strong |

**Findings and fixes:**

1. **The crystal must have an internal value range** (darker lower facets `#6B3FD0`, mid `#A66BFF`, bright upper facets `#D4B5FF`, white tip). A single flat violet is only 1.53:1 against the road. The darker facets (≈ 2.8:1) carry the shape.
2. **The stone shade tone collides with the path.** Rule: *never rely on the stone's mid-tone for separation*. Keep the **outline continuous**, and put a **1 px dark inner edge** (`#6F6A7A`) on the shaded side.
3. **Gold on the path** has 1.33:1 and hue difference only; it works as trim because it is thin and always outlined.
4. **Hue anchor:** violet (≈ 268°) is the only cool saturated hue in the tower and the opposite of the road's warm yellow (≈ 40°). Hue contrast is strong even where value is weak; use it as the secondary separator.
5. **Color budget:** exactly one saturated hue (violet). The gold must stay **matte and low-saturation relative to the crystal** (saturation 62% vs the crystal's 100%).

### 2.4 Materials

| Material | Where | Reading cues | Common failure |
|---|---|---|---|
| **Weave-stone** | Plinth, stalk | Fine vertical grain (like carved limestone), soft bevels, tiny chips on the plinth edge; **matte** | Smooth plastic or marble polish |
| **Gold thread** | Bands on the stalk | Matte metal with a thin highlight line; slightly irregular wrap | Glossy gold chain or filigree |
| **Faceted crystal** | Diamond | 8 flat facets, inner glow brighter at the center, translucent edges, **no refraction realism**, no HDRI reflections | Glass sphere or realistic gem with caustics |
| **Glow** | Around the diamond | Additive soft sprite, warm-white core | Hard outlined halo |
| **Rim light** | Lit edge | 1 to 2 px warm `#FFE3A0` on the top-left edges | Rim on every edge |

**Material hierarchy by detail density:** crystal (highest contrast, most facets) > gold (thin, crisp) > stone (low-frequency grain, smooth). The eye goes to the gem, then the thread, then the body.

### 2.5 Readability at Gameplay Zoom

Pixel sizes of the **amended** design (height 1.85, diamond 0.6 × 0.8, stalk 0.34, gap 0.18, thread band 3 px at 64 px/tile).

| Feature | 40 px tile (min) | 64 px (ref) | 85 px | 128 px (4K) |
|---|---|---|---|---|
| Total height | 74 | 118 | 157 | 237 |
| Diamond | 24 × 32 | 38 × 51 | 51 × 68 | 77 × 102 |
| Stalk (mid) | 14 | 22 | 29 | 44 |
| **Gap** | **7** | 12 | 15 | 23 |
| Plinth | 32 | 51 | 68 | 102 |
| Gold band thickness | 1.9 | 3 | 4 | 6 |
| Outline | 1.25 | 2 | 2.7 | 4 |
| Orbit spark | 3 | 4 | 6 | 9 |

**What must read at each zoom:**

| Information | 40 px | 64 px | 85 px | 128 px |
|---|---|---|---|---|
| "This is a tower, school Arcane" (diamond on a stalk) | ✔ | ✔ | ✔ | ✔ |
| Tier II (second band and satellite shards) | ✔ (shards 3 px: use glow) | ✔ | ✔ | ✔ |
| Gold thread detail | ✘ expected | ✔ (3 bands) | ✔ | ✔ |
| Facets of the crystal | Light/dark split only | 3 value bands | Full facets | Full facets |
| Stone grain | ✘ | Faint | Subtle | Visible |
| Fire state (flash and recoil) | ✔ | ✔ | ✔ | ✔ |

**Context tests:**

| Scenario | Risk | Result and fix |
|---|---|---|
| Tower top on the road | Violet at 1.53:1 | Needs dark facets and outline; **a dark 3 px halo** around the gem on a sublayer if testing fails |
| 8 towers on screen with range rings | Rings (gold dashed) could clutter the gem | Range ring only for the selected tower; ring alpha ≤ 20% |
| Projectile crossing the tower | Violet orb passes in front of the gem | Orb is **smaller and brighter** than the gem, with a white core |
| Enemy walking behind the tower (higher y) | Enemy hidden by the tall stalk | Enemy sprites are dark and the tower is light: still separable; ensure the stalk is narrow enough (0.34 ≤ 0.5 of an enemy width) |
| Tier pips below the plinth | Pip dots merge with the shadow | Pips sit on a dark `#12162E` strip, 1 dot = 3 px at 64 px |

### 2.6 Animation Concepts

The tower is **one sprite with four moving parts**. Every motion is procedural.

| State | Motion | Parameters | Easing | Purpose |
|---|---|---|---|---|
| **Idle (always)** | Gem bobs ±3 px; glow breathes ±10% | 0.6 Hz sine; the two are offset by 90° | Sine | "Alive" |
| Idle accent | Fake spin: gem scale X 100% → 78% → 100% | 0.25 Hz | Ease in-out | Suggests rotation of a faceted object |
| Idle sparkle | A glint travels up the stalk every 4 s | 400 ms, white 40% | Linear | Catches the eye without noise |
| **Target acquired** | Gem tilts 10° toward the target | 120 ms | Ease-out | Shows the tower "sees" |
| **Charge (anticipation)** | Gem shrinks 10%, brightens to white | 60 ms | Ease-in | Anticipation |
| **Fire** | Gem snaps down 4 px, flash of 6 rays, glow spikes +40% | 40 ms down; 120 ms return | Overshoot spring | Impact feel |
| **Recovery** | Gem settles with 1.5 damped oscillations | 250 ms | Damped spring | Weight |
| **Build-in** | Stone rises (scale Y 0 → 1.05 → 1.0); thread loops up; the gem pops in last | 500 ms total; gem at 350 ms | Ease-out-back | Satisfying placement |
| **Upgrade** | Light ring climbs the stalk; second band stitches in; shards fade in | 600 ms | Ease-out | Reward |
| **Sell** | Thread unwinds to the plinth; the tower folds down | 400 ms | Ease-in | Clear feedback |
| **Hover/selected** | Plinth ring brightens; gem glow +20%; range ring fades in | 120 ms | Ease-out | Interface feedback |
| **Disabled (no gold for upgrade)** | None on the tower; the UI shows it | n/a | n/a | Don't punish |

**Frame budget:** none. All motion is transforms on 4 layers (`stalk`, `gem`, `glow`, `shards`). No frame-by-frame art is needed.

**Rhythm rule:** the tower's attack interval is 0.83 s. The charge and recovery together (≈ 310 ms) must leave ≥ 500 ms of calm so a stream of shots reads as a rhythm, not a flicker.

### 2.7 VFX Concepts

| Effect | Layers | Colors | Blend | Size | Duration | Particles |
|---|---|---|---|---|---|---|
| **Idle glow** | 1 radial sprite | `#D4B5FF` 35% | Additive | 0.9 tile | Loop | 1 |
| **Orbit sparks** | 3 sprites on a circle | `#D4B5FF` / white | Additive | 4 px | 2 s loop | 3 |
| **Muzzle flash** | 6 radial lines + a ring | White → `#D4B5FF` | Additive | 0.6 tile | 100 ms | 7 |
| **Projectile (orb)** | Core + glow + trail | Core `#A66BFF` with white center; trail `#A66BFF` → 0% | Core normal; trail additive | Orb 0.2 tile; trail 0.5 tile | Trail 150 ms | 1 + 6 trail |
| **Trail character** | A **single tapered thread** that curls slightly (the "thread-light" signature) | `#A66BFF` | Additive | 3 px → 0 | 150 ms | Ribbon mesh |
| **Hit** | **Knot burst**: tiny knot + 6 radial threads + a ring | `#D4B5FF` | Additive | 0.5 tile | 200 ms | 8 |
| **Armor ignored cue** | The burst continues through with an extra thin ring (it "passes" armor) | White | Additive | 0.35 tile | 150 ms | 1 |
| **Range preview** | Dashed gold stitch circle, 20% fill | `#F2C14E` | Normal | 5 tiles | While selected | 0 |
| **Place / upgrade / sell** | Spirals, ascending rings | `#F2C14E` | Additive | | 400–600 ms | ≈ 12 |

**VFX discipline:** the Arcane orb is the **reference projectile**. Every other projectile must be *less bright than* a gem at the source and *brighter than* the ground at the target. Total Arcane VFX particles at peak (one tower firing): about 25. With 8 towers: ≈ 200, inside the 300 particle budget.

### 2.8 Upgrade Visual Evolution

**Principles:** each tier **adds** something, never replaces. The silhouette stays recognizable (the gem on a stalk). Growth is about +12% per tier. Color does not change until evolutions.

| Tier | Size | Added elements | Silhouette change | Motion change | VFX change |
|---|---|---|---|---|---|
| **I** (MVP) | 1.00 | Plain stalk, one gold band, gem | Baseline | Base idle | Base orb |
| **II** (MVP) | 1.12 | Second gold band; 2 small satellite shards orbiting; gem +10% brighter | Two small dots near the gem | Shards orbit at 1.5 s per turn | Orb gets a **second, thinner thread** in the trail |
| **III** (post-MVP) | 1.24 | Thin floating **halo ring** above the gem; third band; plinth gets a second step | A ring crowns the gem (a new top feature) | Ring rotates slowly 0.1 Hz | Muzzle flash has a ring; every 4th shot is a "Dual Bolt" (two orbs) |
| **IV-A Archmage Spire** (◼ large pad) | 1.6 | Taller spire, **crown of 3 rings**, 5 gem facets spread into a floating cluster | **Taller and narrower**, 3 stacked rings | Rings rotate in opposite directions | Every 5th shot: expanding arcane nova ring (AoE) |
| **IV-B Temporal Beacon** | 1.3 | **Wide disc** instead of rings; a hanging **pendulum** under the gem; gold shifts to Gold Light `#FFE3A0` | **Lower and wider** than Tier III | Pendulum swings 1 Hz; ticking glints | Time-lash trails (slower, longer, desaturated violet-teal) |

**Guard rails:**

1. The gem is always the topmost focal object.
2. Evolutions A and B must be separable by **silhouette alone** (tall + narrow vs low + wide).
3. School color may not change (it remains violet); only the gold trim shifts on evolutions.
4. Max 4 gold bands, 4 tier pips.

### 2.9 Common Generation Mistakes to Avoid

| # | Mistake | Why it happens | How to catch it | Fix |
|---|---|---|---|---|
| 1 | **Looks like a wizard tower** (windows, door, roof, brick, stairs) | Model's strongest prior for "magic tower" | Any architectural detail on the stalk | Negative: `window, door, roof, brick, stairs, castle`; use a silhouette control image |
| 2 | **Gem is a sphere or a heart**, not a faceted diamond | Soft training bias | Round highlights | Prompt "8 flat facets, rhombus, hard edges"; fix by hand with a polygon mask |
| 3 | **Gem touches the stalk** (no gap) | Models connect floating parts | Silhouette test at 24 px | Generate gem and stalk as separate layers; assemble manually |
| 4 | **Gold thread becomes chains, filigree or runes** | Over-decoration | Text-like squiggles | Specify "three plain matte gold bands"; post-redraw as flat bands |
| 5 | **Glossy, photoreal stone**, or glass-like polish | Default rendering | Specular streaks | "matte limestone, no reflections"; reduce highlights in post |
| 6 | **Perspective mismatch** (strong top-down or a low heroic angle) | Random viewpoint | The plinth ellipse ratio differs between assets | Fix the plinth ellipse at ratio 1 : 0.4 (35° view); re-draw if wrong |
| 7 | **Baked scenery or cast shadow** on the background | Scene bias | Dark patches under the plinth | Magenta background; remove and replace with the standard contact shadow |
| 8 | **Light from the wrong direction** | Lighting not forced | Highlights on the right | Flip horizontally if the asset is symmetric; otherwise relight in post |
| 9 | **Too much detail** (cracks, vines, moss) | "Quality" prior | Squint test fails | Cap detail: ≤ 4 secondary details |
| 10 | **Glow baked into the sprite as a halo** | Models paint glow | Glow cannot be animated | Request "no glow"; add glow in the engine |
| 11 | **Color drift** (blue instead of violet; orange gold) | Prompt hex values are weak | Palette check | Snap to the palette in post; never trust the raw hue |
| 12 | **Asymmetric stalk** | Natural randomness | Left-right difference | Mirror one half |
| 13 | **Gibberish runes or text** | Texture prior | Letters on the stalk | Negative: `text, letters, runes`; remove manually |
| 14 | **Outline too thick or comic** | "Game asset" prior | Black line > 3 px at 1× | Strip and regenerate the outline by script |
| 15 | **Tier II drift** (a different tower) | Fresh generation | Tier I vs II overlay | Generate Tier II by **editing the Tier I image** (inpaint additions), never from scratch |

---

## 3. Anchor 2: Thornling Scout

**Role:** the style anchor for **all enemies**. It sets the "dark, asymmetric, one accent, frayed thread" language and will appear in every wave (also as the pod's hatchlings), so it is the most-seen sprite in the game.

### 3.1 Shape Language

| Aspect | Analysis |
|---|---|
| **Dominant geometry** | **Horizontal, forward-leaning, asymmetric**: an ellipse body, a triangular spiked back, two long thin legs (straight lines), a small round head with a flat mask |
| **Primitive breakdown** | (1) Ellipse: torso. (2) 5 narrow triangles: thorns. (3) Two thin lines: legs. (4) Circle with a slit: head. (5) A ribbon: the trailing scarf |
| **Contrast of shapes** | Round body vs **sharp thorns**: "soft inside, dangerous outside". Thin legs vs heavy back: **fast and top-heavy** |
| **Rhythm** | Zig-zag along the back (thorn rhythm) + a single long trailing line (scarf): **horizontal flow** left-to-right = speed |
| **Direction** | Everything leans in the direction of travel (12° lean); the scarf trails the other way |
| **Symbolism** | Seedling and thorn: the Verdant Covenant is gentle but prickly; a "scout" that runs ahead |
| **Opposition to the tower** | Towers = vertical, symmetric, smooth. Thornling = horizontal, asymmetric, spiky. **Maximum shape contrast** |
| **The Thread Rule** | The scarf is the **frayed loose thread** of the enemy side |
| **Face rule** | No cartoon face: a flat bark mask with a single teal slit |

**Risk:** a spiky-backed creature can read as a "hedgehog", "dinosaur" or "stegosaurus". Distinguish it with **legs that are visibly human-thin and long**, the **mask head**, and the **scarf**. Avoid a tail and avoid a snout.

### 3.2 Silhouette Analysis

**Dimensions (spec):** body length 0.8, height 0.56, leg 0.3, thorn 0.14. Canvas 1 × 1 tile.

| Metric | Value | Comment |
|---|---|---|
| Bounding box | 0.8 × 0.56 = 0.45 tiles² | |
| Silhouette area | ≈ 0.28 tiles² (torso 0.18, thorns 0.035, legs 0.024, head 0.04) | |
| **Fill ratio** | **≈ 62%** | Good, a compact solid shape |
| Aspect ratio | 1.43 : 1 (horizontal) | The only horizontal Act I infantry; Bark Guard is ≈ 1.1 : 1 |
| Negative space | Between the legs, under the belly; small gaps between the thorns | The thorn gaps give the "spiky" read |
| **Distinguishing feature** | **Serrated top edge** (5 teeth) | Unique among Act I enemies |

**Silhouette thumbnails at 24 px wide (scale 0.47 of the 1× sprite; the sprite is 51 px wide):**

| Feature | Size at 24 px wide | Survives? |
|---|---|---|
| Body | 11 px tall | Yes |
| Thorns | 4 px tall, 2 px apart | **Yes, as a serrated edge** |
| Legs | 2 px thick | Marginal; read as "two lines" |
| Eye | 1.4 px | No; becomes a dot |
| Scarf | 1.5 px | Marginal |

**Competing silhouettes (at 24 px):**

| Compared with | Confusion risk | Mitigation |
|---|---|---|
| Bark Guard | Low | Guard is a squat wide block with a flat shield |
| Mossback Brute | Medium (both green and low) | Brute is 1.8× larger, round, no thorns, with a gold ring |
| Spore Pod | Low | Pod is stationary and round with an orange ring |
| Pollen Wisp | Low | Wisp is a pale triangle with a detached shadow |
| **A tower seen on the road** | Low | Opposite shape language |

**Amendments:**

| Item | Spec now | Amended | Reason |
|---|---|---|---|
| Thorn count | 5 | **5 (keep)**, tips lighter | Serration is the signature |
| Leg length | 0.30 | **0.34** | Stronger "thin runner" read at 40 px |
| Scarf | "trailing" | **Two ribbons of different length** (0.35, 0.22 tile) | Clear "frayed thread" cue, asymmetry |
| Head | Round | **Slightly angular mask (rounded pentagon)** | Avoids "animal head" read |
| Rear height | 0.56 | **0.60** | Thorn line is more visible against the road |

### 3.3 Color Hierarchy

**Spec problem:** the spec lists emerald `#2E8B57` as the *primary* (L* ≈ 51). The Art Bible requires enemy bodies at **L\* 25 to 40**, and the measured contrast against the road is only 1.91:1.

**Corrected ramp (5 steps, Art Bible §2.8):**

| Step | Hex | Use | Y | Contrast vs path |
|---|---|---|---|---|
| Shadow | `#12402A` | Underside, far limbs | 0.04 | 5.2 : 1 |
| **Base** | **`#1B5E37`** | **Body (dominant)** | 0.085 | **3.5 : 1** |
| Light | `#2E8B57` | Top-left lit planes | 0.197 | 1.9 : 1 |
| Highlight | `#4FB77A` | Rim light only, 1–2 px | 0.37 | 1.1 : 1 |
| Accent | `#2DD4BF` | Eye slit | 0.513 | n/a |

| Rank | Element | Color | Share |
|---|---|---|---|
| 1 | **Bark body** | Base `#1B5E37` with light `#2E8B57` on lit planes | ≈ 52% |
| 2 | **Thorns and limbs** | Moss-brown `#6B5A2E`, tips `#D9C98A` | ≈ 22% |
| 3 | **Belly, scarf, contact shadow** | Darker moss `#12402A`, scarf `#4E8A4F` frayed | ≈ 16% |
| 4 | **Outline** | `#0F2A1B` | ≈ 8% (line) |
| 5 | **Accent** | Bio-teal `#2DD4BF` | ≈ 2% (but the brightest spot) |

**Value structure:** the body is **darker than the road by ≥ 35 L\***, the thorn tips are the *lightest part of the enemy* (they define the serrated read), and the **eye is the brightest pixel**. On the path, the order is: eye > thorn tips > body.

**Collision with the Brute:** the Brute is `#1F5E3B`, almost identical to the Thornling base. Fix without losing faction cohesion:

| | Thornling | Mossback Brute |
|---|---|---|
| Hue bias | **Yellow-green** (shift hue +10°: base `#2A5E2F`) | **Blue-green** (`#1F5E3B` → `#1D5C47`) |
| Thorns / plates | Pale thorn tips `#D9C98A` | Grey stone plates `#5A5148` |
| Size | 0.8 × 0.6 | 1.0 × 0.9 + gold ring |
| Pattern | Serrated line | Round hump |

**Crowd variation** (14 Thornlings in wave 7): apply per-instance **hue ±4°, value ±4%, scale ±5%, animation phase random** to avoid a "clone army" look, while staying inside the palette.

### 3.4 Materials

| Material | Where | Cues | Common failure |
|---|---|---|---|
| **Bark skin** | Torso, limbs | Vertical cracks, 2 to 3 tonal layers, matte | Leather, fur or scales |
| **Thorn quills** | Back | Dry, pointed, slightly translucent tips, 1 px light edge | Metal spikes or bone |
| **Bark mask** | Head | Smooth, flat, single slit; slight wood grain | Animal face or skull |
| **Frayed cloth** | Scarf | Loose threads at the tip, 2 colors | A hero's cape |
| **Accent glow** | Eye | Emissive, additive halo | A cartoon eye |

**Material hierarchy:** thorns (crispest edges) > mask (simple) > bark (soft texture). Keep the bark texture **low frequency** so crowds don't shimmer.

### 3.5 Readability at Gameplay Zoom

Sizes of the **amended** design (body length 0.8, height 0.6, legs 0.34, thorns 0.14, eye slit 0.05 tile).

| Feature | 40 px tile | 64 px | 85 px | 128 px |
|---|---|---|---|---|
| Body length | 32 | 51 | 68 | 102 |
| Height | 24 | 38 | 51 | 77 |
| Thorn height | 6 | 9 | 12 | 18 |
| Leg thickness | 2 | 3 | 4 | 6 |
| Eye slit | 2 | 3 | 4 | 6 |
| Outline | 1.25 | 2 | 2.7 | 4 |
| Health bar width (0.8 tile) | 32 | 51 | 68 | 102 |

| Information | 40 px | 64 px | 85 px | 128 px |
|---|---|---|---|---|
| "Small fast spiky enemy" | ✔ | ✔ | ✔ | ✔ |
| Direction of travel (lean and scarf) | ✔ | ✔ | ✔ | ✔ |
| Eye accent | Dot + halo | ✔ | ✔ | ✔ |
| Bark texture | ✘ | Faint | ✔ | ✔ |
| Slowed state (cyan ring) | ✔ | ✔ | ✔ | ✔ |
| Health bar | ✔ (thin) | ✔ | ✔ | ✔ |

**Context tests:**

| Scenario | Risk | Result and fix |
|---|---|---|
| **On the road** (always) | Primary position | Base `#1B5E37` at 3.5:1 passes; the outline `#0F2A1B` adds definition |
| Crowd of 14 at 1.6 tiles/s | Overlaps merge into a blob | Thorns and the scarf must break the outline of each; spawn spacing 0.8 s = 1.3 tiles apart (fine) |
| Under a slow ring and projectiles | Ring plus tint plus trails | Ring is thin (1 px at 40 px); tint ≤ 15% |
| Hatching from a pod beside the road | Appears off-road, on dark ground | Eye halo and thorn tips are the highlights; add a 400 ms spawn flash |
| 24 px tests | See §3.2 | Passes (serrated edge) |
| Behind a tall tower | Hidden by the stalk | Stalk is narrow; enemy is 0.8 tile wide |

### 3.6 Animation Concepts

| State | Motion | Parameters | Easing | Purpose |
|---|---|---|---|---|
| **Run cycle** | Body bob ±3 px, 2 legs swing ±30° in antiphase | **4.0 Hz** (speed 1.6 tiles/s = one stride per 0.4 tile) | Sine | Fast and light |
| Lean | Torso rotates forward 12° | Constant | n/a | Direction |
| Footfall | Body scale Y 95% at each footfall, 100% mid-air | 4 Hz | Ease-out | Weight |
| **Scarf** | Two ribbons flutter, phase offset 90° | 6 Hz, ±10° and ±14° | Sine | Speed and the thread cue |
| **Thorn shimmer** | Thorns rotate ±2° in a traveling wave along the back | 4 Hz, phase offset per thorn | Sine | Adds life at no cost |
| **Spawn** | Steps out of the rift: scale 0 → 1.1 → 1.0, 200 ms; scarf whips | 200 ms | Ease-out-back | Entrance |
| **Hit reaction** | White flash 60 ms; squash 90% | 60 ms | Linear | Feedback without stopping movement |
| **Slow** | Animation rate × (1 − slow amount); cyan ring | | | Reads as "sluggish" |
| **Death (unravel)** | Body alpha 100% → 0% in 400 ms; 5 thread sprites rise 0.6 tile; thorns drop and fade | 500 ms | Ease-in | Signature |
| **Leak** | Shrinks and fades into the Nexus | 300 ms | Ease-in | Clear loss cue |
| **Hatch (from a pod)** | Pops from the pod with a small arc | 400 ms | Ease-out | Surprise |

**Crowd rule:** each spawned Thornling gets a random **phase offset** (0–1 cycle), **speed jitter ±3%** (visual only, never the sim), **scale ±5%**.

**Cost:** zero art frames. Optionally a 4-frame run cycle later for the 5 most seen enemies.

### 3.7 VFX Concepts

| Effect | Layers | Colors | Blend | Size | Duration | Particles |
|---|---|---|---|---|---|---|
| **Eye glow** | Radial sprite behind the eye | `#2DD4BF` 60% | Additive | 6 px | Constant | 1 |
| **Run dust** | 2 puffs per second at the feet | `#6B5A2E` 40% | Normal | 4 px | 300 ms | 2/s |
| **Spawn flash** | Teal burst at the rift | `#2DD4BF` | Additive | 0.6 tile | 400 ms | 6 |
| **Hit (Arcane)** | Violet knot burst | `#D4B5FF` | Additive | 0.5 tile | 200 ms | 8 |
| **Hit (Ballista)** | Splinters and dust | `#D9C9A3` | Normal | 0.3 tile | 200 ms | 3 |
| **Slow ring** | Thin cyan ring orbiting | `#7DD3FC` | Normal | radius + 5 px | While slowed | 1 |
| **Death: unravel** | 5 thread sprites (curving ribbons), eye dot lingers | `#1B5E37` / `#2E8B57`, eye `#2DD4BF` | Normal + additive eye | 0.6 tile | 500 ms | 6 |
| **Bounty thread** | Gold arc to the counter | `#F2C14E` | Additive | Arc | 400 ms | 1 |
| **Pod hatch (spawn from pod)** | Magenta and teal spore puff | `#C026D3`, `#2DD4BF` | Additive | 0.5 tile | 400 ms | 8 |
| **Heal (from a Warden)** | "+" bead rising from the Thornling | `#3DDC97` | Additive | 0.3 tile | 400 ms | 1 per second |

**Budget note:** a wave of 14 Thornlings has ≈ 14 × (1 glow + 2 dust/s) ≈ 45 sprites alive. Combined with 8 towers (200 particles) the total stays under the 300 budget. Run dust has a **Low quality** switch (off).

### 3.8 Upgrade Visual Evolution (Enemy Progression)

Enemies do not upgrade, but they **scale with waves** (HP × (1 + 0.12 × (wave − 1)) up to ×2.68 at wave 15). The visuals should communicate that the *same* creature gets tougher, without becoming a new enemy.

| Wave band | Stage | Visual change | Size | Sim data |
|---|---|---|---|---|
| 1–4 | **Seedling** | Base look; pale thorn tips; short scarf | 1.00 | HP 80–109 |
| 5–9 | **Grown** | **7 thorns** (two small ones added), darker thorn tips, longer scarf | 1.03 | HP 118–166 |
| 10–15 | **Hardened** | **7 thorns with moss-brown to near-black tips**, a **bark shoulder plate**, scarf adds a second color (`#6B5A2E`), eye glow +20% | 1.06 | HP 176–214 |
| Hatchling (from a pod, wave 15) | **Spore-touched** | Magenta speckles `#C026D3` on the back; a faint spore trail | 0.95 | Scaled by wave 15 |

**Guard rails:**

1. Silhouette stays "serrated, horizontal, leaning".
2. Changes are **overlays and tint**, produced by a layer swap, not new sprites (cost: 2 extra overlay layers).
3. Max size change: +6%, so collision does not feel dishonest.
4. The HP bar, not the visual, remains the main danger indicator.

### 3.9 Common Generation Mistakes to Avoid

| # | Mistake | Why it happens | How to catch it | Fix |
|---|---|---|---|---|
| 1 | **Cute face**: big eyes, a mouth, a smile | Character prior | Any mouth or round eyes | Negative: `eyes, mouth, face, cute`; request "flat bark mask with a single slit"; paint the mask by hand |
| 2 | **Hedgehog, stegosaurus or dog** | "Spiky back" prior | Snout or tail present | Specify "long thin human-like legs, no snout, no tail" |
| 3 | **Too bright, saturated green** | "Forest creature" prior | Grayscale test: body lighter than the road | Snap to the ramp; darken to `#1B5E37` |
| 4 | **Facing the camera** | Character-art default | Frontal pose | Request "side view facing right" and use a pose control image |
| 5 | **Wrong leg count** (4 legs, 3 legs) | Anatomy drift | Count legs | Edit by hand; use a pose reference |
| 6 | **Humanoid hero** (clothes, weapons) | "Scout" prior | Belt, bow, dagger | Negative: `weapon, clothes, armor, bow`; the scarf is the only cloth |
| 7 | **Thorns as shiny metal spikes** | "Spike" prior | Specular highlights | "dry brown quills, matte" |
| 8 | **Scarf as a heroic cape** | "Cloth" prior | Large, smooth, clean cape | "small frayed ribbon, two uneven lengths" |
| 9 | **Treant look** (big, tree-like) | "Wood creature" prior | Branches and leaves | Keep the body small and compact; no leaves |
| 10 | **Dark outline too thick** | Cartoon prior | > 3 px | Script the outline |
| 11 | **Motion blur or speed lines baked in** | "Fast" prior | Streaks | Negative: `motion blur, speed lines` |
| 12 | **Inconsistent thorn count across the batch** | Randomness | Count thorns | Fix the count in post; keep one master and derive variants |
| 13 | **Glow baked into the eye** (big halo) | Glow prior | Cannot animate | Request "no glow"; add in the engine |
| 14 | **Ground shadow baked** | Scene prior | Dark ellipse | Remove; use the standard shadow |
| 15 | **Symmetry**: a mirror-symmetric creature | Model symmetry bias | Left-right match | Break symmetry deliberately (scarf, one raised leg, thorn heights) |
| 16 | **Dead-on identical enemies in a batch** | Same sprite | Crowd looks cloned | Apply the crowd variation rules in §3.3 |

---

## 4. Cross-Anchor Findings

### 4.1 The Pair Test (Tower and Enemy Together on the Road)

| Check | Result | Notes |
|---|---|---|
| Shape contrast | **Excellent** | Vertical, symmetric, smooth vs horizontal, asymmetric, spiky |
| Value separation on the road | **Passes after the fixes** | Tower relies on outline; enemy relies on a dark body |
| Hue separation | Violet/gold vs green | Strong |
| Scale relationship | Tower 1.85 tiles vs enemy 0.6 tile (3:1) | Tower dominates the field; enemies stay readable as moving shapes |
| Thread Rule | Clear | Taut gold bands vs frayed scarf |
| Accent clarity | Violet gem vs teal eye | Different hues (268° vs 173°); both emissive |

### 4.2 Palette Collisions to Resolve

| Collision | Pair | Resolution |
|---|---|---|
| Thornling base vs Brute | `#1B5E37` vs `#1F5E3B` | See §3.3 |
| Eye teal vs Nexus cyan | `#2DD4BF` vs `#6FF3E3` | Eyes are small and dark-backed; Nexus is huge and white-hot; no change needed |
| Arcane violet vs Myra magenta | `#A66BFF` vs `#8E2A9E` | Different hue (268° vs 292°) and value; keep |
| Threadgold vs Storm yellow | `#F2C14E` vs `#F2F542` | Matte trim vs emissive core; Storm is not in the MVP |

### 4.3 Rules Both Anchors Must Pass Before Anything Else Is Generated

1. **Outline continuity:** 2 px dark line without gaps on every sprite.
2. **Ramp compliance:** every color within 5% of a palette ramp step.
3. **Path test:** appears correct on `#C9AA6B` and `#1E3B2A`.
4. **Layer separation:** all animated parts delivered as separate layers.
5. **One accent only** (enemy) and **one school color only** (tower).

---

## 5. Three Visual Directions

All three directions keep the same **world, camera, palette logic and gameplay rules**. They differ in **rendering style, level of detail, outline treatment and production method**.

### 5.0 What Stays Constant

| Constant | Value |
|---|---|
| Concept | "Woven Light": cloth tapestry, golden thread, crystal |
| Camera | Top-down map, upright 3/4 miniatures |
| Lighting direction | Top-left |
| Value ladder | Void < ground < enemies < path < defenders |
| Thread Rule, category bases, shape codes | Unchanged |
| Gameplay colors | School cores, status rings |

---

### 5.1 Direction A: Conservative, "Cel-Woven Miniature"

**Concept:** a clean, graphic look built from **flat 3-tone shading, confident shapes and a thin dual-tone outline**, like **painted board-game miniatures photographed under warm light**. Texture is **suggested** (a faint grain overlay), not painted. It is the Art Bible's baseline made concrete.

| Parameter | Value |
|---|---|
| Shading | 3-step cel (shadow, base, light) + 1 px rim |
| Outline | 2 px dual-tone, continuous |
| Texture | Single subtle grain (≤ 6% contrast) shared by all sprites |
| Detail | Max 4 secondary details; large shapes |
| Edges | Crisp; slight corner rounding |
| Glow | Engine-side additive sprites |
| Color | 5-step ramps, snapped to palette |
| Resolution | Master 256 px per tile; 1× and 2× exports |

**Arcane Tower in Direction A**

- A pale stone spindle in **three flat tones**, a single matte gold band system (three flat bands), and a **violet diamond built from 8 flat facets in 3 violet tones** with a white tip. A 2 px Night Loom outline surrounds everything. The plinth is a simple round slab with a gold ring. Grain is barely visible. The glow lives outside the sprite.
- **Look in one line:** "a beautifully simple painted game piece."

**Thornling Scout in Direction A**

- A compact crouched runner built from **a dark green ellipse, five bold triangular thorns, two straight legs and a mask head with one teal slit**, each shape in 3 tones, outlined in tinted near-black. The scarf is two flat ribbons with torn ends.
- **Look in one line:** "a small, sharp, graphic creature that reads like a chess piece in motion."

| | Assessment |
|---|---|
| **Strengths** | (1) **Best readability at the 40 px floor**: shapes and values, no noise. (2) **Easiest to keep consistent**: the same 3-tone rules apply to 100+ enemies. (3) **Smallest atlases**: flat color compresses very well (browser-friendly). (4) **Procedural animation fits**: separable flat layers. (5) **Distinct from Kingdom Rush** (no painterly heavy outline) and **from Cursed Treasure** (not comedic flat vector) thanks to the Thread Rule, cloth world, crystals. (6) Fast iteration: a bad asset is cheap to redo |
| **Weaknesses** | (1) **Lower "wow" at Steam screenshots** unless lighting and VFX are strong. (2) Risk of looking **generic or "mobile"** if shapes aren't distinctive. (3) Less material richness (stone, bark feel flatter). (4) Near-zoom (4K) can feel sparse |
| **Production cost** | **Index 1.0× (baseline)**. Manual passes per asset: **4** (select, clean, palette-snap/outline script, layer-split). Tools: Krita or Photopea, a Node/Python script. Skills: basic digital painting cleanup. Total MVP art: ≈ 24 unit sprites/layers sets, one ground weave, 24 icons. Scales linearly to 130 units without new tooling |
| **Suitability for AI generation** | **4 / 5**. Flat, stylized subjects with a plain background are what image models do reliably. Style references and palette snapping give consistent output. Typical failure rate: 30–40% (cute faces, drift), cheap to retry. Outline and palette are fixed by script, so inconsistency is removed in post. The one weak spot is **tiering and cross-asset consistency**, solved by editing a master rather than regenerating |
| **Risks and mitigations** | Generic look → enforce the Thread Rule and category bases visibly; lean on VFX and lighting for richness |

---

### 5.2 Direction B: Premium Fantasy, "Painted Relief"

**Concept:** hand-painted **rich materials and soft volumetric light**, like high-end painted fantasy strategy art. Stone has grain and chips, crystal has internal depth, bark has layered cracks and moss, light feels cinematic. Outlines are thin (1 px, colored) or replaced by value separation.

| Parameter | Value |
|---|---|
| Shading | Painterly soft gradients, 5+ values, ambient occlusion in crevices |
| Outline | 1 px colored line, or none (value separation) |
| Texture | Painted stone, bark, fabric detail baked in |
| Detail | 8–15 secondary details |
| Edges | Mixed hard/soft |
| Glow | Painted into the sprite plus engine additive |
| Color | Wider hue shifts, local color variation |
| Resolution | Master 384–512 px per tile for the detail |

**Arcane Tower in Direction B**

- Carved limestone with **visible grain, chips and tiny cracks**, a **gold thread with fine twist detail**, and a **gem with internal depth** (darker core, light scattering at the edges, tiny flaws). Soft ambient occlusion at the plinth, painted moss in the crevices, a delicate rune pattern on the plinth. The glow is painted around the gem.
- **Look in one line:** "a precious artefact from a high-end fantasy art book."

**Thornling Scout in Direction B**

- A bark-skinned creature with **layered cracked bark**, **lichen and moss patches**, **translucent thorn quills with veins**, an expressive carved wooden mask, and a scarf of **woven fibres with individual loose threads**. Soft subsurface-like light on the thorn tips and an emissive eye with a painted halo.
- **Look in one line:** "a detailed forest spirit with believable texture."

| | Assessment |
|---|---|
| **Strengths** | (1) **Highest near-zoom beauty**: strong for 4K and Steam screenshots. (2) **Material richness** (stone, bark, crystal) sells "premium". (3) AI models are **excellent** at painterly texture: raw outputs look impressive immediately. (4) Forgiving of imprecise shapes |
| **Weaknesses** | (1) **Readability drops at 40 px**: texture and soft values become noise; the stone mid-tone collision with the road gets worse (no hard outline). (2) **Weak identity**: painterly AI-fantasy is the most common look; high risk of resembling countless games. (3) **Hard to keep consistent**: texture, lighting and palette drift between generations. (4) **Larger atlases** (more colors, gradients): a bigger download and GPU load. (5) Detail fights the Thread Rule: loose threads vanish in texture noise. (6) Procedural animation is harder because painted shading and glow are baked into the layers |
| **Production cost** | **Index 2.0–2.5×**. Manual passes per asset: **7** (select, structure fix, lighting normalization, texture cleanup, palette harmonization, layer split with painted-over occlusion, detail QA). Tools: Krita/Photoshop plus tablet skills. More rejected generations. Cost scales with every new asset (no script can normalize painted lighting). Large atlases → extra compression work |
| **Suitability for AI generation** | **3 / 5**. Generation quality is high but **batch consistency is medium** (style references help but light and color drift). Many outputs need **relighting** to the standard top-left and removal of baked shadows/glow. Layer splitting is difficult because painting merges parts. License and "AI-look" disclosure risk higher because the output resembles the model's default style |
| **Risks and mitigations** | Readability → add a strong outline and a "far-zoom simplification" pass (LOD art); identity → this is the biggest risk and is hard to mitigate |

---

### 5.3 Direction C: Stylized AAA, "Pre-rendered Diorama"

**Concept:** units are **real 3D models with chunky, stylized proportions and hand-painted textures**, rendered in Blender under fixed lighting and baked to sprite sheets (a modern equivalent of pre-rendered classic strategy art). Real depth, real lighting, real rim light and light volumes. Looks like a polished stylized-3D console game.

| Parameter | Value |
|---|---|
| Method | Model, rig, render to frames (8 directions possible) |
| Shading | Toon-ramp shading plus baked ambient occlusion and rim light |
| Outline | Inverted-hull or post outline, uniform 2 px |
| Texture | Hand-painted stylized textures (low frequency) |
| Detail | Medium, geometry-driven |
| Glow | Emissive render pass + engine additive |
| Resolution | Render at 4× per tile |

**Arcane Tower in Direction C**

- A **chunky modelled spindle** with beveled stone, a **true 3D gold band**, and a **crystal with real facets, internal emission and a bright rim**. Rendered from the 35° camera with a consistent key light; the gem spins as an actual rendered rotation (8–16 frames). Soft contact shadow baked from the model.
- **Look in one line:** "a polished 3D game piece with real lighting."

**Thornling Scout in Direction C**

- A **stylized 3D creature** with rounded sculpted forms, **real thorn geometry**, a modelled mask and a simulated cloth scarf. A **real run cycle** (8–12 frames × 2 facing directions) with natural weight and secondary motion; lighting identical across all enemies.
- **Look in one line:** "a stylized AAA enemy with fluid animation."

| | Assessment |
|---|---|
| **Strengths** | (1) **Perfect lighting and angle consistency** by construction. (2) **Real animation** (rotation, run cycles, cloth) and easy extra angles. (3) **Highest polish ceiling** for trailers and the Steam page. (4) Tier variants are **model edits**, not redraws. (5) Excellent at near zoom |
| **Weaknesses** | (1) **Requires a 3D pipeline** (modelling, rigging, texturing, rendering) that is a different skill set from the rest of this project. (2) **Clashes with the cloth-tapestry map**: 3D-looking units on a flat embroidered cloth lose the "handmade" conceit unless the cloth is also 3D. (3) **Large sprite-sheet memory** (frames × directions × tiers × 130 units): heavy for browsers. (4) Readability at far zoom depends on exaggerated forms, which need more modeling iteration. (5) Hard to reach the unique look; stylized 3D is also very common |
| **Production cost** | **Index 4–5×**. Manual passes per asset: **10+** (concept, model, UV/paint, rig, animate, render, post, atlas). Tools: Blender, a texturing app, render scripts, plus a 3D-generation tool whose meshes need retopology. Costs scale with every new enemy and every animation. Very high iteration cost when the design changes |
| **Suitability for AI generation** | **2 / 5**. AI is good at concept images, but **image-to-3D meshes are inconsistent** (messy topology, wrong thickness, unusable UVs) and need heavy repair. AI doesn't help with rigging and animation. Consistent lighting comes free from rendering, but the *models* still need manual work. AI works only as a concept stage |
| **Risks and mitigations** | Cost and skill gap → restrict to the boss and the Nexus only (a "hero render" subset) |

---

## 6. Direction Comparison and Decision

### 6.1 Side-by-Side

| Aspect | A: Conservative | B: Premium Fantasy | C: Stylized AAA |
|---|---|---|---|
| Look | Clean painted miniature | Rich painted artefact | Polished 3D game piece |
| Shading | 3-tone cel | Painterly gradients | Toon-ramp 3D |
| Outline | 2 px dual-tone | 1 px or none | Uniform 2 px |
| Texture | Single subtle grain | Full painted | Hand-painted, low-frequency |
| Far zoom (40 px) | **Excellent** | Weak | Good |
| Near zoom (4K) | Fair | **Excellent** | **Excellent** |
| Uniqueness | Good (Thread Rule, cloth) | Weak (generic AI-fantasy) | Medium |
| Animation approach | Procedural layers | Procedural (harder) | Real frame animation |
| Atlas size | **Small** | Large | **Very large** |
| Consistency across 130 units | **High** (scripted) | Medium | High (but costly) |
| AI-generation fit | **4 / 5** | 3 / 5 | 2 / 5 |
| Production cost index | **1.0×** | 2.0–2.5× | 4–5× |
| Solo feasibility | **Yes** | Barely | No (without a 3D specialist) |
| Steam polish ceiling | Medium → High with VFX | High | Very high |

### 6.2 Weighted Decision Matrix

Scores 1 (poor) to 5 (excellent). Score contribution = weight × score. Maximum 500, shown as a percentage.

| Criterion | Weight | A | B | C |
|---|---|---|---|---|
| Readability at far zoom | 25 | 5 → 125 | 3 → 75 | 4 → 100 |
| Identity and uniqueness | 15 | 4 → 60 | 3 → 45 | 3 → 45 |
| AI-assisted consistency | 20 | 4 → 80 | 3 → 60 | 2 → 40 |
| Solo production cost | 20 | 5 → 100 | 3 → 60 | 1 → 20 |
| Browser performance and download | 10 | 5 → 50 | 3 → 30 | 2 → 20 |
| Steam and marketing ceiling | 10 | 3 → 30 | 4 → 40 | 5 → 50 |
| **Total (of 500)** | 100 | **445** | **310** | **275** |
| **Score (percent)** | | **89** | **62** | **55** |

**Sensitivity:** if the Steam ceiling were weighted 30 (and readability reduced to 15), the totals become A ≈ 80, B ≈ 64, C ≈ 63: **A still wins**. Direction A only loses if marketing polish outranks everything and cost is ignored; that is not the situation of a solo developer.

### 6.3 Decision

**The definitive style is Direction A, "Cel-Woven Miniature", with a "premium light" layer:**

| Decision | Detail |
|---|---|
| **Base style** | Direction A for **all gameplay sprites** (towers, enemies, pods, icons, UI) |
| **Where premium effort goes** | (1) **Lighting**: soft additive glows, light shafts, rim lights in the engine. (2) **Motion**: procedural bob, spring, anticipation and overshoot. (3) **VFX**: the thread-light language. (4) **Atmosphere layers**: mist, motes, vignette |
| **Hero exceptions (Direction B treatment, same palette and outline rules)** | The **Nexus**, **Sporemother Myra**, the **main menu key art**, the Steam capsule. These are viewed longer and larger |
| **What is rejected** | Direction C as a pipeline; allowed only for a possible trailer or capsule render later |
| **Why** | A is the only direction that satisfies all three hard constraints together: **readable at the 40 px floor**, **achievable solo with AI assistance**, and **uniquely "Woven Light"**; its biggest weakness (flatness) is cheaply compensated by light, motion and VFX rather than texture |

**Condition for revisiting:** re-open the decision if, after approving the anchors, *the 24 px silhouette test and the path test pass but five unbiased testers rate the screenshots below 3.5 / 5 for "polish"*. The first remedy is more light and VFX, not a style change.

---

## 7. The Definitive Style Card

Use this card as the pass/fail reference for every asset.

| Property | Definition |
|---|---|
| **Name** | Woven Light: Cel-Woven Miniature |
| **Shading** | 3-step cel: shadow / base / light, plus 1–2 px warm rim on the top-left edge |
| **Outline** | 2 px at 1× (3 px high-contrast mode): Night Loom `#12162E` for defenders; tinted near-black for enemies; continuous, no gaps |
| **Texture** | One shared subtle grain overlay (≤ 6% contrast). No painted texture detail on gameplay sprites |
| **Shapes** | 2–4 large primitives + 1 accent; ≤ 4 secondary details (≤ 3 for enemies, ≤ 6 for the boss) |
| **Palette** | Master palette and 5-step ramps (Art Bible §2); enemy bodies L\* 25–40; towers stone with one school-color core |
| **Light** | Key top-left, 315° / 45°, warm `#FFD9A0`; fill cool `#6C7BD8`; glow added in the engine |
| **Perspective** | Top-down ground; upright miniatures at ≈ 35°; plinth ellipse ratio 1 : 0.4 |
| **Animation** | Procedural on separated layers; no frame art by default |
| **Glow and VFX** | Additive engine sprites; thread-light language; ≤ 300 particles |
| **Resolution** | 256 px/tile master; 1×, 2× exports; 4× for Steam on demand |
| **Hero exceptions** | Nexus, Myra, key art: painted treatment, same palette and outline rules |
| **Identity devices (non-negotiable)** | The Thread Rule, category bases, dark-on-bright enemies, school colors on cores only, the unravel death, frayed map border |

### 7.1 Spec Amendments Triggered by This Review

Apply these to the Art Bible and the MVP Visual Specification before generating assets.

| # | Document | Change |
|---|---|---|
| 1 | MVP Spec, Arcane Tower | Diamond 0.60 × 0.80; stalk 0.34 (0.42 at the base → 0.26 under the gem); gap 0.18; height 1.85; **three flat 3 px gold bands** instead of a five-turn spiral |
| 2 | MVP Spec, Arcane Tower | Crystal needs three value bands (`#6B3FD0` / `#A66BFF` / `#D4B5FF`) plus a white tip |
| 3 | MVP Spec, Thornling Scout | Body base `#1B5E37`, light `#2E8B57`, shadow `#12402A`, highlight `#4FB77A`; thorn tips `#D9C98A`; yellow-green bias to separate from the Brute |
| 4 | MVP Spec, Thornling Scout | Leg 0.34, height 0.60, two scarf ribbons (0.35 and 0.22), angular mask head; add an additive 6 px eye halo |
| 5 | MVP Spec, Thornling Scout | Add wave-band variants (Seedling / Grown / Hardened) and the Spore-touched hatchling overlay |
| 6 | MVP Spec, Mossback Brute | Shift base to blue-green `#1D5C47`; stone-grey plates `#5A5148` |
| 7 | Art Bible §1.4 and §11 | Add the **path-overlap test**; state that tower separation on the road depends on the **outline**, not on value |
| 8 | Art Bible §2.3 | Replace "towers L\* 70–90 lighter than the path" with "towers separated from the path by outline and hue" |
| 9 | Art Bible §11.1 | Add the **40 px minimum tile** as the hard readability floor |
| 10 | Art Bible §6.2 | Add crowd variation (hue ±4°, value ±4%, scale ±5%, random phase) |

---

## 8. Anchor Approval Protocol

Do not generate any other asset until both anchors pass.

### 8.1 Procedure

1. **Silhouette phase:** draw or generate 12 silhouettes per anchor. Select 3 by the 24 px test.
2. **Generation phase:** 8 variants per silhouette using the Direction A prompt deltas (below).
3. **Cleanup phase:** pick the best, clean it, snap the palette, apply the outline script, split the layers.
4. **Review phase:** score against the rubric below with 5 testers (or 3 testers + a self-review on separate days).
5. **Lock phase:** the approved sprites become the **style references** for every later generation.

### 8.2 Direction A Prompt Deltas

Add to the shared prompt kit (MVP Spec §1):

```
flat three-tone cel shading, three clearly separated value bands, crisp shape edges,
bold simple shapes, matte, no painterly texture, no gradients except inside the glowing crystal,
no baked glow, no baked shadow, thin clean outline, large readable shapes, game sprite
```

Extra negative: `painterly, oil painting, brush strokes, soft shading, realistic texture, ambient occlusion, baked glow, depth of field, bokeh`

### 8.3 Scoring Rubric (Each Anchor)

| # | Test | Pass condition | Weight |
|---|---|---|---|
| 1 | 24 px silhouette | 5/5 name it correctly in 3 s | 20% |
| 2 | **Path test** | Distinct on `#C9AA6B` and on `#1E3B2A` | 15% |
| 3 | **40 px minimum** | Type and school/category readable at a 40 px tile | 15% |
| 4 | Grayscale | Value structure as in §2.3 / §3.3 | 10% |
| 5 | Palette | All colors within 5% of the ramps | 10% |
| 6 | Thread Rule | Taut gold (tower) / frayed ends (enemy) visible | 10% |
| 7 | Uniqueness | No tester names Kingdom Rush or Cursed Treasure | 10% |
| 8 | Animation readiness | All moving parts exist as clean layers | 10% |

**Threshold:** ≥ 85% total and **no zero** on tests 1 to 3. Fail → iterate once on the amendments; fail twice → return to the silhouette phase.

### 8.4 After Approval

1. Freeze `palette.json`, the outline script, the prompt kit and the two style-reference images.
2. Build the third asset (Ballista Post) and the fourth (Bark Guard) **only from the locked references**, and run the same rubric. If the family look holds across four assets, the style is confirmed.
3. Begin the atlas packer and the Pixi layers with the approved Arcane Tower and Thornling Scout as the first real sprites in the game.
