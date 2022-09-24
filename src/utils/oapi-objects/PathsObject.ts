import Optional from "../Optional";
import PathItemObject from "./PathItemObject";

export default class PathsObject {
  $$raw: any;
  paths: Map<string, PathItemObject>;

  private constructor() {}

  static parse(v: any): Optional<PathsObject> {
    if (!v) return Optional.empty();
    let o = new PathsObject();
    o.$$raw = v;
    o.paths = new Map();
    for (let a of Object.keys(o.$$raw)) {
      let b = PathItemObject.parse(v[a]);
      if (b.isEmpty()) return Optional.emptyWithError(`Error with path '${a}': ${b.errorReason() ?? "no reason"}`);
      else o.paths.set(a, b.get());
    }
    return Optional.full(o);
  }

  get(path: string): PathItemObject | undefined {
    return this.paths.get(path);
  }

  all(): string[] {
    return Object.keys(this.paths);
  }
}
