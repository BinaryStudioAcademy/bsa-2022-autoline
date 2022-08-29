export interface CharacteristicsListInfoProps {
  modelName: string;
  importantFeatures: string[];
  optionGroups: CharacteristicsGroupProps[];
}

export interface CharacteristicsGroupProps {
  name: string;
  options: CharacteristicsOption[];
}

// Why do we have type shaped like this - http://surl.li/cvcbs
export interface CharacteristicsOption {
  value: string;
  name?: string;
  color?: string;
}
