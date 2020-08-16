import { HttpMethod, RouteDefinition } from '../Model/RouteDefinition';

const defineMethod = (path: string, methodName: HttpMethod) => {
  return (target: any, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[];

    routes.push({
      requestMethod: methodName,
      path,
      methodName: propertyKey
    });

    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}

const Get     = (path: string): MethodDecorator => defineMethod(path, HttpMethod.GET);
const Post    = (path: string): MethodDecorator => defineMethod(path, HttpMethod.POST);
const Put     = (path: string): MethodDecorator => defineMethod(path, HttpMethod.PUT);
const Delete  = (path: string): MethodDecorator => defineMethod(path, HttpMethod.DELETE);
const Options = (path: string): MethodDecorator => defineMethod(path, HttpMethod.OPTIONS);
const Patch   = (path: string): MethodDecorator => defineMethod(path, HttpMethod.PATCH);

export { Get, Post, Delete, Options, Put, Patch };