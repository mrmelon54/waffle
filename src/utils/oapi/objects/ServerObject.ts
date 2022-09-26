import isURL from "validator/lib/isURL";
import { parseArray, parseMap } from "../utils/ObjectUtils";
import Optional from "../../Optional";
import ServerVariableObject from "./ServerVariableObject";

export default class ServerObject {
  $$raw: any;
  url: string;
  description: Optional<string>;
  variables: Optional<Map<string, ServerVariableObject>>;

  private constructor() {}

  static parseArray(v: any): Optional<ServerObject[]> {
    return parseArray<ServerObject>(v, ServerObject.parse);
  }

  static parse(v: any): Optional<ServerObject> {
    if (v === null || v === undefined) return Optional.emptyWithError("object missing");
    let o = new ServerObject();
    o.$$raw = v;
    o.url = v.url;
    o.description = Optional.full(v.description);
    o.variables = parseMap(v.variables, ServerVariableObject.parse);
    if (!isURL(v.url)) return Optional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return Optional.full(o);
  }
}
