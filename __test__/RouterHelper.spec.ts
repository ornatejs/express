import RouterHelper from '../src/RouterHelper';

describe('RouterHelper', () => {
  it('should return a router', () => {
    const result = RouterHelper([]);

    expect(result).toBeDefined();
    expect(result.stack).toBeDefined();
    expect(result.stack.length).toBe(0);
  });

  it('should apply routes from metadata', () => {
    Reflect.defineMetadata('routes', [
      {
        path: '/getTest',
        requestMethod: 'get',
        methodName: 'testMethod'
      },
      {
        path: '/postTest',
        requestMethod: 'post',
        methodName: 'testMethod'
      }
    ], MockClass);
    Reflect.defineMetadata('prefix', '/mock', MockClass);
    const result = RouterHelper([MockClass]);
    expect(result.stack[0].route.path).toEqual('/mock/getTest');
    expect(result.stack[0].route.stack[0].method).toEqual('get');
    expect(result.stack[1].route.path).toEqual('/mock/postTest');
    expect(result.stack[1].route.stack[0].method).toEqual('post');
  });
});

class MockClass {
  testMethod() {}
}