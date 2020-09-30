import 'reflect-metadata'; // Decorators sintaxe
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import routes from './routes';

// Dependency injection
import '@shared/container';
// Database connection
import '@shared/infra/typeorm';

const app = express();

app.use(express.json());

app.use(routes);

// Middleware to get errors outside routes;
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333');
});
