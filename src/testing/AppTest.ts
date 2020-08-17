import express from 'express';

import RouterHelper from '../RouterHelper';

export interface AppTestInterface{
  router: any;
  middlewares: any[];
}

export default function AppTest(config: AppTestInterface) {
  const app = express();
  app.use(RouterHelper([config.router], {
    logLevel: 'warn'
  }));
  config.middlewares.forEach(middleware => {
    app.use(middleware);
  });

  return app;
}
