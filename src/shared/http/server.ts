import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@config/ormconfig';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return resp
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  console.log(error);
  return resp.status(500).json({ status: 'error', message: 'Internal error.' });
});

app.listen(3333, () => {
  console.log('Server started in http://localhost:3333');
});
