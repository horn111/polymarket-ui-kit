# Theming

Civic Forecast uses teal panels, fine rules, and brass controls. Source Serif 4
sets questions and display headings; Instrument Sans sets data and controls.
Demo, docs, and Studio start in dark mode. The package stylesheet's
root tokens provide the light sage theme; dark tokens apply under the attribute.

```tsx
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

<ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
```

Or set `data-pui-theme="dark"` on an ancestor. ThemeProvider supports `light`,
`dark`, and `system`.
The `system` setting follows OS theme changes while the page is open. An explicit
choice stays selected; if local storage is blocked, it lasts for the current page.

Registry installs include `lib/polymarket-theme.css`, imported by each copied
component. Its namespaced tokens follow `data-pui-theme="light"` or `"dark"` on
an ancestor, including attributes set by `ThemeProvider`. Existing `.light` and
`.dark` scopes also work. The nearest theme scope wins; an explicit attribute
takes precedence over a class on the same element. No Tailwind dark variant
configuration is required. Tailwind remains responsible for the layout utilities.

Override semantic variables in your theme scope:

```css
[data-pui-theme="dark"] {
  --pui-accent: #d0b779;
  --pui-on-accent: #192421;
  --pui-well: #101c1e;
  --pui-material: linear-gradient(135deg, #142326 0%, #233c3a 100%);
  --pui-font-sans: "Instrument Sans", system-ui, sans-serif;
  --pui-font-serif: "Source Serif 4", Georgia, serif;
}
```

`--pui-bg`, `--pui-bg-muted`, and `--pui-bg-strong` cover flat surface roles.
`--pui-material` defines the outer panel's color field; `--pui-well` defines
focused data and code surfaces. Most readings use rules and spacing rather than
nested panels. `--pui-rim` and `--pui-shadow` remain available for custom surfaces.

The package references font families without downloading them. Apps self-host
Instrument Sans and Source Serif 4 WOFF2 through
`apps/shared/civic-foundation.css`; PNG export uses a static Instrument Sans TTF.
Both families ship with their licenses.
No runtime third-party font service is required.

See [DESIGN.md](../DESIGN.md) for layout, radius, motion, and component rules.
