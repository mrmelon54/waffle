export default class StaticOptional<T> {
  private value: T | null;
  private error?: string;

  static empty<U>(): StaticOptional<U> {
    return new this<U>(null);
  }

  static emptyWithError<U>(msg: string): StaticOptional<U> {
    return new this<U>(null, msg);
  }

  static full<U>(value: U | null | undefined): StaticOptional<U> {
    if (value === null || value === undefined) return new this<U>(null);
    return new this<U>(value);
  }

  private constructor(value: T | null, error?: string) {
    this.value = value;
    this.error = error;
  }

  isEmpty() {
    return this.value === null;
  }

  isFull() {
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
