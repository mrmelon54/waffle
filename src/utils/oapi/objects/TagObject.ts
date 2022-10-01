import { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import { OperationObject } from "./OperationObject";

export interface TagObject {
  $$requests?: OperationObject[];
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}
