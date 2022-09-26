import Optional from "../../Optional";

export default class SchemaObject {
  $$raw: any;
  $ref: Optional<string>;

  private constructor() {}

  static parse(v: any): Optional<SchemaObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new SchemaObject();
    o.$$raw = v;
    o.$ref = Optional.full(v.$ref);
    return Optional.full(o);
  }
}
