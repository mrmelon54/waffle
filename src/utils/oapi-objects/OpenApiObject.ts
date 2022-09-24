import semver from "semver";
import InfoObject from "./InfoObject";
import PathsObject from "./PathsObject";
import ServerObject from "./ServerObject";
import PathItemObject from "./PathItemObject";
import ReferenceObject from "./ReferenceObject";
import ComponentsObject from "./ComponentsObject";
import SecurityRequirementObject from "./SecurityRequirementObject";
import TagObject from "./TagObject";
import ExternalDocumentationObject from "./ExternalDocumentationObject";
import Optional from "../Optional";
import { parseMap } from "../ObjectUtils";

export default class OpenApiObject {
  $$raw: any;
  openapi: semver.SemVer;
  info: InfoObject;
  jsonSchemaDialect: Optional<string>;
  servers: Optional<ServerObject[]>;
  paths: Optional<PathsObject>;
  webhooks: Optional<Map<string, PathItemObject | ReferenceObject>>;
  components: Optional<ComponentsObject>;
  security: Optional<SecurityRequirementObject[]>;
  tags: Optional<TagObject[]>;
  externalDocs: Optional<ExternalDocumentationObject>;

  static parse(v: any): Optional<OpenApiObject> {
    let o = new OpenApiObject();
    o.$$raw = v;
    let ver = semver.parse(v.openapi);
    if (!ver) return Optional.emptyWithError(`Invalid OpenAPI version: ${ver}`);
    if (!this.validVersion(ver!)) return Optional.emptyWithError(`Unsupported OpenAPI version: ${ver}`);
    o.openapi = ver!;

    let info = InfoObject.parse(v.info);
    if (info.isEmpty()) return Optional.emptyWithError(`Missing 'info': ${info.errorReason() ?? "No reason"}`);
    o.info = info.get();
    o.jsonSchemaDialect = Optional.full(v.jsonSchemaDialect);
    o.servers = ServerObject.parseArray(v.servers);
    o.paths = PathsObject.parse(v.paths);
    o.webhooks = this.parseWebhooks(v.webhooks);
    o.components = ComponentsObject.parse(v.components);
    o.security = SecurityRequirementObject.parseArray(v.security);
    o.tags = TagObject.parseArray(v.tags);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return Optional.full(o);
  }

  private static validVersion(v: semver.SemVer): boolean {
    return semver.satisfies(v, "3.x.x");
  }

  private static parseWebhooks(v: any): Optional<Map<string, PathItemObject | ReferenceObject>> {
    return parseMap<string, PathItemObject | ReferenceObject>(v, (x) => {
      let d: Optional<PathItemObject | ReferenceObject> = ReferenceObject.parse(x);
      if (d.isEmpty()) d = PathItemObject.parse(x);
      return d;
    });
  }
}
