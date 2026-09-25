import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import {
  fixtureComboLegs,
  fixtureMarket,
  fixtureOrderbook,
  fixturePoints,
} from "./market";

/** Render the delivered registry source without a framework's CSS import loader. */
export async function renderRegistryFixture() {
  const registry = JSON.parse(
    await readFile("packages/registry/dist/registry.json", "utf8"),
  ) as {
    items: Array<{ name: string; files: Array<{ target: string; content: string }> }>;
  };
  await mkdir(resolve(".cache"), { recursive: true });
  const root = await mkdtemp(resolve(".cache/registry-browser-"));
  const core = pathToFileURL(resolve("packages/core/dist/index.js")).href;
  const props = {
    market: fixtureMarket,
    points: fixturePoints,
    orderbook: fixtureOrderbook,
    legs: fixtureComboLegs,
    rows: [{ id: "yes", label: "Yes", pollShare: 0.5, marketProbability: 0.64 }],
    items: [
      {
        id: "official",
        title: "Election calendar",
        publisher: "Election board",
        kind: "official",
      },
    ],
    defaultInput: "sample",
    baseUrl: "https://example.com",
  };
  let html = "";
  let css = "";
  for (const item of registry.items) {
    for (const file of item.files) {
      if (file.target.endsWith(".css")) {
        css = file.content;
        continue;
      }
      const output = resolve(root, file.target.replace(/\.tsx?$/, ".js"));
      const source = file.content
        .replace(/import\s+["'][^"']+\.css["'];?/g, "")
        .replaceAll('"@polymarket-ui-kit/core"', JSON.stringify(core))
        .replace(/(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g, "$1$2.js$3");
      await mkdir(dirname(output), { recursive: true });
      await writeFile(
        output,
        ts.transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
            jsx: ts.JsxEmit.ReactJSX,
          },
        }).outputText,
      );
    }
    const entry = resolve(root, item.files[0]!.target.replace(/\.tsx?$/, ".js"));
    const exports = (await import(pathToFileURL(entry).href)) as Record<
      string,
      ComponentType<Record<string, unknown>>
    >;
    const component = Object.values(exports)[0]!;
    html += `<div data-component="${item.name}">${renderToStaticMarkup(createElement(component, props))}</div>`;
  }
  return { html, css };
}
