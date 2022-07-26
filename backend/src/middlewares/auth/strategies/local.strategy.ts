import { ExceptionMessage } from '@common/enums/exception/exception';
import { prisma } from '@data/prisma-client';
import { validatePassword } from '@services/password-validation/password-validation.service';
import { Request } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';

const localStrategy = new LocalStrategy(
  {
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    passReqToCallback: true,
  },
  async (req: Request, email, password, done) => {
    try {
      const normalizedEmail = email.toLowerCase();

      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          User_Security: true,
        },
      });

      const passwordMatches = await validatePassword(
        password,
        user?.User_Security,
      );

      if (!user || !passwordMatches) {
        return done(null, false, {
          message: ExceptionMessage.INCORRECT_CREDENTIALS,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  },
);

export { localStrategy };
