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
  openapi: Required<semver.SemVer>;
  info: InfoObject;
  jsonSchemaDialect?: string;
  servers: ServerObject[];
  paths: PathsObject;
  webhooks: Map<string, PathItemObject | ReferenceObject>;
  components: ComponentsObject;
  security: SecurityRequirementObject[];
  tags: TagObject[];
  externalDocs: ExternalDocumentationObject;

  constructor(v: any) {
    this.$$raw = v;
    this.$$err = new ErrorCollector();
    console.log("before parse");
    let ver = semver.parse(v.openapi);
    console.log("after parse");
    if (ver == null) this.$$err.add("Invalid OpenAPI version");
    else if (this.$$err.falseError("Invalid OpenAPI version", semver.satisfies(this.openapi!, ">=3.0.0"))) {
    } else this.openapi = ver!;
    this.info = new InfoObject(v.info);
    this.jsonSchemaDialect = v.jsonSchemaDialect;
    this.servers = v.servers.map((x: any) => new ServerObject(x));
    this.paths = new PathsObject(v.paths);
    this.webhooks = this.readWebhooks(v.webhooks);
    this.components = new ComponentsObject(v.components);
    this.security = v.security.map((x: any) => new SecurityRequirementObject(x));
    this.tags = v.tags.map((x: any) => new TagObject(x));
    this.externalDocs = new ExternalDocumentationObject(v.externalDocs);
  }

  valid(): boolean {
    return this.$$err.clean();
  }

  private readWebhooks(a: any): Map<string, PathItemObject | ReferenceObject> {
    let z = new Map();
    let b = Object.keys(a);
    for (let c of b) z.set(c, a[c].$ref ? new ReferenceObject(a[c]) : new PathItemObject(a[c]));
    return z;
  }
}
