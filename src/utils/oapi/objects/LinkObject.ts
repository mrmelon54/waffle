import type { ServerObject } from "./ServerObject";

interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: { [key: string]: any };
  requestBody?: any;
  description?: string;
  server?: ServerObject;
}

export type { LinkObject };
