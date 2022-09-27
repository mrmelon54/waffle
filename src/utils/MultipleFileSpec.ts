import YAML from "js-yaml";
import OpenApiObject from "./oapi/objects/OpenApiObject";

export default class MultipleFileSpec {
  files: Map<string, OpenApiObject>;

  constructor() {}

  async fetchAndParse(url: string): Promise<OpenApiObject> {
    console.log(`Trying to fetch ${url}`);
    let v: any = await this.remoteFetch(url);
    let file = this.parseAny(v);
    let o = OpenApiObject.parse(this, file);
    console.log(o);
    if (o.isEmpty() || o.hasError()) throw new Error(`OpenApi parsing error: ${o.errorReason() ?? "No reason"}`);
    let g = o.get();
    this.files.set(url, g);
    return g;
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
