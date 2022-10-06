import {SchemaObjectPrimitive} from "../objects/SchemaObject";

export function autoString(a: SchemaObjectPrimitive): any {
  if (a.enumValues !== undefined) return a.enumValues[0];
  if (a.example !== undefined) return a.example;
  switch (a.format) {
    case "date":
      return "1970-01-01";
    case "date-time":
      return "1970-01-01T05:45:05Z";
    case "byte":
      return "RXhhbXBsZQ==";
    case "email":
      return "john.smith@example.com";
    case "uuid":
      return "b354dde7-bb70-451f-858b-f8602d7b9c2d";
    case "uri":
      return "https://example.com";
    case "hostname":
      return "example.com";
    case "ipv4":
      return "192.168.1.1";
    case "ipv6":
      return "::1";
    case "phone":
      return "+1-202-555-0192";
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
