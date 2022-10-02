import OpenApiFile from "./OpenApiFile";
import OpenApiParser from "./OpenApiParser";

export default class Ctx<T> {
  $$parser: OpenApiParser;
  $$file: OpenApiFile;
  v: T;

  private constructor() {}

  static make<U>(parser: OpenApiParser, file: OpenApiFile, v: U): Ctx<U> {
    let o = new Ctx<U>();
    o.$$parser = parser;
    o.$$file = file;
    o.v = v;
    return o;
  }
}
