import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

