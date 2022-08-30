import { CarPreviewType } from '@autoline/shared/common/types/types';
import { Title } from '@components/common/title/title';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { Grid } from '@mui/material';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';

const Wishlist: React.FC = () => {
  const { data, isLoading } = useGetWishlistsQuery();

  if (isLoading) return null;
  return (
    <>
      <Title element="h4">LIKED MODELS</Title>
      <Grid container spacing={2}>
        {data?.models?.map((model: CarPreviewType) => {
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
        {data?.complectations?.map((complectation: CarPreviewType) => {
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
