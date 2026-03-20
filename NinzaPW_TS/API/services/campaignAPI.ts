import { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "../routes/endpoints";

export class CampaignAPI {
  constructor(private request: APIRequestContext) {}
  /*
line 6 (TS shorthand property) or 
 private request: APIRequestContext; // class property

  constructor(request: APIRequestContext) {
    this.request = request; // assign the parameter to the class property
  }
*/

  // GET /lead/all → fetch all leads
  async getAllCampaigns() {
    return await this.request.get(ENDPOINTS.CAMPAIGNS.GET_ALL);
  }
}
