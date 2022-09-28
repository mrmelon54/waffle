import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import OpenApiContext from "../utils/OpenApiContext";
import SchemaObject from "./SchemaObject";

export default class SchemaObjectObject extends SchemaObject {
  static parse(ctx: OpenApiContext, v: SchemaObject): Optional<SchemaObjectObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new SchemaObjectObject();
    o.$$raw = v.$$raw;
    o.$ref = v.$ref;
    o.type = v.type;
    
    return StaticOptional.full(o);
  }
}
