import { MediaTypeObject } from "./MediaTypeObject";

export interface RequestBodyObject {
  description?: string;
  content: Map<string, MediaTypeObject>;
  required?: boolean;
}
