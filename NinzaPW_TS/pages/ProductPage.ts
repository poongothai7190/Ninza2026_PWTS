import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  productsLink: Locator;
  addProduct: Locator;
  //addProduct
  productName: Locator;
  quantity: Locator;
  pricePerUnit: Locator;
  categoryDropdown: Locator;
  vendorDropdown: Locator;
  addButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.addProduct = page.getByRole("button", { name: "Add Product" });
    //addproduct
    this.productName = page.locator('input[name="productName"]');
    this.quantity = page.locator('input[name="quantity"]');
    this.pricePerUnit = page.locator('input[name="price"]');
    this.categoryDropdown = page.locator('select[name="productCategory"]');
    this.vendorDropdown = page.locator('select[name="vendorId"]');
    this.addButton = page.getByRole("button", { name: "Add" });
  }

  async openProductsPage() {
    await this.productsLink.click();
  }
  async clickAddProduct() {
    await this.addProduct.click();
  }
  async createProduct(name: string, qty: number, price: number) {
    await this.productName.fill(name);
    await this.quantity.fill(qty.toString());
    await this.pricePerUnit.fill(price.toString());
    await this.categoryDropdown.selectOption({ index: 1 });
    await this.vendorDropdown.selectOption({ index: 1 });
    await this.addButton.click();
  }
}
