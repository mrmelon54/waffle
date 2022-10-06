import {SchemaObject} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import JsonExample from "./Json";
import XmlExample from "./Xml";

const internalPicker = {
  "application/json": JsonExample,
  "application/xml": XmlExample,
  "application/x-www-form-urlencoded": null,
  "application/octet-stream": null,
};

export function PickGen(mimeType: string): GenInterface | undefined | null {
  let z = internalPicker[mimeType];
  if (z === undefined) return undefined;
  if (z === null) return null;
  return new z();
}

export interface GenInterface {
  generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any>;
}
