import { AdvancedAutoFilter } from '@components/advanced-auto-filter/advanced-auto-filter';
import { CarListItem } from '@components/car-list-item/car-list-item';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { Container, Grid } from '@mui/material';

const SearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Title element="h3">BMW X5</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <CarListItem />
            <CarListItem />
            <CarListItem />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdvancedAutoFilter />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { SearchPage };
