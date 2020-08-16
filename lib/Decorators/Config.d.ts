import ConfigInterface from "../Model/config";
export declare const Config: (config: ConfigInterface) => <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        config: ConfigInterface;
    };
} & T;
//# sourceMappingURL=Config.d.ts.map