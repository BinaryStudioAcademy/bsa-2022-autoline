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

type WhereBuyRequestQuery = {
  page: string;
  id: string;
  countpage: string;
};

export type { AutoriaResponse, WhereBuyRequestQuery };
