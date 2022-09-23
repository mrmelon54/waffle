import ErrorCollector from "../ErrorCollector";

export default class ContactObject {
  $$raw: any;
  $$err: ErrorCollector;
  name?: string;
  url?: string;
  email?: string;

  constructor(v: any) {
    this.$$raw = v;
    this.name = v.name;
    this.url = v.url;
    this.email = v.email;
  }

  valid(): boolean {
    return this.$$err.clean();
  }
}
