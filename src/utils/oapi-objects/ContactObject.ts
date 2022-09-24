import Optional from "../Optional";
import isEmail from "validator/es/lib/isEmail";
import isURL from "validator/es/lib/isURL";

export default class ContactObject {
  $$raw: any;
  name: string;
  url: Optional<string>;
  email: Optional<string>;

  static parse(v: any): Optional<ContactObject> {
    let o = new ContactObject();
    o.$$raw = v;
    o.name = v.name;
    o.url = Optional.full(v.url);
    o.email = Optional.full(v.email);
    if (o.url.isFull() && !isURL(v.url)) return Optional.emptyWithError("ContactObject: Invalid URL value");
    if (o.email.isFull() && !isEmail(v.email)) return Optional.emptyWithError("ContactObject: Invalid email address");
    return Optional.full(o);
  }
}
