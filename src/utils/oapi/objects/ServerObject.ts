import {ServerVariableObject} from "./ServerVariableObject";

export interface ServerObject {
  url: string;
  description?: string;
  variables?: {[key: string]: ServerVariableObject};
}
