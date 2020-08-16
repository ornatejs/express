"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
exports.Config = (config) => {
    // tslint:disable-next-line: callable-types
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.config = config;
            }
        };
    };
};
//# sourceMappingURL=Config.js.map