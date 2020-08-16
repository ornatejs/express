import { Controller } from '../../src/Decorators/Controller';

describe('Controller', () => {
  it('should add prefix decorator', () => {
    const controllerDecorator = Controller('/test');
    controllerDecorator(MockClass.constructor);
    expect(Reflect.hasMetadata('prefix', MockClass.constructor)).toBeTruthy();
    expect(Reflect.getMetadata('prefix', MockClass.constructor)).toEqual('/test');
  });

  it('should add empty routes array if none exists', () => {
    const controllerDecorator = Controller('/test');
    controllerDecorator(MockClass.constructor);
    expect(Reflect.getMetadata('routes', MockClass.constructor)).toEqual([]);
  });

  it('should not override existing routes', () => {
    Reflect.defineMetadata('routes', ['testRoute'], MockClass.constructor);
    const controllerDecorator = Controller('/test');
    controllerDecorator(MockClass.constructor);
    expect(Reflect.getMetadata('routes', MockClass.constructor)).toEqual(['testRoute']);
  });
});

class MockClass {

}