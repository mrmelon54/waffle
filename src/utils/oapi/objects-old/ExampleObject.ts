import StaticOptional from "../../StaticOptional";

export default class ExampleObject {
  $$raw: any;
  summary: Optional<string>;
  description: Optional<string>;
  value: Optional<any>;
  externalValue: Optional<string>;

  private constructor() {}

  static parse( v: any): Promise<Optional<ExampleObject>> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new ExampleObject();
    o.$$raw = v;
    o.summary = StaticOptional.full(v.summary);
    o.description = StaticOptional.full(v.description);
    o.value = StaticOptional.full(v.value);
    o.externalValue = StaticOptional.full(v.externalValue);
    return StaticOptional.full(o);
  }
}
