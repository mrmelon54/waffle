import semver from "semver";
import ComponentsObject from "../objects-old/ComponentsObject";
import ExternalDocumentationObject from "../objects-old/ExternalDocumentationObject";
import InfoObject from "../objects-old/InfoObject";
import PathItemObject from "../objects-old/PathItemObject";
import { PathsObject } from "../objects-old/PathsObject";
import SecurityRequirementObject from "../objects-old/SecurityRequirementObject";
import ServerObject from "../objects-old/ServerObject";
import TagObject from "../objects-old/TagObject";

export default class OpenApiObject {
  $$raw: any;
  openapi: semver.SemVer;
  info: InfoObject;
  jsonSchemaDialect: string | null;
  servers: ServerObject[] | null;
  paths: PathsObject | null;
  webhooks: Map<string, PathItemObject> | null;
  components: ComponentsObject | null;
  security: SecurityRequirementObject[] | null;
  tags: TagObject[] | null;
  externalDocs: ExternalDocumentationObject | null;
}
