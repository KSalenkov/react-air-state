import { AirState, AirStateOptions, Selector, ValueRef } from './types';
import { useEffect, useRef, useState } from 'react';
import { createSelector, subscriptionAdapter } from './utils';
import { getInitValue } from './utils/value';

export const makeAirState = <T>(defaultValue: T, options?: AirStateOptions): AirState<T> => {
    const initValue = getInitValue(defaultValue, options);

    const valueRef: ValueRef<T> = {
        current: initValue
    };

    const { subscribe, sendToSubscribers } = subscriptionAdapter<T>();

    const changeState = (value: T | ((prevState: T) => T)) => {
        const newValue = typeof value === 'function' ? (value as (prevState: T) => T)(valueRef.current) : value;

        if (valueRef.current !== newValue) {
            valueRef.current = newValue;

            sendToSubscribers(valueRef.current);
        }

        if (options?.localStorageKey && window) {
            window.localStorage.setItem(options.localStorageKey, JSON.stringify(valueRef.current));
        }
    };

    const useValueState = (): T => {
        const [state, setState] = useState<T>(valueRef.current);

        useEffect(() => {
            return subscribe(setState);
        }, []);

        return state;
    };

    const useSelect = <R>(selector: Selector<T, R>) => {
        const [state, setState] = useState<R>(selector(valueRef.current));

        const selectorRef = useRef<Selector<T, R>>(selector);
        const stateRef = useRef<R>(state);

        useEffect(() => {
            selectorRef.current = selector;
        }, [selector]);

        useEffect(() => {
            stateRef.current = state;
        }, [state]);

        useEffect(() => {
            const dispatcher = (newValue: T) => {
                const selectValue = selectorRef.current(newValue) as R;

                if (stateRef.current !== selectValue) {
                    setState(selectValue);
                }
            };

            return subscribe(dispatcher);
        }, []);

        return state;
    };

    const getValue = () => {
        return valueRef.current;
    };

    return {
        type: 'airState',
        dispatch: changeState,
        useValue: useValueState,
        useSelect: useSelect,
        subscribe,
        getValue,
        createSelector
    };
};
