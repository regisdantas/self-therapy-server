import 'reflect-metadata';
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../../shared/errors/AppError';
import {errors} from 'celebrate'
import '../../config/ormconfig';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return resp
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  console.log(error);
  return resp.status(500).json({ status: 'error', message: 'Internal error.' });
});

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(`Server started in ${process.env.APP_URL}:${port}`);
});
