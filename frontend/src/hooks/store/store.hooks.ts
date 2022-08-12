import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@common/types/types';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
