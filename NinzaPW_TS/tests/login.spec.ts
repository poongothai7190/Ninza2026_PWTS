import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("TC01 - Successful login", async ({ page }) => {
  const lp = new LoginPage(page);
  const usernameNinza = process.env.USERNAME as string;
  const passwordNinza = process.env.PASSWORD as string;
  console.log("Username from env:", usernameNinza);
  console.log("Password from env:", passwordNinza);
  await lp.goto();
  await lp.enterUserName(usernameNinza);
  await lp.enterPassword(passwordNinza);
  await lp.clickSignIn();
  await lp.validatePageTitle("Ninza CRM");
});

// test('TC02 - Invalid login', async ({browser}) => {
// // browser authentication dialog (HTTP Basic Auth)-> can't handle by PW
//     const context = await browser.newContext({
//     httpCredentials: {
//       username: 'rmgyantra',
//       password: 'rmgy@'
//     }
//   });
//   const page = await context.newPage();
//     const response = await page.goto('http://49.249.28.218:8098');
//     console.log(response.status());
//     expect(response.status()).toBe(401);

// });
