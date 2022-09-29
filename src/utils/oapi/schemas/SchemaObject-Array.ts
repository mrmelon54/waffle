import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import { parseArray, parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import ExternalDocumentationObject from "../objects/ExternalDocumentationObject";
import SchemaObject from "../objects/SchemaObject";

export default class SchemaObjectArray {
  $$raw: any;
  $$ctx: OpenApiContext;
  $$orig: SchemaObject;
  $ref: Optional<string>;
  type: string;
  items: Optional<SchemaObjectArrayItem>;
  description: Optional<string>;
  properties: Optional<Map<string, SchemaObject>>;
  additionalProperties: Optional<Map<string, any>>;
  title: Optional<string>;
  requiredProperties: Optional<string[]>;
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
    o.description = StaticOptional.full(v.description);
    o.properties = parseCtxMap(ctx, v.properties, SchemaObject.parse);
    o.additionalProperties = parseCtxMap(ctx, v.additionalProperties, (x) => StaticOptional.full({}));
    o.title = StaticOptional.full(v.title);
    o.requiredProperties = parseArray(v.requiredProperties, (x) => x.toString());
    o.deprecated = StaticOptional.full(v.deprecated);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return StaticOptional.full(o);
  }
}
