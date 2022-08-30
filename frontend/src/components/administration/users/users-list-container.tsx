import { FC, useEffect, useState } from 'react';

import { User } from '@autoline/shared/common/types/types';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetUsersByNameQuery } from '@store/queries/users';

import { UsersList } from './users-list';

type UsersListContainerProps = {
  searchName: string;
};

const UsersListContainer: FC<UsersListContainerProps> = ({ searchName }) => {
  const [filteredSearchName, setFilteredSearchName] = useState(searchName);
  const {
    data: users,
    error,
    isFetching,
    isLoading,
  } = useGetUsersByNameQuery(filteredSearchName);

  useEffect(() => {
    if (searchName.length === 0 || searchName.length > 2) {
      setFilteredSearchName(searchName);
    }
  }, [searchName]);

  return (
    <>
      {isLoading && <LinearProgress />}
      {error && 'Error while fetching users'}
      {!error && (
        <>
          {isFetching && 'Fetching users...'}
          {users && users?.length > 0 && <UsersList users={users as User[]} />}
          {users && users?.length === 0 && 'User not found'}
          {!isFetching && !users && 'User not found'}
        </>
      )}
    </>
  );
};

export { UsersListContainer };
