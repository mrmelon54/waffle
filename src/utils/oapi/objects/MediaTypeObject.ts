import { EncodingObject } from "./EncodingObject";
import { ExampleObject } from "./ExampleObject";
import { SchemaObject } from "./SchemaObject";

export interface MediaTypeObject {
  schema?: SchemaObject;
  example?: any;
  examples?: Map<string, ExampleObject | Ref<ExampleObject>>;
  encoding?: Map<string, EncodingObject>;
}
