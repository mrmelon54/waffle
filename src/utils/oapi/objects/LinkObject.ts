import { ServerObject } from "./ServerObject";

export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: Map<string, any>;
  requestBody?: any;
  description?: string;
  server?: ServerObject;
}
