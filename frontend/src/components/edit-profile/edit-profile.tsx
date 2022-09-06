import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import CrossIcon from '@assets/images/edit-profile/cross.svg';
import DefaultAvatar from '@assets/images/edit-profile/default-avatar.png';
import PencilIcon from '@assets/images/edit-profile/pencil.svg';
import TrashIcon from '@assets/images/edit-profile/trash.svg';
import { FileValidationRule, updateUserSchema } from '@autoline/shared';
import { AppRoute } from '@common/enums/enums';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { DialogDeleteAccount } from '@components/edit-profile/dialog-delete-account/dialog-delete-account';
import { SelectYearRange } from '@components/edit-profile/select-year-range/select-year-range';
import { SignIn } from '@components/edit-profile/sign-in/sign-in';
import { useAppForm } from '@hooks/app-form/app-form.hook';
import { useAppDispatch } from '@hooks/hooks';
import { Alert, Avatar, MenuItem, Modal, Stack } from '@mui/material';
import {
  ProfileFieldsRequestData,
  useDeleteUserProfileMutation,
  useUpdateUserProfileMutation,
  useGetUserQuery,
  useUpdateUserPhotoMutation,
} from '@store/queries/user/update-user';
import { logOut } from '@store/root-reducer';

import { SelectFieldForm } from './select-field-form/select-field-form';
import styles from './styles.module.scss';

