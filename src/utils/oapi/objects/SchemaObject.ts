import type { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import type Ref from "../utils/Ref";

interface SchemaObject {
  type?: string;
  default?: any;
  description?: string;
  title?: string;
  deprecated?: boolean;
  externalDocs?: ExternalDocumentationObject;
  example?: any;
  xml?: SchemaXml;
  allOf?: (SchemaObject | Ref<SchemaObject>)[];
  anyOf?: (SchemaObject | Ref<SchemaObject>)[];
  oneOf?: (SchemaObject | Ref<SchemaObject>)[];
}

interface SchemaObjectObject extends SchemaObject {
  properties?: { [key: string]: SchemaObject };
  additionalProperties?: { [key: string]: any };
  requiredProperties?: string[];
}

interface SchemaObjectArray extends SchemaObject {
  items?: SchemaObject | Ref<SchemaObject>;
}

interface SchemaObjectPrimitive extends SchemaObject {
  format?: string;
  enumValues?: any[];
}

interface SchemaXml {
  name?: string;
  wrapped?: boolean;
  attribute?: boolean;
  prefix?: string;
  namespace?: string;
}

export function detectType(v: SchemaObject): string {
  if (v.type !== undefined) return v.type;
  if ((<any>v).allOf !== undefined) return "allOf";
  if ((<any>v).anyOf !== undefined) return "anyOf";
  if ((<any>v).oneOf !== undefined) return "oneOf";
  if ((<any>v).properties !== undefined) return "object";
  if ((<any>v).items !== undefined) return "array";
  return "unknown";
}

export function isPrimitive(v: SchemaObject) {
  return ["string", "number", "integer", "boolean"].indexOf(detectType(v)) !== -1;
}

export type { SchemaObject, SchemaObjectObject, SchemaObjectArray, SchemaObjectPrimitive, SchemaXml };
