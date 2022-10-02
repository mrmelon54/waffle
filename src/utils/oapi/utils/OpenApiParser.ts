import OpenApiFile from "./OpenApiFile";

export default class OpenApiParser {
  mainFile: OpenApiFile;
  files: Map<string, OpenApiFile>;

  private constructor() {
    this.files = new Map();
  }

  static async create(url: URL): Promise<OpenApiParser> {
    let o = new OpenApiParser();
    try {
      let z = await OpenApiFile.load(url);
      o.mainFile = z;
      o.files.set("", z);
      o.files.set(url.toString(), z);
    } catch (err) {
      return Promise.reject(`Failed to download and parse OpenAPI Document: ${err ?? "No reason"}`);
    }
    return o;
  }

  async lookup(baseUrl: URL, ref: string): Promise<any> {
    let hashIdx = ref.indexOf("#");
    let file = ref.slice(0, hashIdx);
    let tree = ref.slice(hashIdx + 1);
    let url = new URL(file, baseUrl);
    let f = await OpenApiFile.load(url);
    this.files.set(url.toString(), f);
    return this.nestedLookup(f, tree.split("/").slice(1));
  }

  private async nestedLookup(v: any, ref: string[]): Promise<any> {
    for (let i of ref) {
      if (v.__proto__ === Map.prototype) v = v.get(i);
      else if (typeof v === "object") v = v[i];
    }
  }
}
