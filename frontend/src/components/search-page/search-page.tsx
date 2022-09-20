import { AdvancedAutoFilter } from '@components/advanced-auto-filter/advanced-auto-filter';
import { AppliedFiltersBar } from '@components/applied-filters-bar/applied-filters-bar';
import { CarListItem } from '@components/car-list-item/car-list-item';
import { PageContainer } from '@components/common/page-container/page-container';
import { Spinner } from '@components/common/spinner/spinner';
import { Title } from '@components/common/title/title';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import { TopCarsAutoline } from '@components/top-cars-autoria/top-cars-autoline';
import { useAppSelector } from '@hooks/hooks';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import { carsApi } from '@store/queries/cars';
import { selectFiltersQueryArr } from '@store/selectors/car-filter-selectors';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const SearchPage: React.FC = () => {
  const cars = useAppSelector((state) => state.foundCars.cars);

  const filtersQueryArr = useAppSelector(selectFiltersQueryArr);

  const { isLoading } = useAppSelector((state) =>
    carsApi.endpoints.getFilteredCars.select(filtersQueryArr)(state),
  );

  return (
    <>
      <Header />
      <PageContainer className={styles.searchPage}>
        <Title id="searchTitle" element="h3">
          Search
        </Title>
        <Grid container spacing={2} className={styles.searchPageContent}>
          <Grid item xs={12} md={8} className={styles.searchResultsCol}>
            <AppliedFiltersBar />
            {isLoading && <Spinner />}
            {cars.length === 0 && !isLoading && (
              <>
                <div className={styles.nothingFound}>
                  <SearchIcon
                    className={clsx(styles.searchIcon, styles.icon)}
                  />
                  <h3 className={styles.noCarsTitle}>No cars found</h3>
                </div>
                <TopCarsAutoline
                  cardsContainerClassName={styles.topSearchCars}
                />
              </>
            )}
            {!isLoading &&
              cars.map((car) => <CarListItem {...car} key={car.model_id} />)}
          </Grid>
          <Grid item xs={12} md={4} className={styles.filtersCol}>
            <AdvancedAutoFilter />
          </Grid>
        </Grid>
      </PageContainer>
      <Footer />
    </>
  );
};

export { SearchPage };
