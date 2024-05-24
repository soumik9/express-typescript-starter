import express, { Application } from 'express'
import routes from './app/routers/routes';
import globalErrorHandler from './utils/errors/globalErrorHandler';
import { bootstrap, globalMiddlewares, handleRouteNotFound } from './utils/server';

const app: Application = express();

// middleware
globalMiddlewares(app);

// all routes
app.use('/api/v1', routes);

// files route
app.use('/public', express.static('public'))

// global error handler
app.use(globalErrorHandler);

// handle route not found
app.use(handleRouteNotFound)

// server & database
bootstrap(app);