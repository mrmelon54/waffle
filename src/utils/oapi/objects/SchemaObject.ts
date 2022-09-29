import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import ReferenceOptional from "../../ReferenceOptional";
import OpenApiContext from "../utils/OpenApiContext";
import SchemaObjectObject from "../schemas/SchemaObject-Object";
import { parseCtxArray } from "../utils/ObjectUtils";
import SchemaObjectArray from "../schemas/SchemaObject-Array";
import SchemaObjectPrimitive from "../schemas/SchemaObject-Primitive";

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
    console.error("[SchemaObject] parsing", v);
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new SchemaObject();
    o.$$raw = v;
    o.$$ctx = ctx;
    o.$ref = StaticOptional.full(v.$ref);
    o.type = v.type || "detect";
    o.allOf = parseCtxArray(ctx, v.allOf, SchemaObject.parse);
    o.anyOf = parseCtxArray(ctx, v.anyOf, SchemaObject.parse);
    o.oneOf = parseCtxArray(ctx, v.oneOf, SchemaObject.parse);
    if (v.allOf !== undefined) console.log("Trying to parse", v.allOf, o.allOf);
    if (o.$ref.isFull()) return ReferenceOptional.generate(ctx, o.$ref.get(), () => true);
    return StaticOptional.full(o);
  }

  asObject(): Optional<SchemaObjectObject> {
    if (this.type !== "object") return StaticOptional.emptyWithError("Only SchemaObject of type 'object' will convert to an object");
    return SchemaObjectObject.parse(this.$$ctx, this);
  }

  asArray(): Optional<SchemaObjectArray> {
    if (this.type !== "array") return StaticOptional.emptyWithError("Only SchemaObject of type 'array' will convert to an object");
    return SchemaObjectArray.parse(this.$$ctx, this);
  }

  asPrimitive(): Optional<SchemaObjectPrimitive> {
    if (this.type === "object" || this.type === "array") return StaticOptional.emptyWithError("SchemaObject of type 'object' or 'array' cannot be converted to primitive");
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
