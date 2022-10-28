import type { Parser } from "./ObjectUtils";
import Ctx from "../utils/Ctx";
import type OpenApiParser from "./OpenApiParser";
import type OpenApiFile from "./OpenApiFile";

export default class Ref<T> {
  private ctx: OpenApiParser;
  private file: OpenApiFile;
  private ref: string;
  private doneLookup: boolean;
  private v: T;
  private parser: Parser<T>;

  $ref?: string;

  static isRef<T>(v: Ref<T>): boolean {
    return v.$ref !== undefined;
  }

  static resolve<U>(ctx: OpenApiParser, file: OpenApiFile, ref: string, parser: Parser<U>): Ref<U> {
    let o = new Ref<U>();
    o.ctx = ctx;
    o.file = file;
    o.ref = ref;
    o.parser = parser;
    return o;
  }

  private async lookup(): Promise<Ctx<T>> {
    if (this.doneLookup) return Ctx.make(this.ctx, this.file, this.v);
    let v: Ctx<any> = await this.ctx.lookup(this.file.url, this.ref);
    try {
      let z = await this.parser(v);
      this.v = z;
      return Ctx.make(this.ctx, this.file, z);
    } catch (err) {
      return Promise.reject(`[Ref] Failed to parse referenced value: ${err ?? "No reason"}`);
    }
  }

  async get(): Promise<Ctx<T>> {
    return await this.lookup();
  }

  async getOrDefault(value: T): Promise<Ctx<T>> {
    try {
      return await this.lookup();
    } catch (err) {
      return Ctx.make(this.ctx, this.file, value);
    }
  }

  static async getValueOrRef<U>(ctx: OpenApiParser, file: OpenApiFile, value: U | Ref<U>, parser: Parser<U>): Promise<Ctx<U>> {
    if (this.isRef(<Ref<U>>value)) return Ref.resolve<U>(ctx, file, (<any>value).$ref, parser).get();
    return Ctx.make(ctx, file, <U>value);
  }
}
