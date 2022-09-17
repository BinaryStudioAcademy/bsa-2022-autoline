import React, { useEffect, createContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

import { Notification } from '@components/common/notification/notification';
import BalanceIcon from '@mui/icons-material/Balance';
import {
  useGetActiveComparisonStatusQuery,
  useAddCarToComparisonMutation,
  useDeleteCarFromComparisonMutation,
} from '@store/queries/comparisons';

type CompareContextType = {
  comparedCars: string[] | undefined;
  handleCompareClick: (complectationId: string, name: string) => void;
  handleDeleteFromCompare: (
    complectationId: string,
    complectationName: string,
    lastPosition?: number,
  ) => void;
};

const CompareContext = createContext<CompareContextType>({
  comparedCars: undefined,
  handleCompareClick: () => undefined,
  handleDeleteFromCompare: () => undefined,
});

const CompareContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: comparedCars, refetch } = useGetActiveComparisonStatusQuery();

  const [addCarToComparison] = useAddCarToComparisonMutation();
  const [deleteCarFromComparison] = useDeleteCarFromComparisonMutation();

  const broadcast = new BroadcastChannel('compare');

  const handleUndoDelete = async (
    complectationId: string,
    lastPosition?: number,
  ): Promise<void> => {
    await addCarToComparison({ complectationId, lastPosition });
  };

  const handleAddToCompare = async (
    complectationId: string,
    name: string,
  ): Promise<void> => {
    addCarToComparison({ complectationId })
      .unwrap()
      .then(() =>
        toast.info(
          <Notification children={`You added ${name} to comparison`} />,
          {
            icon: <BalanceIcon sx={{ fontSize: 20 }} />,
          },
        ),
      );
  };
  const handleDeleteFromCompare = async (
    complectationId: string,
    complectationName: string,
    lastPosition?: number,
  ): Promise<void> => {
    await deleteCarFromComparison({ complectationId });

    toast.info(
      <Notification
        children={`You removed ${complectationName} from comparison`}
        undo={async (): Promise<void> =>
          handleUndoDelete(complectationId, lastPosition)
        }
      />,
      {
        icon: <BalanceIcon sx={{ fontSize: 20 }} />,
      },
    );

    broadcast.postMessage('compare');
  };

  const handleCompareClick = (complectationId: string, name: string): void => {
    const isCompared = comparedCars?.includes(complectationId);

    isCompared
      ? handleDeleteFromCompare(complectationId, name)
      : handleAddToCompare(complectationId, name);
  };

  useEffect(() => {
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [broadcast, refetch]);

  const value = {
    comparedCars,
    handleCompareClick,
    handleDeleteFromCompare,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export { CompareContextProvider, CompareContext };
