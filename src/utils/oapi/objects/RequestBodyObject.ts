import Optional from "../../Optional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import MediaTypeObject from "./MediaTypeObject";

export default class RequestBodyObject {
  $$raw: any;
  description: Optional<string>;
  content: Map<string, MediaTypeObject>;
  required: Optional<boolean>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<RequestBodyObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new RequestBodyObject();
    o.$$raw = v;
    o.description = Optional.full(v.description);
    let content = parseCtxMap(ctx, v.content, MediaTypeObject.parse);
    if (content.isEmpty()) return Optional.emptyWithError(`RequestBodyObject with invalid content`);
    o.required = Optional.full(v.required);
    return Optional.full(o);
  }
}
