import semver from "semver";
import isURL from "validator/lib/isURL";
import StaticOptional from "../../StaticOptional";
import ContactObject from "./ContactObject";
import LicenseObject from "./LicenseObject";

export default class InfoObject {
  $$raw: any;
  title: string;
  summary: Optional<string>;
  description: Optional<string>;
  termsOfService: Optional<string>;
  contact: Optional<ContactObject>;
  license: Optional<LicenseObject>;
  version: semver.SemVer;

  private constructor() {}

  static parse( v: any): Promise<Optional<InfoObject>> {
    if (v === null || v === undefined) return StaticOptional.emptyWithError("Invalid info object");
    let o = new InfoObject();
    o.$$raw = v;
    o.title = v.title;
    o.summary = StaticOptional.full(v.summary);
    o.description = StaticOptional.full(v.description);
    o.termsOfService = StaticOptional.full(v.termsOfService);
    if (o.termsOfService.isFull() && !isURL(v.termsOfService)) return StaticOptional.emptyWithError(`Invalid URL value: '${v.termsOfService}'`);
    o.contact = ContactObject.parse(v.contact);
    o.license = LicenseObject.parse(v.license);
    let ver = semver.parse(v.version);
    if (!ver) return StaticOptional.emptyWithError("Invalid spec version: " + ver);
    o.version = ver!;
    return StaticOptional.full(o);
  }
}
