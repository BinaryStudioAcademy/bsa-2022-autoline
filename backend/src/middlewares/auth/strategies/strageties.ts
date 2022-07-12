import { localStrategy } from '@middlewares/auth/strategies/local.strategy';
import passport from 'passport';

const initializeStrategies = (): void => {
  const strategies = [localStrategy];
  strategies.forEach((strategy) => passport.use(strategy));
};

export { initializeStrategies };
