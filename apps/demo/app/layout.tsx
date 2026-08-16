import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymarket UI Kit · Civic Forecast",
  description:
    "A blue-led open-source React system for sourced prediction-market interfaces.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Polymarket UI Kit · Civic Forecast",
    description: "Mechanical, source-aware market interfaces for builders.",
    type: "website",
  },
};

const DESIGN_CONTRACT = `THESIS: Probability is public information with visible proof, not a stack of crypto dashboard cards.
OWN-WORLD: Light mineral canvas, cobalt-blue fields, hairline rails, square controls, large humanist numerals, cyan live and coral negative states.
STORY: Builders see the market working, verify its context, inspect reusable components, and enter Studio.
FIRST VIEWPORT: The proposition and oversized live probability occupy the left rail; the real market, chart, and evidence share one continuous plane on the right.
FORM: Public Probability, selected direction from seed 521f094d.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md`;

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-demo-theme="light" data-pui-theme="light" lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.currentScript?.parentNode?.insertBefore(document.createComment(${JSON.stringify(DESIGN_CONTRACT)}), document.currentScript);`,
          }}
        />
        <a className="demo-skip-link" href="#main-content">
          Skip to content
        </a>
        <main className="demo-shell" id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
