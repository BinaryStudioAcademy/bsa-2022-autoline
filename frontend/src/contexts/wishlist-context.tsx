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

interface WishListNotification {
  modelId?: string;
  complectationId?: string;
  createdAt?: string;
  timestamp: number;
}

const WishlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<WishListNotification[]>(
    [] as WishListNotification[],
  );

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
            timestamp: new Date().getTime(),
          });
      setNotifications(nextNotifications);
    }
  };

  const handleUndoDelete = (data: WishlistInput): void => {
    clearNotification(data);
    handleCreateWishlist(data);
  };

  const undoDelete = (data: WishlistInput): void => {
    deletedCar && handleUndoDelete(data);
  };

  const clearNotification = (data: WishlistInput): void => {
    if (!data.modelId && !data.complectationId) {
      setNotifications([]);
    } else {
      const ids = Array.isArray(data.modelId ?? data.complectationId)
        ? data.modelId ?? data.complectationId
        : [data.modelId ?? data.complectationId];
      const nextNotifications = notifications.filter(
        ({ modelId, complectationId }) =>
          !ids?.includes(modelId ?? complectationId ?? ''),
      );
      setNotifications(nextNotifications);
    }
  };

  const value = {
    likedCars,
    handleLikeClick,
    undoDelete,
  };

  return (
    <WishlistContext.Provider value={value}>
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column-reverse',
          top: '20px',
          right: '20px',
          zIndex: '10000',
        }}
      >
        {notifications.map((n) => {
          return (
            <Notification
              key={n.modelId ?? n.complectationId}
              isOpen={isMessageOpen}
              setIsOpen={setIsMessageOpen}
              clearNotification={(): void =>
                clearNotification({
                  modelId: n.modelId,
                  complectationId: n.complectationId,
                })
              }
              icon={<HeartIcon />}
              undo={(): void =>
                undoDelete({
                  modelId: n.modelId,
                  complectationId: n.complectationId,
                  createdAt: n.createdAt,
                })
              }
            >
              You removed car from wishlist
            </Notification>
          );
        })}
      </div>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContextProvider, WishlistContext };
