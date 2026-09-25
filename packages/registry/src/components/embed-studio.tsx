"use client";

import "../lib/polymarket-theme.css";

import { useEffect, useMemo, useState } from "react";
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
  registryBaseUrl = "https://polymarket-ui-kit-demo.vercel.app/r",
}: {
  baseUrl?: string;
  defaultInput?: string;
  registryBaseUrl?: string;
}) {
  const [input, setInput] = useState(defaultInput);
  const [surface, setSurface] = useState<EmbedSurface>("share-card");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [attribution, setAttribution] = useState("your-product.com");
  const [previewFields, setPreviewFields] = useState({
    input: defaultInput,
    attribution: "your-product.com",
  });

  useEffect(() => {
    const timer = window.setTimeout(
      () => setPreviewFields({ input, attribution }),
      450,
    );
    return () => window.clearTimeout(timer);
  }, [input, attribution]);

  const resolved = useMemo(() => {
    try {
      const { input, attribution } = previewFields;
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
  }, [previewFields, baseUrl, registryBaseUrl, surface, theme]);

  return (
    <section className="pui-registry-panel grid gap-4 p-5">
      <div className="grid gap-2">
        <h3 className="text-2xl font-medium leading-tight">Polymarket embed studio</h3>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          aria-label="Market URL or slug"
          className="min-h-11 min-w-0 rounded-lg border pui-registry-border pui-registry-well px-3 text-sm"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
        <select
          aria-label="Surface"
          className="min-h-11 rounded-lg border pui-registry-border pui-registry-well px-3 text-sm"
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
          aria-label="Dark preview"
          aria-pressed={theme === "dark"}
          className="min-h-11 rounded-lg border pui-registry-border px-3 text-sm font-medium"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
        >
          {theme}
        </button>
      </div>

      <input
        aria-label="Attribution"
        className="min-h-11 rounded-lg border pui-registry-border pui-registry-well px-3 text-sm"
        onChange={(event) => setAttribution(event.target.value)}
        value={attribution}
      />

      {resolved.error || !resolved.outputs ? (
        <div
          className="rounded-lg border pui-registry-border pui-registry-well p-3 text-sm pui-registry-accent"
          role="alert"
        >
          {resolved.error ?? "Paste a valid Polymarket URL or slug."}
        </div>
      ) : (
        <div className="grid gap-3">
          <iframe
            className="h-[420px] w-full rounded-xl border pui-registry-border"
            src={resolved.outputs.embed}
            title={`Polymarket embed for ${resolved.slug}`}
          />
          {Object.entries(resolved.outputs).map(([label, value]) => (
            <div className="grid gap-1" key={label}>
              <span className="text-xs font-bold uppercase pui-registry-muted">
                {label}
              </span>
              <code className="overflow-auto rounded-lg border pui-registry-border pui-registry-well p-3 text-xs">
                {value}
              </code>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
