import { Dispatch, SetStateAction } from 'react';

export type SetValueAction<T> = Dispatch<T>;
export type DispatchAction<T> = Dispatch<SetStateAction<T>>;

export type ValueRef<T> = { current: T };

export type Subscription = () => void;

export type Selector<State, Result> = (state: State) => Result;

export type AirState<T> = {
    readonly type: 'airState';
    dispatch: DispatchAction<T>;
    useValue: () => T;
    useSelect: <Result>(selector: Selector<T, Result>) => Result;
    subscribe: (action: SetValueAction<T>) => Subscription;
    getValue: () => T;
    createSelector: <Result>(selector: Selector<T, Result>) => Selector<T, Result>;
};

export type CombineAirState<T> = {
    readonly type: 'combineAirState';
    useValue: () => T;
    subscribe: (action: SetValueAction<T>) => Subscription;
    getValue: () => T;
};
