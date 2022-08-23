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
      user = await prisma.user_Security.findUnique({
        where: {
          google_acc_id: profile.id,
        },
        include: {
          user: true,
        },
      });
      if (!user) {
        const payload = req.query.state
          ? (verifyToken(req.query.state as string) as JwtPayload)
          : undefined;
        user = await prisma.user_Security.upsert({
          where: {
            user_id: payload ? payload.sub : '',
          },
          update: {
            google_acc_id: profile.id,
          },
          create: {
            google_acc_id: profile.id,
            user: {
              create: {
                name: profile.displayName,
                email: profile._json.email as string,
                photo_url: profile._json.picture,
              },
            },
          },
          include: {
            user: true,
          },
        });
      }
      done(null, user.user);
    } catch (err) {
      done(err as Error, false);
    }
  },
);

export { googleStrategy };
