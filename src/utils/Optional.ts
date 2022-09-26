export default interface Optional<T> {
  isEmpty(): boolean;
  isFull(): boolean;
  get(): T;
  getOrDefault(value: T): T;
  hasError(): boolean;
  errorReason(): string | undefined;
}
