import type Ref from "../utils/Ref";
import type { PathItemObject } from "./PathItemObject";

interface PathsObject {
  [key: string]: PathItemObject | Ref<PathItemObject>;
}

export type { PathsObject };
