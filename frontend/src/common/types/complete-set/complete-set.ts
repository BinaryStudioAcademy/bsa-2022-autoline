import { ComplectationDetailsType } from '@autoline/shared/common/types/types';

export type CompleteSetPropsType = {
  data: ComplectationDetailsType[];
  className?: string;
  collapsed?: boolean;
  onClick?: (id: string) => void;
  activeRowId?: string;
};
