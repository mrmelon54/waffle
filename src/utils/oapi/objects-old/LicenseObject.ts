import StaticOptional from "../../StaticOptional";
import isURL from "validator/lib/isURL";

export default class LicenseObject {
  $$raw: any;
  name: string;
  identifier: Optional<string>;
  url: Optional<string>;

  static parse( v: any): Promise<Optional<LicenseObject>> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new LicenseObject();
    o.$$raw = v;
    o.name = v.name;
    o.identifier = StaticOptional.full(v.identifier);
    o.url = StaticOptional.full(v.url);
    if (o.url.isFull() && !isURL(v.url)) return StaticOptional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return StaticOptional.full(o);
  }
}
