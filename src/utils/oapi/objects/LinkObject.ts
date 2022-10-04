import {ServerObject} from "./ServerObject";

export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: {[key: string]: any};
  requestBody?: any;
  description?: string;
  server?: ServerObject;
}
