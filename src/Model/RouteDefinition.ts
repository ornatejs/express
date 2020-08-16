export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  OPTIONS = 'options',
  PUT = 'put',
  PATCH = 'patch'
}

export interface RouteDefinition {
  path: string;
  requestMethod: HttpMethod;
  methodName: string | symbol;
}