import {SchemaObjectPrimitive} from "../objects/SchemaObject";

export function autoString(a: SchemaObjectPrimitive): any {
  if (a.enumValues !== undefined) return a.enumValues[0];
  switch (a.format) {
    case "date":
      return "2003-08-28";
    case "date-time":
      return "2003-08-28T17:32:05Z";
    case "byte":
      return "RXhhbXBsZQ==";
    case "email":
      return "hello@mrmelon54.com";
    case "uuid":
      return "b354dde7-bb70-451f-858b-f8602d7b9c2d";
    case "uri":
      return "https://mrmelon54.com";
    case "hostname":
      return "mrmelon54.com";
    case "ipv4":
      return "192.168.1.1";
    case "ipv6":
      return "::1";
  }
  return "hello";
}

export function autoNumber(a: SchemaObjectPrimitive, decimal: boolean): any {
  if (a.enumValues !== undefined) return a.enumValues[0];
  return decimal ? 28.8 : 3;
}

export function autoBoolean(a: SchemaObjectPrimitive): any {
  if (a.default === true || a.default === false) return a.default;
  return true;
}
