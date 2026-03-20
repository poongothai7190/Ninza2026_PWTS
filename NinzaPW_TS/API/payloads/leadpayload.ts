// 📁 payloads/leadPayload.ts
import { FakerHelper } from "../../utils/fakerHelper";

export class LeadPayload {
  // Payload for creating a lead (POST)
  static createLead(campaign: any, data?: any) {
    const leadData = FakerHelper.getLeadData();
    const campaignData = FakerHelper.getCampaignData();

    return {
      leadId: data?.leadId || `lead_${Date.now()}`, // optional unique ID
      name: data?.name || leadData.leadName,
      email: data?.email || leadData.email,
      secondaryEmail: data?.secondaryEmail || `secondary_${leadData.email}`,
      phone: data?.phone || leadData.phone,
      company: data?.company || leadData.companyName,
      address: data?.address || "123 Main St",
      city: data?.city || "CityName",
      country: data?.country || "CountryName",
      postalCode: data?.postalCode || 12345,
      industry: data?.industry || leadData.industry,
      noOfEmployees: data?.noOfEmployees || 50,
      annualRevenue: data?.annualRevenue || 100000,
      leadSource: data?.leadSource || leadData.leadSource,
      leadStatus: data?.leadStatus || leadData.leadStatus,
      rating: data?.rating || "Hot",
      description: data?.description || "Test lead description",
      website: data?.website || "https://example.com",
      assignedTo: data?.assignedTo || leadData.assignedTo,
      createdAt: data?.createdAt || new Date().toISOString(),
      campaign: {
        campaignId: campaign.campaignId,
        campaignName: campaign.campaignName,
        campaignStatus: campaign.campaignStatus,
        createdAt: campaign.createdAt,
        description: campaign.description,
        expectedCloseDate: campaign.expectedCloseDate,
        targetAudience: campaign.targetAudience,
        targetSize: campaign.targetSize,
      },
    };
  }

  // Payload for updating a lead (PUT)
  static updateLead(existingLead: any, updates: any = {}) {
    return {
      ...existingLead,
      ...updates,
    };
  }
}
