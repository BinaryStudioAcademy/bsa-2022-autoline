import { CarPreview } from '@autoline/shared/common/types/types';
import { Spinner } from '@components/common/spinner/spinner';
import { Title } from '@components/common/title/title';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { Grid } from '@mui/material';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';

const Wishlist: React.FC = () => {
  const { data, isLoading } = useGetWishlistsQuery();

  const sortedWishlist = {
    models:
      data?.models &&
      [...data.models].sort(
        (a, b) => Date.parse(b.createdAt || '') - Date.parse(a.createdAt || ''),
      ),
    complectations:
      data?.complectations &&
      [...data.complectations].sort(
        (a, b) => Date.parse(b.createdAt || '') - Date.parse(a.createdAt || ''),
      ),
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Title element="h4" id="liked">
        LIKED MODELS
      </Title>
      <Grid container spacing={2}>
        {sortedWishlist?.models?.map((model: CarPreview) => {
          return (
            <Grid item xs={12} md={4} key={model.id}>
              <NewCarCard car={model} type="model" />
            </Grid>
          );
        })}
        {data?.models?.length === 0 && (
          <Grid item>Nothing is in wishlist.</Grid>
        )}
      </Grid>
      <Title element="h4">LIKED COMPLECTATIONS</Title>
      <Grid container spacing={2}>
        {sortedWishlist?.complectations?.map((complectation: CarPreview) => {
          return (
            <Grid item xs={12} md={4} key={complectation.id}>
              <NewCarCard car={complectation} type="complectation" />
            </Grid>
          );
        })}
        {data?.complectations?.length === 0 && (
          <Grid item>Nothing is in wishlist.</Grid>
        )}
      </Grid>
    </>
  );
};

export { Wishlist };
