import {
  ComplectationResponseDto,
  ModelResponseDto,
  WishlistInput,
} from '@autoline/shared/common/types/types';
import { Title } from '@components/common/title/title';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { Grid } from '@mui/material';
import {
  useGetWishlistsQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} from '@store/queries/preferences/wishlist';

const Wishlist = (): JSX.Element => {
  const { data, isLoading } = useGetWishlistsQuery();

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreate = async (args: WishlistInput): Promise<void> => {
    await createWishlist(args);
  };

  const handleDelete = async (wishlistId: string): Promise<void> => {
    await deleteWishlist(wishlistId);
  };

  return (
    <>
      {!isLoading && (
        <>
          <Title element="h4">LIKED MODELS</Title>
          <Grid container spacing={2}>
            {data &&
              data.models &&
              data.models.map((model: ModelResponseDto) => {
                return (
                  <Grid item xs={12} md={4} key={model.id}>
                    <NewCarCard
                      car={model}
                      type="model"
                      deleteWishlist={handleDelete}
                      createWishlist={handleCreate}
                      isLiked={true}
                    />
                  </Grid>
                );
              })}
          </Grid>
          <Title element="h4">LIKED COMPLECTATIONS</Title>
          <Grid container spacing={2}>
            {data &&
              data.complectations &&
              data.complectations.map(
                (complectation: ComplectationResponseDto) => {
                  return (
                    <Grid item xs={12} md={4} key={complectation.id}>
                      <NewCarCard
                        car={complectation}
                        type="complectation"
                        deleteWishlist={handleDelete}
                        createWishlist={handleCreate}
                        isLiked={true}
                      />
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
