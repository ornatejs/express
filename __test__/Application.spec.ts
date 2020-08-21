import { Application } from '../src';
import RouterHelper from '../src/RouterHelper';
import Logger from '../src/Utils/Logger';

jest.mock('../src/RouterHelper', () => {
  return jest.fn(() => () => {});
});

jest.mock('../src/Utils/Logger', () => {
  return {
    info: jest.fn()
  };
})

describe('Application', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application();
    jest.clearAllMocks();
  });

  it('should add application-wide middlewares on start', () => {
    const useSpy = spyOn(app.app, 'use');
    spyOn(app.app, 'listen');
    app.config.middlewares = ['test1', 'test2'];
    app.start();
    expect(useSpy).toHaveBeenCalledTimes(2);
    expect(useSpy).toHaveBeenNthCalledWith(1, 'test1');
    expect(useSpy).toHaveBeenNthCalledWith(2, 'test2');
  });

  it('should add routes and default logging to info on start', () => {
    const useSpy = spyOn(app.app, 'use');
    spyOn(app.app, 'listen');
    app.config.routes = ['test1', 'test2', 'test3'];
    app.start();
    expect(useSpy).toHaveBeenCalledTimes(1);
    expect(RouterHelper).toHaveBeenCalledTimes(1);
    expect(RouterHelper).toHaveBeenCalledWith(['test1', 'test2', 'test3'], {
      logLevel: 'info'
    });
  });

  it('should be able to set the routes log level on start', () => {
    const useSpy = spyOn(app.app, 'use');
    spyOn(app.app, 'listen');
    app.config.routes = [];
    app.config.logLevel = 'error';
    app.start();
    expect(useSpy).toHaveBeenCalledTimes(1);
    expect(RouterHelper).toHaveBeenCalledTimes(1);
    expect(RouterHelper).toHaveBeenCalledWith([], {
      logLevel: 'error'
    });
  });

  it('should call listen', () => {
    const useSpy = spyOn(app.app, 'use');
    const listenSpy = spyOn(app.app, 'listen').and.callFake((port, cb) => {
      cb();
    });
    app.config.port = 4000;
    app.start();
    expect(useSpy).toHaveBeenCalledTimes(0);
    expect(listenSpy).toHaveBeenCalledTimes(1);
    expect(listenSpy).toHaveBeenCalledWith(4000, expect.any(Function));
    expect(Logger.info).toHaveBeenCalledTimes(1);
    expect(Logger.info).toHaveBeenCalledWith(`Server started at port 4000`);

  });

  it('should be able to pass own callback', () => {
    const useSpy = spyOn(app.app, 'use');
    const listenSpy = spyOn(app.app, 'listen').and.callFake((port, cb) => {
      cb();
    });
    const testCb = jest.fn();
    app.start(testCb);
    expect(useSpy).toHaveBeenCalledTimes(0);
    expect(listenSpy).toHaveBeenCalledTimes(1);
    expect(testCb).toHaveBeenCalledTimes(1);
  })

  it('should add application-wide middlewares when getting testing app', () => {
    const useSpy = spyOn(app.app, 'use');
    spyOn(app.app, 'listen');
    app.config.middlewares = ['test1', 'test2', 'test3'];
    app.getAppForTesting();
    expect(useSpy).toHaveBeenCalledTimes(3);
    expect(useSpy).toHaveBeenNthCalledWith(1, 'test1');
    expect(useSpy).toHaveBeenNthCalledWith(2, 'test2');
    expect(useSpy).toHaveBeenNthCalledWith(3, 'test3');
  });

  it('should add routes and default logging to info when getting testing app', () => {
    const useSpy = spyOn(app.app, 'use');
    spyOn(app.app, 'listen');
    app.config.routes = ['test1', 'test2', 'test3'];
    app.getAppForTesting();
    expect(useSpy).toHaveBeenCalledTimes(1);
    expect(RouterHelper).toHaveBeenCalledWith(['test1', 'test2', 'test3'], {
      logLevel: 'info'
    });
  });

  it('should be able to set the routes log level when getting testing app', () => {
    const useSpy = spyOn(app.app, 'use');
    spyOn(app.app, 'listen');
    app.config.routes = [];
    app.config.logLevel = 'error';
    app.getAppForTesting();
    expect(useSpy).toHaveBeenCalledTimes(1);
    expect(RouterHelper).toHaveBeenCalledWith([], {
      logLevel: 'error'
    });
  });

  it('should return an application for testing', () => {
    app.config.routes = ['test1', 'test2', 'test3'];
    const result = app.getAppForTesting();
    expect(result).toBeDefined();
  });
});
