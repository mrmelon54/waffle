import { ExternalDocumentationObject } from "./ExternalDocumentationObject";

export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}
