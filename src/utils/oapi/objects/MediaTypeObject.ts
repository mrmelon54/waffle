import Ref from "../utils/Ref";
import {EncodingObject} from "./EncodingObject";
import {ExampleObject} from "./ExampleObject";
import {SchemaObject} from "./SchemaObject";

export interface MediaTypeObject {
  schema?: SchemaObject;
  example?: any;
  examples?: {[key: string]: ExampleObject | Ref<ExampleObject>};
  encoding?: {[key: string]: EncodingObject};
}
