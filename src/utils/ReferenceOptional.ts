import { CtxParser, Parser } from "./oapi/utils/ObjectUtils";
import OpenApiContext from "./oapi/utils/OpenApiContext";

export default class ReferenceOptional<T> {
  private ctx: OpenApiContext;
  private ref: string;
  private error?: string;
  private doneLookup: boolean;
  private value: T | null;
  private parser: CtxParser<T>;

  static generateCtx<U>(ctx: OpenApiContext, ref: string, parser: CtxParser<U>): ReferenceOptional<U> {
    let o = new ReferenceOptional<U>();
    o.ctx = ctx;
    o.ref = ref;
    o.parser = parser;
    ctx.waitFor(o.lookup());
    return o;
  }

  static generate<U>(ctx: OpenApiContext, ref: string, parser: Parser<U>): ReferenceOptional<U> {
    return this.generateCtx<U>(ctx, ref, (_, x) => parser(x));
  }

  private async lookup(): Promise<void> {
    if (this.doneLookup) return;
    this.doneLookup = true;
    this.error = "Still looking up";
    let v: any = await this.ctx.lookup(this.ref);
    let z = this.parser(this.ctx, v);
    if (z.isFull()) {
      this.value = z.get();
      this.error = "[ReferenceOptional] Value is null or undefined";
    } else {
      this.value = null;
      this.error = `[ReferenceOptional] Referenced value failed to parse: ${z.errorReason() ?? "No reason"}`;
    }
  }

  isEmpty(): boolean {
    return this.value === null || this.value === undefined;
  }

  isFull(): boolean {
    return !this.isEmpty();
  }

  hasError(): boolean {
    return this.errorReason() !== undefined;
  }

  get(): T {
    if (this.isEmpty()) throw new Error(`${typeof this} is empty`);
    return this.value!;
  }

  getOrDefault(value: T): T {
    if (this.isEmpty()) return value;
    return this.value!;
  }

  errorReason(): string | undefined {
    return this.error;
  }
}
