import Optional from "./Optional";

export default class StaticOptional<T> {
  private value: T | null;
  private error?: string;

  static empty<U>(): Optional<U> {
    return new this<U>(null);
  }

  static emptyWithError<U>(msg: string): Optional<U> {
    return new this<U>(null, msg);
  }

  static full<U>(value: U | null | undefined): Optional<U> {
    if (value === null || value === undefined) return this.empty<U>();
    return new this<U>(value);
  }

  private constructor(value: T | null, error?: string) {
    this.value = value;
    this.error = error;
  }

  isEmpty() {
    return this.value === null || this.value === undefined;
  }

  isFull() {
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
