import { expect, test, type Locator } from "@playwright/test";
import { writeFile } from "node:fs/promises";

async function expectTouchTarget(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);
}

test("home, themes and lab keyboard navigation", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Market prices.Public context.",
  );
  await expect(
    page.getByText("Illustrative market · sample data", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-pui-theme", "dark");
  await page.getByRole("button", { name: /^light$/i }).click();
  const briefing = page.locator(".pui-election-brief");
  await expect(briefing).toContainText(
    "Vote share and chance of winning answer different questions.",
  );
  await briefing.locator("summary").click();
  await expectTouchTarget(briefing.locator("summary"));
  await expectTouchTarget(page.getByRole("button", { name: /^light$/i }));
  await expect(briefing.getByText("Election certification calendar")).toBeVisible();
  await briefing.locator("summary").click();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, 0);
  });
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("home-light.png"),
    fullPage: true,
    scale: "css",
  });
  await page.screenshot({
    path: testInfo.outputPath("home-viewport.png"),
    scale: "css",
  });
  await page.getByRole("button", { name: /^dark$/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-pui-theme", "dark");
  await page.screenshot({
    path: testInfo.outputPath("home-dark.png"),
    fullPage: true,
    scale: "css",
  });
  await page.screenshot({
    path: testInfo.outputPath("home-dark-viewport.png"),
    scale: "css",
  });
  const market = page.getByRole("tab", { name: "Market", exact: true });
  await market.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Evidence", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Evidence & sources");
  await page
    .locator(".civic-lab__workspace")
    .screenshot({ path: testInfo.outputPath("lab-evidence.png"), scale: "css" });
  await page.getByRole("tab", { name: "States", exact: true }).click();
  await page.getByRole("button", { name: "error", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "error", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "live", exact: true })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(
    page.getByText("Market data unavailable", { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("component dial drags, snaps and retains keyboard access", async ({
  page,
}, testInfo) => {
  await page.goto("/#lab");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const track = page.getByTestId("preview-rail-track");
  await track.scrollIntoViewIfNeeded();
  const tabs = page.getByRole("tablist", { name: "Component preview" });
  const horizontal = (await tabs.getAttribute("aria-orientation")) === "horizontal";
  const box = (await track.boundingBox())!;
  const length = horizontal ? box.width : box.height;
  const point = (index: number) => ({
    x: box.x + (horizontal ? 28 + (index / 8) * (length - 56) : 48),
    y: box.y + (horizontal ? 48 : 28 + (index / 8) * (length - 56)),
  });
  const start = point(0),
    share = point(3);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(share.x, share.y, { steps: 12 });
  await page.mouse.up();
  await expect(page.getByRole("tab", { name: "Share", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel").locator(".pui-share-card")).toBeVisible();
  await expect(page.locator(".civic-lab__snippet")).toContainText("<ShareCard");
  await expect(page.locator(".civic-selector")).not.toHaveAttribute("data-dragging");
  await page
    .locator(".civic-lab__workspace")
    .screenshot({ path: testInfo.outputPath("lab-dial.png"), scale: "css" });
  await page.getByRole("tab", { name: "Share", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "States", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: "Market", exact: true })).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tabpanel")).toContainText("Evidence & sources");
  if (horizontal) {
    await track.scrollIntoViewIfNeeded();
    const touchBox = (await track.boundingBox())!;
    const cdp = await page.context().newCDPSession(page);
    const touchAt = (index: number) => ({
      x: touchBox.x + 28 + (index / 8) * (touchBox.width - 56),
      y: touchBox.y + 48,
      id: 1,
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [touchAt(1)],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [touchAt(2)],
    });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(
      page.getByRole("tab", { name: "Poll comparison", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    await cdp.detach();
    await expect(page.getByRole("tabpanel").getByRole("columnheader")).toHaveCount(3);
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
});

test("Studio preview, theme, validation and output tabs", async ({
  page,
}, testInfo) => {
  await page.goto("/studio");
  await expect(
    page.frameLocator("iframe").getByText("Sample data", { exact: true }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page.locator("iframe").evaluate((frame: HTMLIFrameElement) => {
        const card = frame.contentDocument?.querySelector(".pui-share-card");
        return Boolean(
          card && card.getBoundingClientRect().bottom <= frame.clientHeight,
        );
      }),
    )
    .toBe(true);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("studio.png"),
    fullPage: true,
    scale: "css",
  });
  await page
    .getByRole("group", { name: "Theme", exact: true })
    .getByRole("button", { name: "dark", exact: true })
    .click();
  await expect(page.locator("iframe")).toHaveAttribute("src", /theme=dark/);
  await expectTouchTarget(page.getByRole("button", { name: "Copy", exact: true }));
  await expectTouchTarget(
    page.getByRole("link", { name: "Open preview", exact: true }),
  );
  const frames: string[] = [];
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.url().includes("/embed/"))
      frames.push(request.url());
  });
  const attribution = page.getByRole("textbox", { name: "Attribution", exact: true });
  await attribution.focus();
  await attribution.press("End");
  await attribution.pressSequentially("-updated", { delay: 40 });
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /attribution=pui-kit%2Fdemo-updated/,
  );
  await expect(page.getByRole("tabpanel")).toContainText(
    "attribution=pui-kit%2Fdemo-updated",
  );
  expect(frames).toHaveLength(1);
  frames.length = 0;
  await page
    .getByRole("textbox", { name: "Public builder code (optional)", exact: true })
    .pressSequentially("0xabc", { delay: 40 });
  await expect(page.locator("iframe")).toHaveAttribute("src", /builderCode=0xabc/);
  expect(frames).toHaveLength(1);
  await page.getByRole("tab", { name: "React", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("@polymarket-ui-kit/react");
  await page
    .getByRole("textbox", { name: /^Market URL or slug/ })
    .fill("https://example.com/not-polymarket");
  await expect(page.getByRole("alert").first()).toContainText("Only polymarket.com");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("sample market and embed disclose provenance", async ({ page }, testInfo) => {
  await page.goto("/market/sample?theme=light");
  await expect(page.getByText("Trade preview", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByText("Preview only. No order will be submitted."),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Continue with/ })).toHaveCount(0);
  await expect(page.locator(".pui-trade-drawer")).toHaveCSS("position", "static");
  await expectTouchTarget(page.getByRole("spinbutton", { name: "Notional" }));
  await expectTouchTarget(
    page.getByRole("group", { name: "Market outcomes" }).getByRole("button").first(),
  );
  await page.screenshot({
    path: testInfo.outputPath("market-light.png"),
    animations: "disabled",
    fullPage: true,
    scale: "css",
  });
  await expect(
    page.getByText("Illustrative market · sample data", { exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
  await page.goto("/embed/sample?theme=dark");
  await expect(page.getByText("Sample data", { exact: true })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-pui-theme", "dark");
});

test("registry delivers installable source and missing items return 404", async ({
  request,
}) => {
  const index = await (await request.get("/registry.json")).json();
  expect(index.items).toHaveLength(8);
  for (const item of index.items) {
    const response = await request.get(`/r/${item.name}.json`);
    expect(response.status()).toBe(200);
    const result = await response.json();
    for (const file of result.files) expect(file.content.length).toBeGreaterThan(0);
  }
  expect((await request.get("/r/missing.json")).status()).toBe(404);
});

test("sample image exports have correct media types", async ({ request }, testInfo) => {
  const svg = await request.get("/api/og?slug=sample&theme=light&format=svg");
  expect(svg.status()).toBe(200);
  expect(svg.headers()["content-type"]).toContain("image/svg+xml");
  expect(await svg.text()).toContain("Sample data");
  const png = await request.get("/api/og?slug=sample&theme=dark&format=png");
  expect(png.status()).toBe(200);
  expect(png.headers()["content-type"]).toContain("image/png");
  expect((await png.body()).subarray(1, 4).toString()).toBe("PNG");
  await writeFile(testInfo.outputPath("og-dark.png"), await png.body());
});
