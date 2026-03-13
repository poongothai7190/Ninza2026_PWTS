import fs from "fs";
import path from "path";

export interface LeadData {
  leadName: string;
  email: string;
  phone: string;
  companyName: string;
  leadSource: string;
  industry: string;
  assignedTo: string;
  leadStatus: string;
}
export interface CampaignData {
  campaignName: string;
  campaignStatus: string;
  targetSize: string;
  targetAudience: string;
  description: string;
}

export interface ContactsData {
  contactsOrganization: string;
  contactsTitle: string;
  contactsDepartment: string;
  contactsOfficePhone: number;
  contactsContactName: string;
  contactsMobile: number;
  contactsEmail: string;
}
export interface ProductsData {
  productName: string;
  pricePerUnit: number;
}

export function getLeadData(): LeadData {
  const filePath = path.join(process.cwd(), "testData", "leadData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: { leads: any[] } = JSON.parse(rawData); //converts JSON string to JavaScript Object

  // pick a random lead
  const randomIndex = Math.floor(Math.random() * data.leads.length);
  const lead = data.leads[randomIndex];

  // generate random suffix //     0.99 * 10000=9900
  const randomSuffix = Math.floor(Math.random() * 10000);

  return {
    leadName: `${lead.leadName}_${randomSuffix}`, //lead_1234
    email: lead.email.replace("@", `+${randomSuffix}@`), // e.g. testlead+1234@example.com
    phone: lead.phone,
    companyName: lead.companyName,
    leadSource: lead.leadSOurce,
    industry: lead.industry,
    assignedTo: lead.AssignedTo,
    leadStatus: lead.LeadStatus,
  };
}

export function getCampaignData(): CampaignData {
  const letters: string = "abcxyz";
  let resultName: string = "";
  const filePath = path.join(process.cwd(), "testData", "campaignData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: { campaigns: any[] } = JSON.parse(rawData); //converts JSON string to JavaScript Object

  // pick a random lead
  const randomIndex = Math.floor(Math.random() * data.campaigns.length);
  const campaign = data.campaigns[randomIndex];
  // pick a random campaign
  //Math.random()->Generates a random decimal number between 0 (inclusive) and 1 (exclusive).-0-1
  //Math.floor() rounds down to the nearest integer.

  //DCAMPaabcxxz , DCAMPccczab
  //abcxyz
  for (let i = 0; i < letters.length; i++) {
    const index = Math.floor(Math.random() * letters.length); //0.99*6=5.94
    resultName += letters[index]; //zz
  }

  // generate random suffix
  const randomSuffix = Math.floor(Math.random() * 10000);

  return {
    campaignName: campaign.campaignName + resultName, //str=abc, DCAMPabc, DCAMPccc,
    campaignStatus: campaign.campaignStatus,
    targetSize: campaign.targetSize,
    targetAudience: campaign.targetAudience,
    description: campaign.description,
  };
}

export function getContactsData(): ContactsData {
  const filePath = path.join(process.cwd(), "testData", "contactsData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: { contacts: any[] } = JSON.parse(rawData); //converts JSON string to JavaScript Object

  // pick a random contact
  const randomIndex = Math.floor(Math.random() * data.contacts.length);
  const contact = data.contacts[randomIndex];

  //Generate random mobile number //1234567890
  const mobileNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  // generate random suffix
  const randomSuffix = Math.floor(Math.random() * 10000);

  return {
    contactsOrganization: contact.contactsOrganization,
    contactsTitle: contact.contactsTitle,
    contactsDepartment: contact.contactsDepartment,
    contactsEmail: contact.contactsEmail.replace("@", `+${randomSuffix}@`), // e.g. testlead+1234@example.com
    contactsOfficePhone: mobileNumber,
    contactsContactName: `${contact.contactsContactName}_${randomSuffix}`,
    contactsMobile: mobileNumber,
  };
}

export function getProductsData(): ProductsData {
  const filePath = path.join(process.cwd(), "testData", "productsData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: { products: any[] } = JSON.parse(rawData); //converts JSON string to JavaScript Object

  // pick a random contact
  const randomIndex = Math.floor(Math.random() * data.products.length);
  const product = data.products[randomIndex];

  return {
    productName: product.productName,
    pricePerUnit: product.pricePerUnit,
  };
}
