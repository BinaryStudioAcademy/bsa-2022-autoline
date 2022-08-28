export type CompleteSetDataType = {
  id: string;
  model: string;
  brand: string;
  complectation: string;
  color: string;
  motor: string;
  wheelDrive: string;
  race: string;
  price: string;
  options: string;
  className?: string;
};

export type CompleteSetPropsType = {
  data: CompleteSetDataType[];
  className?: string;
};
