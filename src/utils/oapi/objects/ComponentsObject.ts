import type Ref from "../utils/Ref";
import type { CallbackObject } from "./CallbackObject";
import type { ExampleObject } from "./ExampleObject";
import type { HeaderObject } from "./HeaderObject";
import type { LinkObject } from "./LinkObject";
import type { ParameterObject } from "./ParameterObject";
import type { PathItemObject } from "./PathItemObject";
import type { RequestBodyObject } from "./RequestBodyObject";
import type { ResponseObject } from "./ResponseObject";
import type { SchemaObject } from "./SchemaObject";

interface SecuritySchemeObject {}

interface ComponentsObject {
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

export type { ComponentsObject };
