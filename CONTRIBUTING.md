# Contributing

Thanks for helping make Polymarket interfaces easier to build.

## Good first contributions

- Add a Storybook state for a component.
- Improve a formatter or adapter edge case.
- Add an example for a real app workflow.
- Tighten accessibility labels, focus states, or color contrast.
- Request a component with a clear product use case.

## Local setup

```bash
pnpm install
pnpm build
pnpm test
pnpm storybook
```

On Windows PowerShell, use `pnpm.cmd` if script execution is blocked.

## Pull requests

- Keep changes scoped.
- Add or update tests for behavior changes.
- Add Storybook coverage for visual changes.
- Include screenshots for component changes.
- Keep README and docs English-first.

## Design principles

- Components must be useful with preloaded server data.
- Hooks must degrade cleanly through loading, error, empty, and stale states.
- v0 is read-first: no authenticated order placement.
- Registry files should be easy to copy, inspect, and customize.

