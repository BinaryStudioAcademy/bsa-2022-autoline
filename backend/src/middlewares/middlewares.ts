export {
  localAuth,
  signUpMiddleware,
  googleAuth,
  googleMiddleware,
  facebookAuth,
  facebookMiddleware,
} from './auth/auth.middleware';
export { errorsHandler } from './exceptions/exceptions.middleware';
export {
  userAuthMiddleware,
  adminAuthMiddleware,
} from './roles-based-protection/role.middleware';
export { updateUserMiddleware } from './update-user/update-user.middleware';
export { photoMiddleware } from './photo/photo.middleware';
export { editUserMiddleware } from './users/edit-user.middleware';
