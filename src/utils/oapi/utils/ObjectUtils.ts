import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import OpenApiContext from "./OpenApiContext";

export type Parser<T> = (v: any) => Promise<Optional<T>>;
export type CtxParser<T> = (ctx: OpenApiContext, v: any) => Promise<Optional<T>>;

let emptyContext = OpenApiContext.empty();

export function parseArray<T>(v: any, parser: Parser<T>): Promise<Optional<T[]>> {
  return parseCtxArray(emptyContext, v, (_, x) => parser(x));
}

export async function parseCtxArray<T>(ctx: OpenApiContext, v: any, parser: CtxParser<T>): Promise<Optional<T[]>> {
  if (v === null || v === undefined) return StaticOptional.empty();
  if (!Array.isArray(v)) return StaticOptional.emptyWithError(`[ObjectUtils] Cannot convert ${typeof v} to map`);
  let o: T[] = [];

  for (let a in v) {
    let b = await parser(ctx, v[a]);
    if (b.isEmpty()) return StaticOptional.emptyWithError(`[ObjectUtils] Array value failed to parse '${a}': ${b.errorReason() ?? "no reason"}`);
    else o.push(b.get());
  }
  return StaticOptional.full(o);
}

export function parseMap<T, U>(v: any, parser: Parser<U>): Promise<Optional<Map<T, U>>> {
  return parseCtxMap(emptyContext, v, (_, x) => parser(x));
}

export async function parseCtxMap<T, U>(ctx: OpenApiContext, v: any, parser: CtxParser<U>): Promise<Optional<Map<T, U>>> {
  if (v === null || v === undefined) return StaticOptional.empty();
  if (typeof v !== "object") StaticOptional.emptyWithError(`[ObjectUtils] Cannot convert ${typeof v} to map`);
  let z = new Map();
  let b = Object.keys(v);
  for (let c of b) {
    let d: Optional<U> = await parser(ctx, v[c]);
    if (d.isEmpty()) return StaticOptional.emptyWithError(`[ObjectUtils] Map value failed to parse: ${c}: ${d.errorReason() ?? "No reason"}`);
    z.set(c, d.get());
  }
  return StaticOptional.full(z);
}
