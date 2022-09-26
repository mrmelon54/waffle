import Optional from "../../Optional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import ReferenceObject from "./ReferenceObject";

export default class ResponsesObject {
  $$raw: any;
  $$internal: Map<string, ResponseObject | ReferenceObject>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<ResponsesObject> {
    let o = new ResponsesObject();
    o.$$raw = v;
    let m: Map<string, ResponsesObject | ReferenceObject> = parseCtxMap(ctx, v, ResponseObject.parse);
    if (m.isEmpty()) return Optional.emptyWithError(`Invalid ResponsesObject: ${m.errorReason() ?? "No reason"}`);
    o.$$internal = m.get();
    return Optional.full(o);
  }

  get(code: string): Optional<ResponseObject> {
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
    // TODO: finish the get function
  }
}
