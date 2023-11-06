import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { dbConfig } from './dbConfig';
import { User } from './../entities/User.entity';
import { envConfig } from './envConfig';
import type { Request } from 'express';

const cookieExtractor = (req: Request): string => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies.authToken;
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: envConfig.JWT_SECRET
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const userRepository = dbConfig.getRepository(User);
      const user = await userRepository.findOne({
        where: { uuid: jwtPayload.userId }
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
