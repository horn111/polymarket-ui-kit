"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildEmbedUrl,
  buildShareImageUrl,
  PolymarketEmbedError,
  resolvePolymarketSlug,
  type EmbedSurface,
  type ShareImageTheme,
} from "@polymarket-ui-kit/core";
import { EmbedSnippetPanel } from "@polymarket-ui-kit/react";
import { RouteThemeSync } from "../components/RouteThemeSync";
import { BrandMark } from "../../../shared/BrandMark";

type OutputMode = "embed" | "og-png" | "og-svg";

const defaultInput = "sample";

const surfaces: Array<{ label: string; value: EmbedSurface }> = [
  { label: "Share card", value: "share-card" },
  { label: "Market card", value: "market-card" },
  { label: "Builder disclosure", value: "builder-disclosure" },
];

const outputModes: Array<{ label: string; value: OutputMode }> = [
  { label: "Embed", value: "embed" },
  { label: "OG PNG", value: "og-png" },
  { label: "OG SVG", value: "og-svg" },
];

function PreviewFrame({ src, title }: { src: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(530);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    let observer: ResizeObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      const document = element.contentDocument;
      const surface = document?.querySelector(".civic-embed-surface") ?? document?.body;
      if (!surface) return;
      const measure = () =>
        setHeight(
          Math.max(
            240,
            Math.ceil(
              surface.getBoundingClientRect().bottom +
                (element.contentWindow?.scrollY ?? 0) +
                20,
            ),
          ),
        );
      observer = new ResizeObserver(measure);
      observer.observe(surface);
      measure();
    };
    element.addEventListener("load", observe);
    observe();
    return () => {
      element.removeEventListener("load", observe);
      observer?.disconnect();
    };
  }, [src]);

  return <iframe ref={frame} src={src} title={title} style={{ height }} />;
}

export function StudioClient() {
  const [attribution, setAttribution] = useState("pui-kit/demo");
  const [builderCode, setBuilderCode] = useState("");
  const [input, setInput] = useState(defaultInput);
  const [origin, setOrigin] = useState("");
  const [outputMode, setOutputMode] = useState<OutputMode>("embed");
  const [surface, setSurface] = useState<EmbedSurface>("share-card");
  const [theme, setTheme] = useState<ShareImageTheme>("dark");
  const [previewFields, setPreviewFields] = useState({
    input: defaultInput,
    attribution: "pui-kit/demo",
    builderCode: "",
  });
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setPreviewFields({ input, attribution, builderCode }),
      450,
    );
    return () => window.clearTimeout(timer);
  }, [input, attribution, builderCode]);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const resolved = useMemo(() => {
    try {
      const { input, attribution, builderCode } = previewFields;
      const slug = resolvePolymarketSlug(input);
      const common = {
        baseUrl: origin,
        slug,
        surface,
        theme,
        ...(attribution ? { attribution } : {}),
        ...(builderCode ? { builderCode } : {}),
      };

      return {
        embedUrl: buildEmbedUrl(common),
        error: null,
        ogPngUrl: buildShareImageUrl({
          baseUrl: origin,
          format: "png",
          slug,
          theme,
          ...(attribution ? { attribution } : {}),
        }),
        ogSvgUrl: buildShareImageUrl({
          baseUrl: origin,
          format: "svg",
          slug,
          theme,
          ...(attribution ? { attribution } : {}),
        }),
        slug,
      };
    } catch (error) {
      return {
        embedUrl: "",
        error:
          error instanceof PolymarketEmbedError
            ? error.message
            : "Paste a valid Polymarket URL or slug.",
        ogPngUrl: "",
        ogSvgUrl: "",
        slug: null,
      };
    }
  }, [previewFields, origin, surface, theme]);

  const previewUrl =
    outputMode === "og-png"
      ? resolved.ogPngUrl
      : outputMode === "og-svg"
        ? resolved.ogSvgUrl
        : resolved.embedUrl;

  useEffect(() => setImageFailed(false), [previewUrl]);

  return (
    <>
      <RouteThemeSync theme={theme} />
      <nav className="civic-breadcrumb" aria-label="Breadcrumb">
        <a className="civic-brand" href="/">
          <BrandMark />
          <strong>Civic Forecast</strong>
        </a>
        <span>Embed Studio</span>
      </nav>
      <section className="demo-studio" aria-labelledby="studio-title">
        <header className="demo-studio__hero">
          <div>
            <h1 id="studio-title">
              Prepare a market
              <br />
              for publication.
            </h1>
            <p>
              Turn a Polymarket URL into a live iframe, React snippet, source-aware
              share image, and registry command without adding order placement.
            </p>
          </div>
        </header>

        <div className="demo-studio__controls" aria-label="Embed controls">
          <label>
            Market URL or slug
            <input
              aria-describedby="market-input-help"
              spellCheck={false}
              autoComplete="off"
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
            <small id="market-input-help">
              “sample” uses illustrative data. Paste a market URL for public data.
            </small>
          </label>
          <label>
            Surface
            <select
              onChange={(event) => setSurface(event.target.value as EmbedSurface)}
              value={surface}
            >
              {surfaces.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Attribution
            <input
              onChange={(event) => setAttribution(event.target.value)}
              value={attribution}
            />
          </label>
          <label>
            Public builder code (optional)
            <input
              onChange={(event) => setBuilderCode(event.target.value)}
              value={builderCode}
              placeholder="0x…"
            />
          </label>
        </div>

        <div className="demo-studio__switchboard">
          <div className="demo-studio__theme" role="group" aria-label="Theme">
            {(["light", "dark"] as ShareImageTheme[]).map((item) => (
              <button
                aria-pressed={theme === item}
                data-active={theme === item ? "true" : undefined}
                key={item}
                onClick={() => setTheme(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="demo-studio__theme" role="group" aria-label="Output type">
            {outputModes.map((item) => (
              <button
                aria-pressed={outputMode === item.value}
                data-active={outputMode === item.value ? "true" : undefined}
                key={item.value}
                onClick={() => setOutputMode(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-studio__workspace">
          <div className="demo-studio__preview">
            <div className="demo-studio__preview-label">
              <strong>Preview</strong>
              {!resolved.error ? (
                <a href={previewUrl} target="_blank" rel="noreferrer">
                  Open preview
                </a>
              ) : null}
            </div>
            {resolved.error ? (
              <div className="demo-studio__error" role="alert">
                {resolved.error}
              </div>
            ) : imageFailed ? (
              <div className="demo-studio__error" role="alert">
                Image unavailable. Check the market URL or choose Embed to see the
                market status.
              </div>
            ) : outputMode === "embed" ? (
              <PreviewFrame
                key={previewUrl}
                src={previewUrl}
                title={`Polymarket embed for ${resolved.slug}`}
              />
            ) : (
              <img
                alt={`Share export for ${resolved.slug}`}
                src={previewUrl}
                width={1200}
                height={630}
                onError={() => setImageFailed(true)}
              />
            )}
          </div>

          <EmbedSnippetPanel
            attribution={previewFields.attribution}
            baseUrl={origin}
            className="demo-studio__outputs"
            input={previewFields.input}
            surface={surface}
            theme={theme}
            {...(previewFields.builderCode
              ? { builderCode: previewFields.builderCode }
              : {})}
            {...(origin ? { registryBaseUrl: `${origin}/r` } : {})}
          />
        </div>
      </section>
    </>
  );
}