interface EditProfileProps {
  onClose: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [
    updateUserProfile,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
    },
  ] = useUpdateUserProfileMutation();

  const [
    deleteUserProfile,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
      error: deleteError,
    },
  ] = useDeleteUserProfileMutation();

  const [
    updateUserPhoto,
    { isSuccess: updatePhotoIsSuccess, error: updatePhotoError },
  ] = useUpdateUserPhotoMutation();

  const { control, errors, handleSubmit } =
    useAppForm<ProfileFieldsRequestData>({
      defaultValues: user
        ? {
            sex: user.sex || 'not_appliable',
            birthYear: user.birthYear || 'not_appliable',
            location: user.location || 'not_appliable',
            name: user.name,
            phone: user.phone || '',
            email: user.email,
            password: '',
            newPassword: '',
            repeatNewPassword: '',
          }
        : {},
      validationSchema: updateUserSchema,
    });

  const [selectedAvatar, setSelectedAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string>();

  useEffect(() => {
    if (deleteIsSuccess) {
      dispatch(logOut(AppRoute.ROOT));
    }
  }, [deleteIsSuccess]);

  const formattedRequest = (value: string | null): string | null =>
    value === 'not_appliable' ? null : value;

  const onSubmit: SubmitHandler<ProfileFieldsRequestData> = async (data) => {
    await updateUserProfile({
      ...data,
      birthYear: formattedRequest(data.birthYear),
      location: formattedRequest(data.location),
    });
  };

  const submitAvatar = async (): Promise<void> => {
    if (!selectedAvatar) return;

    const formData = new FormData();
    formData.append('photo', selectedAvatar, selectedAvatar.name);
    await updateUserPhoto(formData);
    setPreviewAvatar('');
  };

  const handleClickOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleDeleteProfile = async (): Promise<void> => {
    setOpenDialog(false);
    await deleteUserProfile();
  };

  const handleChangeAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const fileList = e.target.files;
    if (!fileList) return;

    const file = fileList[0];
    if (!FileValidationRule.TYPE.includes(file.type)) {
      return alert('This is not an Image File!');
    }
    if (file.size > FileValidationRule.MAX_SIZE) {
      return alert('File too Big, please select a file less than 10mb');
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewAvatar(objectUrl);
    setSelectedAvatar(file);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.popup}>
        <DialogDeleteAccount
          handleCloseDialog={handleCloseDialog}
          handleDeleteProfile={handleDeleteProfile}
          isOpen={openDialog}
        />
        <span className={styles.cross}>
          <img src={CrossIcon} alt="cross" onClick={(): void => onClose()} />
        </span>
        <h2 className={styles.mainTitle}>EDIT PROFILE</h2>
        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <Avatar
              className={styles.avatar}
              src={previewAvatar || (user && (user.photoUrl || DefaultAvatar))}
              alt="avatar"
              sx={{ width: 100, height: 100 }}
            />
            <label className={styles.avatarMenuItem}>
              <img src={PencilIcon} alt="pencil" />
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleChangeAvatar}
              />
              Change Photo
            </label>
            <button
              onClick={handleClickOpenDialog}
              className={styles.avatarMenuItem}
            >
              <img src={TrashIcon} alt="trash" />
              <span>Delete Profile</span>
            </button>
            {previewAvatar && (
              <ButtonFill
                text="Save"
                className={styles.saveAvatarBtn}
                onClick={submitAvatar}
              />
            )}
          </div>
          <div className={styles.editWrapper}>
            <form
              name="editForm"
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <fieldset
                disabled={updateIsLoading || deleteIsLoading}
                className={styles.fieldset}
              >
                <h2 className={styles.title}>User Details</h2>
                <InputField
                  name="name"
                  type="text"
                  required={true}
                  errors={errors}
                  control={control}
                  inputLabel="Full name"
                />
                <div className={styles.selectsWrapper}>
                  <SelectFieldForm
                    id="sex"
                    name="sex"
                    required={false}
                    control={control}
                    label="sex"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="not_known">Other</MenuItem>
                    <MenuItem value="not_appliable">Rather not say</MenuItem>
                  </SelectFieldForm>
                  <SelectYearRange
                    start={1960}
                    end={new Date().getFullYear()}
                    name="birthYear"
                    required={false}
                    control={control}
                    label="birthday"
                    defaultValue="not_appliable"
                  />
                </div>
                <InputField
                  name="phone"
                  type="text"
                  required={false}
                  errors={errors}
                  control={control}
                  inputLabel="Phone"
                />
                <InputField
                  name="email"
                  type="text"
                  required={true}
                  errors={errors}
                  control={control}
                  inputLabel="Email"
                />
                <SelectFieldForm
                  id="location"
                  name="location"
                  required={false}
                  control={control}
                  label="location"
                  defaultValue="not_appliable"
                >
                  <MenuItem value="not_appliable">Rather not say</MenuItem>
                  <MenuItem value="kyiv">Kyiv</MenuItem>
                  <MenuItem value="kharkiv">Kharkiv</MenuItem>
                  <MenuItem value="odesa">Odesa</MenuItem>
                </SelectFieldForm>
                <h2 className={styles.title}>Change Password</h2>
                <InputField
                  name="password"
                  type="password"
                  required={false}
                  errors={errors}
                  control={control}
                  inputLabel="Current Password"
                />
                <InputField
                  name="newPassword"
                  type="password"
                  required={false}
                  errors={errors}
                  control={control}
                  inputLabel="New Password"
                />
                <InputField
                  name="repeatNewPassword"
                  type="password"
                  required={false}
                  errors={errors}
                  control={control}
                  inputLabel="Repeat New Password"
                />
                <SignIn
                  google={user?.isGoogleConnected as boolean}
                  facebook={user?.isFacebookConnected as boolean}
                />
                <div className={styles.btnWrapper}>
                  <ButtonOutline
                    text="Cancel"
                    className={styles.cancel}
                    onClick={(): void => onClose()}
                  />
                  <ButtonFill text="Save" type="submit" />
                </div>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  {updateError && 'data' in updateError && (
                    <Alert severity="error">{updateError.data.message}</Alert>
                  )}
                  {updatePhotoError && 'data' in updatePhotoError && (
                    <Alert severity="error">
                      Failed to update user data. Try again in a few minutes.
                    </Alert>
                  )}
                  {deleteError && 'data' in deleteError && (
                    <Alert severity="error">
                      Failed to delete user. Try again in a few minutes.
                    </Alert>
                  )}
                  {updateIsSuccess && (
                    <Alert severity="success">User data updated</Alert>
                  )}
                  {updatePhotoIsSuccess && (
                    <Alert severity="success">User avatar updated</Alert>
                  )}
                </Stack>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
