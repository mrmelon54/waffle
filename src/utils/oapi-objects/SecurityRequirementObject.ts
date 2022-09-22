export default class SecurityRequirementObject {
  $$raw: any;

  constructor(v) {
    this.$$raw = v;
  }

  get(name: string): string[] {
    return this.$$raw[name];
  }

  all(): string[] {
    return Object.keys(this.$$raw);
  }
}
