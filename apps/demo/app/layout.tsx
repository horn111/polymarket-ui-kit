import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymarket UI Kit · Civic Forecast",
  description:
    "A premium open-source React instrument for sourced prediction-market interfaces.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Polymarket UI Kit · Civic Forecast",
    description: "Mechanical, source-aware market interfaces for builders.",
    type: "website",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-demo-theme="dark" data-pui-theme="dark" lang="en">
      <body>
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
