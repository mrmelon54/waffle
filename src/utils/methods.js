import { hexToRgb } from "./rgb";

export default function methods() {
  return [
    { method: "get", color: hexToRgb("#014991") },
    { method: "put", color: hexToRgb("#ae6203") },
    { method: "post", color: hexToRgb("#2a9570") },
    { method: "delete", color: hexToRgb("#a50505") },
    { method: "options", color: hexToRgb("#0a4886") },
    { method: "head", color: hexToRgb("#6701c1") },
    { method: "patch", color: hexToRgb("#189580") },
    { method: "trace", color: hexToRgb("#000000") },
  ];
}
