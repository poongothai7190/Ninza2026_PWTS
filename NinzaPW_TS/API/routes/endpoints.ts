export const ENDPOINTS = {
  LEADS: {
    GET_ALL: "/lead/all",
    CREATE: "/lead",
    COUNT: "/lead/count",
    STATS: "/lead/stats",
    UPDATE: "/lead",
    DELETE: "/lead",
  },

  OPPORTUNITIES: {
    GET_ALL: "/opportunities",
    CREATE: "/opportunities",
    GET_BY_ID: (id: string) => `/opportunities/${id}`,
    UPDATE: (id: string) => `/opportunities/${id}`,
    DELETE: (id: string) => `/opportunities/${id}`,
  },

  CONTACTS: {
    GET_ALL: "/contacts",
    CREATE: "/contacts",
    GET_BY_ID: (id: string) => `/contacts/${id}`,
    UPDATE: (id: string) => `/contacts/${id}`,
    DELETE: (id: string) => `/contacts/${id}`,
  },

  CAMPAIGNS: {
    GET_ALL: "/campaign/all",
    // CREATE: "/campaigns",
    // GET_BY_ID: (id: string) => `/campaigns/${id}`,
    // UPDATE: (id: string) => `/campaigns/${id}`,
    // DELETE: (id: string) => `/campaigns/${id}`,
  },
};
