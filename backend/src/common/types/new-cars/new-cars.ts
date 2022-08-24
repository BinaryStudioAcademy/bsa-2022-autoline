interface NewCarsPrices {
  id: string;
  name: string;
  description: string;
  photo_urls: string[] | [];
  price_start: number;
  price_end: number;
  manufacturer_id: string;
}

export type { NewCarsPrices };