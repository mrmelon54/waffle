export default class PathItemObject {
  $$raw: any;
  $ref: string;
  summary: string;
  description: string;
  get: OperationObject;
  put: OperationObject;
  post: OperationObject;
  delete: OperationObject;
  options: OperationObject;
  head: OperationObject;
  patch: OperationObject;
  trace: OperationObject;
  servers: ServerObject[];
  parameters: ParameterObject | ReferenceObject[];

  constructor(v) {
    this.$$raw = v;
    this.$ref = v.$ref;
    this.summary = v.summary;
    this.description = v.description;
    this.get = new OperationObject(v.get);
    this.put = new OperationObject(v.put);
    this.post = new OperationObject(v.post);
    this.delete = new OperationObject(v.delete);
    this.options = new OperationObject(v.options);
    this.head = new OperationObject(v.head);
    this.patch = new OperationObject(v.patch);
    this.trace = new OperationObject(v.trace);
    // TODO: brrr
  }
}
