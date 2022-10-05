import {SchemaObject} from "../objects/SchemaObject";
import OpenApiFile from "../utils/OpenApiFile";
import OpenApiParser from "../utils/OpenApiParser";
import Ref from "../utils/Ref";
import {autoNumber, autoBoolean, autoString} from "./_AutoGen";
import {ArrayCallback, MultiRefCallback, NumberCallback, ObjectCallback, PrimitiveCallback, RefCallback, setupGenAllOf, setupGenAnyOf, setupGenArray, setupGenObject, setupGenOneOf, setupGenUnknown} from "./_GenericGen";

export default class JsonExample {
  _z: RefCallback;
  genAllOf: MultiRefCallback;
  genAnyOf: MultiRefCallback;
  genOneOf: MultiRefCallback;
  genObject: ObjectCallback;
  genArray: ArrayCallback;

  constructor() {
    this.genAllOf = setupGenAllOf((...a) => this.genUnknown(...a));
    this.genAnyOf = setupGenAnyOf((...a) => this.genUnknown(...a));
    this.genOneOf = setupGenOneOf((...a) => this.genUnknown(...a));
    this.genObject = setupGenObject((...a) => this.genUnknown(...a));
    this.genArray = setupGenArray((...a) => this.genUnknown(...a));
  }

  async generate(_p: OpenApiParser, _f: OpenApiFile, a: SchemaObject): Promise<any> {
    return await this.genUnknown(0, _p, _f, a, []);
  }

  private genUnknown(n: number, _p: OpenApiParser, _f: OpenApiFile, a: SchemaObject | Ref<SchemaObject>, parents: string[]) {
    if (this._z === undefined) this._z = setupGenUnknown(this.genAllOf, this.genAnyOf, this.genOneOf, this.genObject, this.genArray, autoString, autoNumber, autoBoolean);
    return this._z(n, _p, _f, a, parents);
  }
}
