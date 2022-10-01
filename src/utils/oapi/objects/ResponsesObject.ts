import { ResponseObject } from "./ResponseObject";

export interface ResponsesObject {
  [key: string]: ResponseObject | Ref<ResponseObject>;
  "1XX": ResponseObject | Ref<ResponseObject>;
  "2XX": ResponseObject | Ref<ResponseObject>;
  "3XX": ResponseObject | Ref<ResponseObject>;
  "4XX": ResponseObject | Ref<ResponseObject>;
  "5XX": ResponseObject | Ref<ResponseObject>;
  default: ResponseObject | Ref<ResponseObject>;
}
