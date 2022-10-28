import type Ref from "../utils/Ref";
import type { EncodingObject } from "./EncodingObject";
import type { ExampleObject } from "./ExampleObject";
import type { SchemaObject } from "./SchemaObject";

interface MediaTypeObject {
  schema?: SchemaObject;
  example?: any;
  examples?: { [key: string]: ExampleObject | Ref<ExampleObject> };
  encoding?: { [key: string]: EncodingObject };
}

export type { MediaTypeObject };
