export type Parser<T> = (v: any) => Promise<T>;

export function checkInstanceOf(v: object, required: string[]): boolean {
  for (let i of required) {
    if (i in v) continue;
    return false;
  }
  return true;
}

export function getOrDefault<T>(value: T | undefined, fallback: T): T {
  return value !== undefined ? value : fallback;
}
