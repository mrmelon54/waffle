import { detectType, type SchemaObject, type SchemaObjectArray, type SchemaObjectObject, type SchemaObjectPrimitive } from "../objects/SchemaObject";
import type OpenApiFile from "../utils/OpenApiFile";
import type OpenApiParser from "../utils/OpenApiParser";
import Ref from "../utils/Ref";
import { autoBoolean, autoNumber, autoString } from "./_AutoGen";

export abstract class GenericGen {
  async genUnknown(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObject | Ref<SchemaObject>, parents: string[]): Promise<any> {
    let $ref = (<Ref<SchemaObject>>a).$ref;
    if ($ref !== undefined) {
      if (parents.filter((x) => x === $ref).length > 0) return { $ref };
      parents = [...parents, $ref!];
    }
    let z = await Ref.getValueOrRef(_p, _f, a, (x) => x);
    if (n > 100) return { $error: "Possible infinite loop" };
    n++;
    switch (detectType(z.v)) {
      case "allOf":
        return await this.genAllOf(n, z.$$parser, z.$$file, z.v.allOf!, parents);
      case "anyOf":
        return await this.genAnyOf(n, z.$$parser, z.$$file, z.v.anyOf!, parents);
      case "oneOf":
        return await this.genOneOf(n, z.$$parser, z.$$file, z.v.oneOf!, parents);
      case "object":
        return this.genObject(n, z.$$parser, z.$$file, <SchemaObjectObject>z.v, parents);
      case "array":
        return this.genArray(n, z.$$parser, z.$$file, <SchemaObjectArray>z.v, parents);
      case "string":
        return this.genString(<SchemaObjectPrimitive>z.v);
      case "number":
        return this.genNumber(<SchemaObjectPrimitive>z.v, true);
      case "integer":
        return this.genNumber(<SchemaObjectPrimitive>z.v, false);
      case "boolean":
        return this.genBoolean(<SchemaObjectPrimitive>z.v);
    }
    return null;
  }

  async genAllOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let y = await Promise.all(a.map((x) => this.genUnknown(n, _p, _f, x, parents)));
    let z = {};
    for (let x of y) {
      if (x === undefined || x === null) continue;
      for (let [k, v] of Object.entries(x)) z[k] = v;
    }
    return z;
  }

  genAnyOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    return this.genUnknown(n, _p, _f, a[0], parents);
  }

  genOneOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    return this.genUnknown(n, _p, _f, a[0], parents);
  }

  async genObject(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectObject, parents: string[]): Promise<any> {
    if (a.properties === undefined) return {};
    let b = Object.entries(a.properties!);
    let z = {};
    for (let [k, v] of b) z[k] = await this.genUnknown(n, _p, _f, v, parents);
    return z;
  }

  async genArray(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectArray, parents: string[]): Promise<any> {
    if (a.items !== undefined) return [await this.genUnknown(n, _p, _f, a.items, parents)];
    return [];
  }

  genString(a: SchemaObjectPrimitive): any {
    return autoString(a);
  }

  genNumber(a: SchemaObjectPrimitive, decimal: boolean): any {
    return autoNumber(a, decimal);
  }

  genBoolean(a: SchemaObjectPrimitive): any {
    return autoBoolean(a);
  }
}
