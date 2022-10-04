import {MediaTypeObject} from "./MediaTypeObject";

export interface RequestBodyObject {
  description?: string;
  content: {[key: string]: MediaTypeObject};
  required?: boolean;
}
