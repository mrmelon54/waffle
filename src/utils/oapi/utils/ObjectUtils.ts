import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import OpenApiContext from "./OpenApiContext";

type Parser<T> = (v: any) => Optional<T>;
type CtxParser<T> = (ctx: OpenApiContext, v: any) => Optional<T>;

let emptyContext = OpenApiContext.empty();

export function parseArray<T>(v: any, parser: Parser<T>): Optional<T[]> {
  return parseCtxArray(emptyContext, v, (_, x) => parser(x));
}

export function parseCtxArray<T>(ctx: OpenApiContext, v: any, parser: CtxParser<T>): Optional<T[]> {
  if (v === null || v === undefined) return StaticOptional.empty();
  if (!Array.isArray(v)) return StaticOptional.emptyWithError(`Cannot convert ${typeof v} to map`);
  let o: T[] = [];

  for (let a of v) {
    let b = parser(ctx, a);
    if (b.isEmpty()) return StaticOptional.emptyWithError(`Array value failed to parse '${a}': ${b.errorReason() ?? "no reason"}`);
    else o.push(b.get());
  }
  return StaticOptional.full(o);
}

export function parseMap<T, U>(v: any, parser: Parser<U>): Optional<Map<T, U>> {
  return parseCtxMap(emptyContext, v, (_, x) => parser(x));
}

export function parseCtxMap<T, U>(ctx: OpenApiContext, v: any, parser: CtxParser<U>): Optional<Map<T, U>> {
  if (v === null || v === undefined) return StaticOptional.empty();
  if (typeof v !== "object") StaticOptional.emptyWithError(`Cannot convert ${typeof v} to map`);
  let z = new Map();
  let b = Object.keys(v);
  for (let c of b) {
    let d: Optional<U> = parser(ctx, v[c]);
    if (d.isEmpty()) return StaticOptional.emptyWithError(`Map value failed to parse: ${c}: ${d.errorReason() ?? "No reason"}`);
    z.set(c, d.get());
  }
  return StaticOptional.full(z);
}
