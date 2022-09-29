import OpenApiContext from "./oapi/utils/OpenApiContext";

type InstanceTester = (value: any) => boolean;

export default class ReferenceOptional<T> {
  private ctx: OpenApiContext;
  private ref: string;
  private error?: string;
  private doneLookup: boolean;
  private value: T | null;
  private test: InstanceTester;

  static generate<U>(ctx: OpenApiContext, ref: string, test: InstanceTester): ReferenceOptional<U> {
    let o = new ReferenceOptional<U>();
    o.ctx = ctx;
    o.ref = ref;
    o.test = test;
    ctx.waitFor(o.lookup());
    return o;
  }

  private async lookup(): Promise<void> {
    if (this.doneLookup) return;
    this.doneLookup = true;
    let v: any = await this.ctx.lookup(this.ref);
    console.log("v:", v);
    if (this.test(v)) {
      this.value = <T>v;
    } else {
      this.value = null;
      this.error = `Referenced value has wrong type '${typeof v}'`;
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
