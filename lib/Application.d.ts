import Config from './Model/Config';
export default class Application {
    app: import("express-serve-static-core").Express;
    config: Partial<Config>;
    private setup;
    start(): void;
    getAppForTesting(): import("express-serve-static-core").Express;
}
//# sourceMappingURL=Application.d.ts.map