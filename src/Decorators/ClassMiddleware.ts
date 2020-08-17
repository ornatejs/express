export const ClassMiddleware = (...middleware: Function[]) => {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    Reflect.defineMetadata(`ClassMiddleware`, true, constructor);

    return class extends constructor {
      middlewares = middleware
    }
  };
};
