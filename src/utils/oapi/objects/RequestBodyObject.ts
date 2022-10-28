import type { MediaTypeObject } from "./MediaTypeObject";

interface RequestBodyObject {
  description?: string;
  content: { [key: string]: MediaTypeObject };
  required?: boolean;
}

export type { RequestBodyObject };
