import type { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import type { OperationObject } from "./OperationObject";

interface TagObject {
  $$requests?: OperationObject[];
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export type { TagObject };
