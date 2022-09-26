import Optional from "../../Optional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import EncodingObject from "./EncodingObject";
import ExampleObject from "./ExampleObject";
import ReferenceObject from "./ReferenceObject";
import SchemaObject from "./SchemaObject";

export default class MediaTypeObject {
  $$raw: any;
  schema: Optional<SchemaObject>;
  example: Optional<any>;
  examples: Optional<Map<string, ExampleObject | ReferenceObject>>;
  encoding: Optional<Map<string, EncodingObject>>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<MediaTypeObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new MediaTypeObject();
    o.$$raw = v;
    o.schema = SchemaObject.parse(v);
    o.example = Optional.full(v.example);
    o.examples = parseCtxMap(ctx, v.examples, ExampleObject.parse);
    o.encoding = parseCtxMap(ctx, v.encoding, EncodingObject.parse);
    return Optional.full(o);
  }
}
