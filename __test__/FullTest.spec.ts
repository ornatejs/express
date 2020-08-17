import { Application, Controller, Get, Middleware, ClassMiddleware, Post, Put, Patch, Options, Delete, Config } from '../src';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import superRequest from 'supertest';

@Controller('/testPrefix')
@ClassMiddleware((request: any, res: Response, next: NextFunction) => {
  if (request.body && request.body.interrupt) {
    res.status(200).json({
      interrupted: true
    })
    res.end();
  } else if (request.body && request.body.throwError) {
    res.status(500).json({
      error: true
    });
    res.end();
  } else {
    next();
  }
})
class TestController {
  @Get('/test')
  getTest(request: Request, response: Response) {
    response.json({
      success: 'true'
    }).status(200);
  }

  @Get('/test/:id')
  getParamTest(request: Request, response: Response) {
    const id = request.params.id;
    response.json({
      id
    });
  }

  @Get('/testQuery')
  getQueryTest(request: Request, response: Response) {
    const id = request.query.id;
    response.json({
      id
    });
  }

  @Get('/testM')
  @Middleware((request: any, res: Response, next: NextFunction) => {
    request.id = '123';
    next();
  })
  getMiddlewareTest(request: any, response: Response) {
    response.json({
      id: request.id
    });
  }

  @Post('/test')
  postTest(request: Request, response: Response) {
    response.json(request.body);
  }

  @Post('/testM')
  @Middleware((request: Request, res: Response, next: NextFunction) => {
    request.body.id = '123';
    next();
  })
  postMiddlewareTest(request: Request, response: Response) {
    response.json(request.body);
  }

  @Put('/test')
  putTest(request: Request, response: Response) {
    response.json({
      success: true
    });
  }

  @Put('/testM')
  @Middleware((request: Request, res: Response, next: NextFunction) => {
    request.body.id = '234';
    next();
  })
  putMiddlewareTest(request: Request, response: Response) {
    response.json(request.body);
  }

  @Delete('/test')
  deleteTest(request: Request, response: Response) {
    response.json({
      success: true
    });
  }

  @Delete('/testM')
  @Middleware((request: Request, res: Response, next: NextFunction) => {
    request.body.id = '345';
    next();
  })
  deleteMiddlewareTest(request: Request, response: Response) {
    response.json(request.body);
  }

  @Options('/test')
  optionsTest(request: Request, response: Response) {
    response.json({
      success: true
    });
  }

  @Options('/testM')
  @Middleware((request: Request, res: Response, next: NextFunction) => {
    request.body.id = '456';
    next();
  })
  optionsMiddlewareTest(request: Request, response: Response) {
    response.json(request.body);
  }

  @Patch('/test')
  patchTest(request: Request, response: Response) {
    response.json({
      success: true
    });
  }

  @Patch('/testM')
  @Middleware((request: Request, res: Response, next: NextFunction) => {
    request.body.id = '567';
    next();
  })
  patchMiddlewareTest(request: Request, response: Response) {
    response.json(request.body);
  }
}

// tslint:disable-next-line: max-classes-per-file
@Config({
  routes: [ TestController ],
  middlewares: [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
  ]
})
class TestClass extends Application {}

const testApp = new TestClass().getAppForTesting();

describe('Full Test', () => {
  it('should test get', async () => {
    const response = await superRequest(testApp).get('/testPrefix/test');
    expect(response.body.success).toBeTruthy();
  });

  it('should test get with params', async () => {
    const response = await superRequest(testApp).get('/testPrefix/test/123');
    expect(response.body.id).toEqual("123");
  });

  it('should test get with query', async () => {
    const response = await superRequest(testApp).get('/testPrefix/testQuery?id=123');
    expect(response.body.id).toEqual("123");
  });

  it('should test get with middleware', async () => {
    const response = await superRequest(testApp).get('/testPrefix/testM');
    expect(response.body.id).toEqual("123");
  });

  it('should test post', async () => {
    const response = await superRequest(testApp).post('/testPrefix/test').send({
      id: 'testId'
    });

    expect(response.body.id).toEqual('testId');
  });

  it('should test post with middleware', async () => {
    const response = await superRequest(testApp).post('/testPrefix/testM').send({
      id: 'testId',
      test: 'testValue'
    });

    expect(response.body.id).toEqual('123');
    expect(response.body.test).toEqual('testValue');
  });

  it('should test put', async () => {
    const response = await superRequest(testApp).put('/testPrefix/test').send({
      id: 'testId'
    });

    expect(response.body.success).toBeTruthy();
  });

  it('should test put with middleware', async () => {
    const response = await superRequest(testApp).put('/testPrefix/testM').send({
      id: 'testId',
      test: 'testValue'
    });

    expect(response.body.id).toEqual('234');
    expect(response.body.test).toEqual('testValue');
  });

  it('should test delete', async () => {
    const response = await superRequest(testApp).delete('/testPrefix/test').send({
      id: 'testId'
    });

    expect(response.body.success).toBeTruthy();
  });

  it('should test delete with middleware', async () => {
    const response = await superRequest(testApp).delete('/testPrefix/testM').send({
      id: 'testId',
      test: 'testValue'
    });

    expect(response.body.id).toEqual('345');
    expect(response.body.test).toEqual('testValue');
  });

  it('should test options', async () => {
    const response = await superRequest(testApp).post('/testPrefix/test').send({
      id: 'testId'
    });

    expect(response.body.id).toEqual('testId');
  });

  it('should test options with middleware', async () => {
    const response = await superRequest(testApp).options('/testPrefix/testM').send({
      id: 'testId',
      test: 'testValue'
    });

    expect(response.body.id).toEqual('456');
    expect(response.body.test).toEqual('testValue');
  });

  it('should test patch', async () => {
    const response = await superRequest(testApp).patch('/testPrefix/test').send({
      id: 'testId'
    });

    expect(response.body.success).toBeTruthy();
  });

  it('should test patch with middleware', async () => {
    const response = await superRequest(testApp).patch('/testPrefix/testM').send({
      id: 'testId',
      test: 'testValue'
    });

    expect(response.body.id).toEqual('567');
    expect(response.body.test).toEqual('testValue');
  });

  it('should test get interrupt from middleware', async () => {
    const response = await superRequest(testApp).post('/testPrefix/test').send({
      id: 'testId',
      interrupt: true
    });

    expect(response.body.id).toBeUndefined();
    expect(response.body.interrupted).toBeTruthy();
  });

  it('should test get error from middleware', async () => {
    const response = await superRequest(testApp).post('/testPrefix/test').send({
      id: 'testId',
      throwError: true
    });

    expect(response.body.id).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.status).toEqual(500);
  });
});