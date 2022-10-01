import { OperationObject } from "./OperationObject";
import { ParameterObject } from "./ParameterObject";
import { AllMethods, IsValidMethod, Method, Methods } from "../values/Methods";
import { ServerObject } from "./ServerObject";
import Ref from "../utils/Ref";

export interface PathItemObject {
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  pust?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: ServerObject[];
  parameters?: (ParameterObject | Ref<ParameterObject>)[];
}

export function getPathOpOrder(pathItem: PathItemObject): Method[] {
  return Object.keys(pathItem)
    .map((x) => Methods[x])
    .filter((x) => x !== undefined);
}
