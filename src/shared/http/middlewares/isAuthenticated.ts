import { NextFunction, Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  resp: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT is missing.');
  }
  const [, token] = authHeader.split(' ');
  try{
    const {sub} = verify(token, authConfig.jwt.secret) as TokenPayload;
    req.user = {
      id: sub
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT.');
  }
}
