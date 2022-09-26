import Optional from "../../Optional";
import OpenApiContext from "./OpenApiContext";

type Parser<T> = (v: any) => Optional<T>;
type CtxParser<T> = (ctx: OpenApiContext, v: any) => Optional<T>;

let emptyContext = OpenApiContext.empty();

export function parseArray<T>(v: any, parser: Parser<T>): Optional<T[]> {
  return parseCtxArray(emptyContext, v, (_, x) => parser(x));
}

export function parseCtxArray<T>(ctx: OpenApiContext, v: any, parser: CtxParser<T>): Optional<T[]> {
  if (v === null || v === undefined) return Optional.empty();
  if (!Array.isArray(v)) return Optional.emptyWithError("SecurityRequrementObject.parseArray() expects an array");
  let o: T[] = [];

  for (let a of v) {
    let b = parser(ctx, a);
    if (b.isEmpty()) return Optional.emptyWithError(`Error with security requirement '${a}': ${b.errorReason() ?? "no reason"}`);
    else o.push(b.get());
  }
  return Optional.full(o);
}

export function parseMap<T, U>(v: any, parser: Parser<U>): Optional<Map<T, U>> {
  return parseCtxMap(emptyContext, v, (_, x) => parser(x));
}

export function parseCtxMap<T, U>(ctx: OpenApiContext, v: any, parser: CtxParser<U>): Optional<Map<T, U>> {
  if (v === null || v === undefined) return Optional.empty();
  if (typeof v !== "object") Optional.emptyWithError(`Cannot convert ${typeof v} to map`);
  let z = new Map();
  let b = Object.keys(v);
  for (let c of b) {
    let d: Optional<U> = parser(ctx, v[c]);
    if (d.isEmpty()) return Optional.emptyWithError(`Map value failed to parse: ${c}: ${d.errorReason() ?? "No reason"}`);
    z.set(c, d.get());
  }
  return Optional.full(z);
}
