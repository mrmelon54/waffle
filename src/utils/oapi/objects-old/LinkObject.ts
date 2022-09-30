import StaticOptional from "../../StaticOptional";
import { parseMap } from "../utils/ObjectUtils";
import ServerObject from "./ServerObject";

export default class LinkObject {
  $$raw: any;
  operationRef: Optional<string>;
  operationId: Optional<string>;
  parameters: Optional<Map<string, any>>;
  requestBody: Optional<any>;
  description: Optional<string>;
  server: Optional<ServerObject>;

  private constructor() {}

  static parse( v: any): Promise<Optional<LinkObject>> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new LinkObject();
    o.$$raw = v;
    o.operationRef = StaticOptional.full(v.operationRef);
    o.operationId = StaticOptional.full(v.operationId);
    o.parameters = parseMap(v.parameters, (x) => x);
    o.requestBody = StaticOptional.full(o.requestBody);
    o.description = StaticOptional.full(v.description);
    o.server = ServerObject.parse(v.server);
    return StaticOptional.full(o);
  }
}
