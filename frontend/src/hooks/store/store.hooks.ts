import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { RootState } from '@common/types/types';
import { AppDispatch } from '@store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppSelector, useAppDispatch };
