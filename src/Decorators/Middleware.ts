export const Middleware = (...middleware: any[]) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line: only-arrow-functions
    Reflect.defineMetadata(`${propertyKey}Middleware`, true, target.constructor);
    const originalMethod = descriptor.value;
    // tslint:disable-next-line: only-arrow-functions
    descriptor.value = (...args: any[]) => {
      return [
        ...middleware,
        originalMethod
      ];
    }
  }
}