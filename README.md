# tower-defense
**Guardians of the Nexus** — a premium tower defense / RPG / rogue-lite for browser, Steam and mobile.

The full Game Design Document is in [docs/gdd/00-index.md](docs/gdd/00-index.md).
The Technical Design Document is in [docs/tdd/00-index.md](docs/tdd/00-index.md).
The development backlog is in [docs/backlog/00-index.md](docs/backlog/00-index.md).
Planning documents (validation report, MVP definition, production plan, development order) are in [docs/planning](docs/planning/01-architecture-validation-report.md).

## Getting Started

Requires Node 20.19+ (22 recommended, see `.nvmrc`) and pnpm 10 (`corepack enable`).

```
pnpm install
pnpm dev          # Next.js on http://localhost:3000, game shell at /play
pnpm check        # typecheck + lint + test
pnpm build
```

## Architecture (Clean Architecture)

| Layer | Packages | Rule |
|---|---|---|
| Domain | `kernel`, `content-schema`, `content-core`, `sim`, `meta` | Pure, deterministic TypeScript: no DOM, React, Pixi, `Math.random`, `Date`, `**` or unsorted `.sort()` |
| Application | `app` | Use cases and ports (interfaces); no UI frameworks or browser APIs |
| Infrastructure | `infra`, `sim-host` | Adapters implementing application ports; worker host |
| Presentation | `render` (Pixi), `stores` (Zustand vanilla), `ui` (React), `apps/web` (Next.js, composition root) | Depends inward only |
| Support | `testkit`, `tools` | Test builders and CLIs |

The import matrix and determinism rules are enforced by ESLint (`tooling/eslint/layers.mjs`). Packages are consumed as TypeScript source (no build step); `apps/web` transpiles them.
