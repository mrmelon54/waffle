import type Ref from "../utils/Ref";
import type { Style } from "../values/Styles";
import type { HeaderObject } from "./HeaderObject";

interface EncodingObject {
  contentType?: string;
  headers: { [key: string]: HeaderObject | Ref<HeaderObject> };
  style?: Style;
  explode?: boolean;
  allowReserved?: boolean;
}

export type { EncodingObject };
