import React, { createContext, ReactNode, useState } from 'react';

import { WishlistInput } from '@autoline/shared/common/types/types';
import { useInterval } from '@hooks/hooks';
import { uuid4 } from '@sentry/utils';
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistEntriesQuery,
} from '@store/queries/preferences/wishlist';

type WishlistContextType = {
  likedCars?: string[];
  handleLikeClick: (data: WishlistInput) => void;
  notifications: WishListNotification[] | undefined;
  clearNotification: (id: string | string[]) => void;
  undoDelete: (data: WishlistInput) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  likedCars: undefined,
  handleLikeClick: () => undefined,
  notifications: undefined,
  clearNotification: () => undefined,
  undoDelete: () => undefined,
});

interface WishListNotification {
  modelId?: string;
  complectationId?: string;
  createdAt?: string;
  carName?: string;
  timestamp: number;
}

const WishlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<WishListNotification[]>(
    [] as WishListNotification[],
  );

  const [deletedCar, setDeletedCar] = useState<WishlistInput>();
  const { data: likedCars } = useGetWishlistEntriesQuery();

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreateWishlist = async (data: WishlistInput): Promise<void> => {
    await createWishlist(data);
  };

  const handleDeleteWishlist = async (data: WishlistInput): Promise<void> => {
    await deleteWishlist(data);
    setDeletedCar(data);
  };

  const handleLikeClick = (data: WishlistInput): void => {
    const carId = data.modelId ? data.modelId : data.complectationId;
    const isLiked = likedCars?.includes(carId as string);

    isLiked ? handleDeleteWishlist(data) : handleCreateWishlist(data);

    if (isLiked) {
      const existing = notifications.find(
        (n) =>
          n.modelId === data.modelId &&
          n.complectationId === data.complectationId,
      );
      const nextNotifications = existing
        ? notifications.map((n) =>
            n.modelId === data.modelId ||
            n.complectationId === data.complectationId
              ? { ...existing, ...data }
              : n,
          )
        : notifications.concat({
            modelId: data.modelId,
            complectationId: data.complectationId,
            createdAt: data.createdAt,
            carName: data.carName,
            timestamp: new Date().getTime(),
          });
      setNotifications(nextNotifications);
    }
  };

  const handleUndoDelete = (data: WishlistInput): void => {
    clearNotification(data.modelId ?? data.complectationId ?? uuid4());
    handleCreateWishlist(data);
  };

  const undoDelete = (data: WishlistInput): void => {
    deletedCar && handleUndoDelete(data);
  };

  const clearNotification = (id: string | string[]): void => {
    if (!id) {
      setNotifications([]);
    } else {
      const ids = Array.isArray(id) ? id : [id];
      const nextNotifications = notifications.filter(
        ({ modelId, complectationId }) =>
          !ids?.includes(modelId || complectationId || uuid4()),
      );
      setNotifications(nextNotifications);
    }
  };

  const handleExpireNotifications = (): void => {
    if (notifications.length) {
      const expiredIds = notifications.reduce((acc, n) => {
        const currentTime = new Date().getTime();
        const isExpired = n.timestamp <= currentTime - 6000;
        return isExpired
          ? acc.concat(n.modelId ?? n.complectationId ?? uuid4())
          : acc;
      }, [] as string[]);
      if (expiredIds.length) {
        clearNotification(expiredIds);
      }
    }
  };
  useInterval(handleExpireNotifications, 1000);

  const value = {
    likedCars,
    handleLikeClick,
    notifications,
    clearNotification,
    undoDelete,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistNotifications = (): WishlistContextType => {
  return React.useContext(WishlistContext);
};

export { WishlistContextProvider, WishlistContext };
