import Optional from "../Optional";

export default class ServerVariableObject {
  // TODO: define this

  static parse(v: any): Optional<ServerVariableObject> {
    return Optional.full(new ServerVariableObject());
  }
}
