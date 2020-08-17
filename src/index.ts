import 'reflect-metadata';

import Application from './Application';
import { ClassMiddleware } from './Decorators/ClassMiddleware';
import { Config } from './Decorators/Config';
import { Controller } from './Decorators/Controller';
import { Delete, Get, Options, Patch, Post, Put } from './Decorators/Methods';
import { Middleware } from './Decorators/Middleware';
import { RouteDefinition } from './Model/RouteDefinition';
import RouterHelper from './RouterHelper';

export {
  Get,
  Post,
  Delete,
  Options,
  Put,
  Patch,
  Controller,
  RouteDefinition,
  Application,
  Config,
  Middleware,
  ClassMiddleware
};
export default RouterHelper;
