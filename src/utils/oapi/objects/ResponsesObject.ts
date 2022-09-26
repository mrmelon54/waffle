import Optional from "../../Optional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import ReferenceObject from "./ReferenceObject";
import ResponseObject from "./ResponseObject";

export default class ResponsesObject {
  $$raw: any;
  $$internal: Map<string, ResponseObject | ReferenceObject>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<ResponsesObject> {
    let o = new ResponsesObject();
    o.$$raw = v;
    let m = parseCtxMap<string, ResponseObject | ReferenceObject>(ctx, v, ResponseObject.parse);
    if (m.isEmpty()) return Optional.emptyWithError(`Invalid ResponsesObject: ${m.errorReason() ?? "No reason"}`);
    o.$$internal = m.get();
    return Optional.full(o);
  }

  get(code: string): Optional<ResponseObject | ReferenceObject> {
    if (code.length !== 3) return Optional.emptyWithError(`Invalid code length: ${code.length} must be length 3`);
    switch (code[0]) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        break;
      default:
        return Optional.emptyWithError(`Invalid code length: ${code.length} must be length 3`);
    }
    let major = code[0];
    if (this.$$internal.has(code)) return Optional.full(this.$$internal.get(code));
    if (this.$$internal.has(major + "XX")) return Optional.full(this.$$internal.get(major + "XX"));
    if (this.$$internal.has("default")) return Optional.full(this.$$internal.get("default"));
    return Optional.emptyWithError("No valid status code, range or default response found");
  }
}
