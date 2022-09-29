import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import ReferenceOptional from "../../ReferenceOptional";
import OpenApiContext from "../utils/OpenApiContext";
import SchemaObjectObject from "../schemas/SchemaObject-Object";
import { parseCtxArray } from "../utils/ObjectUtils";

export default class SchemaObject {
  $$raw: any;
  $$ctx: OpenApiContext;
  $ref: Optional<string>;
  type: string;
  allOf: Optional<SchemaObject[]>;
  anyOf: Optional<SchemaObject[]>;
  oneOf: Optional<SchemaObject[]>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<SchemaObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new SchemaObject();
    o.$$raw = v;
    o.$$ctx = ctx;
    o.$ref = StaticOptional.full(v.$ref);
    o.type = v.type || "object";
    o.allOf = parseCtxArray(ctx, v.allOf, SchemaObject.parse);
    o.anyOf = parseCtxArray(ctx, v.anyOf, SchemaObject.parse);
    o.oneOf = parseCtxArray(ctx, v.oneOf, SchemaObject.parse);
    if (o.$ref.isFull()) return ReferenceOptional.generate(ctx, o.$ref.get(), (x) => x instanceof SchemaObject);
    return StaticOptional.full(o);
  }

  asObject(): Optional<SchemaObjectObject> {
    if (this.type !== "object") return StaticOptional.emptyWithError("Only SchemaObject of type 'object' will convert to an object");
    return SchemaObjectObject.parse(this.$$ctx, this);
  }

  asArray(): Optional<SchemaObjectObject> {
    if (this.type !== "array") return StaticOptional.emptyWithError("Only SchemaObject of type 'object' will convert to an object");
    return SchemaObjectArray.parse(this.$$ctx, this);
  }

  asPrimitive(): Optional<SchemaObjectObject> {
    if (this.type !== "primitive") return StaticOptional.emptyWithError("Only SchemaObject of type 'object' will convert to an object");
    return SchemaObjectPrimitive.parse(this.$$ctx, this);
  }

  asAllOf(): Optional<SchemaObject[]> {
    return this.allOf;
  }

  asAnyOf(): Optional<SchemaObject[]> {
    return this.anyOf;
  }

  asOneOf(): Optional<SchemaObject[]> {
    return this.oneOf;
  }
}
