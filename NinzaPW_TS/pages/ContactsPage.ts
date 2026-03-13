import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContactsPage extends BasePage {
  readonly contactsLink: Locator;
  readonly createContactbtn: Locator;
  readonly txtOrganization: Locator;
  readonly txtTitle: Locator;
  readonly txtDepartment: Locator;
  readonly txtOfficePhone: Locator;
  readonly txtContactName: Locator;
  readonly txtMobile: Locator;
  readonly txtEmail: Locator;
  readonly btnCreateContact: Locator;
  readonly addCampaign: Locator;
  // readonly rowContactNameInList: Locator;
  readonly cellContactsNameInList: Locator;

  constructor(page: Page) {
    super(page);
    this.contactsLink = page.locator('a[href="/contacts"]');
    this.createContactbtn = page.getByRole("button", {
      name: /create contact/i,
    });
    this.txtOrganization = page.locator('input[name="organizationName"]');
    this.txtTitle = page.locator('input[name="title"]');
    this.txtDepartment = page.locator('input[name="department"]');
    this.txtOfficePhone = page.locator('input[name="officePhone"]');
    this.txtContactName = page.locator('input[name="contactName"]');
    this.txtMobile = page.locator('input[name="mobile"]');
    this.txtEmail = page.locator('input[name="email"]');
    this.addCampaign = page.locator('button[style*="background-color: green"]');
    // this.rowContactNameInList = page
    //   .locator(".table.table-striped.table-hover tbody tr")
    //   .nth(0);
    this.cellContactsNameInList = page.locator(
      "tbody tr:first-child td:nth-child(2)",
    );

    this.btnCreateContact = page.getByRole("button", {
      name: /create contact/i,
    });
  }

  //1
  async clickContactsLink(): Promise<void> {
    await this.contactsLink.click();
  }
  //2
  async clickCreatecontacts(): Promise<void> {
    await this.createContactbtn.click();
  }
  //3
  async fillOrganizationName(name: string) {
    await this.txtOrganization.fill(name);
  }
  //4
  async fillTitle(title: string) {
    await this.txtTitle.fill(title);
  }
  //5
  async fillDepartment(department: string) {
    await this.txtDepartment.waitFor({ state: "visible" });
    await this.txtDepartment.fill(department);
  }
  //6
  async fillOfficePhone(phone: number) {
    await this.txtOfficePhone.fill(phone.toString());
  }
  //7
  async fillContactName(name: string) {
    await this.txtContactName.fill(name);
  }
  //8
  async fillMobile(mobile: number) {
    await this.txtMobile.fill(mobile.toString());
  }
  //9
  async fillEmail(email: string) {
    await this.txtEmail.fill(email);
  }

  //10
  async clickCampaignAndSwitchPage(): Promise<Page> {
    const [campaignPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.addCampaign.click(),
    ]);
    await campaignPage.waitForLoadState();
    return campaignPage;
  }

  async clickBlueCreateContactsButton(): Promise<void> {
    await this.page.waitForTimeout(5000);
    await this.btnCreateContact.click();
  }

  async validateNewContact(expectedContactName: string): Promise<void> {
    await this.cellContactsNameInList.waitFor({ state: "visible" });
    const actualContactName: string | null =
      await this.cellContactsNameInList.textContent();
    console.log(actualContactName);
    expect(actualContactName?.trim()).toBe(expectedContactName.split("_")[0]);
  }
}
