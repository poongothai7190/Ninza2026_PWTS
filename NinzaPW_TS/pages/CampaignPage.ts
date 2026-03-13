import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CampaignPage extends BasePage {
  readonly selectCampaignButton: Locator;
  readonly campaignTabLink: Locator;
  readonly createCampaignButton: Locator;
  readonly campaignName: Locator;
  readonly campaignStatus: Locator;
  readonly targetSize: Locator;
  readonly clickCalender: Locator;
  readonly blueCreateCampaignButton: Locator;
  readonly rowCampaignNameInList: Locator;
  readonly cellCampaignNameInList: Locator;
  readonly selectCampaignButtonContacts: Locator;

  constructor(page: Page) {
    super(page);
    this.selectCampaignButton = page.locator(
      "tr:first-child button.select-btn",
    );
    this.selectCampaignButtonContacts = page.locator(
      "tr:nth-child(2) button.select-btn",
    );

    this.campaignTabLink = page.getByRole("link", { name: "Campaigns" });
    this.createCampaignButton = page.getByRole("button", {
      name: "Create Campaign",
    });
    this.campaignName = page.locator("input[name='campaignName']");
    this.campaignStatus = page.locator("input[name='campaignStatus']");
    this.targetSize = page.locator("input[name='targetSize']");
    this.clickCalender = page.locator("input[name='expectedCloseDate']");
    this.blueCreateCampaignButton = page.getByRole("button", {
      name: "Create Campaign",
    });
    this.rowCampaignNameInList = page
      .locator(".table.table-striped.table-hover tbody tr")
      .nth(0);
    this.cellCampaignNameInList = this.rowCampaignNameInList
      .locator("td")
      .nth(1);
  }

  async validateNewCampaign(expectedCampaignName: string): Promise<void> {
    await this.cellCampaignNameInList.waitFor({ state: "visible" });
    const actualCampaignName: string | null =
      await this.cellCampaignNameInList.textContent();
    expect(actualCampaignName?.trim()).toBe(expectedCampaignName);
  }

  async clickBlueCreateCampaignButton(): Promise<void> {
    await this.blueCreateCampaignButton.click();
  }

  async clickCalenderButton(): Promise<void> {
    await this.clickCalender.fill(await this.getFuturedate());
  }
  async enterCampaignName(name: string): Promise<void> {
    console.log("Campaign Name: ", name);
    await this.campaignName.fill(name);
  }
  async enterCampaignStatus(status: string): Promise<void> {
    await this.campaignStatus.fill(status);
  }
  async enterTargetSize(size: string): Promise<void> {
    await this.targetSize.fill(size);
  }
  async clickCreateCampaignButton(): Promise<void> {
    await this.createCampaignButton.click();
  }
  async clickCampaignTab(): Promise<void> {
    await this.campaignTabLink.waitFor({ state: "visible" });
    await this.campaignTabLink.click();
  }

  async clickSelectCampaign(): Promise<void> {
    await this.selectCampaignButton.waitFor({ state: "visible" });
    await this.selectCampaignButton.click();
  }

  async selectCampaignContacts(): Promise<void> {
    await this.selectCampaignButtonContacts.waitFor({ state: "visible" });
    await this.selectCampaignButtonContacts.click();
  }
}
