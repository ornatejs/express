import { Router } from 'express';

import Logger from './Utils/Logger';
import { HttpMethod, RouteDefinition } from './Model/RouteDefinition';

export interface HelperConfig {
  logLevel: string;
}

let longestMethodNameLength = HttpMethod.GET.length;
for (const name in HttpMethod) {
  if (name.length > longestMethodNameLength) {
    longestMethodNameLength = name.length;
  }
}

export default function RouterHelper(routers: any[], config?: HelperConfig) {
  if (config) {
    Logger.level = config.logLevel || 'info';
  }
  const router = Router();
  routers.forEach(controller => {
    const instance = new controller();
    const prefix = Reflect.getMetadata('prefix', controller);
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller);

    routes.forEach(route => {
      const methodName: string = route.methodName as string;
      
      let allMethods = [];
      if (Reflect.hasMetadata(`ClassMiddleware`, controller)) {
        allMethods.push(...instance.middlewares);
      }
      if (Reflect.hasMetadata(`${methodName}Middleware`, controller)) {
        allMethods.push(...instance[methodName]());
      } else {
        allMethods.push(instance[methodName]);
      }

      allMethods = allMethods.map(method => method.bind(instance));
      router[route.requestMethod](prefix + route.path, ...allMethods);

      Logger.info(`Endpoint registered with ${instance.constructor.name}: ${''.padEnd(longestMethodNameLength - route.requestMethod.length)}(${route.requestMethod.toUpperCase()})  ${prefix + route.path}`)
    });
  });

  return router;
}