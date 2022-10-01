import { PathItemObject } from "./PathItemObject";

export interface CallbackObject {
  [key: string]: PathItemObject | Ref<PathItemObject>;
}
