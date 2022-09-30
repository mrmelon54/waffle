import { parseArray } from "../utils/ObjectUtils";
import StaticOptional from "../../StaticOptional";

export default class SecurityRequirementObject {
  $$raw: any;
  fields: Map<string, string[]>;

  private constructor() {}

  static parseArray(v: any): Optional<SecurityRequirementObject[]> {
    return parseArray<SecurityRequirementObject>(v, SecurityRequirementObject.parse);
  }

  static parse( v: any): Promise<Optional<SecurityRequirementObject>> {
    if (v === null || v === undefined) return StaticOptional.emptyWithError("object missing");
    let o = new SecurityRequirementObject();
    o.$$raw = v;
    o.fields = new Map();
    for (let a of Object.keys(v)) {
      if (Array.isArray(v[a]) && v[a].length > 0 && v[a].every((x) => typeof x === "string")) {
        let b = <string[]>v[a];
        o.fields.set(a, b);
      } else return StaticOptional.emptyWithError("Invalid security requirement values array");
    }
    return StaticOptional.full(o);
  }
}
