import StaticOptional from "../../StaticOptional";
import isURL from "validator/lib/isURL";

export default class ExternalDocumentationObject {
  $$raw: any;
  description: Optional<string>;
  url: Required<string>;

  private constructor() {}

  static parse(v: any): StaticOptional<ExternalDocumentationObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    if (!v) return StaticOptional.empty();
    let o = new ExternalDocumentationObject();
    o.$$raw = v;
    o.description = StaticOptional.full(v.description);
    o.url = v.url;
    if (!isURL(v.url)) return StaticOptional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return StaticOptional.full(o);
  }
}
