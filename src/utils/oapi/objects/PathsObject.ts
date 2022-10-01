import Ref from "../utils/Ref";
import { PathItemObject } from "./PathItemObject";

export interface PathsObject {
  [key: string]: PathItemObject | Ref<PathItemObject>;
}
