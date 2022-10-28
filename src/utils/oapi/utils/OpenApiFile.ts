import { instanceOfOpenApiObject, type OpenApiObject } from "../objects/OpenApiObject";
import YAML from "js-yaml";

export default class OpenApiFile {
  url: URL;
  value: OpenApiObject;

  private constructor() {}

  static async load(url: URL): Promise<OpenApiFile> {
    let file = await this.fetchAndParse(url.href);
    if (!instanceOfOpenApiObject(file)) return Promise.reject(`OpenApiObject doesn't match: ${JSON.stringify(file)}`);
    let o = <OpenApiObject>file;
    let z = new OpenApiFile();
    z.url = url;
    z.value = o;
    return z;
  }

  private static async fetchAndParse(url: string): Promise<any> {
    console.log(`Trying to fetch ${url}`);
    let v: any = await this.remoteFetch(url);
    return this.parseAny(v);
  }

  private static async remoteFetch(url: string): Promise<string> {
    let resp = await fetch(url);
    return await resp.text();
  }

  private static parseAny(data: string): any {
    try {
      return this.parseJson(data);
    } catch (_) {
      try {
        return this.parseYaml(data);
      } catch (_) {}
    }
    return null;
  }

  private static parseJson(data: string): any {
    return JSON.parse(data);
  }

  private static parseYaml(data: string): any {
    return YAML.load(data);
  }
}
