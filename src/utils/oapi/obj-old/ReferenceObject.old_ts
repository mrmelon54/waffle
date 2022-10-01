import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";

export default class ReferenceObject {
  $$raw: any;
  $ref: string;
  summary: Optional<string>;
  description: Optional<string>;

  private constructor() {}

  static parse(v: any): Optional<ReferenceObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new ReferenceObject();
    o.$$raw = v;
    o.summary = StaticOptional.full(v.summary);
    o.description = StaticOptional.full(v.description);
    return StaticOptional.full(o);
  }
}
