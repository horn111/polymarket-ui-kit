import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polymarket UI Kit Demo",
  description: "Live-style demo for Polymarket UI Kit components."
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-demo-theme="dark" lang="en">
      <body>
        <main className="demo-shell">{children}</main>
      </body>
    </html>
  );
}
