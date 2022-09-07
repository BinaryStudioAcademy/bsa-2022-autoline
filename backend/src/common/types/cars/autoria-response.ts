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

export type { AutoriaResponse };
