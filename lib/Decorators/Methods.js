"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Put = exports.Options = exports.Delete = exports.Post = exports.Get = void 0;
const RouteDefinition_1 = require("../Model/RouteDefinition");
const defineMethod = (path, methodName) => {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            requestMethod: methodName,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};
const Get = (path) => defineMethod(path, RouteDefinition_1.HttpMethod.GET);
exports.Get = Get;
const Post = (path) => defineMethod(path, RouteDefinition_1.HttpMethod.POST);
exports.Post = Post;
const Put = (path) => defineMethod(path, RouteDefinition_1.HttpMethod.PUT);
exports.Put = Put;
const Delete = (path) => defineMethod(path, RouteDefinition_1.HttpMethod.DELETE);
exports.Delete = Delete;
const Options = (path) => defineMethod(path, RouteDefinition_1.HttpMethod.OPTIONS);
exports.Options = Options;
const Patch = (path) => defineMethod(path, RouteDefinition_1.HttpMethod.PATCH);
exports.Patch = Patch;
//# sourceMappingURL=Methods.js.map