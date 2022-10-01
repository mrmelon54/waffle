export interface SchemaObject {
  type?: string;
  allOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  oneOf?: SchemaObject[];
}
