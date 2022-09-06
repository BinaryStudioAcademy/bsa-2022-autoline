import { FileValidationRule } from '@common/enums/enums';
import * as Yup from 'yup';

const userPhotoSchema = Yup.object().shape({
  photo: Yup.object()
    .shape({
      type: Yup.string()
        .oneOf(FileValidationRule.TYPE, 'This is not an Image File!')
        .required(),
      size: Yup.number()
        .max(
          FileValidationRule.MAX_SIZE,
          'File too Big, please select a file less than 10mb',
        )
        .required(),
    })
    .required('Photo is a required field'),
});

export { userPhotoSchema };
