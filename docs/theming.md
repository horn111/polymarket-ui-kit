# Theming

The React package ships the Mechanical Probability token system used by the
Polymarket UI Kit and its Civic Forecast edition. Dark is the showcase default;
light is a complete ceramic counterpart rather than a fallback.

```tsx
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";
```

Use `ThemeProvider` for `light`, `dark`, or `system`, or set the attribute directly:

```tsx
<ThemeProvider defaultTheme="system">{children}</ThemeProvider>
```

```html
<div data-pui-theme="dark">...</div>
```

Override semantic variables at the app root. Existing `--pui-*` aliases remain
supported for backward compatibility:

```css
:root {
  --pui-primary: oklch(0.68 0.105 50);
  --pui-live: oklch(0.76 0.105 170);
  --pui-font-display: "PUI Unbounded", sans-serif;
  --pui-font-sans: "PUI Schibsted Grotesk", system-ui, sans-serif;
  --pui-font-mono: "PUI Chivo Mono", monospace;
}
```

The package includes locally hosted OFL variable fonts for deterministic demos,
docs, Storybook, embeds, and registry previews. Hosts can override any family
while retaining the semantic display/UI/mono roles.

Purple, violet, chartreuse, and party-coded red/blue are intentionally absent
from the master palette. Copper indicates calibrated interaction, teal is
reserved for live/positive state, and coral is reserved for negative state.
