import React, { createContext, ReactNode, useState } from 'react';

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
  const { data: comparedCars } = useGetActiveComparisonStatusQuery();

  const [addCarToComparison] = useAddCarToComparisonMutation();
  const [deleteCarFromComparison] = useDeleteCarFromComparisonMutation();

  const handleAddToCompare = (complectationId: string): void => {
    addCarToComparison({ complectationId })
      .unwrap()
      .then(() => {
        setIsOpen(true);
      });
  };
  const handleDeleteFromCompare = async (
    complectationId: string,
  ): Promise<void> => {
    await deleteCarFromComparison({ complectationId });
  };

  const handleCompareClick = (complectationId: string, name: string): void => {
    const isCompared = comparedCars?.includes(complectationId);
    setCarData(name);

    isCompared
      ? handleDeleteFromCompare(complectationId)
      : handleAddToCompare(complectationId);
  };

  return (
    <CompareContext.Provider value={{ comparedCars, handleCompareClick }}>
      <CompareToast carName={carData} isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
    </CompareContext.Provider>
  );
};

export { CompareContextProvider, CompareContext };
