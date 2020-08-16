// TODO: Work in Progress. Not working yet

export const Middleware = (...middleware: any[]) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line: only-arrow-functions
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return originalMethod.apply(this, ...middleware, args);
    }
  }
}