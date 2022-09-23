import ErrorCollector from "../ErrorCollector";
import PathItemObject from "./PathItemObject";

export default class PathsObject {
  $$raw: any;
  $$err: ErrorCollector;

  constructor(v) {
    this.$$raw = v;
    this.$$err = new ErrorCollector();
  }

  valid(): boolean {
    return this.$$err.clean();
  }

  get(path: string): PathItemObject {
    return new PathItemObject(this.$$raw[path]);
  }

  all(): string[] {
    return Object.keys(this.$$raw);
  }
}
