import { test } from "../../fixtures/apiFixture"; //importing custon test, not default playwright tset
import { expect } from "@playwright/test";
import { LeadAPI } from "../../API/services/leadAPI";
import { LeadPayload } from "../../API/payloads/leadpayload";
import { APIClient } from "../../API/client/apiClient";
import { CampaignAPI } from "../../API/services/campaignAPI";

/*  
Test File  →  Fixture  →  APIClient  →  LeadAPI (Service) -> endpoints →  Actual API Call
*/
test("GET All Leads API", async ({ apiClient }) => {
  //page-> used for UI, apiClient->used for API (backend calls)
  // Create an instance of LeadAPI with the request context
  const leadApi = new LeadAPI(apiClient.getContext()); //apiClient.getContext() → returns APIRequestContext

  // Call the getAllLeads method
  const response = await leadApi.getAllLeads();

  // Validate the response status
  expect(response.status()).toBe(200);

  const leads = await response.json(); //  JSON array now
  console.log(leads); // inspect the actual lead objects
  // // Parse the response body
  // const leads = await response.json();

  // // Optional: basic validation that the response is an array
  // expect(Array.isArray(leads)).toBe(true);

  // // Optional: if you want to check the first lead has expected properties
  // if (leads.length > 0) {
  //   expect(leads[0]).toHaveProperty("id");
  //   expect(leads[0]).toHaveProperty("name");
  // }
});

test("GET Lead counts", async ({ apiClient }) => {
  const leadApi = new LeadAPI(apiClient.getContext()); //apiClient.getContext() → returns APIRequestContext
  const response = await leadApi.getLeadCount();
  expect(response.status()).toBe(200);
  const leadsCount = await response.json(); //  JSON array now
  console.log(leadsCount);
});

test("GET lead status", async ({ apiClient }) => {
  const leadApi = new LeadAPI(apiClient.getContext()); //apiClient.getContext() → returns APIRequestContext
  const response = await leadApi.getLeadStats();
  expect(response.status()).toBe(200);
  const leadsStatus = await response.json(); //  JSON array now
  console.log(leadsStatus);
});
test("POST-> Create User API", async ({ apiClient }) => {
  //create campaign-> get the ID-> POST
  const campaignAPI = new CampaignAPI(apiClient.getContext());
  const responseCampaign = await campaignAPI.getAllCampaigns();
  const bodyCampaign = await responseCampaign.json();
  console.log("Campaign Response:", JSON.stringify(bodyCampaign, null, 2));
  //const campaignId = bodyCampaign.content[0].campaignId;
  const campaign = bodyCampaign.content[0]; //pick first campaign
  console.log("campaign object: ", campaign);

  const LeadApi = new LeadAPI(apiClient.getContext());
  const payload = LeadPayload.createLead(campaign);
  console.log("FINAL PAYLOAD:", JSON.stringify(payload, null, 2));
  //const response = await LeadApi.createLead(payload, campaignId);
  const response = await LeadApi.createLead(payload);
  console.log("STatus: ", response.status());
  console.log("Response TEXT:", await response.text());
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody.name).toBe(payload.name);
  console.log("Created LEAD:", responseBody);
});

test("PUT-> update lead", async ({ apiClient }) => {
  const leadApi = new LeadAPI(apiClient.getContext());
  const responseGetLead = await leadApi.getAllLeads();
  console.log("Get all lead: ", responseGetLead);
  const bodyLeads = await responseGetLead.json(); //  JSON array now
  const existingLeads = bodyLeads.content[0];
  console.log(existingLeads);

  const payload = LeadPayload.updateLead(existingLeads, {
    leadStatus: "Qualified",
  });
  const response = await leadApi.updateLead(payload);
  console.log("STatus: ", response.status());
  console.log("Response TEXT:", await response.text());
  expect(response.status()).toBe(200);
});

test("DELETE->delete a lead", async ({ apiClient }) => {
  const leadApi = new LeadAPI(apiClient.getContext());
  const responseGetLead = await leadApi.getAllLeads();
  console.log("Get all lead: ", responseGetLead);
  const bodyLeads = await responseGetLead.json(); //  JSON array now
  const existingLeads = bodyLeads.content[0];
  console.log(existingLeads);

  const payload = existingLeads;
  const response = await leadApi.deleteLead(payload);
  console.log("STatus: ", response.status());
  console.log("Response TEXT:", await response.text());
  expect(response.status()).toBe(204);
});
