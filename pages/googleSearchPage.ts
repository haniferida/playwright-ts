import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class GoogleSearchPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly luckyButton: Locator;
  private readonly resultsContainer: Locator;
  private readonly sorryPageMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator("textarea[name='q'], input[name='q']").first();
    this.searchButton = page.locator("input[name='btnK']").first();
    this.luckyButton = page.locator("input[name='btnI']").first();
    this.resultsContainer = page.locator("#search");
    this.sorryPageMessage = page.locator("text=unusual traffic").first();
  }

  async goto(): Promise<void> {
    await this.open("/");
  }

  async assertHomeLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle("Google");
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchButton).toBeAttached();
    await expect(this.luckyButton).toBeAttached();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async assertSearchNavigated(query: string): Promise<void> {
    await expect(this.page).toHaveURL(/https:\/\/www\.google\..*(search|sorry).*/);
    const currentUrl = this.page.url();
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+");

    if (new URL(currentUrl).pathname.startsWith("/search")) {
      expect(currentUrl).toContain(`q=${encodedQuery}`);
      return;
    }

    const continueParam = new URL(currentUrl).searchParams.get("continue") ?? "";
    const decodedContinue = decodeURIComponent(continueParam);
    expect(decodedContinue).toContain(`q=${encodedQuery}`);
  }

  async assertSearchOutcome(query: string): Promise<void> {
    await this.assertSearchNavigated(query);
    if (await this.resultsContainer.isVisible()) {
      await expect(this.page).toHaveTitle(/.+ - Google Search/);
      return;
    }

    await expect(this.sorryPageMessage).toBeVisible();
  }

  results(): Locator {
    return this.resultsContainer;
  }
}
