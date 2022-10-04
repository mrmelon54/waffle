import {detectType, SchemaObject, SchemaObjectArray, SchemaObjectObject, SchemaObjectPrimitive} from "../objects/SchemaObject";
import OpenApiFile from "./OpenApiFile";
import OpenApiParser from "./OpenApiParser";
import Ref from "./Ref";

export default class ExampleGenerator {
  _p: OpenApiParser;
  _f: OpenApiFile;
  a: number;

  constructor(_p: OpenApiParser, _f: OpenApiFile) {
    this._p = _p;
    this._f = _f;
    this.a = 0;
  }

  async generate(a: SchemaObject): Promise<any> {
    return await this.genUnknown(0, this._p, this._f, a, []);
  }

  async genUnknown(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObject | Ref<SchemaObject>, parents: string[]): Promise<any> {
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
        return true;
    }
    return null;
  }

  async genAllOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let y = await Promise.all(a.map(x => this.genUnknown(n, _p, _f, x, parents)));
    let z = {};
    for (let x of y) {
      if (x === undefined || x === null) continue;
      for (let [k, v] of Object.entries(x)) z[k] = v;
    }
    return z;
  }

  private genAnyOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    return this.genUnknown(n, _p, _f, a[0], parents);
  }

  private genOneOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    return this.genUnknown(n, _p, _f, a[0], parents);
  }

  private async genObject(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectObject, parents: string[]): Promise<any> {
    if (a.properties === undefined) return {};
    let b = Object.entries(a.properties!);
    let z = {};
    for (let [k, v] of b) z[k] = await this.genUnknown(n, _p, _f, v, parents);
    return z;
  }

  private async genArray(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectArray, parents: string[]): Promise<any> {
    if (a.items !== undefined) return [await this.genUnknown(n, _p, _f, a.items, parents)];
    return [];
  }

  private genString(a: SchemaObjectPrimitive): any {
    if (a.enumValues !== undefined) return a.enumValues[0];
    switch (a.format) {
      case "date":
        return "2003-08-28";
      case "date-time":
        return "2003-08-28T17:32:05Z";
      case "byte":
        return "RXhhbXBsZQ==";
      case "email":
        return "hello@mrmelon54.com";
      case "uuid":
        return "b354dde7-bb70-451f-858b-f8602d7b9c2d";
      case "uri":
        return "https://mrmelon54.com";
      case "hostname":
        return "mrmelon54.com";
      case "ipv4":
        return "192.168.1.1";
      case "ipv6":
        return "::1";
    }
    return "hello";
  }

  private genNumber(a: SchemaObjectPrimitive, decimal: boolean): any {
    if (a.enumValues !== undefined) return a.enumValues[0];
    return decimal ? 28.8 : 3;
  }
}
