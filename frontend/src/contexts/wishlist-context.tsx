import React, { createContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

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
  const { data: likedCars } = useGetWishlistEntriesQuery();

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleLikeClick = (data: WishlistInput): void => {
    const carId = data.modelId ? data.modelId : data.complectationId;
    const isLiked = likedCars?.includes(carId as string);

    isLiked ? handleDeleteWishlist(data) : handleCreateWishlist(data);
  };

  const handleUndoDelete = async (data: WishlistInput): Promise<void> => {
    await createWishlist(data);
  };

  const handleCreateWishlist = async (data: WishlistInput): Promise<void> => {
    const message = (
      <>
        You Added <span>{data.carName}</span> to Wishlist!
      </>
    );

    createWishlist(data)
      .unwrap()
      .then(() =>
        toast.info(<Notification message={message} />, {
          icon: <HeartIcon />,
        }),
      );
  };

  const handleDeleteWishlist = async (data: WishlistInput): Promise<void> => {
    await deleteWishlist(data);

    const message = (
      <>
        You Removed <span>{data.carName}</span> from Wishlist!
      </>
    );

    toast.info(
      <Notification
        message={message}
        undo={async (): Promise<void> => handleUndoDelete(data)}
      />,
      {
        icon: <HeartIcon />,
      },
    );
  };

  const value = {
    likedCars,
    handleLikeClick,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContextProvider, WishlistContext };
