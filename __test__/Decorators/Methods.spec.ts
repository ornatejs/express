import { Delete, Get, Options, Patch, Post, Put } from '../../src/Decorators/Methods';

describe('Methods', () => {
  beforeEach(() => {
    const allKeys = Reflect.getMetadataKeys(MockClass.constructor);
    for (const key of allKeys) {
      Reflect.deleteMetadata(key, MockClass.constructor);
    }
  });

  it('should add metadata for a GET request', () => {
    const getTest = Get('/test') as any;
    getTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(1);
    expect(routes[0].requestMethod).toEqual('get');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
  });

  it('should add metadata for a POST request', () => {
    const postTest = Post('/test') as any;
    postTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(1);
    expect(routes[0].requestMethod).toEqual('post');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
  });

  it('should add metadata for a PUT request', () => {
    const putTest = Put('/test') as any;
    putTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(1);
    expect(routes[0].requestMethod).toEqual('put');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
  });

  it('should add metadata for a DELETE request', () => {
    const deleteTest = Delete('/test') as any;
    deleteTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(1);
    expect(routes[0].requestMethod).toEqual('delete');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
  });

  it('should add metadata for a OPTIONS request', () => {
    const optionsTest = Options('/test') as any;
    optionsTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(1);
    expect(routes[0].requestMethod).toEqual('options');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
  });

  it('should add metadata for a PATCH request', () => {
    const patchTest = Patch('/test') as any;
    patchTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(1);
    expect(routes[0].requestMethod).toEqual('patch');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
  });

  it('should be able to add more than one route', () => {
    const patchTest = Patch('/test') as any;
    const optionsTest = Options('/test') as any;
    patchTest(MockClass, 'testMethod');
    optionsTest(MockClass, 'testMethod');
    const routes = Reflect.getMetadata('routes', MockClass.constructor);
    expect(routes.length).toBe(2);
    expect(routes[0].requestMethod).toEqual('patch');
    expect(routes[0].path).toEqual('/test');
    expect(routes[0].methodName).toEqual('testMethod');
    expect(routes[1].requestMethod).toEqual('options');
    expect(routes[1].path).toEqual('/test');
    expect(routes[1].methodName).toEqual('testMethod');
  });
});

class MockClass {
  testMethod() {}
}