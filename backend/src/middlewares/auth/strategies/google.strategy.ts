import { ENV } from '@common/enums/app/env.enum';
import { prisma } from '@data/prisma-client';
import { verifyToken } from '@helpers/helpers';
import { JwtPayload } from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const googleStrategy = new GoogleStrategy(
  {
    clientID: ENV.GOOGLE.CLIENT_ID as string,
    clientSecret: ENV.GOOGLE.CLIENT_SECRET as string,
    callbackURL: `${ENV.API.V1_PREFIX}/auth/google/redirect`,
    passReqToCallback: true,
    scope: ['profile', 'email'],
  },
  async (req, accessToken, refreshToken, profile, done) => {
    let user;
    try {
      user = await prisma.user.findFirst({
        where: {
          User_Security: {
            google_acc_id: profile.id,
          },
        },
      });

      if (user) return done(null, user);

      const payload =
        req.query.state !== 'null'
          ? (verifyToken(req.query.state as string) as JwtPayload)
          : undefined;
      if (payload) {
        user = await prisma.user.update({
          where: {
            id: payload ? payload.sub : '',
          },
          data: {
            User_Security: {
              update: {
                google_acc_id: profile.id,
              },
            },
          },
        });

        return done(null, user);
      }

      user = await prisma.user.upsert({
        where: {
          email: profile._json.email as string,
        },
        update: {
          User_Security: {
            update: {
              google_acc_id: profile.id,
            },
          },
        },
        create: {
          name: profile.displayName,
          email: profile._json.email as string,
          photo_url: profile._json.picture,
          User_Security: {
            create: {
              google_acc_id: profile.id,
            },
          },
        },
      });

      done(null, user);
    } catch (err) {
      done(err as Error, false);
    }
  },
);

export { googleStrategy };
