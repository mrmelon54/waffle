import { CallbackObject } from "./CallbackObject";
import { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import { ParameterObject } from "./ParameterObject";
import { RequestBodyObject } from "./RequestBodyObject";
import { ResponsesObject } from "./ResponsesObject";
import { SecurityRequirementObject } from "./SecurityRequirementObject";
import { ServerObject } from "./ServerObject";

export interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  parameters?: (ParameterObject | Ref<ParameterObject>)[];
  requestBody?: RequestBodyObject | Ref<RequestBodyObject>;
  responses?: ResponsesObject;
  callbacks?: Map<string, CallbackObject | Ref<CallbackObject>>;
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
}
