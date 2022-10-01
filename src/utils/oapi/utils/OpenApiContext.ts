import MultipleFileSpec from "./MultipleFileSpec";
import { instanceOfOpenApiObject, OpenApiObject } from "../objects/OpenApiObject";

export default class OpenApiContext {
  mainFile?: OpenApiObject;
  manager?: MultipleFileSpec;
  loading: Promise<void>[];
  files: Map<string, OpenApiObject>;
  refs: string[];

  private constructor(manager?: MultipleFileSpec) {
    this.manager = manager;
    this.loading = [];
    this.files = new Map();
  }

  static empty(): OpenApiContext {
    return new OpenApiContext();
  }

  static async generate(manager: MultipleFileSpec, url: string): Promise<OpenApiContext> {
    let o = new OpenApiContext(manager);
    try {
      let z = await o.loadFile(url);
      o.mainFile = z;
    } catch (err) {
      return Promise.reject(`Failed to parse OpenApiObject: ${err ?? "No reason"}`);
    }
    return o;
  }

  get(): OpenApiObject {
    return this.mainFile!;
  }

  async lookup(ref: string): Promise<any> {
    let hashIdx = ref.indexOf("#");
    let file = ref.slice(0, hashIdx);
    let tree = ref.slice(hashIdx + 1);
    let f = await this.loadFile(file);
    console.info("Context lookup", f, tree.split("/").slice(1));
    return this.nestedLookup(f, tree.split("/").slice(1));
  }

  private async nestedLookup(v: any, ref: string[]): Promise<any> {
    for (let i of ref) {
      if (v.__proto__ === Map.prototype) v = v.get(i);
      else if (typeof v === "object") v = v[i];
    }
  }

  async loadFile(url: string): Promise<OpenApiObject> {
    if (url == "") return this.mainFile!;
    if (this.files.has(url)) return this.files.get(url)!;
    let file = await this.manager!.fetchAndParse(url);

    if (!instanceOfOpenApiObject(file)) return Promise.reject(`OpenApiObject doesn't match: ${JSON.stringify(file)}`);
    let o = <OpenApiObject>file;
    this.files.set(url, o);
    return o;
  }

  async loadFromRefs(refs: string[]) {
    for (let i of refs) {
      let l = await this.lookup(i);
      console.info("l:", l);
    }
  }

  waitFor(p: Promise<void>) {
    this.loading.push(p);
  }

  loadExternal(): Promise<any[]> {
    return Promise.all(this.loading);
  }

  clone(): OpenApiContext {
    let o = new OpenApiContext();
    o.manager = this.manager;
    o.files = this.files;
    o.mainFile = this.mainFile;
    o.loading = [];
    return o;
  }

  withMainFile(v: OpenApiObject) {
    let o = this.clone();
    o.mainFile = v;
    return o;
  }
}
