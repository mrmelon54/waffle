import Ref from "../utils/Ref";
import {HeaderObject} from "./HeaderObject";
import {LinkObject} from "./LinkObject";
import {MediaTypeObject} from "./MediaTypeObject";

export interface ResponseObject {
  description: string;
  headers?: {[key: string]: HeaderObject | Ref<HeaderObject>};
  content?: {[key: string]: MediaTypeObject};
  links?: {[key: string]: LinkObject | Ref<LinkObject>};
}
