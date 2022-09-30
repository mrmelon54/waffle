import Optional from "../../Optional";
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

  static parseArray(v: any): Optional<ServerObject[]> {
    return parseArray<ServerObject>(v, ServerObject.parse);
  }

  static parse( v: any): Promise<Optional<ServerObject>> {
    if (v === null || v === undefined) return StaticOptional.emptyWithError("object missing");
    let o = new ServerObject();
    o.$$raw = v;
    o.url = v.url;
    o.description = StaticOptional.full(v.description);
    o.variables = parseMap(v.variables, ServerVariableObject.parse);
    if (v.url.slice(0, 2) == "//") v.url = window.location.protocol + v.url;
    if (!isURL(v.url)) return StaticOptional.emptyWithError(`Invalid URL value: '${v.url}'`);
    return StaticOptional.full(o);
  }
}
