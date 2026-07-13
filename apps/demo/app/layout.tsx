import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civic Forecast · Polymarket UI Kit",
  description:
    "Evidence-first React components and distribution surfaces for Polymarket builders.",
  openGraph: {
    title: "Civic Forecast · Polymarket UI Kit",
    description: "Politics-first, source-aware market interface primitives.",
    type: "website",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-demo-theme="light" data-pui-theme="light" lang="en">
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
