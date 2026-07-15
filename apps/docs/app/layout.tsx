import type { Metadata } from "next";
import { ThemeSwitch } from "./ThemeSwitch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymarket UI Kit · Documentation",
  description:
    "Mechanical, source-aware React components and distribution tooling for prediction markets.",
  icons: {
    icon: "/icon.svg",
  },
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
    <html data-pui-theme="dark" lang="en">
      <body>
        <a className="docs-skip" href="#docs-content">
          Skip to content
        </a>
        <main className="docs-shell">
          <nav className="docs-nav">
            <a className="docs-brand" href="/">
              <span aria-hidden="true" className="docs-brand__mark">
                <i />
                <i />
              </span>
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
            <ThemeSwitch />
          </nav>
          <div id="docs-content">{children}</div>
          <footer className="docs-footer">
            <strong>Polymarket UI Kit / Civic Forecast</strong>
            <span>
              Independent open-source tooling. Demo political context is illustrative.
            </span>
          </footer>
        </main>
      </body>
    </html>
  );
}
