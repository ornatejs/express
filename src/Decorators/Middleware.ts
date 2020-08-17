export const Middleware = (...middleware: any[]) => {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(`${propertyKey}Middleware`, true, target.constructor);
    const originalMethod = descriptor.value;
    descriptor.value = (...args: any[]) => {
      return [
        ...middleware,
        originalMethod
      ];
    }
  }
}
