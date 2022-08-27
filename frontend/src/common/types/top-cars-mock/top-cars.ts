declare type TopCarsMockData = {
  id: string;
  name: string;
  photoUrls: string[] | [];
  brand: {
    name: string;
    logoUrl: string;
  };
  price: number;
  complectationName?: string;
  speedometr: number;
  transmission: string;
  location: string;
  fuel: string;
};

export { type TopCarsMockData };
