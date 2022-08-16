import { User } from '@autoline/shared/common/types/types';
import { useGetUsersQuery } from '@store/queries/users';

import { UsersList } from './users/users-list';

export const Administration = (): React.ReactElement => {
  const { data, isLoading, isSuccess } = useGetUsersQuery();

  return (
    <>
      <h1>Admin panel</h1>
      {isLoading ? (
        'Loading data...'
      ) : isSuccess ? (
        data ? (
          <UsersList users={data as User[]} />
        ) : (
          'User list is empty'
        )
      ) : (
        'Error getting data'
      )}
    </>
  );
};
