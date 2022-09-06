import { createContext, ReactNode, useState } from 'react';

import { WishlistInput } from '@autoline/shared/common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { Notification } from '@components/common/notification/notification';
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistEntriesQuery,
} from '@store/queries/preferences/wishlist';

type WishlistContextType = {
  likedCars?: string[];
  handleLikeClick: (data: WishlistInput) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  likedCars: undefined,
  handleLikeClick: () => undefined,
});

const WishlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [deletedCar, setDeletedCar] = useState<WishlistInput>();
  const { data: likedCars } = useGetWishlistEntriesQuery();

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreateWishlist = async (data: WishlistInput): Promise<void> => {
    await createWishlist(data);
  };

  const handleDeleteWishlist = async (data: WishlistInput): Promise<void> => {
    await deleteWishlist(data);
    setIsMessageOpen(true);
    setDeletedCar(data);
  };

  const handleLikeClick = (data: WishlistInput): void => {
    const carId = data.modelId ? data.modelId : data.complectationId;
    const isLiked = likedCars?.includes(carId as string);

    isLiked ? handleDeleteWishlist(data) : handleCreateWishlist(data);
  };

  const handleUndoDelete = (data: WishlistInput): void => {
    handleCreateWishlist(data);
  };

  const undoDelete = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    setIsMessageOpen(false);
    deletedCar && handleUndoDelete(deletedCar);
  };

  const value = {
    likedCars,
    handleLikeClick,
  };

  return (
    <WishlistContext.Provider value={value}>
      <Notification
        isOpen={isMessageOpen}
        setIsOpen={setIsMessageOpen}
        icon={<HeartIcon />}
        undo={undoDelete}
      >
        You removed car from wishlist
      </Notification>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContextProvider, WishlistContext };
