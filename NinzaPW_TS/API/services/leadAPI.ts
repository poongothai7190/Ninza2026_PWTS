// 📁 api/apiClients/leadAPI.ts
import { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "../routes/endpoints";

export class LeadAPI {
  constructor(private request: APIRequestContext) {}
  /*
line 6 (TS shorthand property) or 
 private request: APIRequestContext; // class property

  constructor(request: APIRequestContext) {
    this.request = request; // assign the parameter to the class property
  }
*/
  // POST /lead → create a new lead
  async createLead(payload: any) {
    return await this.request.post(ENDPOINTS.LEADS.CREATE, {
      data: payload,
      params: {
        campaignId: payload.campaign.campaignId,
      },
    });
  }

  // PUT /lead → update an existing lead
  async updateLead(payload: any) {
    return await this.request.put(ENDPOINTS.LEADS.UPDATE, {
      data: payload,
      params: {
        leadId: payload.leadId,
        campaignId: payload.campaign.campaignId,
      },
    });
  }

  // DELETE /lead → delete a lead by ID
  async deleteLead(leadId: string) {
    console.log("The deleted leadId will be ---> ", leadId);
    return await this.request.delete(ENDPOINTS.LEADS.DELETE, {
      params: {
        leadId: leadId,
      },
    });
  }

  // GET /lead/all → fetch all leads
  async getAllLeads() {
    return await this.request.get(ENDPOINTS.LEADS.GET_ALL);
  }

  // GET /lead/count → fetch total lead count
  async getLeadCount() {
    return await this.request.get(ENDPOINTS.LEADS.COUNT);
  }

  // GET /lead/stats → fetch lead statistics
  async getLeadStats() {
    return await this.request.get(ENDPOINTS.LEADS.STATS);
  }
}
