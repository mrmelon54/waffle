import StaticOptional from "../../StaticOptional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import { Method } from "../values/Methods";
import { CallbackObject, parseCallback } from "./CallbackObject";
import ExternalDocumentationObject from "./ExternalDocumentationObject";
import ParameterObject from "./ParameterObject";
import ReferenceObject from "./ReferenceObject";
import RequestBodyObject from "./RequestBodyObject";
import ResponsesObject from "./ResponsesObject";
import SecurityRequirementObject from "./SecurityRequirementObject";
import ServerObject from "./ServerObject";

export default class OperationObject {
  $$raw: any;
  $$path: string;
  $$method: Method;
  $$params: (ParameterObject | ReferenceObject)[];
  tags: Optional<string[]>;
  summary: Optional<string>;
  description: Optional<string>;
  externalDocs: Optional<ExternalDocumentationObject>;
  operationId: Optional<string>;
  parameters: Optional<(ParameterObject | ReferenceObject)[]>;
  requestBody: Optional<RequestBodyObject | ReferenceObject>;
  responses: Optional<ResponsesObject>;
  callbacks: Optional<Map<string, CallbackObject | ReferenceObject>>;
  deprecated: Optional<boolean>;
  security: Optional<SecurityRequirementObject[]>;
  servers: Optional<ServerObject[]>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): StaticOptional<OperationObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new OperationObject();
    o.$$raw = v;
    o.tags = StaticOptional.full(v.tags);
    o.summary = StaticOptional.full(v.summary);
    o.description = StaticOptional.full(v.description);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    o.operationId = StaticOptional.full(v.operationId);
    o.parameters = ParameterObject.parseArray(ctx, v.parameters);
    o.requestBody = RequestBodyObject.parse(ctx, v.requestBody);
    o.responses = ResponsesObject.parse(ctx, v.responses);
    o.callbacks = parseCtxMap(ctx, v.callbacks, parseCallback);
    o.deprecated = StaticOptional.full(v.deprecated);
    o.security = SecurityRequirementObject.parseArray(v.security);
    o.servers = ServerObject.parseArray(v.servers);
    return StaticOptional.full(o);
  }
}
