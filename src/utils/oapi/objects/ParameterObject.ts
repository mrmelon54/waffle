import type { Style } from "../values/Styles";
import type { ExampleObject } from "./ExampleObject";
import type { MediaTypeObject } from "./MediaTypeObject";
import type { SchemaObject } from "./SchemaObject";
import type Ref from "../utils/Ref";

interface ParameterObject {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;

  // Simpler scenarios
  style?: Style;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject;
  example?: any;
  examples?: { [key: string]: ExampleObject | Ref<ExampleObject> };

  // Complex scenarios
  content?: { [key: string]: MediaTypeObject };
}

export type { ParameterObject };
