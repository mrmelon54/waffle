import YAML from "js-yaml";
import OpenApiObject from "./oapi/objects/OpenApiObject";
import StaticOptional from "./StaticOptional";

export default class MultipleFileSpec {
  files: Map<string, OpenApiObject>;

  constructor() {
    this.files = new Map();
  }

  async fetchAndParse(url: string): Promise<any> {
    if (this.files.has(url)) return StaticOptional.full(this.files.get(url));
    console.log(`Trying to fetch ${url}`);
    let v: any = await this.remoteFetch(url);
    return this.parseAny(v);
  }

  private async remoteFetch(url: string): Promise<string> {
    let resp = await fetch(url);
    return await resp.text();
  }

  private parseAny(data: string): any {
    try {
      return this.parseJson(data);
    } catch (_) {
      try {
        return this.parseYaml(data);
      } catch (_) {}
    }
    return null;
  }

  private parseJson(data: string): any {
    return JSON.parse(data);
  }

  private parseYaml(data: string): any {
    return YAML.load(data);
  }
}
