import isURL from "validator/lib/isURL";
import { parseArray, parseMap } from "../utils/ObjectUtils";
import StaticOptional from "../../StaticOptional";
import ServerVariableObject from "./ServerVariableObject";

export default class ServerObject {
  $$raw: any;
  url: string;
  description: Optional<string>;
  variables: Optional<Map<string, ServerVariableObject>>;

  private constructor() {}

  static parseArray(v: any): StaticOptional<ServerObject[]> {
    return parseArray<ServerObject>(v, ServerObject.parse);
  }

  static parse(v: any): StaticOptional<ServerObject> {
    if (v === null || v === undefined) return StaticOptional.emptyWithError("object missing");
    let o = new ServerObject();
    o.$$raw = v;
    o.url = v.url;
    o.description = StaticOptional.full(v.description);
    o.variables = parseMap(v.variables, ServerVariableObject.parse);
    if (!isURL(v.url)) return StaticOptional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return StaticOptional.full(o);
  }
}
