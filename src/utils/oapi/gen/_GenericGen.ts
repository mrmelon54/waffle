import {detectType, SchemaObject, SchemaObjectArray, SchemaObjectObject, SchemaObjectPrimitive} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import Ref from "../utils/Ref";

type GenericCallback<T> = (n: number, _p: OpenApiParser, _f: OpenApiFile, schema: T, parents: string[]) => Promise<any>;
export type RefCallback = GenericCallback<SchemaObject | Ref<SchemaObject>>;
export type MultiRefCallback = GenericCallback<(SchemaObject | Ref<SchemaObject>)[]>;
export type ObjectCallback = GenericCallback<SchemaObjectObject>;
export type ArrayCallback = GenericCallback<SchemaObjectArray>;
export type PrimitiveCallback = (v: SchemaObjectPrimitive) => any;
export type NumberCallback = (v: SchemaObjectPrimitive, decimal: boolean) => any;

export function setupGenUnknown(genAllOf: MultiRefCallback, genAnyOf: MultiRefCallback, genOneOf: MultiRefCallback, genObject: ObjectCallback, genArray: ArrayCallback, genString: PrimitiveCallback, genNumber: NumberCallback, genBoolean: PrimitiveCallback) {
  return async function genUnknown(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObject | Ref<SchemaObject>, parents: string[]): Promise<any> {
    let $ref = (<Ref<SchemaObject>>a).$ref;
    if ($ref !== undefined) {
      if (parents.filter(x => x === $ref).length > 0) return {$ref};
      parents = [...parents, $ref!];
    }
    let z = await Ref.getValueOrRef(_p, _f, a, x => x);
    if (n > 100) return {$error: "Possible infinite loop"};
    n++;
    switch (detectType(z.v)) {
      case "allOf":
        return await genAllOf(n, z.$$parser, z.$$file, z.v.allOf!, parents);
      case "anyOf":
        return await genAnyOf(n, z.$$parser, z.$$file, z.v.anyOf!, parents);
      case "oneOf":
        return await genOneOf(n, z.$$parser, z.$$file, z.v.oneOf!, parents);
      case "object":
        return genObject(n, z.$$parser, z.$$file, <SchemaObjectObject>z.v, parents);
      case "array":
        return genArray(n, z.$$parser, z.$$file, <SchemaObjectArray>z.v, parents);
      case "string":
        return genString(<SchemaObjectPrimitive>z.v);
      case "number":
        return genNumber(<SchemaObjectPrimitive>z.v, true);
      case "integer":
        return genNumber(<SchemaObjectPrimitive>z.v, false);
      case "boolean":
        return genBoolean(<SchemaObjectPrimitive>z.v);
    }
    return null;
  };
}

export function setupGenAllOf(genUnknown: RefCallback) {
  return async function genAllOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let y = await Promise.all(a.map(x => genUnknown(n, _p, _f, x, parents)));
    let z = {};
    for (let x of y) {
      if (x === undefined || x === null) continue;
      for (let [k, v] of Object.entries(x)) z[k] = v;
    }
    return z;
  };
}

export function setupGenAnyOf(genUnknown: RefCallback) {
  return function genAnyOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    return genUnknown(n, _p, _f, a[0], parents);
  };
}

export function setupGenOneOf(genUnknown: RefCallback) {
  return function genOneOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    return genUnknown(n, _p, _f, a[0], parents);
  };
}

export function setupGenObject(genUnknown: RefCallback) {
  return async function genObject(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectObject, parents: string[]): Promise<any> {
    if (a.properties === undefined) return {};
    let b = Object.entries(a.properties!);
    let z = {};
    for (let [k, v] of b) z[k] = await genUnknown(n, _p, _f, v, parents);
    return z;
  };
}

export function setupGenArray(genUnknown: RefCallback) {
  return async function genArray(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectArray, parents: string[]): Promise<any> {
    if (a.items !== undefined) return [await genUnknown(n, _p, _f, a.items, parents)];
    return [];
  };
}
