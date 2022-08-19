import { User } from '@autoline/shared/common/types/types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetUsersQuery } from '@store/queries/users';

import { UsersList } from './users/users-list';

export const Administration = (): React.ReactElement => {
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
