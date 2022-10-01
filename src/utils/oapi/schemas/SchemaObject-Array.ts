import { ExternalDocumentationObject } from "../objects/ExternalDocumentationObject";

export interface SchemaObjectArray {
  type: string;
  items?: SchemaObjectPrimitive;
  description?: string;
  title?: string;
  deprecated?: boolean;
  externalDocs?: ExternalDocumentationObject;
}
