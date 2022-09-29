import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import SchemaObject from "./SchemaObject";

export default class SchemaObjectObject {
  $$raw: any;
  $$ctx: OpenApiContext;
  $$orig: SchemaObject;
  $ref: Optional<string>;
  type: Optional<string>;
  properties: Optional<Map<string, SchemaObject>>;

  static parse(ctx: OpenApiContext, v: SchemaObject): Optional<SchemaObjectObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new SchemaObjectObject();
    o.$$raw = v.$$raw;
    o.$$ctx = ctx;
    o.$$orig = v;
    o.$ref = v.$ref;
    o.type = v.type;
    o.properties = parseCtxMap(ctx, o.$$raw.properties, SchemaObject.parse);

    return StaticOptional.full(o);
  }
}
