interface TopCar {
  id: string;
  name: string;
  url: string;
  photoUrl: string;
  brand: {
    name: string;
    logoUrl: string;
  };
  price: number;
  race: number;
  transmission: string;
  location: string;
  fuelType: string;
}

export type { TopCar };
