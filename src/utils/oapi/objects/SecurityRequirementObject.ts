import { parseArray } from "../ObjectUtils";
import Optional from "../Optional";

export default class SecurityRequirementObject {
  $$raw: any;
  fields: Map<string, string[]>;

  private constructor() {}

  static parseArray(v: any): Optional<SecurityRequirementObject[]> {
    return parseArray<SecurityRequirementObject>(v, SecurityRequirementObject.parse);
  }

  static parse(v: any): Optional<SecurityRequirementObject> {
    if (v === null || v === undefined) return Optional.emptyWithError("object missing");
    let o = new SecurityRequirementObject();
    o.$$raw = v;
    o.fields = new Map();
    for (let a of Object.keys(v)) {
      if (Array.isArray(v[a]) && v[a].length > 0 && v[a].every((x) => typeof x === "string")) {
        let b = <string[]>v[a];
        o.fields.set(a, b);
      } else return Optional.emptyWithError("Invalid security requirement values array");
    }
    return Optional.full(o);
  }
}
