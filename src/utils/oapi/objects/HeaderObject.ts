import { ExternalDocumentationObject } from "./ExternalDocumentationObject";

export interface HeaderObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}
