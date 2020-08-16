import ConfigInterface from "../Model/config";

export const Config = (config: ConfigInterface) => {
  // tslint:disable-next-line: callable-types
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      config = config;
    }
  };
};