interface WhereBuyInterface {
  USD: number;
  autoData: {
    description: string;
    year: number;
    autoId: number;
    raceInt: string;
  };
  linkToView: string;
  markName: string;
  modelName: string;
  title: string;
  color: {
    hex: string;
    eng: string;
  };
  stateData: {
    regionNameEng: string;
  };
}

interface whereBuyQuery {
  complectationId: string;
  page: number;
  countpage: number;
}

export { type WhereBuyInterface, type whereBuyQuery };
