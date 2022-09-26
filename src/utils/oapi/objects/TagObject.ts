import { parseArray } from "../utils/ObjectUtils";
import Optional from "../../Optional";
import ExternalDocumentationObject from "./ExternalDocumentationObject";
import OperationObject from "./OperationObject";

export default class TagObject {
  $$raw: any;
  $$requests: OperationObject[];
  name: string;
  description: Optional<string>;
  externalDocs: Optional<ExternalDocumentationObject>;

  private constructor() {}

  static parseArray(v: any): Optional<TagObject[]> {
    return parseArray<TagObject>(v, TagObject.parse);
  }

  static parse(v: any): Optional<TagObject> {
    if (v === null || v === undefined) return Optional.emptyWithError("object missing");
    let o = new TagObject();
    o.$$raw = v;
    o.$$requests = [];
    o.name = v.name;
    o.description = Optional.full(v.description);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return Optional.full(o);
  }
}
