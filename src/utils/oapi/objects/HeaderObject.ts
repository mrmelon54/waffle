import StaticOptional from "../../StaticOptional";
import OpenApiContext from "../utils/OpenApiContext";
import ExternalDocumentationObject from "./ExternalDocumentationObject";

export default class HeaderObject {
  $$raw: any;
  name: string;
  description: Optional<string>;
  externalDocs: Optional<ExternalDocumentationObject>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): StaticOptional<HeaderObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new HeaderObject();
    o.$$raw = v;
    o.name = v.name;
    o.description = StaticOptional.full(v.description);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return StaticOptional.full(o);
  }
}
