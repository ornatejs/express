"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Logger_1 = __importDefault(require("./Utils/Logger"));
const RouteDefinition_1 = require("./Model/RouteDefinition");
let longestMethodNameLength = RouteDefinition_1.HttpMethod.GET.length;
for (const name in RouteDefinition_1.HttpMethod) {
    if (name.length > longestMethodNameLength) {
        longestMethodNameLength = name.length;
    }
}
function RouterHelper(routers, config) {
    if (config) {
        Logger_1.default.level = config.logLevel || 'info';
    }
    const router = express_1.Router();
    routers.forEach(controller => {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes = Reflect.getMetadata('routes', controller);
        routes.forEach(route => {
            const methodName = route.methodName;
            // @ts-ignore
            router[route.requestMethod](prefix + route.path, (req, res) => {
                instance[methodName](req, res);
            });
            Logger_1.default.info(`Endpoint registered with ${instance.constructor.name}: ${''.padEnd(longestMethodNameLength - route.requestMethod.length)}(${route.requestMethod.toUpperCase()})  ${prefix + route.path}`);
        });
    });
    return router;
}
exports.default = RouterHelper;
//# sourceMappingURL=RouterHelper.js.map