import StaticOptional from "../../StaticOptional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import MediaTypeObject from "./MediaTypeObject";

export default class RequestBodyObject {
  $$raw: any;
  description: Optional<string>;
  content: Map<string, MediaTypeObject>;
  required: Optional<boolean>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): StaticOptional<RequestBodyObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new RequestBodyObject();
    o.$$raw = v;
    o.description = StaticOptional.full(v.description);
    let content = parseCtxMap(ctx, v.content, MediaTypeObject.parse);
    if (content.isEmpty()) return StaticOptional.emptyWithError(`RequestBodyObject with invalid content`);
    o.required = StaticOptional.full(v.required);
    return StaticOptional.full(o);
  }
}
