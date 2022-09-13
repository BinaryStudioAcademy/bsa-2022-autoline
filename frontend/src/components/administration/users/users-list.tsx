import { FC, useEffect, useState } from 'react';

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
import { ErrorType } from '@store/queries';
import { useUpdateUserMutation } from '@store/queries/users';
import { upperFirst, replace } from 'lodash';

import { DialogEditUser } from './dialog-edit-user';
import styles from './styles.module.scss';

type UsersListProps = {
  users: User[];
};

const UsersList: FC<UsersListProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
      isSuccess: updateUserIsSuccess,
      isError: updateUserIsError,
      error: updateUserError,
      reset: updateUserReset,
    },
  ] = useUpdateUserMutation();
  const updateUserErrorData = updateUserError as ErrorType;

  const handleClickEdit = (user: User): void => {
    setSelectedUser(user);
  };

  const handleClose = (): void => {
    setSelectedUser(undefined);
    updateUserReset();
  };

  const handleSubmit = async (
    user: User,
    newUserData: Partial<User>,
  ): Promise<void> => {
    if (
      newUserData?.name === user.name &&
      newUserData?.email === user.email &&
      newUserData?.phone === user.phone &&
      newUserData?.location === user.location &&
      newUserData?.sex === user.sex &&
      newUserData?.role === user.role
    ) {
      setSelectedUser(undefined);
      return;
    }

    const newUser = {
      id: user.id,
      ...newUserData,
    };

    await updateUser(newUser);
  };

  useEffect(() => {
    if (updateUserIsSuccess) {
      setSelectedUser(undefined);
    }
  }, [updateUserIsSuccess]);

  const getPrettified = (str: string): string =>
    upperFirst(replace(str, '_', ' '));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>E-mail</TableCell>
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
                <TableCell className={styles.limitLength}>
                  {user.name}
                </TableCell>
                <TableCell className={styles.limitLength}>
                  {user.email}
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{getPrettified(String(user.sex || ''))}</TableCell>
                <TableCell>{getPrettified(String(user.role))}</TableCell>
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
        updateUserIsLoading={updateUserIsLoading}
        updateUserIsError={updateUserIsError}
        updateUserError={updateUserErrorData}
        onSave={handleSubmit}
        onClose={handleClose}
      />
    </>
  );
};

export { UsersList };
