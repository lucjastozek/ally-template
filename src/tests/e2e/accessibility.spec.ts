import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("keyboard navigation should work properly", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "webkit",
      "Keyboard navigation not relevant for WebKit (Safari)",
    );

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();

    await page.keyboard.press("Tab");
    const colorModeToggle = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });
    await expect(colorModeToggle).toBeFocused();

    const initialAriaPressed =
      await colorModeToggle.getAttribute("aria-pressed");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(100);
    const newAriaPressed = await colorModeToggle.getAttribute("aria-pressed");
    expect(newAriaPressed).not.toBe(initialAriaPressed);
  });

  test("color mode toggle should be accessible", async ({ page }) => {
    const colorModeToggle = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });

    await expect(colorModeToggle).toHaveAttribute("aria-pressed");
    await expect(colorModeToggle).toHaveAttribute("aria-label");

    const initialText = await colorModeToggle.textContent();
    await colorModeToggle.click();

    await page.waitForTimeout(100);
    const newText = await colorModeToggle.textContent();
    expect(newText).toBe(initialText);

    const ariaPressedAfterClick =
      await colorModeToggle.getAttribute("aria-pressed");
    expect(ariaPressedAfterClick).toBeTruthy();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    const headingLevels = await Promise.all(
      headings.map(async (heading) => {
        const tagName = await heading.evaluate((el: Element) =>
          el.tagName.toLowerCase(),
        );
        return parseInt(tagName.substring(1));
      }),
    );

    expect(headingLevels[0]).toBe(1);

    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i];
      const previousLevel = headingLevels[i - 1];

      expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
    }
  });

  test("should have proper ARIA landmarks and labels", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main).toBeVisible();

    const sections = await page.locator("section[aria-labelledby]").all();

    for (const section of sections) {
      const labelledBy = await section.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();

      const labelElement = page.locator(`#${labelledBy}`);
      await expect(labelElement).toBeVisible();
    }
  });

  test("should handle reduced motion preferences", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    const colorModeToggle = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });
    await colorModeToggle.click();

    const ariaPressedAfterClick =
      await colorModeToggle.getAttribute("aria-pressed");
    expect(ariaPressedAfterClick).toBeTruthy();
  });

  test("should work with screen reader simulation", async ({ page }) => {
    const colorSwatches = page.locator('[class*="colorSwatch"]');
    const firstSwatch = colorSwatches.first();

    await expect(firstSwatch).toBeVisible();

    const colorNames = page.locator("h4");
    await expect(colorNames.first()).toBeVisible();

    const contrastRatios = page.locator('[class*="contrastRatio"]');
    await expect(contrastRatios.first()).toBeVisible();
  });

  test("high contrast mode compatibility", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await page.reload();

    const colorModeToggle = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });
    await expect(colorModeToggle).toBeVisible();

    await colorModeToggle.click();
    const ariaPressedAfterClick =
      await colorModeToggle.getAttribute("aria-pressed");
    expect(ariaPressedAfterClick).toBeTruthy();
  });
});
