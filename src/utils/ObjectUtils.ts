import Optional from "./Optional";

type Parser<T> = (v: any) => Optional<T>;

export function parseArray<T>(v: any, parser: Parser<T>): Optional<T[]> {
  if (!v) return Optional.empty();
  if (!Array.isArray(v)) return Optional.emptyWithError("SecurityRequrementObject.parseArray() expects an array");
  let o: T[] = [];

  for (let a of v) {
    let b = parser(a);
    if (b.isEmpty()) return Optional.emptyWithError(`Error with security requirement '${a}': ${b.errorReason() ?? "no reason"}`);
    else o.push(b.get());
  }
  return Optional.full(o);
}

export function parseMap<T, U>(a: any, parser: Parser<U>): Optional<Map<T, U>> {
  if (!a) return Optional.empty();
  if (typeof a !== "object") Optional.emptyWithError(`Cannot convert ${typeof a} to map`);
  let z = new Map();
  let b = Object.keys(a);
  for (let c of b) {
    let d: Optional<U> = parser(a[c]);
    if (d.isEmpty()) return Optional.emptyWithError(`Map value failed to parse: ${c}: ${d.errorReason() ?? "No reason"}`);
    z.set(c, d.get());
  }
  return Optional.full(z);
}
