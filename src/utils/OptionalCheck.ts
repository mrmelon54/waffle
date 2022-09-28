export default function OptionalCheck(o: object): boolean {
  try {
    return "isFull" in o && "isEmpty" in o;
  } catch (err) {
    return false;
  }
}
