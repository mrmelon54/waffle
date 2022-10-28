import type { OperationObject } from "./OperationObject";
import type { ParameterObject } from "./ParameterObject";
import { Method, Methods } from "../values/Methods";
import type { ServerObject } from "./ServerObject";
import type Ref from "../utils/Ref";

interface PathItemObject {
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

export type { PathItemObject };
