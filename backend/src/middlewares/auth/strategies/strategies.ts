import { facebookStrategy } from '@middlewares/auth/strategies/facebook.strategy';
import { googleStrategy } from '@middlewares/auth/strategies/google.strategy';
import { localStrategy } from '@middlewares/auth/strategies/local.strategy';
import passport from 'passport';

const initializeStrategies = (): void => {
  const strategies = [facebookStrategy, googleStrategy, localStrategy];
  strategies.forEach((strategy) => passport.use(strategy));
};

export { initializeStrategies };
