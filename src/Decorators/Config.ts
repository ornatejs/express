import ConfigInterface from '../Model/Config';

export const Config = (config: ConfigInterface) => {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      config = config;
    }
  };
};
