import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";
const envPath = path.resolve(__dirname, ".env");
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath, override: true });

console.log("BASE_URL from config:", process.env.BASE_URL);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1, //process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://49.249.28.218:8098',
    baseURL: process.env.BASE_URL,
    headless: false,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
