import {SchemaObject, SchemaObjectArray, SchemaObjectObject} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import Ref from "../utils/Ref";
import {autoBoolean, autoNumber, autoString} from "./_AutoGen";
import {
  ArrayCallback,
  MultiRefCallback,
  ObjectCallback,
  RefCallback,
  setupGenAllOf,
  setupGenAnyOf,
  setupGenArray,
  setupGenObject,
  setupGenOneOf,
  setupGenUnknown,
} from "./_GenericGen";

export default class XmlExample {
  private _z: RefCallback;
  private _genAllOf: MultiRefCallback;
  private _genAnyOf: MultiRefCallback;
  private _genOneOf: MultiRefCallback;
  private _genObject: ObjectCallback;
  private _genArray: ArrayCallback;

  constructor() {
    this._genAllOf = setupGenAllOf((...a) => this.genUnknown(...a));
    this._genAnyOf = setupGenAnyOf((...a) => this.genUnknown(...a));
    this._genOneOf = setupGenOneOf((...a) => this.genUnknown(...a));
    this._genObject = setupGenObject((...a) => this.genUnknown(...a));
    this._genArray = setupGenArray((...a) => this.genUnknown(...a));
  }

  async generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any> {
    let z = await this.genUnknown(0, _p, _f, a, []);
    z._declaration = {
      _attributes: {
        version: "1.0",
        encoding: "utf-8",
      },
    };
    return z;
  }

  private genUnknown(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObject | Ref<SchemaObject>, parents: string[]): Promise<any> {
    if (this._z === undefined)
      this._z = setupGenUnknown(
        (...a) => this.genAllOf(...a),
        (...a) => this.genAnyOf(...a),
        (...a) => this.genOneOf(...a),
        (...a) => this.genObject(...a),
        (...a) => this.genArray(...a),
        (...a) => autoString(...a),
        (...a) => autoNumber(...a),
        (...a) => autoBoolean(...a),
      );
    return this._z(n, _p, _f, a, parents);
  }

  async genAllOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let z = await this._genAllOf(n, _p, _f, a, parents);
    console.error(z);
    return z;
  }

  async genAnyOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let z = await this._genAnyOf(n, _p, _f, a, parents);
    console.error(z);
    return z;
  }

  async genOneOf(n: number, _p: OpenApiParser, _f: OpenApiFile, a: (SchemaObject | Ref<SchemaObject>)[], parents: string[]): Promise<any> {
    let z = await this._genOneOf(n, _p, _f, a, parents);
    console.info(z);
    return z;
  }

  async genObject(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectObject, parents: string[]): Promise<any> {
    let z = await this._genObject(n, _p, _f, a, parents);
    console.info(z);
    return z;
  }

  async genArray(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObjectArray, parents: string[]): Promise<any> {
    let z = await this._genArray(n, _p, _f, a, parents);
    console.info(z);
    return z;
  }
}
