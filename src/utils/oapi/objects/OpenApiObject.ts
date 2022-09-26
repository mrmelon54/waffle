import semver from "semver";
import InfoObject from "./InfoObject";
import { parsePaths, PathsObject } from "./PathsObject";
import ServerObject from "./ServerObject";
import PathItemObject from "./PathItemObject";
import ReferenceObject from "./ReferenceObject";
import ComponentsObject from "./ComponentsObject";
import SecurityRequirementObject from "./SecurityRequirementObject";
import TagObject from "./TagObject";
import ExternalDocumentationObject from "./ExternalDocumentationObject";
import StaticOptional from "../../StaticOptional";
import { parseCtxMap, parseMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";

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

  static parse(v: any): StaticOptional<OpenApiObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new OpenApiObject();
    let ctx = OpenApiContext.generate(o);
    o.$$raw = v;
    let ver = semver.parse(v.openapi);
    if (!ver) return StaticOptional.emptyWithError(`Invalid OpenAPI version: ${ver}`);
    if (!this.validVersion(ver!)) return StaticOptional.emptyWithError(`Unsupported OpenAPI version: ${ver}`);
    o.openapi = ver!;

    let info = InfoObject.parse(v.info);
    if (info.isEmpty()) return StaticOptional.emptyWithError(`Missing 'info': ${info.errorReason() ?? "No reason"}`);
    o.info = info.get();
    o.jsonSchemaDialect = StaticOptional.full(v.jsonSchemaDialect);
    o.servers = ServerObject.parseArray(v.servers);
    o.paths = parsePaths(ctx, v.paths);
    o.webhooks = parseCtxMap(ctx, v.webhooks, PathItemObject.parse);
    o.components = ComponentsObject.parse(ctx, v.components);
    o.security = SecurityRequirementObject.parseArray(v.security);
    o.tags = TagObject.parseArray(v.tags);
    o.externalDocs = ExternalDocumentationObject.parse(v.externalDocs);
    return StaticOptional.full(o);
  }

  private static validVersion(v: semver.SemVer): boolean {
    return semver.satisfies(v, "3.x.x");
  }
}
