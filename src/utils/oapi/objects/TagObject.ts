import { parseArray } from "../utils/ObjectUtils";
import StaticOptional from "../../StaticOptional";
import ExternalDocumentationObject from "./ExternalDocumentationObject";
import OperationObject from "./OperationObject";

export default class TagObject {
  $$raw: any;
  $$requests: OperationObject[];
  name: string;
  description: Optional<string>;
  externalDocs: Optional<ExternalDocumentationObject>;

  private constructor() {}

  static parseArray(v: any): StaticOptional<TagObject[]> {
    return parseArray<TagObject>(v, TagObject.parse);
  }

  static parse(v: any): StaticOptional<TagObject> {
    if (v === null || v === undefined) return StaticOptional.emptyWithError("object missing");
    let o = new TagObject();
    o.$$raw = v;
    o.$$requests = [];
    o.name = v.name;
    o.description = StaticOptional.full(v.description);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return StaticOptional.full(o);
  }
}
