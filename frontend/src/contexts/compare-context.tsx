import React, { useEffect, createContext, ReactNode, useState } from 'react';

import { CompareToast } from '@components/compare-toast/compare-toast';
import {
  useGetActiveComparisonStatusQuery,
  useAddCarToComparisonMutation,
  useDeleteCarFromComparisonMutation,
} from '@store/queries/comparisons';

type CompareContextType = {
  comparedCars: string[] | undefined;
  handleCompareClick: (complectationId: string, name: string) => void;
};

const CompareContext = createContext<CompareContextType>({
  comparedCars: undefined,
  handleCompareClick: () => undefined,
});

const CompareContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [carData, setCarData] = useState('');
  const { data: comparedCars, refetch } = useGetActiveComparisonStatusQuery();

  const [addCarToComparison] = useAddCarToComparisonMutation();
  const [deleteCarFromComparison] = useDeleteCarFromComparisonMutation();

  const broadcast = new BroadcastChannel('compare');

  const handleAddToCompare = async (complectationId: string): Promise<void> => {
    setIsOpen(true);
    await addCarToComparison({ complectationId });
    broadcast.postMessage('compare');
  };
  const handleDeleteFromCompare = async (
    complectationId: string,
  ): Promise<void> => {
    await deleteCarFromComparison({ complectationId });
    broadcast.postMessage('compare');
  };

  const handleCompareClick = (complectationId: string, name: string): void => {
    const isCompared = comparedCars?.includes(complectationId);
    setCarData(name);

    isCompared
      ? handleDeleteFromCompare(complectationId)
      : handleAddToCompare(complectationId);
  };

  useEffect(() => {
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [broadcast, refetch]);

  return (
    <CompareContext.Provider value={{ comparedCars, handleCompareClick }}>
      <CompareToast carName={carData} isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
    </CompareContext.Provider>
  );
};

export { CompareContextProvider, CompareContext };
