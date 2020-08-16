// tslint:disable-next-line: ban-types
export const ClassMiddleware = (...middleware: Function[]) => {
  // tslint:disable-next-line: callable-types
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    Reflect.defineMetadata(`ClassMiddleware`, true, constructor);
    return class extends constructor {
      middlewares = middleware
    }
  };
};