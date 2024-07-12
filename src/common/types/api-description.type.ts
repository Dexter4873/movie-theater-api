import { API_DESCRIPTION, API_NAME, API_VERSION } from "../constants";

export class ApiDescription {
  name = API_NAME;
  description = API_DESCRIPTION;
  version = API_VERSION;
}

export const apiDescription = new ApiDescription();
