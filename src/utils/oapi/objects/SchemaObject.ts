import { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import Ref from "../utils/Ref";

export interface SchemaObject {
  type?: string;
  default?: any;
  description?: string;
  title?: string;
  deprecated?: boolean;
  externalDocs?: ExternalDocumentationObject;
  allOf?: (SchemaObject | Ref<SchemaObject>)[];
  anyOf?: (SchemaObject | Ref<SchemaObject>)[];
  oneOf?: (SchemaObject | Ref<SchemaObject>)[];
}

export interface SchemaObjectObject extends SchemaObject {
  properties?: Map<string, SchemaObject>;
  additionalProperties?: Map<string, any>;
  requiredProperties?: string[];
}

export interface SchemaObjectArray extends SchemaObject {
  items?: SchemaObjectPrimitive;
}

export interface SchemaObjectPrimitive extends SchemaObject {
  format?: string;
  enumValues?: any[];
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
