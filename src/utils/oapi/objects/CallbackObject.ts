import type Ref from "../utils/Ref";
import type { PathItemObject } from "./PathItemObject";

interface CallbackObject {
  [key: string]: PathItemObject | Ref<PathItemObject>;
}

export type { CallbackObject };
