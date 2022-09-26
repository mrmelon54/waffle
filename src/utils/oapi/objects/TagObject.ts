import { parseArray } from "../utils/ObjectUtils";
import Optional from "../../Optional";
import ExternalDocumentationObject from "./ExternalDocumentationObject";

export default class TagObject {
  $$raw: any;
  name: string;
  description: Optional<string>;
  externalDocs: Optional<ExternalDocumentationObject>;

  private constructor() {}

  static parseArray(v: any): Optional<TagObject[]> {
    return parseArray<TagObject>(v, TagObject.parse);
  }

  private static parse(v: any): Optional<TagObject> {
    if (v === null || v === undefined) return Optional.emptyWithError("object missing");
    let o = new TagObject();
    o.$$raw = v;
    o.name = v.name;
    o.description = Optional.full(v.description);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return Optional.full(o);
  }
}
