import StaticOptional from "../../StaticOptional";

export default class SchemaObject {
  $$raw: any;
  $ref: Optional<string>;

  private constructor() {}

  static parse(v: any): StaticOptional<SchemaObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new SchemaObject();
    o.$$raw = v;
    o.$ref = StaticOptional.full(v.$ref);
    return StaticOptional.full(o);
  }
}
