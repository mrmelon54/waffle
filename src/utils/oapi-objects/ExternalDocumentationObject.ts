export default class ExternalDocumentationObject {
  $$raw: any;
  description?: string;
  url: Required<string>;

  constructor(v: any) {
    this.$$raw = v;
    this.description = v.description;
    this.url = v.url;
  }
}
