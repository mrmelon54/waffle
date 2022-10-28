import type { CallbackObject } from "./CallbackObject";
import type { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import type { ParameterObject } from "./ParameterObject";
import type { RequestBodyObject } from "./RequestBodyObject";
import type { ResponsesObject } from "./ResponsesObject";
import type { SecurityRequirementObject } from "./SecurityRequirementObject";
import type { ServerObject } from "./ServerObject";
import type { Method } from "../values/Methods";
import type Ref from "../utils/Ref";

interface OperationObject {
  $$path: string;
  $$method: Method;
  $$params: any[];
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  parameters?: (ParameterObject | Ref<ParameterObject>)[];
  requestBody?: RequestBodyObject | Ref<RequestBodyObject>;
  responses?: ResponsesObject;
  callbacks?: { [key: string]: CallbackObject | Ref<CallbackObject> };
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
}

export type { OperationObject };
