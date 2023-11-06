import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../configs/envConfig';
import passport from 'passport';
import { User } from '../entities/User.entity';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) {
      next(err);
      return;
    }

    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, envConfig.JWT_SECRET) as jwt.JwtPayload;

    if (decoded.exp && Date.now() > decoded.exp * 1000) {
      return res
        .status(401)
        .json({ error: 'Token expired' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorised' });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
