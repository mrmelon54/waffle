import { OperationObject } from "./OperationObject";
import { ParameterObject } from "./ParameterObject";
import { Method } from "../values/Methods";
import { ServerObject } from "./ServerObject";

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
  opOrder?: Method[];
}
