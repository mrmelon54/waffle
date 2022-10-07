import {SchemaObject} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import {GenericGen} from "./_GenericGen";

export default class JsonExample extends GenericGen {
  async generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any> {
    return await this.genUnknown(0, _p, _f, a, []);
  }
}
