//central place to configure and manage API requests. APIclient= api setup manager
/*  
*Why we use: 1)Avoid repeating setup (baseURL, headers) in every test
             2)Reuse the same request context across tests
             3)Keep framework clean and scalable
*/
import { APIRequestContext, request } from "@playwright/test";
//request->factory object which creates APIRequestContext
//APIRequestContext ->class, executes API calls
export class APIClient {
  private requestContext!: APIRequestContext; //store API session object, promises that this will be initialized in future

  async init() {
    //async bcoz request.newContext returns a promise
    const BASE_URL = process.env.BASE_URL!;
    console.log("BASE_URL in APIClient:", BASE_URL);
    this.requestContext = await request.newContext({
      //creates a new API session or context
      // baseURL: "http://49.249.28.218:8098",
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  }

  getContext() {
    //return the API context, needed bcoz requestContext is private
    return this.requestContext;
  }
}
