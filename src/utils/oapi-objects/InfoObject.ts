import semver from "semver";

export default class InfoObject {
  $$raw: any;
  title: string;
  summary: string;
  description: string;
  termsOfService: string;
  contact: ContactObject;
  license: LicenseObject;
  version: semver.SemVer;

  constructor(v) {
    this.$$raw = v;
    this.title = v.title;
    this.summary = v.summary;
    this.description = v.description;
    this.termsOfService = v.termsOfService;
    this.contact = new ContactObject(v.contact);
    this.license = new LicenseObject(v.license);
    this.version = semver.parse(v.version);
  }
}
