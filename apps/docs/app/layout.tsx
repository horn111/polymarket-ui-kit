import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymarket UI Kit",
  description:
    "React components, data hooks, and shadcn-style registry for Polymarket apps.",
  openGraph: {
    title: "Polymarket UI Kit",
    description:
      "Drop-in market cards, orderbooks, comments, charts, and share cards for builders.",
    url: "https://github.com/horn111/polymarket-ui-kit",
    siteName: "Polymarket UI Kit"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="docs-shell">
          <nav className="docs-nav">
            <strong>polymarket-ui-kit</strong>
            <div className="docs-nav__links">
              <a href="/components">Components</a>
              <a href="/examples">Examples</a>
              <a href="/registry">Registry</a>
              <a href="/grant">Grant</a>
              <a href="https://github.com/horn111/polymarket-ui-kit">GitHub</a>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}

