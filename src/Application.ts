import express from 'express';

import Config from './Model/Config';
import RouterHelper from './RouterHelper';
import Logger from './Utils/Logger';

export default class Application {
  app = express();
  config: Partial<Config> = {};

  private setup() {
    if (this.config.middlewares) {
      this.config.middlewares.forEach(middleware => {
        this.app.use(middleware);
      });
    }

    if (this.config.routes) {
      this.app.use(RouterHelper(this.config.routes, {
        logLevel: this.config.logLevel || 'info'
      }));
    }
  }

  start(cb?: () => void) {
    this.setup();
    const port = this.config.port || 8080;
    let callback = () => {
      Logger.info(`Server started at port ${ port }`);
    };
    if (cb) {
      callback = cb;
    }
    return this.app.listen(port, callback);
  }

  getAppForTesting() {
    this.setup();

    return this.app;
  }
}
