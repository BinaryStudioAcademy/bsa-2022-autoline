import { ChangeEvent, FC, useEffect, useState } from 'react';

import { User, UserRole } from '@autoline/shared/common/types/types';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { SelectField } from '@components/common/select-field/select-field';
import Box from '@mui/material/Box';
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

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setRole(user.role);
  }, [user]);

  const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setName(event.target.value);
  };

  const handleChangeRole = (event: SelectChangeEvent<string>): void => {
    setRole(event.target.value as unknown as UserRole);
  };

  return (
    <Dialog open={!!user} onClose={handleClose}>
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {role && (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputField
                name="name"
                type="text"
                inputLabel="Full name"
                value={name}
                onChange={handleChangeName}
              />
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
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonOutline text="Cancel" onClick={handleClose} />
        <ButtonFill
          text="Save"
          onClick={(): void => {
            handleSubmit(user as User, {
              name,
              role,
            });
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export { DialogEditUser };
