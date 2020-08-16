"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Application = exports.Controller = exports.Patch = exports.Put = exports.Options = exports.Delete = exports.Post = exports.Get = void 0;
require("reflect-metadata");
const Controller_1 = require("./Decorators/Controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return Controller_1.Controller; } });
const Methods_1 = require("./Decorators/Methods");
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return Methods_1.Delete; } });
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return Methods_1.Get; } });
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return Methods_1.Options; } });
Object.defineProperty(exports, "Patch", { enumerable: true, get: function () { return Methods_1.Patch; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return Methods_1.Post; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return Methods_1.Put; } });
const Config_1 = require("./Decorators/Config");
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return Config_1.Config; } });
const RouterHelper_1 = __importDefault(require("./RouterHelper"));
const Application_1 = __importDefault(require("./Application"));
exports.Application = Application_1.default;
exports.default = RouterHelper_1.default;
//# sourceMappingURL=index.js.map