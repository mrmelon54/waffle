import Optional from "../../Optional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
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
  tags: Optional<string[]>;
  summary: Optional<string>;
  description: Optional<string>;
  externalDocs: Optional<ExternalDocumentationObject>;
  operationId: Optional<string>;
  parameters: Optional<ParameterObject | ReferenceObject>;
  reqestBody: Optional<RequestBodyObject | ReferenceObject>;
  responses: Optional<ResponsesObject>;
  callbacks: Optional<Map<string, CallbackObject | ReferenceObject>>;
  deprecated: Optional<boolean>;
  security: Optional<SecurityRequirementObject[]>;
  servers: Optional<ServerObject[]>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<OperationObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new OperationObject();
    o.$$raw = v;
    o.tags = Optional.full(v.tags || []);
    o.summary = Optional.full(v.summary);
    o.description = Optional.full(v.description);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    o.operationId = Optional.full(v.operationId);
    o.parameters = ParameterObject.parse(ctx, v.parameters);
    o.requestBody = RequestBodyObject.parse(ctx, v.requestBody);
    o.responses = ResponsesObject.parse(ctx, v.responses);
    o.callbacks = parseCtxMap(ctx, v.callbacks, parseCallback);
    o.deprecated = Optional.full(v.deprecated);
    o.security = SecurityRequirementObject.parseArray(v.security);
    o.servers = ServerObject.parseArray(v.servers);
    return Optional.full(o);
  }
}
