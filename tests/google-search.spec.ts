import { expect, test } from "@playwright/test";
import { GoogleSearchPage } from "../pages/googleSearchPage";

test.describe("Google Search", () => {
  test("should search and load expected destination", async ({ page }) => {
    const googleSearchPage = new GoogleSearchPage(page);
    const query = "Playwright TypeScript";

    await googleSearchPage.goto();
    await googleSearchPage.assertHomeLoaded();
    await googleSearchPage.search(query);
    await googleSearchPage.assertSearchOutcome(query);

    if (await googleSearchPage.results().isVisible()) {
      await expect(googleSearchPage.results()).toContainText("Playwright");
    }
  });
});
