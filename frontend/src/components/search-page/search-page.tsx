import { AdvancedAutoFilter } from '@components/advanced-auto-filter/advanced-auto-filter';
import { CarListItem } from '@components/car-list-item/car-list-item';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { TopCarsAutoria } from '@components/top-cars-autoria/top-cars-autoria';
import { useAppSelector } from '@hooks/hooks';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid } from '@mui/material';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const SearchPage: React.FC = () => {
  const cars = useAppSelector((state) => state.foundCars.cars);
  return (
    <>
      <Header />
      <PageContainer>
        <Title id="searchTitle" element="h3">
          Search
        </Title>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cars.length === 0 && (
              <>
                <Container sx={{ display: 'flex' }}>
                  <SearchIcon
                    className={clsx(styles.searchIcon, styles.icon)}
                  />
                  <h3 className={styles.noCarsTitle}>No cars found</h3>
                </Container>
                <TopCarsAutoria />
              </>
            )}
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
