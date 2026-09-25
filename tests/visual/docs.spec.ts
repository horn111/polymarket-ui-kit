import { expect, test } from "@playwright/test";

test("docs homepage and navigation work without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page.getByText("Build credible market interfaces.")).toBeVisible();
  await expect(page.locator(".pui-election-brief")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("docs.png"),
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("link", { name: "Components", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("MarketCard", { exact: true })).toBeVisible();
});

test("docs routes remain reachable on mobile", async ({ page }) => {
  for (const route of ["/examples", "/registry", "/components"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBe(true);
  }
});
