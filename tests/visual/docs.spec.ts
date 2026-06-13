import { expect, test } from "@playwright/test";

test("docs homepage renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Build Polymarket interfaces in minutes.")).toBeVisible();
});

test("demo market card route renders", async ({ page }) => {
  await page.goto("/market/sample");
  await expect(page.getByText("Trade preview")).toBeVisible();
});

