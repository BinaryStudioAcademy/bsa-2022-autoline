import { FC, useState } from 'react';

import { User } from '@autoline/shared/common/types/types';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useUpdateUserMutation } from '@store/queries/users';

import { DialogEditUser } from './dialog-edit-user';

type UsersListProps = {
  users: User[];
};

const UsersList: FC<UsersListProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [updateUser] = useUpdateUserMutation();

  const handleClickEdit = (user: User): void => {
    setSelectedUser(user);
  };

  const handleClose = (): void => {
    setSelectedUser(undefined);
  };

  const handleSubmit = async (
    user: User,
    newUserData: Partial<User>,
  ): Promise<void> => {
    setSelectedUser(undefined);
    if (
      newUserData?.name === user.name &&
      newUserData?.email === user.email &&
      newUserData?.phone === user.phone &&
      newUserData?.location === user.location &&
      newUserData?.role === user.role
    ) {
      return;
    }

    const newUser = {
      id: user.id,
      ...newUserData,
    };

    await updateUser(newUser);
  };

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>e-mail</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: User) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar alt={user.name} src={user.photo_url} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.sex}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(): void => {
                      handleClickEdit(user);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogEditUser
        user={selectedUser}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export { UsersList };
