export default class ServerObject {
  $$raw: any;
  url: string;
  description: string;
  variables: Map<string, ServerVariableObject>;

  constructor(v) {
    this.$$raw = v;
    this.url = v.url;
    this.description = v.description;
    // TODO: brrr
  }
}
