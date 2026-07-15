import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html data-pui-theme="dark" lang="en">
      <body>{children}</body>
    </html>
  );
}
