import Optional from "../../Optional";
import isURL from "validator/lib/isURL";

export default class LicenseObject {
  $$raw: any;
  name: string;
  identifier: Optional<string>;
  url: Optional<string>;

  static parse(v: any): Optional<LicenseObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new LicenseObject();
    o.$$raw = v;
    o.name = v.name;
    o.identifier = Optional.full(v.identifier);
    o.url = Optional.full(v.url);
    if (o.url.isFull() && !isURL(v.url)) return Optional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return Optional.full(o);
  }
}
