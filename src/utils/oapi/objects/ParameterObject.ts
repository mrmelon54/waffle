import { Style } from "../values/Styles";
import { ExampleObject } from "./ExampleObject";
import { MediaTypeObject } from "./MediaTypeObject";
import { SchemaObject } from "./SchemaObject";

export interface ParameterObject {
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
  examples?: Map<string, ExampleObject | Ref<ExampleObject>>;

  // Complex scenarios
  content?: Map<string, MediaTypeObject>;
}
