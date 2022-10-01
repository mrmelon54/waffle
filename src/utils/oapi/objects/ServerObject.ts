import { ServerVariableObject } from "./ServerVariableObject";

export interface ServerObject {
  url: string;
  description?: string;
  variables?: Map<string, ServerVariableObject>;
}
