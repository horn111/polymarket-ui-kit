import type { Preview } from "@storybook/react";
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f8fa" },
        { name: "dark", value: "#0f141b" }
      ]
    }
  }
};

export default preview;

