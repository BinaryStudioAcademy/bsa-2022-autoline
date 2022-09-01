import { AdvancedAutoFilter } from '@components/advanced-auto-filter/advanced-auto-filter';
import { CarListItem } from '@components/car-list-item/car-list-item';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { useAppSelector } from '@hooks/hooks';
import { Grid } from '@mui/material';

const SearchPage: React.FC = () => {
  const cars = useAppSelector((state) => state.foundCars.cars);
  return (
    <>
      <Header />
      <PageContainer>
        <Title element="h3">Search</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cars.length === 0 && <p>No cars found.</p>}
            {cars.map((car) => (
              <CarListItem {...car} key={car.model_id} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <AdvancedAutoFilter />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export { SearchPage };
