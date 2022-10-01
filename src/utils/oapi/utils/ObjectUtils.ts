import OpenApiContext from "./OpenApiContext";

export type Parser<T> = (v: any) => Promise<T>;
export type CtxParser<T> = (ctx: OpenApiContext, v: any) => Promise<T>;

let emptyContext = OpenApiContext.empty();

export function parseArray<T>(v: any, parser: Parser<T>): Promise<T[]> {
  return parseCtxArray(emptyContext, v, (_, x) => parser(x));
}

export async function parseCtxArray<T>(ctx: OpenApiContext, v: any, parser: CtxParser<T>): Promise<T[]> {
  if (v === null || v === undefined) return Promise.resolve([]);
  if (!Array.isArray(v)) return Promise.reject(`[ObjectUtils] Cannot convert ${typeof v} to map`);
  let o: T[] = [];

  for (let a in v) {
    try {
      let b = await parser(ctx, v[a]);
      o.push(b);
    } catch (err) {
      return Promise.reject(`[ObjectUtils] Array value failed to parse '${a}': ${err ?? "no reason"}`);
    }
  }
  return o;
}

export function parseMap<T, U>(v: any, parser: Parser<U>): Promise<Map<T, U>> {
  return parseCtxMap(emptyContext, v, (_, x) => parser(x));
}

export async function parseCtxMap<T, U>(ctx: OpenApiContext, v: any, parser: CtxParser<U>): Promise<Map<T, U>> {
  if (v === null || v === undefined) return Promise.resolve(new Map());
  if (typeof v !== "object") Promise.reject(`[ObjectUtils] Cannot convert ${typeof v} to map`);
  let z = new Map();
  let b = Object.keys(v);
  for (let c of b) {
    try {
      let d = await parser(ctx, v[c]);
      z.set(c, d);
    } catch (err) {
      return Promise.reject(`[ObjectUtils] Map value failed to parse: ${c}: ${err ?? "No reason"}`);
    }
  }
  return z;
}

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
