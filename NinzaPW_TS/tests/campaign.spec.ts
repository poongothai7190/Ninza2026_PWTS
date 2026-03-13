import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CampaignPage } from "../pages/CampaignPage";
import { getCampaignData } from "../utils/dataHelper";

test("TC01--Verify the Campaign page", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const lp = new LoginPage(page);
  const campaignPage = new CampaignPage(page);
  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await campaignPage.clickCampaignTab();
  console.log(page.url());
  await campaignPage.validatePageUrl("campaigns");
});

test("TC02-Create new Campaign", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const lp = new LoginPage(page);
  const campaignPage = new CampaignPage(page);
  const campaignData = getCampaignData();
  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await campaignPage.clickCampaignTab();
  await campaignPage.clickCreateCampaignButton();
  await campaignPage.enterCampaignName(campaignData.campaignName);
  await campaignPage.enterCampaignStatus(campaignData.campaignStatus);
  await campaignPage.enterTargetSize(campaignData.targetSize);
  await campaignPage.clickCalenderButton();
  await campaignPage.clickBlueCreateCampaignButton();
  await campaignPage.validateNewCampaign(campaignData.campaignName);
});
