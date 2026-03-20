import { test } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

import { LoginPage } from "../../pages/LoginPage";
import { LeadsPage } from "../../pages/LeadPage";
import { CampaignPage } from "../../pages/CampaignPage";
//import { getLeadData } from "../utils/dataHelper";
import { FakerHelper } from "../../utils/fakerHelper";

test("TC01--Verify the leads page", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const lp = new LoginPage(page);
  const leadsPage = new LeadsPage(page);

  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await leadsPage.clickLeadsTab();
  console.log(page.url());
  await leadsPage.validatePageUrl("leads");
});

test.only("TC02- create new lead", async ({ page }) => {
  const lp = new LoginPage(page);
  const leadsPage = new LeadsPage(page);
  const leadData = FakerHelper.getLeadData();
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await leadsPage.clickLeadsTab();
  await leadsPage.clickCreateLead();
  await leadsPage.enterLeadName(leadData.leadName);
  await leadsPage.enterCompanyName(leadData.companyName);
  await leadsPage.enterLeadSource(leadData.leadSource);
  await leadsPage.enterIndustry(leadData.industry);
  await leadsPage.enterPhone(leadData.phone);
  await leadsPage.enterEmail(leadData.email);
  await leadsPage.enterLeadStatus(leadData.leadStatus);
  await leadsPage.enterAssignedTo(leadData.assignedTo);

  const newPage = await leadsPage.clickAddCampaign(); //new page open
  const campaignPage = new CampaignPage(newPage);
  await campaignPage.clickSelectCampaign();
  await leadsPage.clickGrayCreateLeadButton();
  await leadsPage.validateNewLead(leadData.leadName);
});
