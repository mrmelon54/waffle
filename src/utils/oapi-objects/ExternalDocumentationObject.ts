export default class ExternalDocumentationObject {
  $$raw: any;
  description: string;
  url: string;

  constructor(v) {
    this.$$raw = v;
    this.description = v.description;
    this.url = v.url;
  }
}
