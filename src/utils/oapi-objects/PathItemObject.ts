import Optional from "../Optional";
import ReferenceObject from "./ReferenceObject";
import ServerObject from "./ServerObject";

type OperationObject = string;
type ParameterObject = string;

export default class PathItemObject {
  $$raw: any;
  summary: Optional<string>;
  description: Optional<string>;
  get: Optional<OperationObject>;
  put: Optional<OperationObject>;
  post: Optional<OperationObject>;
  delete: Optional<OperationObject>;
  options: Optional<OperationObject>;
  head: Optional<OperationObject>;
  patch: Optional<OperationObject>;
  trace: Optional<OperationObject>;
  servers: Optional<ServerObject[]>;
  parameters: Optional<(ParameterObject | ReferenceObject)[]>;

  private constructor() {}

  static parse(v: any): Optional<PathItemObject> {
    if (!v) return Optional.empty();
    let o = new PathItemObject();
    o.$$raw = v;
    o.summary = Optional.full(v.summary);
    o.description = Optional.full(v.description);
    /*&
    o.get = OperationObject.parse(v.get);
    o.put = OperationObject.parse(v.put);
    o.post = OperationObject.parse(v.post);
    o.delete = OperationObject.parse(v.delete);
    o.options = OperationObject.parse(v.options);
    o.head = OperationObject.parse(v.head);
    o.patch = OperationObject.parse(v.patch);
    o.trace = OperationObject.parse(v.trace);
    */
    o.servers = ServerObject.parseArray(v.servers);
    //o.parameters = ParameterObject.parse(v.parameters);
    return Optional.full(o);
  }
}
