import { FC, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import CrossIcon from '@assets/images/edit-profile/cross.svg';
import { User } from '@autoline/shared/common/types/types';
import { editUserSchema } from '@autoline/shared/validation-schemas';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { SelectFieldForm } from '@components/edit-profile/select-field-form/select-field-form';
import { useAppForm } from '@hooks/hooks';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';

import styles from './styles.module.scss';

interface DialogEditUserProps {
  user?: User;
  onSave: (user: User, newUserData: Partial<Omit<User, 'id'>>) => void;
  onClose: () => void;
}

type EditUserRequestData = Partial<User>;

const DialogEditUser: FC<DialogEditUserProps> = (props) => {
  const { user, onSave, onClose } = props;

  const { control, errors, handleSubmit, clearErrors, reset } =
    useAppForm<EditUserRequestData>({
      defaultValues: {
        sex: user?.sex || 'not_appliable',
        location: user?.location,
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
      },
      validationSchema: editUserSchema,
    });

  const handleClose = (): void => {
    if (clearErrors) clearErrors();
    onClose();
  };

  useEffect(() => {
    if (!user) return;
    if (reset) reset(user);
  }, [user]);

  const onSubmit: SubmitHandler<EditUserRequestData> = (newUserData) => {
    if (user) {
      onSave(user, newUserData);
    }
  };

  return (
    <Modal
      open={!!user}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.popup}>
        <span className={styles.cross}>
          <img src={CrossIcon} alt="cross" onClick={handleClose} />
        </span>
        <h2 className={styles.mainTitle}>EDIT USER</h2>
        <div className={styles.profile}>
          <div className={styles.editWrapper}>
            <form
              name="editForm"
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <fieldset className={styles.fieldset}>
                <InputField
                  name="name"
                  type="text"
                  required={true}
                  errors={errors}
                  control={control}
                  inputLabel="Full name"
                />
                <InputField
                  name="email"
                  type="text"
                  required={true}
                  errors={errors}
                  control={control}
                  inputLabel="E-mail"
                />
                <InputField
                  name="phone"
                  type="text"
                  required={false}
                  errors={errors}
                  control={control}
                  inputLabel="Phone"
                />
                <InputField
                  name="location"
                  type="text"
                  required={false}
                  errors={errors}
                  control={control}
                  inputLabel="Location"
                />
                <div className={styles.selectsWrapper}>
                  <SelectFieldForm
                    id="sex"
                    name="sex"
                    required={false}
                    control={control}
                    label="Sex"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="not_known">Not known</MenuItem>
                    <MenuItem value="not_appliable">Not appliable</MenuItem>
                  </SelectFieldForm>
                  <SelectFieldForm
                    id="role"
                    name="role"
                    required={true}
                    control={control}
                    label="Role"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </SelectFieldForm>
                </div>
                <div className={styles.btnWrapper}>
                  <ButtonOutline
                    text="Cancel"
                    className={styles.cancel}
                    onClick={handleClose}
                  />
                  <ButtonFill text="Save" type="submit" />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { DialogEditUser };
