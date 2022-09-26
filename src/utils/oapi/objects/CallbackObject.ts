import StaticOptional from "../../StaticOptional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import PathItemObject from "./PathItemObject";
import ReferenceObject from "./ReferenceObject";

export type CallbackObject = Map<string, PathItemObject | ReferenceObject>;

export function parseCallback(ctx: OpenApiContext, v: any): StaticOptional<CallbackObject> {
  return parseCtxMap(ctx, v, PathItemObject.parse);
}