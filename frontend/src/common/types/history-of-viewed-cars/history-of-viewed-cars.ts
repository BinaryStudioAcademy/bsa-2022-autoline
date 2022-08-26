import type {
  GetViewedCarsResponse,
  ViewedCarResponseDto,
} from '@autoline/shared';

type ViewedCarDataList = {
  carDataList: GetViewedCarsResponse;
};

type ViewedCarData = {
  carData: ViewedCarResponseDto;
};

export { type ViewedCarDataList, type ViewedCarData };
