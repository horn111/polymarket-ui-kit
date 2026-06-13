# Architecture

Polymarket UI Kit is a hybrid distribution project:

- `@polymarket-ui-kit/core` normalizes public Polymarket data.
- `@polymarket-ui-kit/react` renders typed UI primitives.
- `@polymarket-ui-kit/registry` exposes copy-in components for shadcn-style apps.
- `@polymarket-ui-kit/cli` helps developers discover install commands.
- `apps/docs`, `apps/demo`, and Storybook provide the adoption surface.

The core package avoids React so it can be used in server components, API routes,
workers, and static generation jobs.

## Data flow

```mermaid
flowchart LR
  A["Gamma API"] --> D["@polymarket-ui-kit/core"]
  B["Data API"] --> D
  C["CLOB API and WebSocket"] --> D
  D --> E["@polymarket-ui-kit/react"]
  D --> F["Registry components"]
  E --> G["Apps, embeds, dashboards"]
  F --> G
```

## v0 boundary

v0 does not place orders. It can preview fees, display market data, and emit a
host-provided trade intent callback.

