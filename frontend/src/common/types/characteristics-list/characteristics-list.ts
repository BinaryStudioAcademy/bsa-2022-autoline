export type CharacteristicsListInfoProps = {
  modelName: string;
  importantFeatures: string[];
  optionGroups: CharacteristicsGroupProps[];
};

export type CharacteristicsGroupProps = {
  name: string;
  options: CharacteristicsOption[];
};

export type CharacteristicsOption = {
  value: string;
  name?: string;
  color?: string;
};
