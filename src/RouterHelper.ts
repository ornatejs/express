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
      if (Reflect.hasMetadata(`${methodName}Middleware`, controller)) {
        // tslint:disable-next-line: ban-types
        const methods = instance[methodName]().map((method: Function) => {
          return method.bind(instance);
        })
        router[route.requestMethod](prefix + route.path, ...methods);
      } else {
        router[route.requestMethod](prefix + route.path, instance[methodName].bind(instance));
      }
      Logger.info(`Endpoint registered with ${instance.constructor.name}: ${''.padEnd(longestMethodNameLength - route.requestMethod.length)}(${route.requestMethod.toUpperCase()})  ${prefix + route.path}`)
    });
  });

  return router;
}