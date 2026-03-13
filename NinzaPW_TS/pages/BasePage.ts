import {Page, expect} from '@playwright/test';

export class BasePage{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async getFuturedate(): Promise<string>{
        const date = new Date(); //date obj with current date and time
        date.setDate(date.getDate() + 7); //getDate- returns day of the month, setDate- updates date obj
         return date.toISOString().split('T')[0]; //2026-03-20T21:30:00.000Z
    }
    async navigateTo(url: string): Promise<void>{
        await this.page.goto(url);
    }

    async validatePageTitle(expectedTitle: string): Promise<void>{
        expect(await this.page.title()).toBe(expectedTitle);
    }

    async validatePageUrl(urlText: string): Promise<void>{
        expect(await this.page.url()).toContain(urlText);
    }
}