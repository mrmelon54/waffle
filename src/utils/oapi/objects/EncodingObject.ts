import Ref from "../utils/Ref";
import {Style} from "../values/Styles";
import {HeaderObject} from "./HeaderObject";

export interface EncodingObject {
  contentType?: string;
  headers: {[key: string]: HeaderObject | Ref<HeaderObject>};
  style?: Style;
  explode?: boolean;
  allowReserved?: boolean;
}
