import Optional from "../../Optional";

export default class ServerVariableObject {
  // TODO: define this

  static parse(v: any): Optional<ServerVariableObject> {
    if (v === null || v === undefined) return Optional.empty();
    return Optional.full(new ServerVariableObject());
  }
}
