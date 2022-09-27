import MultipleFileSpec from "../../MultipleFileSpec";
import OpenApiObject from "../objects/OpenApiObject";

export default class OpenApiContext {
  mainFile: OpenApiObject;
  manager: MultipleFileSpec;
  files: Map<string, OpenApiObject>;
  loading: Promise<void>[];

  private constructor(manager?: MultipleFileSpec, base?: OpenApiObject) {
    this.mainFile = base === undefined ? new OpenApiObject() : base;
    this.manager = manager === undefined ? new MultipleFileSpec() : manager;
    this.files = new Map();
    this.loading = [];
  }

  static empty(): OpenApiContext {
    return new OpenApiContext();
  }

  static generate(manager: MultipleFileSpec, base: OpenApiObject): OpenApiContext {
    return new OpenApiContext(manager, base);
  }

  get(): OpenApiObject {
    return this.mainFile!;
  }

  async lookup(ref: string): Promise<any> {
    let hashIdx = ref.indexOf("#");
    let file = ref.slice(0, hashIdx);
    let tree = ref.slice(hashIdx + 1);
    console.log("File:", file);
    console.log("Tree:", tree);
    let f = await this.loadFile(file);
    return f.lookup(tree.split("/").slice(1));
  }

  async loadFile(name: string): Promise<OpenApiObject> {
    if (name == "") return this.mainFile;
    let f = this.files[name];
    if (f === undefined) {
      f = this.manager.fetchAndParse(name);
      this.files[name] = f;
    }
    return f;
  }

  waitFor(p: Promise<void>) {
    this.loading.push(p);
  }
}
