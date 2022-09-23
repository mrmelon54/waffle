import YAML from "js-yaml";

export default class MultipleFileSpec {
  constructor() {}

  async fetchAndParse(url: string): Promise<any> {
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
