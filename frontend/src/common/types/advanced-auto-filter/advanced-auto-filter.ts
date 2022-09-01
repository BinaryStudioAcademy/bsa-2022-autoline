type FilterReturnType = {
  model_id: string;
  complectations_id: string[];
}[];

type AdvancedAutoFilterProps = {
  showFilteredCars: (filteredCars: FilterReturnType) => void;
};

export { type FilterReturnType, type AdvancedAutoFilterProps };
