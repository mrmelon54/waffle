import StaticOptional from "../../StaticOptional";
import HeaderObject from "./HeaderObject";
import MediaTypeObject from "./MediaTypeObject";
import LinkObject from "./LinkObject";
import ReferenceObject from "./ReferenceObject";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";

export default class ResponseObject {
  $$raw: any;
  $$code: string;
  description: string;
  headers: Optional<Map<string, HeaderObject | ReferenceObject>>;
  content: Optional<Map<string, MediaTypeObject>>;
  links: Optional<Map<string, LinkObject | ReferenceObject>>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): StaticOptional<ResponseObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new ResponseObject();
    o.$$raw = v;
    o.description = v.description;
    o.headers = parseCtxMap(ctx, v.headers, HeaderObject.parse);
    o.content = parseCtxMap(ctx, v.content, MediaTypeObject.parse);
    o.links = parseCtxMap(ctx, v.links, LinkObject.parse);
    return StaticOptional.full(o);
  }
}
