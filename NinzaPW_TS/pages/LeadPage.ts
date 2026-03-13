import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LeadsPage extends BasePage{
    readonly leadsTab: Locator;
    readonly createLeadButton: Locator;
    readonly createLeadName: Locator;
    readonly createCompany: Locator;
    readonly createLeadSource: Locator;
    readonly createIndustry: Locator;
    readonly createPhone: Locator;
    readonly createEmail: Locator;
    readonly createLeadStatus: Locator;
    readonly createAssignedTo: Locator;
    readonly campaignPlusButton: Locator;
    readonly grayCreateLeadButton: Locator;
    readonly rowLeadNameInList: Locator;
    readonly cellLeadNameInList: Locator;

    constructor(page: Page){
        super(page);
        this.leadsTab = page.getByRole('link', {name: 'Leads'});
        this.createLeadButton = page.getByRole('button', {name: 'Create Lead'});
        this.createLeadName = page.locator("input[name='name']");
        this.createCompany = page.locator("input[name='company']"); 
        this.createLeadSource = page.locator("input[name='leadSource']");
        this.createIndustry = page.locator("input[name='industry']");
        this.createPhone = page.locator("input[name='phone']");
        this.createEmail = page.locator("input[name='email']");
        this.createLeadStatus = page.locator("input[name='leadStatus']");
        this.createAssignedTo = page.locator("input[name='assignedTo']");
        this.campaignPlusButton = page.locator('svg.svg-inline--fa.fa-plus');
        this.grayCreateLeadButton = page.getByRole('button', {name: 'Create Lead'});
        this.rowLeadNameInList = page.locator('.table.table-striped.table-hover tbody tr').nth(0);
        this.cellLeadNameInList = this.rowLeadNameInList.locator('td').nth(1);
    }

    async validateNewLead(expectedLeadName: string): Promise<void>{
        await this.cellLeadNameInList.waitFor({state: 'visible'});
        const actualLeadName: string| null = await this.cellLeadNameInList.textContent();
        expect(actualLeadName?.trim()).toBe(expectedLeadName.split('_')[0]);
    }
    async clickGrayCreateLeadButton(): Promise<void>{
        await this.grayCreateLeadButton.click();
    }

    async clickAddCampaign(): Promise<Page>{
        const [campaignPage] = await Promise.all([
            this.page.context().waitForEvent('page'),//resolved
            this.campaignPlusButton.click(),// resolved 
           
        ]);
        await campaignPage.waitForLoadState();
        return campaignPage;
    }

    async enterAssignedTo(assignedTo: string): Promise<void>{
        await this.createAssignedTo.fill(assignedTo);
    }

    async enterLeadStatus(leadStatus: string): Promise<void>{
        await this.createLeadStatus.fill(leadStatus);
    }

    async enterEmail(email: string): Promise<void>{
        await this.createEmail.fill(email);
    }


    async enterPhone(phone: string): Promise<void>{
        await this.createPhone.fill(phone);
    }

    async enterIndustry(industry:string): Promise<void>{
        await this.createIndustry.fill(industry);
    }

    async enterLeadSource(leadSource: string): Promise<void>{
        await this.createLeadSource.fill(leadSource);
    }
     async enterCompanyName(companyName: string): Promise<void>{
        await this.createCompany.fill(companyName);
    }

    async enterLeadName(leadName: string): Promise<void>{
        await this.createLeadName.fill(leadName);
    }

     async clickCreateLead(): Promise<void>{
        await this.createLeadButton.click();
    }

    async clickLeadsTab(): Promise<void>{
        await this.leadsTab.click();
    }
   
    
   
}
