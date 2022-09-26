export class Method {
  name: string;
  private color: number;
  private highColor: number;
  private bgColor: number;

  constructor(name: string, color: number, highColor: number, bgColor: number) {
    this.name = name;
    this.color = color;
    this.highColor = highColor;
    this.bgColor = bgColor;
  }

  style() {
    return `--method-color:${this.getColor()};--method-high-color:${this.getHighColor()};--method-bg-color:${this.getBgColor()};`;
  }

  getColor(): string {
    return this.getHexString(this.color);
  }

  getHighColor(): string {
    return this.getHexString(this.highColor);
  }

  getBgColor(): string {
    return this.getHexString(this.bgColor);
  }

  private getHexString(v: number) {
    return "#" + v.toString(16).padStart(6, "0");
  }
}

export let Methods = {
  get: new Method("get", 0x014991, 0x014991, 0x0149911a),
  put: new Method("put", 0xae6203, 0xae6203, 0xae62031a),
  post: new Method("post", 0x2a9570, 0x2a9570, 0x2a95701a),
  delete: new Method("delete", 0xa50505, 0xa50505, 0xa505051a),
  options: new Method("options", 0x0a4886, 0x0a4886, 0x0a48861a),
  head: new Method("head", 0x6701c1, 0x6701c1, 0x6701c11a),
  patch: new Method("patch", 0x189580, 0x189580, 0x1895801a),
  trace: new Method("trace", 0x000000, 0x8c8273, 0x0000001a),
};

export function AllMethods() {
  return Object.values(Methods);
}
