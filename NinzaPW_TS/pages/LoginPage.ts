import {Page, Locator} from '@playwright/test';
import { BasePage } from "./BasePage";
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // explicitly specify path

export class LoginPage extends BasePage{
    readonly loginUrl: string;
    readonly userName: Locator;
    readonly password: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        super(page);
        this.loginUrl= 'http://49.249.28.218:8098'; 
        this.userName = page.locator('#username');
        this.password = page.locator('#inputPassword');
        this.signInButton = page.getByRole('button', {name: 'Sign In'});
    }
  
    async goto(): Promise<void>{
        await this.navigateTo(this.loginUrl);
    }
    async enterUserName(username: string): Promise<void>{
        await this.userName.fill(username);
    }     
    async enterPassword(password: string): Promise<void>{
        await this.password.fill(password);
    }   
    async clickSignIn(): Promise<void> {
        await this.signInButton.click();
    }   
}
