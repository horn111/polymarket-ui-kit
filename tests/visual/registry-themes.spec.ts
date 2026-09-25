import { expect, test } from "@playwright/test";
import { renderRegistryFixture } from "../fixtures/render-registry";

test("delivered registry components follow attribute, class and nested theme scopes", async ({
  page,
}) => {
  const fixture = await renderRegistryFixture();
  await page.route("https://example.com/**", (route) =>
    route.fulfill({ body: "Preview" }),
  );
  await page.setContent(`<main data-pui-theme="light">${fixture.html}</main>`);
  await page.addStyleTag({ content: fixture.css });
  const panels = page.locator(".pui-registry-panel");
  await expect(panels).toHaveCount(8);
  expect(
    await page
      .locator("polyline")
      .evaluate((line: SVGPolylineElement) => line.points.numberOfItems),
  ).toBe(3);
  for (const panel of await panels.all())
    await expect(panel).toHaveCSS("color", "rgb(28, 48, 44)");
  const label = page.getByText("Market leader", { exact: true });
  await expect(label).toHaveCSS("color", "rgb(83, 102, 95)");
  await page
    .locator("main")
    .evaluate((scope) => scope.setAttribute("data-pui-theme", "dark"));
  for (const panel of await panels.all())
    await expect(panel).toHaveCSS("color", "rgb(228, 234, 227)");
  await expect(label).toHaveCSS("color", "rgb(165, 180, 173)");
  const combo = page.locator('[data-component="combo-share-card"]');
  await combo.evaluate((scope) => scope.setAttribute("data-pui-theme", "light"));
  await expect(combo.locator(".pui-registry-panel")).toHaveCSS(
    "color",
    "rgb(28, 48, 44)",
  );
  await page.locator("main").evaluate((scope) => {
    scope.removeAttribute("data-pui-theme");
    scope.className = "dark";
  });
  await expect(label).toHaveCSS("color", "rgb(165, 180, 173)");
  await page
    .locator("main")
    .evaluate((scope) => scope.setAttribute("data-pui-theme", "light"));
  await expect(label).toHaveCSS("color", "rgb(83, 102, 95)");
});
