import StaticOptional from "../../StaticOptional";
import PathItemObject from "./PathItemObject";
import ReferenceObject from "./ReferenceObject";
import OpenApiContext from "../utils/OpenApiContext";
import { parseCtxMap } from "../utils/ObjectUtils";
import SchemaObject from "./SchemaObject";
import Optional from "../../Optional";
import ResponseObject from "./ResponseObject";
import ParameterObject from "./ParameterObject";
import ExampleObject from "./ExampleObject";
import RequestBodyObject from "./RequestBodyObject";
import HeaderObject from "./HeaderObject";
import LinkObject from "./LinkObject";
import { CallbackObject, parseCallback } from "./CallbackObject";

class SecuritySchemeObject {
  static parse(v: any): Optional<SecuritySchemeObject> {
    return StaticOptional.empty();
  }
}

export default class ComponentsObject {
  $$raw: any;
  schemas: Map<string, SchemaObject>;
  responses: Map<string, ResponseObject | ReferenceObject>;
  parameters: Map<string, ParameterObject | ReferenceObject>;
  examples: Map<string, ExampleObject | ReferenceObject>;
  requestBodies: Map<string, RequestBodyObject | ReferenceObject>;
  headers: Map<string, HeaderObject | ReferenceObject>;
  securitySchemes: Map<string, SecuritySchemeObject | ReferenceObject>;
  links: Map<string, LinkObject | ReferenceObject>;
  callbacks: Map<string, CallbackObject | ReferenceObject>;
  pathItems: Map<string, PathItemObject | ReferenceObject>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<ComponentsObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new ComponentsObject();
    o.$$raw = v;
    o.schemas = parseCtxMap(ctx, v.schemas, SchemaObject.parse);
    o.responses = parseCtxMap(ctx, v.responses, ResponseObject.parse);
    o.parameters = parseCtxMap(ctx, v.parameters, ParameterObject.parse);
    o.examples = parseCtxMap(ctx, v.examples, ExampleObject.parse);
    o.requestBodies = parseCtxMap(ctx, v.requestBodies, RequestBodyObject.parse);
    o.headers = parseCtxMap(ctx, v.headers, HeaderObject.parse);
    o.securitySchemes = parseCtxMap(ctx, v.securitySchemes, SecuritySchemeObject.parse);
    o.links = parseCtxMap(ctx, v.links, LinkObject.parse);
    o.callbacks = parseCtxMap(ctx, v.callbacks, parseCallback);
    o.pathItems = parseCtxMap(ctx, v.pathItems, PathItemObject.parse);
    // TODO: brrr
    return StaticOptional.full(o);
  }
}
