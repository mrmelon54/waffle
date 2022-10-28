import type { SchemaObject } from "../objects/SchemaObject";
import type OpenApiFile from "../utils/OpenApiFile";
import type OpenApiParser from "../utils/OpenApiParser";
import { GenericGen } from "./_GenericGen";

export default class JsonExample extends GenericGen {
  async generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any> {
    return await this.genUnknown(0, _p, _f, a, []);
  }
}
