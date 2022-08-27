import { ChangeEvent, FC, useEffect, useState } from 'react';

import { User, UserRole, UserSex } from '@autoline/shared/common/types/types';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { SelectField } from '@components/common/select-field/select-field';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

type DialogEditUserProps = {
  user?: User;
  handleClose: () => void;
  handleSubmit: (user: User, newUserData: Partial<Omit<User, 'id'>>) => void;
};

const DialogEditUser: FC<DialogEditUserProps> = (props) => {
  const { user, handleClose, handleSubmit } = props;
  const [role, setRole] = useState<UserRole | undefined>(user?.role);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [phone, setPhone] = useState<string | undefined>(user?.phone);
  const [location, setLocation] = useState<string | undefined>(user?.location);
  const [sex, setSex] = useState<UserSex | undefined>(user?.sex);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setLocation(user.location);
    setSex(user.sex);
    setRole(user.role);
  }, [user]);

  const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setEmail(event.target.value);
  };

  const handleChangePhone = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setPhone(event.target.value);
  };

  const handleChangeLocation = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setLocation(event.target.value);
  };

  const handleChangeSex = (event: SelectChangeEvent<string>): void => {
    setSex(event.target.value as unknown as UserSex);
  };

  const handleChangeRole = (event: SelectChangeEvent<string>): void => {
    setRole(event.target.value as unknown as UserRole);
  };

  return (
    <Dialog open={!!user} onClose={handleClose} fullWidth>
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <Container>
          {role && (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputField
                name="name"
                type="text"
                inputLabel="Full name"
                value={name}
                onChange={handleChangeName}
              />
              <InputField
                name="email"
                type="email"
                inputLabel="e-mail"
                value={email}
                onChange={handleChangeEmail}
              />
              <InputField
                name="phone"
                type="phone"
                inputLabel="Phone"
                value={phone}
                onChange={handleChangePhone}
              />
              <InputField
                name="location"
                type="text"
                inputLabel="Location"
                value={location}
                onChange={handleChangeLocation}
              />
              <SelectField
                name="Sex"
                value={String(sex)}
                required={false}
                onChange={handleChangeSex}
              >
                <MenuItem value="male">male</MenuItem>not_known
                <MenuItem value="female">female</MenuItem>
                <MenuItem value="not_known">not known</MenuItem>
                <MenuItem value="not_appliable">not appliable</MenuItem>
              </SelectField>
              <SelectField
                name="Role"
                value={String(role)}
                required={true}
                onChange={handleChangeRole}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </SelectField>
            </FormControl>
          )}
        </Container>
      </DialogContent>
      <DialogActions>
        <ButtonOutline text="Cancel" onClick={handleClose} />
        <ButtonFill
          text="Save"
          onClick={(): void => {
            handleSubmit(user as User, {
              name,
              email,
              phone,
              location,
              sex,
              role,
            });
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export { DialogEditUser };
