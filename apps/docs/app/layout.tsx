import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civic Forecast · Polymarket UI Kit",
  description:
    "React components, data hooks, and shadcn-style registry for Polymarket apps.",
  openGraph: {
    title: "Polymarket UI Kit",
    description:
      "Drop-in market cards, orderbooks, comments, charts, and share cards for builders.",
    url: "https://github.com/horn111/polymarket-ui-kit",
    siteName: "Polymarket UI Kit",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-pui-theme="light" lang="en">
      <body>
        <a className="docs-skip" href="#docs-content">
          Skip to content
        </a>
        <main className="docs-shell">
          <nav className="docs-nav">
            <a className="docs-brand" href="/">
              <span>◇</span>
              <strong>Polymarket UI Kit</strong>
            </a>
            <div className="docs-nav__links">
              <a href="/components">Components</a>
              <a href="/examples">Examples</a>
              <a href="/registry">Registry</a>
              <a href="https://polymarket-ui-kit-demo-fkan-chi.vercel.app/studio">
                Studio
              </a>
              <a href="https://github.com/horn111/polymarket-ui-kit">GitHub</a>
            </div>
          </nav>
          <div id="docs-content">{children}</div>
          <footer className="docs-footer">
            <strong>Civic Forecast</strong>
            <span>
              Independent open-source tooling. Demo political context is illustrative.
            </span>
          </footer>
        </main>
      </body>
    </html>
  );
}
