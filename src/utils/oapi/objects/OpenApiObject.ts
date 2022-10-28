import type semver from "semver";
import { checkInstanceOf } from "../utils/ObjectUtils";
import type Ref from "../utils/Ref";
import type { ComponentsObject } from "./ComponentsObject";
import type { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import type { InfoObject } from "./InfoObject";
import type { PathItemObject } from "./PathItemObject";
import type { PathsObject } from "./PathsObject";
import type { SecurityRequirementObject } from "./SecurityRequirementObject";
import type { ServerObject } from "./ServerObject";
import type { TagObject } from "./TagObject";

interface OpenApiObject {
  openapi: semver.SemVer;
  info: InfoObject;
  jsonSchemaDialect?: string;
  servers?: ServerObject[];
  paths?: PathsObject;
  webhooks?: { [key: string]: PathItemObject | Ref<PathItemObject> };
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}

export function instanceOfOpenApiObject(v: object) {
  return checkInstanceOf(v, ["openapi", "info"]);
}

export type { OpenApiObject };
