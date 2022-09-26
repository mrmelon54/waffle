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
    return "#" + v.toString(16).padStart(8, "0");
  }
}

export let Methods = {
  get: new Method("get", 0x014991ff, 0x014991ff, 0x0149911a),
  put: new Method("put", 0xae6203ff, 0xae6203ff, 0xae62031a),
  post: new Method("post", 0x2a9570ff, 0x2a9570ff, 0x2a95701a),
  delete: new Method("delete", 0xa50505ff, 0xa50505ff, 0xa505051a),
  options: new Method("options", 0x0a4886ff, 0x0a4886ff, 0x0a48861a),
  head: new Method("head", 0x6701c1ff, 0x6701c1ff, 0x6701c11a),
  patch: new Method("patch", 0x189580ff, 0x189580ff, 0x1895801a),
  trace: new Method("trace", 0x000000ff, 0x8c8273ff, 0x0000001a),
};

export function AllMethods() {
  return Object.values(Methods);
}
