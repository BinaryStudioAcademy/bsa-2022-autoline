import { ReactElement } from 'react';

import { User } from '@autoline/shared/common/types/types';
import LinearProgress from '@mui/material/LinearProgress';
// If the `Box` is getting imported before the `LinearProgress` the app doesn't work
// eslint-disable-next-line import/order
import Box from '@mui/material/Box';
import { useGetUsersQuery } from '@store/queries/users';

import { UsersList } from './users/users-list';

export const Administration = (): ReactElement => {
  const { data: users, isLoading, isSuccess } = useGetUsersQuery();

  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Admin panel</h1>
      {isLoading && <LinearProgress />}
      {isSuccess && users && <UsersList users={users as User[]} />}
      {isSuccess && !users && 'There are no users'}
      {!isLoading && !isSuccess && 'Error getting data from server'}
    </Box>
  );
};
