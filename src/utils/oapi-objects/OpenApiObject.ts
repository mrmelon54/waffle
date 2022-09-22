import semver from "semver";
import ErrorCollector from "../ErrorCollector";
import InfoObject from "./InfoObject";
import PathsObject from "./PathsObject";
import ServerObject from "./ServerObject";
import PathItemObject from "./PathItemObject";
import ReferenceObject from "./ReferenceObject";
import ComponentsObject from "./ComponentsObject";
import SecurityRequirementObject from "./SecurityRequirementObject";
import TagObject from "./TagObject";
import ExternalDocumentationObject from "./ExternalDocumentationObject";

export default class OpenAPI {
  $$raw: any;
  $$err: ErrorCollector;
  openapi: string;
  info: InfoObject;
  jsonSchemaDialect: string;
  servers: ServerObject[];
  paths: PathsObject;
  webhooks: Map<string, PathItemObject | ReferenceObject>;
  components: ComponentsObject;
  security: SecurityRequirementObject[];
  tags: TagObject[];
  externalDocs: ExternalDocumentationObject;

  constructor(v: any) {
    this.$$raw = v;
    this.openapi = v;
    this.$$err.falseError("Invalid OpenAPI version", semver.satisfies(v, ">=3.0.0"));
    this.info = new InfoObject(v.info);
    this.jsonSchemaDialect = v.jsonSchemaDialect;
    this.servers = v.servers.map((x: any) => new ServerObject(x));
    this.paths = new PathsObject(v.paths);
    this.webhooks = new Map();
    // TODO: read all the fields
  }

  clean(): boolean {
    return this.$$err.clean();
  }
}
