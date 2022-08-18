import { FC, useEffect, useState } from 'react';

import { User, UserRole } from '@autoline/shared/common/types/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type DialogEditUserProps = {
  user?: User;
  handleClose: () => void;
  handleSubmit: (user: User, newRole: UserRole) => void;
};

const DialogEditUser: FC<DialogEditUserProps> = (props) => {
  const { user, handleClose, handleSubmit } = props;
  const [role, setRole] = useState<UserRole | undefined>(user?.role);

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user?.role]);

  const handleChangeRole = (event: SelectChangeEvent<UserRole>): void => {
    setRole(event.target.value as UserRole);
  };

  return (
    <Dialog open={!!user} onClose={handleClose}>
      <DialogTitle>Edit user role</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {role && (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="dialog-select-label">Role</InputLabel>
              <Select
                labelId="dialog-select-label"
                id="dialog-select"
                value={role}
                onChange={handleChangeRole}
                input={<OutlinedInput label="Role" />}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={(): void => {
            handleSubmit(user as User, role as UserRole);
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogEditUser };
