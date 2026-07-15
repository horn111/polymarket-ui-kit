import type { Preview } from "@storybook/react";
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: "Mechanical Probability color scheme",
      defaultValue: "dark",
      toolbar: {
        icon: "mirror",
        items: ["light", "dark"],
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute(
          "data-pui-theme",
          context.globals.scheme ?? "dark",
        );
        document.body.style.background = "var(--pui-canvas)";
      }
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "Instrument dark",
      values: [
        { name: "Instrument dark", value: "#0b0a0c" },
        { name: "Ceramic light", value: "#efede7" },
      ],
    },
    viewport: {
      viewports: {
        mobile320: { name: "Mobile 320", styles: { width: "320px", height: "720px" } },
        mobile390: { name: "Mobile 390", styles: { width: "390px", height: "844px" } },
        tablet768: { name: "Tablet 768", styles: { width: "768px", height: "1024px" } },
      },
    },
    layout: "centered",
  },
};

export default preview;
