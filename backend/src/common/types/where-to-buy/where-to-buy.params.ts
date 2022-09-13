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

interface WhereBuyRequestQuery {
  [id: string]: string;
  page: string;
  countpage: string;
}

export type { AutoriaResponse, WhereBuyRequestQuery };
