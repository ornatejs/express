"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
exports.Controller = (prefix = '') => {
    return (target) => {
        Reflect.defineMetadata('prefix', prefix, target);
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
};
//# sourceMappingURL=Controller.js.map