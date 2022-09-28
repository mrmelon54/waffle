import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import ReferenceOptional from "../../ReferenceOptional";
import OpenApiContext from "../utils/OpenApiContext";

export default class SchemaObject {
  $$raw: any;
  $ref: Optional<string>;
  type: Optional<string>;

  constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<SchemaObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new SchemaObject();
    o.$$raw = v;
    o.$ref = StaticOptional.full(v.$ref);
    o.type = StaticOptional.full(v.type);
    if (o.$ref.isFull()) return ReferenceOptional.generate(ctx, o.$ref.get(), (x) => x instanceof SchemaObject);
    return StaticOptional.full(o);
  }
}
