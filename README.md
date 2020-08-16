# Ornate Express

### An add on for Express to implement TypeScript decorators to your Express applications

## [Boilerplate/Example Project](https://github.com/StephenABoyd/Express-Boilerplate-Decorators)

## Why?
Clean and elegant solutions to creating a "class-based" architecture for Express apps and services with very minimal setup.

## How do I use it?
1. Install `@ornate/express` with `npm i @ornate/express`
2. In your `tsconfig.json` add `"experimentalDecorators": true` to your `compilerOptions`

From here there are two directions to go:
* Use the provided `Application` class
* Use the provided `RouteHelper` method


## Using the provided `Application` class
This is easiest way to create the application/service.

Simply import `Application` and `Config` from `@ornate/express` and create a new class that extends `Application`. This allows you to use the `@Config` decorator to set up your routes, middlewares, port and the logLevel of the `@ornate/express` package.

Then all you have to do is create a new instance of the class and call `start()`
```
import { Application, Config } from '@ornate/express';
import TestController from './controller/TestController';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const PORT = 8082;


@Config({
  routes: [ TestController ],
  middlewares: [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    morgan('tiny')
  ],
  port: PORT,
  logLevel: 'info'
})
class Service extends Application {}

new Service().start();

```

## Using the provided `RouteHelper` method
If you want to have fine tuned control over your application and not let `@ornate/express` set it all up for you, you can use the `RouteHelper` method.

Simply import `RouteHelper` from `@ornate/express` and create your app with your middlewares as you normally do. Then use `app.use(RouteHelper([ RouteClass ]))` and start your application normally (config with logLevel is optional).

```
import RouteHelper from '@ornate/express';
import express from 'express';
import TestController from './controller/TestController';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const PORT = 8082;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(RouteHelper([ TestController ], { logLevel: 'info' }));

app.listen(PORT);
```

# Creating the Routers

To create your router class, you need to register the class as a `Controller` with the `@Controller()` decorator. You can pass in the route prefix into this controller decorator.

Inside the class you can create your methods that take the parameters `request` and `response` from Express. Decorate those methods with the HTTP method of your choice (ie. `Get`) and pass in the name of the route.

From there you will have access to the `request` and `response` objects like you normally do. 

To add middlewares underneath the HTTP method decorator just add `@Middleware()` and pass your middlewares into the decorator.

```
import { Request, Response } from 'express';

import { Controller, Delete, Get, Options, Patch, Post, Put, Middleware } from '@ornate/express'
import Logger from '../utils/Logger';
import TestService from '../service/TestService';
import { addSomeValue, logBody } from '../middleware/TestMiddleware';

@Controller('/methods')
@ClassMiddleware((req: Request, res: Response, next: NextFunction) => {
  req.dbConnectionString = 'testDbConnection';
  next();
})
export default class TestController {

  testService = new TestService();

  @Get('/test')
  @Middleware(addSomeValue)
  getTest(request: Request, response: Response) {
    Logger.info(request.someValue);
    this.testService.returnSuccess(request, response, 'Get');
  }

  @Post('/test')
  @Middleware(logBody)
  postTest(request: Request, response: Response) {
    this.testService.returnSuccess(request, response, 'Post');
  }

  @Delete('/test')
  deleteTest(request: Request, response: Response) {
    Logger.info(request.dbConnectionString);
    this.testService.returnSuccess(request, response, 'Delete');
  }

  @Options('/test')
  optionsTest(request: Request, response: Response) {
    this.testService.returnSuccess(request, response, 'Options');
  }

  @Put('/test')
  putTest(request: Request, response: Response) {
    this.testService.returnSuccess(request, response, 'Put');
  }

  @Patch('/test')
  patchTest(request: Request, response: Response) {
    this.testService.returnSuccess(request, response, 'Patch');
  }
}
```

## Integration Testing the app/service
If you are using `supertest` to run integration tests on your application you can simply import the `AppTest` method from `@ornate/express/lib/testing`

Then before each test is ran, you can assign the app/service object to `AppTest` and pass in your router along with any application-wide middlewares you require.

```
import request from 'supertest';
import { Express } from 'express';

import { AppTest } from '@ornate/express/lib/testing';
import TestController from './TestController';

describe('Integration - TestController', () => {

  let service: Express;

  beforeEach(() => {
    service = AppTest({
      router: TestController,
      middlewares: []
    });
  });

  it('(GET) /methods/test - should return success message', async () => {
    const response = await request(service).get('/methods/test');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Get request successful');
  });

  it('(POST) /methods/test - should return success message', async () => {
    const response = await request(service).post('/methods/test');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Post request successful');
  });

  it('(DELETE) /methods/test - should return success message', async () => {
    const response = await request(service).delete('/methods/test');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Delete request successful');
  });

  it('(OPTIONS) /methods/test - should return success message', async () => {
    const response = await request(service).options('/methods/test');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Options request successful');
  });

  it('(PUT) /methods/test - should return success message', async () => {
    const response = await request(service).put('/methods/test');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Put request successful');
  });

  it('(PATCH) /methods/test - should return success message', async () => {
    const response = await request(service).patch('/methods/test');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Patch request successful');
  });
});
```