export type BindingAction = () => void;
export type BindingCallback1<T> = (arg: T) => void;
export type BindingCallback2<T1, T2> = (arg1: T1, arg2: T2) => void;
export type BindingCallback3<T1, T2, T3> = (
  arg1: T1,
  arg2: T2,
  arg3: T3,
) => void;

export type BindingActionFunction<TResult> = () => TResult;
export type BindingFunction1<T, TResult> = (arg1: T) => TResult;
export type BindingFunction2<T1, T2, TResult> = (arg1: T1, arg2: T2) => TResult;
export type BindingFunction3<T1, T2, T3, TResult> = (
  arg1: T1,
  arg2: T2,
  arg3: T3,
) => TResult;
