import { initializeStrategies } from '@middlewares/auth/strategies/strageties';
import passport from 'passport';

initializeStrategies();

const localAuth = passport.authenticate('local', {
  session: false,
});

export { localAuth };
