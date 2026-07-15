"use client";

import { useMemo, useState } from "react";
import {
  buildEmbedUrl,
  buildIframeSnippet,
  buildReactSnippet,
  buildRegistryCommand,
  buildShareImageUrl,
  PolymarketEmbedError,
  resolvePolymarketSlug,
  type EmbedSurface,
} from "@polymarket-ui-kit/core";

const surfaces: Array<{ label: string; value: EmbedSurface }> = [
  { label: "Share card", value: "share-card" },
  { label: "Market card", value: "market-card" },
  { label: "Builder disclosure", value: "builder-disclosure" },
];

export function EmbedStudio({
  baseUrl = "",
  defaultInput = "https://polymarket.com/event/who-will-win-the-2028-us-presidential-election",
  registryBaseUrl = "https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r",
}: {
  baseUrl?: string;
  defaultInput?: string;
  registryBaseUrl?: string;
}) {
  const [input, setInput] = useState(defaultInput);
  const [surface, setSurface] = useState<EmbedSurface>("share-card");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [attribution, setAttribution] = useState("your-product.com");

  const resolved = useMemo(() => {
    try {
      const slug = resolvePolymarketSlug(input);
      const common = {
        baseUrl,
        slug,
        surface,
        theme,
        ...(attribution ? { attribution } : {}),
      };

      return {
        error: null,
        slug,
        outputs: {
          embed: buildEmbedUrl(common),
          iframe: buildIframeSnippet(common),
          png: buildShareImageUrl({
            baseUrl,
            format: "png",
            slug,
            theme,
            ...(attribution ? { attribution } : {}),
          }),
          react: buildReactSnippet({ slug, surface }),
          registry: buildRegistryCommand({ item: "embed-studio", registryBaseUrl }),
          svg: buildShareImageUrl({
            baseUrl,
            format: "svg",
            slug,
            theme,
            ...(attribution ? { attribution } : {}),
          }),
        },
      };
    } catch (error) {
      return {
        error:
          error instanceof PolymarketEmbedError
            ? error.message
            : "Paste a valid Polymarket URL or slug.",
        outputs: null,
        slug: null,
      };
    }
  }, [attribution, baseUrl, input, registryBaseUrl, surface, theme]);

  return (
    <section className="grid gap-5 rounded-md border border-border/70 bg-gradient-to-br from-background via-muted/20 to-background p-5 shadow-2xl">
      <div className="grid gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
          Polymarket embed studio
        </span>
        <h3 className="text-3xl font-black leading-[1.05] tracking-[-0.045em]">
          Calibrate once. Publish everywhere.
        </h3>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          className="min-h-11 rounded-sm border border-border/70 bg-background px-3 text-sm"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
        <select
          className="min-h-11 rounded-sm border border-border/70 bg-background px-3 text-sm"
          onChange={(event) => setSurface(event.target.value as EmbedSurface)}
          value={surface}
        >
          {surfaces.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <button
          className="min-h-11 rounded-sm border border-border/70 px-3 font-mono text-xs font-bold uppercase tracking-[0.08em]"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
        >
          {theme}
        </button>
      </div>

      <input
        className="min-h-11 rounded-sm border border-border/70 bg-background px-3 text-sm"
        onChange={(event) => setAttribution(event.target.value)}
        value={attribution}
      />

      {resolved.error || !resolved.outputs ? (
        <div className="rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm font-semibold text-destructive">
          {resolved.error ?? "Paste a valid Polymarket URL or slug."}
        </div>
      ) : (
        <div className="grid gap-3">
          <iframe
            className="h-[420px] w-full rounded-sm border border-border/70"
            src={resolved.outputs.embed}
            title={`Polymarket embed for ${resolved.slug}`}
          />
          {Object.entries(resolved.outputs).map(([label, value]) => (
            <div className="grid gap-1" key={label}>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {label}
              </span>
              <code className="overflow-auto rounded-sm border border-border/70 bg-muted p-3 text-xs">
                {value}
              </code>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
