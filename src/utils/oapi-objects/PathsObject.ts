export default class PathsObject {
  $$raw: any;

  constructor(v) {
    this.$$raw = v;
  }

  get(path: string): PathItemObject {
    return new PathItemObject(this.$$raw[path]);
  }

  all(): string[] {
    return Object.keys(this.$$raw);
  }
}
