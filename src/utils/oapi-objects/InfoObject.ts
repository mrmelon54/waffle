import semver from "semver";
import ErrorCollector from "../ErrorCollector";
import ContactObject from "./ContactObject";
import LicenseObject from "./LicenseObject";

export default class InfoObject {
  $$raw: any;
  $$err: ErrorCollector;
  title: Required<string>;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: Required<semver.SemVer>;

  constructor(v: any) {
    this.$$raw = v;
    this.$$err = new ErrorCollector();
    this.title = v.title;
    this.summary = v.summary;
    this.description = v.description;
    this.termsOfService = v.termsOfService;
    this.contact = new ContactObject(v.contact);
    this.license = new LicenseObject(v.license);
    let ver = semver.parse(v.version);
    if (ver == null) this.$$err.add("Invalid OpenAPI version");
    else if (this.$$err.falseError("Invalid OpenAPI version", semver.satisfies(this.version!, ">=3.0.0"))) {
    } else this.version = ver!;
  }

  valid(): boolean {
    return this.$$err.clean();
  }
}
