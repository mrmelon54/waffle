import Optional from "../../Optional";
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

  static parse(v: any): Optional<LinkObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new LinkObject();
    o.$$raw = v;
    o.operationRef = Optional.full(v.operationRef);
    o.operationId = Optional.full(v.operationId);
    o.parameters = parseMap(v.parameters, (x) => x);
    o.requestBody = Optional.full(o.requestBody);
    o.description = Optional.full(v.description);
    o.server = ServerObject.parse(v.server);
    return Optional.full(o);
  }
}
