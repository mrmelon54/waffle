import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import OpenApiContext from "../utils/OpenApiContext";
import ExternalDocumentationObject from "../objects-old/ExternalDocumentationObject";
import SchemaObject from "../objects-old/SchemaObject";
import { parseArray } from "../utils/ObjectUtils";

export default class SchemaObjectPrimitive {
  $$raw: any;
  $$ctx: OpenApiContext;
  $$orig: SchemaObject;
  $ref: Optional<string>;
  type: string;
  format: Optional<string>;
  description: Optional<string>;
  title: Optional<string>;
  deprecated: Optional<boolean>;
  externalDocs: Optional<ExternalDocumentationObject>;
  enumValues: Optional<any[]>;

  private constructor() {}

  static parse(ctx: OpenApiContext, z: SchemaObject): Optional<SchemaObjectPrimitive> {
    let v = z.$$raw;
    let o = new SchemaObjectPrimitive();
    o.$$raw = v;
    o.$$ctx = ctx;
    o.$$orig = z;
    o.$ref = z.$ref;
    o.type = v.type || "unknown";
    o.format = StaticOptional.full(v.format);
    o.description = StaticOptional.full(v.description);
    o.title = StaticOptional.full(v.title);
    o.deprecated = StaticOptional.full(v.deprecated);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    o.enumValues = parseArray(v.enum, (x) => StaticOptional.full(x));
    return StaticOptional.full(o);
  }
}
