import {
  ComplectationResponseDto,
  ModelResponseDto,
} from '@autoline/shared/index';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { Grid } from '@mui/material';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';

const Wishlist = (): JSX.Element => {
  const { data, isLoading } = useGetWishlistsQuery();

  return (
    <>
      {!isLoading && (
        <>
          <h4>LIKED MODELS</h4>
          <Grid container spacing={2}>
            {data &&
              data.models &&
              data.models.map((model: ModelResponseDto) => {
                return (
                  <Grid item xs={12} md={4} key={model.id}>
                    <NewCarCard {...model} />
                  </Grid>
                );
              })}
          </Grid>
          <h4>LIKED COMPLECTATIONS</h4>
          <Grid container spacing={2}>
            {data &&
              data.complectations &&
              data.complectations.map(
                (complectation: ComplectationResponseDto) => {
                  return (
                    <Grid item xs={12} md={4} key={complectation.id}>
                      <NewCarCard {...complectation} />
                    </Grid>
                  );
                },
              )}
          </Grid>
        </>
      )}
    </>
  );
};

export { Wishlist };
