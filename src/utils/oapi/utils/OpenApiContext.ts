import MultipleFileSpec from "../../MultipleFileSpec";
import Optional from "../../Optional";
import OptionalCheck from "../../OptionalCheck";
import StaticOptional from "../../StaticOptional";
import OpenApiObject from "../objects-old/OpenApiObject";

export default class OpenApiContext {
  mainFile?: OpenApiObject;
  manager?: MultipleFileSpec;
  loading: Promise<void>[];
  files: Map<string, OpenApiObject>;

  private constructor(manager?: MultipleFileSpec) {
    this.manager = manager;
    this.loading = [];
    this.files = new Map();
  }

  static empty(): OpenApiContext {
    return new OpenApiContext();
  }

  static async generate(manager: MultipleFileSpec, url: string): Promise<Optional<OpenApiContext>> {
    let o = new OpenApiContext(manager);
    let f = await o.loadFile(url);
    if (f.isEmpty() || f.hasError()) return StaticOptional.emptyWithError(`Failed to parse OpenApiObject: ${f.errorReason() ?? "No reason"}`);
    o.mainFile = f.get();
    try {
      await o.loadExternal();
    } catch (err) {
      console.error("Error loading external resources:", err);
      return StaticOptional.emptyWithError("Error loading external resources");
    }
    return StaticOptional.full(o);
  }

  get(): OpenApiObject {
    return this.mainFile!;
  }

  async lookup(ref: string): Promise<any> {
    console.info("lookup $ref:", ref);
    if (OptionalCheck(<any>ref)) {
      console.error("Ref is an Optional:", ref);
      return Promise.reject("Ref is an Optional");
    }
    let hashIdx = ref.indexOf("#");
    let file = ref.slice(0, hashIdx);
    let tree = ref.slice(hashIdx + 1);
    let f = await this.loadFile(file);
    if (f.isEmpty()) return Promise.reject(`Context lookup error: ${f.errorReason() ?? "No reason"}`);
    let z = f.get().lookup(tree.split("/").slice(1));
    if (z.isFull()) return z.get();
    return Promise.reject(`Context lookup error: ${z.errorReason() ?? "No reason"}`);
  }

  async loadFile(url: string): Promise<Optional<OpenApiObject>> {
    if (url == "") return StaticOptional.full(this.mainFile!);
    if (this.files.has(url)) return StaticOptional.full(this.files.get(url));
    let file = await this.manager!.fetchAndParse(url);

    let o = OpenApiObject.parse(this, file);
    if (o.isEmpty() || o.hasError()) return StaticOptional.emptyWithError(`OpenApi parsing error: ${o.errorReason() ?? "No reason"}`);
    let g = o.get();
    this.files.set(url, g);
    return StaticOptional.full(g);
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
