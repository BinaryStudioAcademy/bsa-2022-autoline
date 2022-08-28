import { ReactElement, useEffect, useState, ChangeEvent } from 'react';

import { InputField } from '@components/common/input-field/input-field';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import Container from '@mui/material/Container';

import { UsersListContainer } from './users/users-list-container';

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const Administration = (): ReactElement => {
  const [searchName, setSearchName] = useState('');
  const debouncedSearchName = useDebounce(searchName, 500);

  const handleChangeSearchByName = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setSearchName(event.target.value);
  };

  return (
    <>
      <Header />
      <Container>
        <Title element="h3">Admin panel</Title>
        <h2>Users</h2>
        <InputField
          name="searchByName"
          type="text"
          inputLabel="Search users by name"
          value={searchName}
          onChange={handleChangeSearchByName}
        />
        <UsersListContainer searchName={debouncedSearchName} />
      </Container>
    </>
  );
};
