import {ResponseObject} from "./ResponseObject";
import Ref from "../utils/Ref";

export interface ResponsesObject {
  [key: string]: ResponseObject | Ref<ResponseObject>;
  "1XX": ResponseObject | Ref<ResponseObject>;
  "2XX": ResponseObject | Ref<ResponseObject>;
  "3XX": ResponseObject | Ref<ResponseObject>;
  "4XX": ResponseObject | Ref<ResponseObject>;
  "5XX": ResponseObject | Ref<ResponseObject>;
  default: ResponseObject | Ref<ResponseObject>;
}

export async function getFromResponses(resp: ResponsesObject, code: string): Promise<ResponseObject | Ref<ResponseObject>> {
  if (code.length === 3) {
    switch (code[0]) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        break;
      default:
        return Promise.reject(`Invalid code length: ${code.length} must be length 3`);
    }
    let major = code[0];
    if (resp[code] !== undefined) return resp[code];
    if (resp[major + "XX"] !== undefined) return resp[major + "XX"];
    if (resp.default !== undefined) return resp.default;
  }
  if (code === "default" && resp.default !== undefined) return resp.default;
  return Promise.reject("No valid status code, range or default response found");
}

export function allResponses(resp: ResponsesObject): string[] {
  // Custom sorting to put `default` and generic `1XX` codes after specific values
  let z = Object.keys(resp).sort((a, b) => {
    if (a == "default") return 1;
    if (b == "default") return -1;
    if (a[0] == b[0] && a.slice(1) == "XX") return 1;
    if (a[0] == b[0] && b.slice(1) == "XX") return -1;
    return a.localeCompare(b);
  });
  console.info("allResponses():", z);
  return z;
}
