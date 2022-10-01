import { ExternalDocumentationObject } from "../objects/ExternalDocumentationObject";

export interface SchemaObjectPrimitive {
  type: string;
  format?: string;
  description?: string;
  title?: string;
  deprecated?: boolean;
  externalDocs?: ExternalDocumentationObject;
  enumValues?: any[];
}
