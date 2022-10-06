import {SchemaObject} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import JsonExample from "./Json";
import XmlExample from "./Xml";

const internalPicker = {
  "application/json": JsonExample,
  "application/xml": XmlExample,
  "application/x-www-form-urlencoded": null,
};

export function PickGen(mimeType: string): GenInterface | undefined {
  let z = internalPicker[mimeType];
  if (z === undefined) return undefined;
  return new z();
}

export interface GenInterface {
  generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any>;
}
