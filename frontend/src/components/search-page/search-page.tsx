import { useState } from 'react';

import { FilterReturnType } from '@common/types/types';
import { AdvancedAutoFilter } from '@components/advanced-auto-filter/advanced-auto-filter';
import { CarListItem } from '@components/car-list-item/car-list-item';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { Container, Grid } from '@mui/material';

const SearchPage: React.FC = () => {
  const [cars, setCars] = useState<FilterReturnType>([]);
  const handleShowCars = (filteredCars: FilterReturnType): void => {
    setCars(filteredCars);
  };

  return (
    <>
      <Header />
      <Container>
        <Title element="h3">Search</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cars.length === 0 && <p>No cars found.</p>}
            {cars.map((car) => (
              <CarListItem {...car} key={car.model_id} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <AdvancedAutoFilter showFilteredCars={handleShowCars} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { SearchPage };
