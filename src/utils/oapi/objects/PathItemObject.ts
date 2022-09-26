import Optional from "../../Optional";
import OpenApiContext from "../utils/OpenApiContext";
import OperationObject from "./OperationObject";
import ParameterObject from "./ParameterObject";
import ReferenceObject from "./ReferenceObject";
import ServerObject from "./ServerObject";
import { Method, Methods } from "../values/Methods";

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

  opOrder: Method[];

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<PathItemObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new PathItemObject();
    o.$$raw = v;
    o.summary = Optional.full(v.summary);
    o.description = Optional.full(v.description);
    o.get = OperationObject.parse(ctx, v.get);
    o.put = OperationObject.parse(ctx, v.put);
    o.post = OperationObject.parse(ctx, v.post);
    o.delete = OperationObject.parse(ctx, v.delete);
    o.options = OperationObject.parse(ctx, v.options);
    o.head = OperationObject.parse(ctx, v.head);
    o.patch = OperationObject.parse(ctx, v.patch);
    o.trace = OperationObject.parse(ctx, v.trace);
    o.servers = ServerObject.parseArray(v.servers);
    o.parameters = ParameterObject.parseArray(ctx, v.parameters);

    o.opOrder = Object.entries(v)
      .filter((x) => Methods[x[0]] !== undefined)
      .map((x) => Methods[x[0]]);
    return Optional.full(o);
  }
}
