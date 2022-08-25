import { ReactElement } from 'react';

import { User } from '@autoline/shared/common/types/types';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetUsersQuery } from '@store/queries/users';

import { UsersList } from './users/users-list';

export const Administration = (): ReactElement => {
  const { data: users, isLoading, isSuccess } = useGetUsersQuery();

  return (
    <>
      <Header />
      <Container>
        <Title element="h3">Admin panel</Title>
        {isLoading && <LinearProgress />}
        {isSuccess && users && <UsersList users={users as User[]} />}
        {isSuccess && !users && 'There are no users'}
        {!isLoading && !isSuccess && 'Error getting data from server'}
      </Container>
    </>
  );
};
