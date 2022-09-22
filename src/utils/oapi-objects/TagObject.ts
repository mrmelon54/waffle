import ExternalDocumentationObject from "./ExternalDocumentationObject";

export default class TagObject {
  $$raw: any;
  name: string;
  description: string;
  externalDocs: ExternalDocumentationObject;

  constructor(v) {
    this.$$raw = v;
    this.name = v.name;
    this.description = v.description;
    this.externalDocs = new ExternalDocumentationObject(v.externalDocs);
  }
}
