import type { ServerVariableObject } from "./ServerVariableObject";

interface ServerObject {
  url: string;
  description?: string;
  variables?: { [key: string]: ServerVariableObject };
}

export type { ServerObject };
