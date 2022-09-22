export default class ErrorCollector {
  errors: string[];

  constructor() {
    this.errors = [];
  }

  clean(): boolean {
    return this.errors.length == 0;
  }

  trueError(msg: string, v: boolean) {
    if (v) this.errors.push(msg);
  }

  falseError(msg: string, v: boolean) {
    if (!v) this.errors.push(msg);
  }
}
