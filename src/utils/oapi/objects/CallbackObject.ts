import Ref from "../utils/Ref";
import { PathItemObject } from "./PathItemObject";

export interface CallbackObject {
  [key: string]: PathItemObject | Ref<PathItemObject>;
}
