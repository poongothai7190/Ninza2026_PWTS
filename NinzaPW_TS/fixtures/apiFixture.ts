import { test as base } from "@playwright/test";
import { APIClient } from "../API/client/apiClient";

export const test = base.extend<{
  apiClient: APIClient;
}>({
  apiClient: async ({}, use) => {
    const client = new APIClient();
    await client.init();
    await use(client); //injects apiClient into test -> means pass this client into the test
  },
});
