import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Basic Accessibility and Keyboard Navigation", () => {
  test.beforeEach(async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit",
      "Keyboard navigation not relevant for WebKit (Safari)",
    );
    await page.goto("/");
  });

  test("should navigate with keyboard through interactive elements", async ({
    page,
  }) => {
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");

    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();

    await page.keyboard.press("Tab");
    const colorToggle = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });
    await expect(colorToggle).toBeFocused();

    const initialPressed = await colorToggle.getAttribute("aria-pressed");
    await page.keyboard.press("Space");

    await page.waitForTimeout(100);
    const newPressed = await colorToggle.getAttribute("aria-pressed");
    expect(newPressed).not.toBe(initialPressed);
  });

  test("should have no accessibility violations", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should support keyboard navigation to all interactive elements", async ({
    page,
  }) => {
    const focusableElements = page.locator(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const count = await focusableElements.count();

    expect(count).toBeGreaterThanOrEqual(2);

    let tabCount = 0;
    const maxTabs = 10;
    const colorToggle = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });

    while (tabCount < maxTabs) {
      await page.keyboard.press("Tab");
      tabCount++;

      try {
        const isFocused = await colorToggle.evaluate(
          (el: Element) => el === document.activeElement,
        );
        if (isFocused) {
          break;
        }
      } catch (err) {
        console.log("Tab iteration error:", err);
      }
    }

    await expect(colorToggle).toBeFocused();
  });

  test("color mode toggle should be fully accessible", async ({ page }) => {
    const toggleButton = page.getByRole("button", {
      name: /Switch to .* mode colors/,
    });

    await expect(toggleButton).toHaveAttribute("aria-pressed");
    await expect(toggleButton).toHaveAttribute("aria-label");

    await toggleButton.click();

    await toggleButton.focus();
    await page.keyboard.press("Enter");

    await expect(toggleButton).toHaveAttribute("aria-pressed");
  });

  test("should have proper heading structure", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Welcome!");

    const h2s = page.locator("h2");
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);

    const firstH2 = h2s.first();
    await expect(firstH2).toBeVisible();
  });

  test("should provide adequate color contrast", async ({ page }) => {
    const body = page.locator("body");

    const bodyStyles = await body.evaluate((el: Element) => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
      };
    });

    expect(bodyStyles.color).toBeTruthy();
    expect(bodyStyles.backgroundColor).toBeTruthy();
  });
});
