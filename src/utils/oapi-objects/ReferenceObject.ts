export default class ReferenceObject {
  $$raw: any;
  $ref: string;
  summary: string;
  description: string;

  constructor(v) {
    this.$$raw = v;
    this.$ref = v.$ref;
    this.summary = v.summary;
    this.description = v.description;
  }
}
