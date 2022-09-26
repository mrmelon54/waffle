import Optional from "../../Optional";
import isURL from "validator/lib/isURL";

export default class ExternalDocumentationObject {
  $$raw: any;
  description: Optional<string>;
  url: Required<string>;

  private constructor() {}

  static parse(v: any): Optional<ExternalDocumentationObject> {
    if (v === null || v === undefined) return Optional.empty();
    if (!v) return Optional.empty();
    let o = new ExternalDocumentationObject();
    o.$$raw = v;
    o.description = Optional.full(v.description);
    o.url = v.url;
    if (!isURL(v.url)) return Optional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return Optional.full(o);
  }
}
