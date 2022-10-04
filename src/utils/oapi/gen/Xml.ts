import {SchemaObject} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";

export default class XmlExample {
  _p: OpenApiParser;
  _f: OpenApiFile;

  constructor(_p: OpenApiParser, _f: OpenApiFile) {
    this._p = _p;
    this._f = _f;
  }

  async generate(a: SchemaObject): Promise<any> {
    return await this.genUnknown(0, this._p, this._f, a, []);
  }

  
}
