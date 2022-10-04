import { Style } from "../values/Styles";
import { ExampleObject } from "./ExampleObject";
import { MediaTypeObject } from "./MediaTypeObject";
import { SchemaObject } from "./SchemaObject";
import Ref from "../utils/Ref";

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
  examples?: {[key:string]: ExampleObject | Ref<ExampleObject>};

  // Complex scenarios
  content?: {[key:string]: MediaTypeObject};
}
