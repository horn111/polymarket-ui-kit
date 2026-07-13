import type { Preview } from "@storybook/react";
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: "Civic Forecast color scheme",
      defaultValue: "light",
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
          context.globals.scheme ?? "light",
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
      default: "Civic light",
      values: [
        { name: "Civic light", value: "#f4f7fb" },
        { name: "Civic dark", value: "#071523" },
      ],
    },
    viewport: {
      viewports: {
        mobile320: { name: "Mobile 320", styles: { width: "320px", height: "720px" } },
        mobile390: { name: "Mobile 390", styles: { width: "390px", height: "844px" } },
        tablet768: { name: "Tablet 768", styles: { width: "768px", height: "1024px" } },
      },
    },
  },
};

export default preview;
