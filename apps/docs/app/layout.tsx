import type { Metadata } from "next";
import { ThemeSwitch } from "./ThemeSwitch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymarket UI Kit · Documentation",
  description:
    "Blue-led, source-aware React components and distribution tooling for prediction markets.",
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

const DESIGN_CONTRACT = `THESIS: Probability is public information with visible proof, not a stack of crypto dashboard cards.
OWN-WORLD: Light mineral canvas, cobalt-blue fields, hairline rails, square controls, large humanist numerals, cyan live and coral negative states.
STORY: Visitors understand the market, see its evidence, inspect reusable components, and enter Studio.
FIRST VIEWPORT: A large probability anchor occupies the left rail; the live market, chart, and evidence form one continuous plane on the right; Studio remains visible in navigation.
FORM: Public Probability, selected direction from seed 521f094d.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-pui-theme="light" lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.currentScript?.parentNode?.insertBefore(document.createComment(${JSON.stringify(DESIGN_CONTRACT)}), document.currentScript);`,
          }}
        />
        <a className="docs-skip" href="#docs-content">
          Skip to content
        </a>
        <main className="docs-shell">
          <nav className="docs-nav">
            <a className="docs-brand" href="/">
              <span aria-hidden="true" className="docs-brand__mark">
                P
              </span>
              <strong>Polymarket UI Kit</strong>
            </a>
            <div className="docs-nav__links">
              <a href="/components">Components</a>
              <a href="/examples">Examples</a>
              <a href="/registry">Registry</a>
              <a href="https://polymarket-ui-kit-demo.vercel.app/studio">Studio</a>
              <a href="https://github.com/horn111/polymarket-ui-kit">GitHub</a>
            </div>
            <ThemeSwitch />
          </nav>
          <div id="docs-content">{children}</div>
          <footer className="docs-footer">
            <strong>Polymarket UI Kit</strong>
            <span>
              Independent open-source tooling. Demo political context is illustrative.
            </span>
          </footer>
        </main>
      </body>
    </html>
  );
}
