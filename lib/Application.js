"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = __importDefault(require("./utils/Logger"));
const RouterHelper_1 = __importDefault(require("./RouterHelper"));
class Application {
    constructor() {
        this.app = express_1.default();
        this.config = {};
    }
    setup() {
        if (this.config.routes) {
            this.app.use(RouterHelper_1.default(this.config.routes, {
                logLevel: this.config.logLevel || 'info'
            }));
        }
        if (this.config.middlewares) {
            this.config.middlewares.forEach(middleware => {
                this.app.use(middleware);
            });
        }
    }
    start() {
        this.setup();
        const port = this.config.port || 8080;
        this.app.listen(port, () => {
            Logger_1.default.info(`server started at http://localhost:${port}`);
        });
    }
    getAppForTesting() {
        this.setup();
        return this.app;
    }
}
exports.default = Application;
//# sourceMappingURL=Application.js.map