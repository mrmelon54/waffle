import StaticOptional from "../../StaticOptional";

export default class ServerVariableObject {
  // TODO: define this

  static parse(v: any): StaticOptional<ServerVariableObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    return StaticOptional.full(new ServerVariableObject());
  }
}