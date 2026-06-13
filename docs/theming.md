# Theming

The React package ships CSS variables.

```tsx
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";
```

Override variables at the app root:

```css
:root {
  --pui-accent: #0f766e;
  --pui-radius-md: 8px;
}
```

Dark mode uses the `data-pui-theme="dark"` attribute.

