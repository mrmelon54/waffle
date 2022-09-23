export default class ErrorCollector {
  errors: string[];

  constructor() {
    this.errors = [];
  }

  clean(): boolean {
    return this.errors.length == 0;
  }

  add(msg: string) {
    this.errors.push(msg);
  }

  trueError(msg: string, v: boolean): boolean {
    if (v) {
      this.errors.push(msg);
      return true;
    }
    return false;
  }

  falseError(msg: string, v: boolean): boolean {
    if (!v) {
      this.errors.push(msg);
      return true;
    }
    return false;
  }
}
