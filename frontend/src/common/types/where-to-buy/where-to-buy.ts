interface WhereBuyInterface {
  USD: number;
  autoData: {
    description: string;
    year: number;
    autoId: number;
    race: string;
  };
  linkToView: string;
  markName: string;
  modelName: string;
  color: {
    hex: string;
  };
}

export { type WhereBuyInterface };
