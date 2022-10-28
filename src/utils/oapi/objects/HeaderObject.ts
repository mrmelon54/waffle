import type { ExternalDocumentationObject } from "./ExternalDocumentationObject";

interface HeaderObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export type { HeaderObject };
