type setViewedCarRequest = {
  userId: string;
  modelId: string;
  complectationId: string;
};

interface setViewedCarResponse {
  viewedListId: string;
  modelId: string;
  complectationId: string;
}

export { type setViewedCarRequest, type setViewedCarResponse };
