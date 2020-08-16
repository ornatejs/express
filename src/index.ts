import 'reflect-metadata';

import { Controller } from './Decorators/Controller';
import { Delete, Get, Options, Patch, Post, Put } from './Decorators/Methods';
import { Config } from './Decorators/Config';
import { RouteDefinition } from './Model/RouteDefinition';
import RouterHelper from './RouterHelper';
import Application from './Application';

export { Get, Post, Delete, Options, Put, Patch, Controller, RouteDefinition, Application, Config };
export default RouterHelper;