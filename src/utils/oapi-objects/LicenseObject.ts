import ErrorCollector from "../ErrorCollector";

export default class LicenseObject {
  $$raw: any;
  $$err: ErrorCollector;
  name: Required<string>;
  identifier?: string;
  url?: string;

  constructor(v: any) {
    this.$$raw = v;
    this.name = v.name;
    this.identifier = v.identifier;
    this.url = v.url;
  }

  valid(): boolean {
    return this.$$err.clean();
  }
}
