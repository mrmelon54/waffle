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

  constructor(v) {
    this.$$raw=v;
    // TODO: brrr
  }
}
