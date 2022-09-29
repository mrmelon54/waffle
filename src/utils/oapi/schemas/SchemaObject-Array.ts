import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import OpenApiContext from "../utils/OpenApiContext";
import ExternalDocumentationObject from "../objects/ExternalDocumentationObject";
import SchemaObject from "../objects/SchemaObject";
import SchemaObjectPrimitive from "./SchemaObject-Primitive";

export default class SchemaObjectArray {
  $$raw: any;
  $$ctx: OpenApiContext;
  $$orig: SchemaObject;
  $ref: Optional<string>;
  type: string;
  items: Optional<SchemaObjectPrimitive>;
  description: Optional<string>;
  title: Optional<string>;
  deprecated: Optional<boolean>;
  externalDocs: Optional<ExternalDocumentationObject>;

  private constructor() {}

  static parse(ctx: OpenApiContext, z: SchemaObject): Optional<SchemaObjectArray> {
    let v = z.$$raw;
    let o = new SchemaObjectArray();
    o.$$raw = v;
    o.$$ctx = ctx;
    o.$$orig = z;
    o.$ref = z.$ref;
    o.type = "array";
    let rItems = SchemaObject.parse(ctx, v.items);
    o.items = rItems.isFull() ? rItems.get().asPrimitive() : StaticOptional.empty();
    o.description = StaticOptional.full(v.description);
    o.title = StaticOptional.full(v.title);
    o.deprecated = StaticOptional.full(v.deprecated);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return StaticOptional.full(o);
  }
}
