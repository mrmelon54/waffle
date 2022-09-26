import Optional from "../../Optional";

export default class ExampleObject {
  $$raw: any;
  summary: Optional<string>;
  description: Optional<string>;
  value: Optional<any>;
  externalValue: Optional<string>;

  private constructor() {}

  static parse(v: any):Optional<ExampleObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new ExampleObject();
    o.$$raw = v;
    o.summary = Optional.full(v.summary);
    o.description = Optional.full(v.description);
    o.value = Optional.full(v.value);
    o.externalValue = Optional.full(v.externalValue);
    return Optional.full(o);
  }
}
