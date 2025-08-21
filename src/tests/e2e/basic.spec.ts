import { test, expect } from "@playwright/test";

test.describe("Basic E2E Test", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Welcome!" })).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Skip to main content" }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: /Switch to .* mode colors/ }),
    ).toBeVisible();
  });

  test("basic keyboard navigation works", async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit",
      "Keyboard navigation not relevant for WebKit (Safari)",
    );

    await page.goto("/");

    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");

    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();
  });
});
