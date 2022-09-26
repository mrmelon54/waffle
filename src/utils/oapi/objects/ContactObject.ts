import StaticOptional from "../../StaticOptional";
import isEmail from "validator/es/lib/isEmail";
import isURL from "validator/es/lib/isURL";

export default class ContactObject {
  $$raw: any;
  name: string;
  url: Optional<string>;
  email: Optional<string>;

  static parse(v: any): StaticOptional<ContactObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new ContactObject();
    o.$$raw = v;
    o.name = v.name;
    o.url = StaticOptional.full(v.url);
    o.email = StaticOptional.full(v.email);
    if (o.url.isFull() && !isURL(v.url)) return StaticOptional.emptyWithError("ContactObject: Invalid URL value");
    if (o.email.isFull() && !isEmail(v.email)) return StaticOptional.emptyWithError("ContactObject: Invalid email address");
    return StaticOptional.full(o);
  }
}
