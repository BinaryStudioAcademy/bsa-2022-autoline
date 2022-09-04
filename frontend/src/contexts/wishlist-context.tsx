import { createContext, ReactNode, useState } from 'react';

import { WishlistInput } from '@autoline/shared/common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { Notification } from '@components/common/notification/notification';
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistStatusQuery,
} from '@store/queries/preferences/wishlist';

type WishlistContextType = {
  likedCars: string[] | undefined;
  likeClick: (data: WishlistInput) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  likedCars: undefined,
  likeClick: () => undefined,
});

const WishlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMessageHidden, setIsMessageHidden] = useState<boolean>(true);
  const [deletedCar, setDeletedCar] = useState<WishlistInput>();
  const { data: likedCars } = useGetWishlistStatusQuery();

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreateWishlist = async (data: WishlistInput): Promise<void> => {
    await createWishlist(data);
  };

  const handleDeleteWishlist = async (data: WishlistInput): Promise<void> => {
    await deleteWishlist(data);
    setIsMessageHidden(false);
    setDeletedCar(data);
  };

  const likeClick = (data: WishlistInput): void => {
    const carId = data.modelId ? data.modelId : data.complectationId;
    const isLiked = likedCars?.includes(carId as string);

    isLiked ? handleDeleteWishlist(data) : handleCreateWishlist(data);
  };

  const undoDelete = (data: WishlistInput): void => {
    handleCreateWishlist(data);
  };

  const handleUndoDelete = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    setIsMessageHidden(true);
    deletedCar && undoDelete(deletedCar);
  };

  const value = {
    likedCars,
    likeClick,
  };

  return (
    <WishlistContext.Provider value={value}>
      <Notification
        isHidden={isMessageHidden}
        setIsHidden={setIsMessageHidden}
        icon={<HeartIcon />}
        undo={handleUndoDelete}
      >
        You removed car from wishlist
      </Notification>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContextProvider, WishlistContext };
