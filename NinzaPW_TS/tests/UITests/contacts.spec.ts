import { test } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

import { LoginPage } from "../../pages/LoginPage";
import { CampaignPage } from "../../pages/CampaignPage";
//import { getContactsData } from "../utils/dataHelper";
import { ContactsPage } from "../../pages/ContactsPage";
import { FakerHelper } from "../../utils/fakerHelper";

test("TC01--Verify the contacts page", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const lp = new LoginPage(page);
  const contactsPage = new ContactsPage(page);

  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await contactsPage.clickContactsLink();
  console.log(page.url());
  await contactsPage.validatePageUrl("contacts");
});

test("TC02--click create contact ", async ({ page }) => {
  const lp = new LoginPage(page);
  const contactsPage = new ContactsPage(page);
  const leadsPage = new ContactsPage(page);
  const contactsData = FakerHelper.getContactsData();
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;

  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await contactsPage.clickContactsLink();
  await contactsPage.clickCreatecontacts();
  await contactsPage.fillOrganizationName(contactsData.contactsOrganization);
  console.log("contactsOrganization: ", contactsData.contactsOrganization);
  await contactsPage.fillTitle(contactsData.contactsTitle);
  console.log("contactsTitle: ", contactsData.contactsTitle);
  await contactsPage.fillDepartment(contactsData.contactsDepartment);
  console.log("contactsDepartment: ", contactsData.contactsDepartment);
  await contactsPage.fillOfficePhone(contactsData.contactsOfficePhone);
  console.log("contactsOfficePhone: ", contactsData.contactsOfficePhone);
  await contactsPage.fillContactName(contactsData.contactsContactName);
  console.log("contactsContactName: ", contactsData.contactsContactName);
  await contactsPage.fillMobile(contactsData.contactsMobile);
  console.log("contactsMobile: ", contactsData.contactsMobile);
  await contactsPage.fillEmail(contactsData.contactsEmail);
  console.log("contactsEmail: ", contactsData.contactsEmail);

  const newPage = await contactsPage.clickCampaignAndSwitchPage(); //new page open
  const campaignPage = new CampaignPage(newPage);
  campaignPage.selectCampaignContacts();
  await contactsPage.clickBlueCreateContactsButton();
  await contactsPage.validateNewContact(contactsData.contactsContactName);
});
