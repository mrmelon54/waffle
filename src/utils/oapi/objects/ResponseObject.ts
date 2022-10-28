import type Ref from "../utils/Ref";
import type { HeaderObject } from "./HeaderObject";
import type { LinkObject } from "./LinkObject";
import type { MediaTypeObject } from "./MediaTypeObject";

interface ResponseObject {
  description: string;
  headers?: { [key: string]: HeaderObject | Ref<HeaderObject> };
  content?: { [key: string]: MediaTypeObject };
  links?: { [key: string]: LinkObject | Ref<LinkObject> };
}

export type { ResponseObject };
