# Theming

The React package ships the politics-first Civic Forecast token system. Light
is the presentation default; dark remains a fully supported color scheme.

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
  --pui-primary: #1e63f3;
  --pui-live: #0f9f91;
  --pui-font-sans: "Instrument Sans", system-ui, sans-serif;
  --pui-font-serif: "Source Serif 4", Georgia, serif;
}
```

The package references these fonts but does not download them. Host apps may
self-host the families or rely on the documented fallbacks.
