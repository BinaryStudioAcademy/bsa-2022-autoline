import { ENV } from '@common/enums/app/app';
import { prisma } from '@data/prisma-client';
import { verifyToken } from '@helpers/helpers';
import { JwtPayload } from 'jsonwebtoken';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const facebookStrategy = new FacebookStrategy(
  {
    clientID: ENV.FACEBOOK.APP_ID as string,
    clientSecret: ENV.FACEBOOK.SECRET_KEY as string,
    callbackURL: `${ENV.APP.FRONTEND_URL}/${ENV.API.V1_PREFIX}/auth/facebook/redirect`,
    profileFields: [
      'email',
      'gender',
      'displayName',
      'hometown',
      'location',
      'birthday',
      'picture',
    ],
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findFirst({
        where: {
          User_Security: {
            facebook_acc_id: profile.id,
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
            id: payload.sub,
          },
          data: {
            User_Security: {
              update: {
                facebook_acc_id: profile.id,
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
              facebook_acc_id: profile.id,
            },
          },
        },
        create: {
          name: profile.displayName,
          email: profile._json.email as string,
          photo_url: profile._json.picture.data.url,
          location: profile._json.location.name ?? profile._json.hometown.name,
          birth_year: parseInt(profile._json.birthday.substr(-4)), // birthday comes in such type '01/01/2001'
          User_Security: {
            create: {
              facebook_acc_id: profile.id,
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

export { facebookStrategy };
