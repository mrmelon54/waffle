import OpenApiContext from "./oapi/utils/OpenApiContext";
import { isInstanceOf } from "./instance";

type InstanceTester = (value: any) => boolean;

export default class ReferenceOptional<T> {
  private ctx: OpenApiContext;
  private ref: string;
  private error?: string;
  private needLookup: boolean;
  private value: T | null;
  private test: InstanceTester;

  static generate<U>(ctx: OpenApiContext, ref: string, test: InstanceTester): ReferenceOptional<U> {
    let o = new ReferenceOptional<U>();
    o.ctx = ctx;
    o.ref = ref;
    o.test = test;
    return o;
  }

  private lookup() {
    if (!this.needLookup) return;
    let v: any = this.ctx.get().lookup(this.ref);
    if (this.test(v)) {
      this.value = <T>v;
    } else {
      this.value = null;
      this.error = `Referenced value has wrong type '${typeof v}'`;
    }
  }

  isEmpty(): boolean {
    this.lookup();
    return this.value === null;
  }

  isFull(): boolean {
    this.lookup();
    return this.value !== null;
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
