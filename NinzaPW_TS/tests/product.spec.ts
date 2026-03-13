import { test } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage"; //
import { getProductsData } from "../utils/dataHelper";

test("TC01--Verify the contacts page", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const lp = new LoginPage(page);
  const productspage = new ProductPage(page);

  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await productspage.openProductsPage();
  console.log(page.url());
  await productspage.validatePageUrl("products");
});

test("TC02- Add new product", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const lp = new LoginPage(page);
  const productspage = new ProductPage(page);
  const productsData = getProductsData();
  await lp.goto();
  await lp.enterUserName(username);
  await lp.enterPassword(password);
  await lp.clickSignIn();
  await productspage.openProductsPage();
  await productspage.clickAddProduct();
  await productspage.createProduct(
    productsData.productName,
    10,
    productsData.pricePerUnit,
  );
});
