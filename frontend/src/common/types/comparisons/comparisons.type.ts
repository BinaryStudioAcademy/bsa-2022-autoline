import { ComparisonTypeEnum } from '@common/enums/enums';

type Comparison = {
  id: string;
  active: boolean;
  type: ComparisonTypeEnum;
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

export type { Comparison };
