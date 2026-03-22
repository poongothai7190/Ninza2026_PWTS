import { test } from "../../fixtures/apiFixture"; //importing custon test, not default playwright tset
import { expect } from "@playwright/test";
import { LeadAPI } from "../../API/services/leadAPI";
import { LeadPayload } from "../../API/payloads/leadpayload";
import { APIClient } from "../../API/client/apiClient";
import { CampaignAPI } from "../../API/services/campaignAPI";
console.log("BASE_URL in test:", process.env.BASE_URL);

/*  
Test File  →  Fixture  →  APIClient  →  LeadAPI (Service) -> endpoints →  Actual API Call
*/

//get, post // POST needed->update, delete
test.describe("Lead API tests", () => {
  let leadApi: LeadAPI;
  let campaignAPI: CampaignAPI;
  let leadId: string | null;
  let payload: any;

  // ------------------------
  // Common setup before each test
  // ------------------------
  test.beforeEach(async ({ apiClient }) => {
    leadApi = new LeadAPI(apiClient.getContext());
    campaignAPI = new CampaignAPI(apiClient.getContext());
    leadId = null; // reset before each test
    console.log("<---Running 1st beforeEach hook: APIRequest --->");
  });

  // ------------------------
  // Common cleanup after each test
  // ------------------------
  test.afterEach(async () => {
    console.log("<--- Running afterEach hook: DELETE --->"); //{ leadId: leadId }
    if (!leadId) {
      console.log("Lead already deleted / Nothing to delete");
      return;
    } // nothing to clean
    const response = await leadApi.deleteLead(leadId);

    if (response.status() === 204) {
      console.log(`<--- Cleanup: Lead deleted ${leadId} --->`);
    } else if (response.status() === 404) {
      console.log("<--- Cleanup: Lead already deleted --->");
    } else {
      console.log("<--- Cleanup unexpected: --->", response.status());
    }
    leadId = null;
  });

  // =========================
  // GET TESTS (read-only, safe)
  // =========================
  test("GET All Leads API", async ({ apiClient }) => {
    //page-> used for UI, apiClient->used for API (backend calls)
    // Create an instance of LeadAPI with the request context
    // const leadApi = new LeadAPI(apiClient.getContext()); //apiClient.getContext() → returns APIRequestContext
    // Call the getAllLeads method
    console.log("-----> Running Get ALL leads test");
    const responseGetAllLead = await leadApi.getAllLeads();
    // Validate the response status
    expect(responseGetAllLead.status()).toBe(200);
    const leads = await responseGetAllLead.json(); //  JSON array now
    console.log(leads); // inspect the actual lead objects
  });

  test("GET Lead counts", async ({ apiClient }) => {
    // const leadApi = new LeadAPI(apiClient.getContext()); //apiClient.getContext() → returns APIRequestContext
    console.log("-----> Running Get lead COUNT test");
    const response = await leadApi.getLeadCount();
    expect(response.status()).toBe(200);
    const leadsCount = await response.json(); //  JSON array now
    console.log(leadsCount);
  });
  test("GET lead status", async ({ apiClient }) => {
    // const leadApi = new LeadAPI(apiClient.getContext()); //apiClient.getContext() → returns APIRequestContext
    console.log("-----> Running Get lead STATUS test");
    const response = await leadApi.getLeadStats();
    expect(response.status()).toBe(200);
    const leadsStatus = await response.json(); //  JSON array now
    console.log(leadsStatus);
  });

  // =========================
  // TESTS REQUIRING EXISTING LEAD
  // =========================
  test.describe("Tests requiring existing lead", () => {
    let existingLead: any;
    let existingCampaign: any;
    test.beforeEach(async () => {
      console.log("<--- Running 2nd beforeEach hook: Create LEAD --->");
      // Create campaign
      const responseCampaign = await campaignAPI.getAllCampaigns();
      const bodyCampaign = await responseCampaign.json();
      existingCampaign = bodyCampaign.content[0];
      // Create lead
      const payloadCreateLead = LeadPayload.createLead(existingCampaign);
      const responseCreateLead = await leadApi.createLead(payloadCreateLead);
      expect(responseCreateLead.status()).toBe(201);
      const bodyCreateLead = await responseCreateLead.json();
      leadId = bodyCreateLead.leadId;
      console.log("LeadId from beforeEach2 ----->", leadId);
      existingLead = bodyCreateLead;
    });

    test("PUT-> update lead", async () => {
      console.log("-----> Running UPDATE test: PUT ");
      // const leadApi = new LeadAPI(apiClient.getContext());
      payload = LeadPayload.updateLead(existingLead, {
        leadStatus: "Qualified",
      });
      const responseUpdate = await leadApi.updateLead(payload);
      console.log("UPDATED lead: ", await responseUpdate.text());
      console.log("Status: ", responseUpdate.status());
      expect(responseUpdate.status()).toBe(200);
      payload = await responseUpdate.json();
    });

    test("DELETE->delete a lead", async ({ apiClient }) => {
      // const leadApi = new LeadAPI(apiClient.getContext());
      console.log("-----> Running DELETE test ");
      const response = await leadApi.deleteLead(leadId!);
      console.log("Status: ", response.status());
      console.log("Response TEXT:", await response.text());
      expect(response.status()).toBe(204);

      // Avoid double-delete in afterEach
      leadId = null;
    });
  });

  // =========================
  // POST TEST (independent)
  // =========================
  test("POST-> Create User API", async ({ apiClient }) => {
    //create campaign-> get the ID-> POST
    console.log("-----> Running POST test: POST ");
    const responseCampaign = await campaignAPI.getAllCampaigns();
    const bodyCampaign = await responseCampaign.json();
    const campaign = bodyCampaign.content[0]; //pick first campaign
    console.log("campaign object: ", campaign);

    const LeadApi = new LeadAPI(apiClient.getContext());
    const payload = LeadPayload.createLead(campaign);
    const response = await LeadApi.createLead(payload);
    console.log("STatus: ", response.status());
    console.log("Response TEXT:", await response.text());
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    leadId = responseBody.leadId;
    expect(responseBody.name).toBe(payload.name);
  });
});
