import { Dispatch, SetStateAction } from "react";

export type SetValueAction<T> = Dispatch<SetStateAction<T>>;

export type ValueRef<T> = { current: T };

export type Subscription = () => void;

export type AirState<T> = {
    readonly type: "airState";
    dispatch: SetValueAction<T>;
    useValue: () => T;
    subscribe: (action: SetValueAction<T>) => Subscription;
    getValue: () => T;
};
