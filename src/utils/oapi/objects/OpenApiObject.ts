import semver from "semver";
import { ComponentsObject } from "./ComponentsObject";
import { ExternalDocumentationObject } from "./ExternalDocumentationObject";
import { InfoObject } from "./InfoObject";
import { PathItemObject } from "./PathItemObject";
import { PathsObject } from "./PathsObject";
import { SecurityRequirementObject } from "./SecurityRequirementObject";
import { ServerObject } from "./ServerObject";
import { TagObject } from "./TagObject";

export interface OpenApiObject {
  openapi: semver.SemVer;
  info: InfoObject;
  jsonSchemaDialect?: string;
  servers?: ServerObject[];
  paths?: PathsObject;
  webhooks?: Map<string, PathItemObject | Ref<PathItemObject>>;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}
