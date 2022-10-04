import semver from "semver";
import {checkInstanceOf} from "../utils/ObjectUtils";
import Ref from "../utils/Ref";
import {ComponentsObject} from "./ComponentsObject";
import {ExternalDocumentationObject} from "./ExternalDocumentationObject";
import {InfoObject} from "./InfoObject";
import {PathItemObject} from "./PathItemObject";
import {PathsObject} from "./PathsObject";
import {SecurityRequirementObject} from "./SecurityRequirementObject";
import {ServerObject} from "./ServerObject";
import {TagObject} from "./TagObject";

export interface OpenApiObject {
  openapi: semver.SemVer;
  info: InfoObject;
  jsonSchemaDialect?: string;
  servers?: ServerObject[];
  paths?: PathsObject;
  webhooks?: {[key: string]: PathItemObject | Ref<PathItemObject>};
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}

export function instanceOfOpenApiObject(v: object) {
  return checkInstanceOf(v, ["openapi", "info"]);
}
