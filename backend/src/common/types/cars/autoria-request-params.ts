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

interface AutoriaResponse {
  additional_params: { page: string };
  result: {
    search_result: {
      ids: string[];
      count: number;
      last_id: number;
    };
  };
}

export type { AutoriaRequestParams, AutoriaResponse };
