import { faker } from "@faker-js/faker";

//structure of a Lead
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

//structure of a campaign
export interface CampaignData {
  campaignName: string;
  campaignStatus: "Active" | "New" | "Closed"; // optional to restrict values
  targetSize: string;
  targetAudience: string;
  description: string;
}

//structure of a Contacts
export interface ContactData {
  contactsOrganization: string;
  contactsTitle: string;
  contactsDepartment: string;
  contactsOfficePhone: number;
  contactsContactName: string;
  contactsMobile: number;
  contactsEmail: string;
}

//structure for products
export interface Product {
  productName: string;
  pricePerUnit: number;
  quantity: number;
}

export class FakerHelper {
  //Lead testData
  //no need to create an instance of FakerHelper to use it.
  static getLeadData(): LeadData {
    //return type matches interface
    const randomSuffix = faker.number.int(10000);
    let leadName = faker.person.firstName();
    return {
      leadName: `${leadName}_${randomSuffix}`, //faker.person-namespace inside Faker for generating person-related data (like names, titles, gender, etc.).
      email: faker.internet.email().replace("@", `+${randomSuffix}@`), //Faker’s internet namespace.
      phone: faker.phone.number(),
      companyName: faker.company.name(),
      leadSource: faker.helpers.arrayElement([
        //matches the actual dropdown options in your UI. await page.selectOption('#leadSource', lead.leadSource);
        "Advertisement",
        "Event",
        "Cold Call",
        "Website",
      ]),
      industry: faker.helpers.arrayElement([
        "IT",
        "Finance",
        "Healthcare",
        "Education",
      ]),
      // assignedTo: faker.person.fullName(),
      assignedTo: leadName,
      leadStatus: faker.helpers.arrayElement(["New", "Contacted"]),
    };
  }
  // If you want multiple leads like your JSON
  // static getLeads(count: number = 2) {
  //   return Array.from({ length: count }, () => this.getLead());
  // }

  //Campaign testdata
  static getCampaignData(): CampaignData {
    let company = faker.company.name().trim().replace(/\s+/g, " ");
    // Limit to 15 chars for company, then append "Campaign"
    if (company.length > 15) company = company.slice(0, 15);
    return {
      campaignName: company + "Campaign", //replace(/\s+/g, " ")-> replace multiple spaces with single space
      campaignStatus: faker.helpers.arrayElement(["Active", "New", "Closed"]),
      targetSize: faker.number.int({ min: 10, max: 500 }).toString(),
      targetAudience: faker.helpers.arrayElement([
        "IT",
        "Sales",
        "Marketing",
        "Finance",
      ]),
      description: faker.lorem.sentence(), //generates random “dummy” sentence
    };
  }

  //Contacts Testdata
  static getContactsData(): ContactData {
    const randomSuffix = faker.number.int(10000); // ensure uniqueness
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    return {
      contactsOrganization: faker.company.name(),
      contactsTitle: faker.person.jobTitle(),
      contactsDepartment: faker.helpers.arrayElement([
        "Sales",
        "Marketing",
        "IT",
        "Finance",
      ]),
      contactsOfficePhone: faker.number.int({
        min: 1000000000,
        max: 9999999999,
      }),
      contactsContactName: fullName,
      contactsMobile: faker.number.int({
        min: 1000000000,
        max: 9999999999,
      }),
      contactsEmail: faker.internet
        .email({ firstName, lastName })
        .replace("@", `+${randomSuffix}@`),
    };
  }

  //Products testdata
  static generateProduct(): Product {
    return {
      productName: faker.commerce.productName(), // Random product name
      pricePerUnit: parseFloat(faker.commerce.price()), // Random price as string
      quantity: faker.number.int({ min: 1, max: 100 }), // Random quantity
    };
  }
}
