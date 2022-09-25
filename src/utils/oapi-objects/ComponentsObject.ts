import Optional from "../Optional";
import PathItemObject from "./PathItemObject";
import ReferenceObject from "./ReferenceObject";

type SchemaObject = string;
type ResponseObject = string;
type ParameterObject = string;
type ExampleObject = string;
type RequestBodyObject = string;
type HeaderObject = string;
type SecuritySchemeObject = string;
type LinkObject = string;
type CallbackObject = string;

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

  static parse(v: any): Optional<ComponentsObject> {
    if (!v) return Optional.empty();
    let o = new ComponentsObject();
    o.$$raw = v;
    o.schemas = new Map();
    o.responses = new Map();
    o.parameters = new Map();
    o.examples = new Map();
    o.requestBodies = new Map();
    o.headers = new Map();
    o.securitySchemes = new Map();
    o.links = new Map();
    o.callbacks = new Map();
    o.pathItems = new Map();
    // TODO: brrr
    return Optional.full(o);
  }
}
