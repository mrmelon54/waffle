import Ref from "../utils/Ref";
import {CallbackObject} from "./CallbackObject";
import {ExampleObject} from "./ExampleObject";
import {HeaderObject} from "./HeaderObject";
import {LinkObject} from "./LinkObject";
import {ParameterObject} from "./ParameterObject";
import {PathItemObject} from "./PathItemObject";
import {RequestBodyObject} from "./RequestBodyObject";
import {ResponseObject} from "./ResponseObject";
import {SchemaObject} from "./SchemaObject";

export interface ComponentsObject {
  schemas?: Map<string, SchemaObject>;
  responses?: Map<string, ResponseObject | Ref<ResponseObject>>;
  parameters?: Map<string, ParameterObject | Ref<ParameterObject>>;
  examples?: Map<string, ExampleObject | Ref<ExampleObject>>;
  requestBodies?: Map<string, RequestBodyObject | Ref<RequestBodyObject>>;
  headers?: Map<string, HeaderObject | Ref<HeaderObject>>;
  securitySchemes?: Map<string, SecuritySchemeObject | Ref<SecuritySchemeObject>>;
  links?: Map<string, LinkObject | Ref<LinkObject>>;
  callbacks?: Map<string, CallbackObject | Ref<CallbackObject>>;
  pathItems?: Map<string, PathItemObject | Ref<PathItemObject>>;
}
