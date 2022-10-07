import {buildFromJson} from "steady-xml";
import {SchemaObject, SchemaObjectArray, SchemaObjectObject, SchemaObjectPrimitive} from "../objects/SchemaObject";
import {getOrDefault} from "../utils/ObjectUtils";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import Ref from "../utils/Ref";
import {GenericGen} from "./_GenericGen";

export default class XmlExample extends GenericGen {
  async generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any> {
    let z = await this.genUnknown(0, _p, _f, a, []);
    let y = {
      type: "Root",
      children: [
        {
          type: "Declaration",
          attributes: {version: 1, encoding: "UTF-8"},
        },
      ],
    };
    if (Array.isArray(z)) y.children.push(...z);
    else y.children.push(z);
    console.info(y);
    return buildFromJson(y).toXmlString();
  }

  async genAllOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let z = await super.genAllOf(n, _p, _f, a, parents);
    return z;
  }

  async genAnyOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let z = await super.genAnyOf(n, _p, _f, a, parents);
    return z;
  }

  async genOneOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let z = await super.genOneOf(n, _p, _f, a, parents);
    return z;
  }

  async genObject(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectObject, parents: string[]): Promise<any> {
    let z = await super.genObject(n, _p, _f, a, parents);
    console.info("obj:", z);
    let y = {
      name: getOrDefault(a.xml === undefined ? undefined : a.xml.name, a.title),
      type: "Element",
      children: Object.entries(z).map((x: [string, any]) => {
        let w = {...x[1]};
        if (w.name === undefined) w.name = x[0];
        if (w.type === undefined) w.type = "Element";
        return w;
      }),
    };
    return y;
  }

  async genArray(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectArray, parents: string[]): Promise<any> {
    let z = await super.genArray(n, _p, _f, a, parents);
    let y = {
      name: getOrDefault(a.xml?.name, a.title),
      type: "Element",
      children: Object.entries(z).map((x: [string, any]) => {
        let w = {...x[1]};
        if (w.name === undefined) w.name = x[0];
        if (w.type === undefined) w.type = "Element";
        return w;
      }),
    };
    return z;
  }

  genString(a: SchemaObjectPrimitive): any {
    return {children: [{name: a.xml?.name, type: "Text", value: super.genString(a)}]};
  }

  genNumber(a: SchemaObjectPrimitive, decimal: boolean): any {
    return {children: [{type: "Text", value: super.genNumber(a, decimal)}]};
  }

  genBoolean(a: SchemaObjectPrimitive): any {
    return {children: [{type: "Text", value: super.genBoolean(a)}]};
  }
}
