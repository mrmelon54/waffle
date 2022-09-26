import OpenApiObject from "../objects/OpenApiObject";

export default class OpenApiContext {
  base: OpenApiObject | null;

  private constructor(base: OpenApiObject | null) {
    this.base = base;
  }

  static empty(): OpenApiContext {
    return new OpenApiContext(null);
  }

  static generate(base: OpenApiObject): OpenApiContext {
    return new OpenApiContext(base);
  }

  get(): OpenApiObject {
    return this.base!;
  }
}
