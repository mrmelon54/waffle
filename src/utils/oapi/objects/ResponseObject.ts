import { HeaderObject } from "./HeaderObject";
import { LinkObject } from "./LinkObject";
import { MediaTypeObject } from "./MediaTypeObject";

export interface ResponseObject {
  description: string;
  headers?: Map<string, HeaderObject | Ref<HeaderObject>>;
  content?: Map<string, MediaTypeObject>;
  links?: Map<string, LinkObject | Ref<LinkObject>>;
}
