"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RouterHelper_1 = __importDefault(require("../RouterHelper"));
function AppTest(config) {
    const app = express_1.default();
    app.use(RouterHelper_1.default([config.router]));
    config.middlewares.forEach(middleware => {
        app.use(middleware);
    });
    return app;
}
exports.default = AppTest;
//# sourceMappingURL=AppTest.js.map