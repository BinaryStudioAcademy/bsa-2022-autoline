interface AutoriaRequestParams {
  category_id: number;
  model?: CarModel[];
  color_id?: number;
  gear_id?: number;
  type_id?: number;
  drive_id?: number;
  yearStart?: string;
  yearEnd?: string;
  price_ot?: string;
  price_do?: string;
  powerFrom?: string;
  powerTo?: string;
  power_name?: number;
  engineVolumeFrom?: string;
  engineVolumeTo?: string;
}

interface CarModel {
  autoria_code?: number;
  body_type?: { autoria_code: number };
  brand?: { autoria_code: number };
  yearStart?: string;
  yearEnd?: string;
}

export type { AutoriaRequestParams };
