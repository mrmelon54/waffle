export const isInstanceOf =
  <T>(ctor: new (...args: any) => T) =>
  (x: any): x is T =>
    x instanceof ctor;
