import React, { useEffect, createContext, ReactNode, useState } from 'react';

import { useInterval } from '@hooks/hooks';
import {
  useGetActiveComparisonStatusQuery,
  useAddCarToComparisonMutation,
  useDeleteCarFromComparisonMutation,
} from '@store/queries/comparisons';

type CompareContextType = {
  comparedCars: string[] | undefined;
  handleCompareClick: (complectationId: string, name: string) => void;
  notifications: CompareNotification[] | undefined;
  clearNotification: (complectationId: string | string[]) => void;
};

const CompareContext = createContext<CompareContextType>({
  comparedCars: undefined,
  handleCompareClick: () => undefined,
  notifications: undefined,
  clearNotification: () => undefined,
});

interface CompareNotification {
  complectationId: string;
  carName: string;
  timestamp: number;
}

const CompareContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<CompareNotification[]>(
    [] as CompareNotification[],
  );

  const { data: comparedCars, refetch } = useGetActiveComparisonStatusQuery();

  const [addCarToComparison] = useAddCarToComparisonMutation();
  const [deleteCarFromComparison] = useDeleteCarFromComparisonMutation();

  const broadcast = new BroadcastChannel('compare');

  const handleAddToCompare = async (
    complectationId: string,
    name: string,
  ): Promise<void> => {
    addCarToComparison({ complectationId })
      .unwrap()
      .then(() => {
        const existing = notifications.find(
          (n) => n.complectationId === complectationId,
        );
        const nextNotifications = existing
          ? notifications.map((n) =>
              n.complectationId === complectationId
                ? { ...existing, complectationId }
                : n,
            )
          : notifications.concat({
              complectationId,
              carName: name,
              timestamp: new Date().getTime(),
            });
        setNotifications(nextNotifications);
        broadcast.postMessage('compare');
      });
  };
  const handleDeleteFromCompare = async (
    complectationId: string,
  ): Promise<void> => {
    await deleteCarFromComparison({ complectationId });
    broadcast.postMessage('compare');
  };

  const handleCompareClick = (complectationId: string, name: string): void => {
    const isCompared = comparedCars?.includes(complectationId);

    isCompared
      ? handleDeleteFromCompare(complectationId)
      : handleAddToCompare(complectationId, name);
  };

  const clearNotification = (complectationId: string | string[]): void => {
    if (!complectationId) {
      setNotifications([]);
    } else {
      const ids = Array.isArray(complectationId)
        ? complectationId
        : [complectationId];
      const nextNotifications = notifications.filter(
        ({ complectationId }) => !ids.includes(complectationId),
      );
      setNotifications(nextNotifications);
    }
  };

  const handleExpireNotifications = (): void => {
    if (notifications.length) {
      const expiredIds = notifications.reduce((acc, n) => {
        const currentTime = new Date().getTime();
        const isExpired = n.timestamp <= currentTime - 6000;
        return isExpired ? acc.concat(n.complectationId) : acc;
      }, [] as string[]);
      if (expiredIds.length) {
        clearNotification(expiredIds);
      }
    }
  };
  useInterval(handleExpireNotifications, 1000);

  useEffect(() => {
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [broadcast, refetch]);

  const value = {
    comparedCars,
    handleCompareClick,
    notifications,
    clearNotification,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export const useCompareNotifications = (): CompareContextType => {
  return React.useContext(CompareContext);
};

export { CompareContextProvider, CompareContext };
