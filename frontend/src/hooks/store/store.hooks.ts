import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState } from '@common/types/types';
import { AppDispatch } from '@store/store';

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
