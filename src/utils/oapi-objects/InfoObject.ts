import semver from "semver";
import isURL from "validator/lib/isURL";
import Optional from "../Optional";
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

  static parse(v: any): Optional<InfoObject> {
    if (!v) return Optional.emptyWithError("Invalid info object");
    let o = new InfoObject();
    o.$$raw = v;
    o.title = v.title;
    o.summary = Optional.full(v.summary);
    o.description = Optional.full(v.description);
    o.termsOfService = Optional.full(v.termsOfService);
    if (o.termsOfService.isFull() && !isURL(v.termsOfService)) return Optional.emptyWithError(`Invalid URL value: '${v.termsOfService}'`);
    o.contact = ContactObject.parse(v.contact);
    o.license = LicenseObject.parse(v.license);
    let ver = semver.parse(v.version);
    if (!ver) return Optional.emptyWithError("Invalid spec version: " + ver);
    o.version = ver!;
    return Optional.full(o);
  }
}
