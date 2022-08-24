interface NewCarsBrand {
  id: string;
  name: string;
  description: string;
  photo_urls: string[] | [];
  price_start: number;
  price_end: number;
  manufacturer_id: string;
  brand_name: string;
  logo_url: string;
}

export { type NewCarsBrand };
