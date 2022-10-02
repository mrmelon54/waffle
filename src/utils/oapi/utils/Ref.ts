import OpenApiContext from "../utils/OpenApiContext";
import { CtxParser } from "./ObjectUtils";

// TODO: rewrite this system

export default class Ref<T> {
  $$isRef: boolean;
  private ctx: OpenApiContext;
  private ref: string;
  private doneLookup: boolean;
  private value: T;
  private parser: CtxParser<T>;

  static isRef(v: unknown): boolean {
    return (<any>v).$$isRef === true;
  }

  static generate<U>(ctx: OpenApiContext, ref: string, parser: CtxParser<U>): Ref<U> {
    let o = new Ref<U>();
    o.$$isRef = true;
    o.ctx = ctx;
    o.ref = ref;
    o.parser = parser;
    return o;
  }

  private async lookup(): Promise<T> {
    if (this.doneLookup) return Promise.resolve(this.value);
    let v: any = await this.ctx.lookup(this.ref);
    try {
      let z = await this.parser(this.ctx, v);
      this.value = z;
      return z;
    } catch (err) {
      return Promise.reject(`[Ref] Failed to parse referenced value: ${err ?? "No reason"}`);
    }
  }

  async get(): Promise<T> {
    return await this.lookup();
  }

  async getOrDefault(value: T): Promise<T> {
    try {
      return await this.lookup();
    } catch (err) {
      return value;
    }
  }

  static async getValueOrRef<U>(value: U | Ref<U>, fallback: U): Promise<U> {
    if (this.isRef(value)) return await (<Ref<U>>value).get();
    return <U>value;
  }
}
