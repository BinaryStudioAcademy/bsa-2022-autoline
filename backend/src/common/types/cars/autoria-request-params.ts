interface AutoriaRequestParams {
  category_id: number;
  price_ot: string;
  price_do: string;
  powerFrom: string;
  powerTo: string;
  power_name: number;
  engineVolumeFrom: string;
  engineVolumeTo: string;
  countpage: number;
  page: string;
}

interface CarsSearchAutoriaParams {
  complectationId: string;
  page: string;
  countpage?: number;
}

interface CarDetailsResponse {
  USD: number;
}

export type {
  AutoriaRequestParams,
  CarsSearchAutoriaParams,
  CarDetailsResponse,
};
