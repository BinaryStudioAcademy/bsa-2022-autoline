export { localAuth, signUpMiddleware } from './auth/auth.middleware';
export { errorsHandler } from './exceptions/exceptions.middleware';
export {
  userAuthMiddleware,
  adminAuthMiddleware,
} from './roles-based-protection/role.middleware';
export { updateUserMiddleware } from './update-user/update-user.middleware';
