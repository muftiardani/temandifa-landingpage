import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/id");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should load and display hero section", async ({ page }) => {
    // Wait for hero section
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 15000 });

    // Check navigation exists
    await expect(page.locator("nav")).toBeVisible();

    // Check footer exists
    await expect(page.locator("footer")).toBeVisible();
  });

  test("should display TemanDifa branding", async ({ page }) => {
    // Check logo
    const logo = page.locator('img[alt*="Logo"]').first();
    await expect(logo).toBeVisible({ timeout: 10000 });

    // Check brand text exists
    const body = await page.locator("body").textContent();
    expect(body).toContain("TemanDifa");
  });

  test("should navigate to about page", async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile: Open menu first
      const menuButton = page
        .getByTestId("mobile-menu-button")
        .or(page.locator('button[aria-label*="menu"]'))
        .first();
      await menuButton.waitFor({ state: "visible", timeout: 10000 });
      await menuButton.click();
      await page.waitForTimeout(800);

      // Click mobile nav link
      const aboutLink = page
        .getByTestId("mobile-nav-about")
        .or(page.locator('a[href*="tentang"]'))
        .first();
      await aboutLink.waitFor({ state: "visible", timeout: 10000 });
      await aboutLink.click();
    } else {
      // Desktop: Click nav link directly
      const aboutLink = page
        .getByTestId("nav-about")
        .or(page.locator('a[href*="tentang"]'))
        .first();
      await aboutLink.waitFor({ state: "visible", timeout: 10000 });
      await aboutLink.click();
    }

    // Wait for navigation
    await page.waitForURL(/.*tentang/, { timeout: 20000 });
    await page.waitForLoadState("domcontentloaded");

    // Verify we're on about page
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to product page", async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile: Open menu first
      const menuButton = page
        .getByTestId("mobile-menu-button")
        .or(page.locator('button[aria-label*="menu"]'))
        .first();
      await menuButton.waitFor({ state: "visible", timeout: 10000 });
      await menuButton.click();
      await page.waitForTimeout(800);

      // Click mobile nav link
      const productLink = page
        .getByTestId("mobile-nav-features")
        .or(page.locator('a[href*="produk"]'))
        .first();
      await productLink.waitFor({ state: "visible", timeout: 10000 });
      await productLink.click();
    } else {
      // Desktop: Click nav link directly
      const productLink = page
        .getByTestId("nav-features")
        .or(page.locator('a[href*="produk"]'))
        .first();
      await productLink.waitFor({ state: "visible", timeout: 10000 });
      await productLink.click();
    }

    // Wait for navigation
    await page.waitForURL(/.*produk/, { timeout: 20000 });
    await page.waitForLoadState("domcontentloaded");

    // Verify we're on product page
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to contact page", async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile: Open menu first
      const menuButton = page
        .getByTestId("mobile-menu-button")
        .or(page.locator('button[aria-label*="menu"]'))
        .first();
      await menuButton.waitFor({ state: "visible", timeout: 10000 });
      await menuButton.click();
      await page.waitForTimeout(800);

      // Click mobile nav link
      const contactLink = page
        .getByTestId("mobile-nav-contact")
        .or(page.locator('a[href*="kontak"]'))
        .first();
      await contactLink.waitFor({ state: "visible", timeout: 10000 });
      await contactLink.click();
    } else {
      // Desktop: Click nav link directly
      const contactLink = page
        .getByTestId("nav-contact")
        .or(page.locator('a[href*="kontak"]'))
        .first();
      await contactLink.waitFor({ state: "visible", timeout: 10000 });
      await contactLink.click();
    }

    // Wait for navigation
    await page.waitForURL(/.*kontak/, { timeout: 20000 });
    await page.waitForLoadState("domcontentloaded");

    // Verify we're on contact page
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test("should display breadcrumbs on subpages", async ({ page }) => {
    // Navigate to about page
    await page.goto("http://localhost:3000/id/tentang");
    await page.waitForLoadState("domcontentloaded");

    // Check breadcrumbs exists
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  });

  test("should toggle dark mode", async ({ page }) => {
    // Find theme toggle
    const themeToggle = page.locator('button[aria-label*="mode"]').first();
    await themeToggle.waitFor({ state: "visible", timeout: 10000 });

    // Get initial theme
    const html = page.locator("html");
    const initialClass = (await html.getAttribute("class")) || "";

    // Click theme toggle
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(1500);

    // Verify theme changed
    const newClass = (await html.getAttribute("class")) || "";
    expect(newClass).not.toBe(initialClass);
  });

  test("should switch language to English", async ({ page }) => {
    // Find language switcher
    const langButton = page.locator('button[aria-label*="language"]').first();
    await langButton.waitFor({ state: "visible", timeout: 10000 });

    // Click language switcher
    await langButton.click();

    // Wait for redirect
    await page.waitForURL(/.*\/en/, { timeout: 20000 });
    await page.waitForLoadState("domcontentloaded");

    // Verify we're on English version
    expect(page.url()).toContain("/en");
  });

  test("should have proper meta tags for SEO", async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/TemanDifa/i);

    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    const descContent = await metaDescription.getAttribute("content");
    expect(descContent).toBeTruthy();
    expect(descContent!.length).toBeGreaterThan(10);
  });

  test("should display main content sections", async ({ page }) => {
    // Wait for page load
    await page.waitForLoadState("domcontentloaded");

    // Check hero section
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });

    // Check main content exists
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Scroll to load lazy content
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2)
    );
    await page.waitForTimeout(1000);

    // Check footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const footer = page.locator("footer");
    await expect(footer).toBeVisible({ timeout: 10000 });
  });
});
