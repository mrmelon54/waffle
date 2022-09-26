import Optional from "../../Optional";

export default class ReferenceObject {
  $$raw: any;
  $ref: string;
  summary: Optional<string>;
  description: Optional<string>;

  private constructor() {}

  static parse(v: any): Optional<ReferenceObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new ReferenceObject();
    o.$$raw = v;
    o.summary = Optional.full(v.summary);
    o.description = Optional.full(v.description);
    return Optional.full(o);
  }
}
