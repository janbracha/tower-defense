# Post-Launch Backlog

Initial scope after 1.0 (GDD §21.3 and §15.4). Features here are intentionally coarser; each story is expected to be broken into session-sized tasks (see [00-index.md](00-index.md#task-sizing-rule)) when it enters a milestone.

---

## EP-17 Platform, Monetization and Release

### FT-17.11 Version 1.1 quality and balance — `P1`

- [ ] **US-17.11.1** As a player, 1.1 fixes pain points found in launch.
  - [ ] Triage launch feedback and telemetry into a ranked list
  - [ ] First balance patch (new bundle; `rulesEpoch` decision documented)
  - [ ] Quality-of-life batch (UI, hotkeys, tooltips) from feedback
  - [ ] Patch notes surfaced in-game from the balance changelog

### FT-17.12 Mobile port — `P2`

- [ ] **US-17.12.1** As a mobile player, I can play on iOS/Android.
  - [ ] Capacitor wrapper and store build pipeline
  - [ ] Touch input adapter (long-press info, drag placement, larger hit areas)
  - [ ] Responsive UI layout tokens and 44 px touch targets
  - [ ] Performance tiering (texture caps, particle budgets) and 30 FPS target validation
  - [ ] Haptics port and platform entitlements (store purchases)
  - [ ] Mobile-specific tutorial and session-length tuning

### FT-17.13 Workshop and community content — `P3`

- [ ] **US-17.13.1** As a community creator, I can share content.
  - [ ] Content pack format hardening and sandbox validation
  - [ ] Steam Workshop integration for packs and Rift seeds
  - [ ] Custom Rift seed browser and ratings
  - [ ] Mod API documentation for effect compositions and balance bundles

---

## EP-15 Endgame Modes, Competition and Services

### FT-15.13 Ongoing seasons — `P1`

- [ ] **US-15.13.1** As a player, there is a new season every 12 weeks.
  - [ ] Season 2 (The Great Thaw) content and cosmetics
  - [ ] Seasons 3–4 content planning template and authoring checklist
  - [ ] Seasonal leaderboard archive

### FT-15.14 Co-op investigation — `P3`

- [ ] **US-15.14.1** As the team, we assess 2-player co-op.
  - [ ] Spike: deterministic lockstep feasibility using the command log
  - [ ] Spike: shared-economy and hero-ownership rules prototype
  - [ ] Decision record and cost estimate (ADR)

---

## EP-5 / EP-6 / EP-7 / EP-8 Dimension Pack 1 (Paid Expansion)

### FT-6.18 New faction Act (pack 1: The Gilded Tide) — `P2`

- [ ] **US-6.18.1** As a player, I can play a new faction Act.
  - [ ] Design pass: faction story, 10 enemies, 2 bosses, 5 maps, 2–3 towers, 1 hero
  - [ ] New mechanics spikes (naval lanes, tidal hazards)
  - [ ] Content implementation epics created per the standard Act template (enemies, maps, bosses, towers, hero, art, audio)
  - [ ] Pack entitlement and pack-aware save migration

---

## EP-16 Balance Tooling, Telemetry and QA

### FT-16.10 Live-ops balance — `P1`

- [ ] **US-16.10.1** As the team, we balance continuously.
  - [ ] Weekly telemetry review rota and decision rules from TDD §12.10
  - [ ] Automatic regression run on every published bundle against top leaderboard replays
  - [ ] Alerting for tower/evolution share thresholds
