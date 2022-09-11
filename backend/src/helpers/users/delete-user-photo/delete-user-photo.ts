import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { HttpError } from '@dtos/execptions/error.dto';
import { deleteFileFromS3, parseS3KeyFromUrl } from '@services/aws/aws.service';
import * as userService from '@services/user/user.service';
import httpStatus from 'http-status-codes';

const deleteUserPhoto = async (id: string): Promise<void> => {
  try {
    const user = await userService.getUser(id);

    if (!user) throw new Error(ExceptionMessage.USER_NOT_EXIST);
    if (!user.photoUrl) return;

    const fileKey = parseS3KeyFromUrl(user.photoUrl);
    await deleteFileFromS3(fileKey);
    await userService.updateUserPhoto(id, null);
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(error, httpStatus.INTERNAL_SERVER_ERROR);
    } else {
      throw error;
    }
  }
};

export { deleteUserPhoto };
