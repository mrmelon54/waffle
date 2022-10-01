import { ExternalDocumentationObject } from "../objects/ExternalDocumentationObject";
import { SchemaObject } from "../objects/SchemaObject";

export interface SchemaObjectObject {
  type?: string;
  description?: string;
  properties?: Map<string, SchemaObject>;
  additionalProperties?: Map<string, any>;
  title?: string;
  requiredProperties?: string[];
  deprecated?: boolean;
  externalDocs?: ExternalDocumentationObject;
}
