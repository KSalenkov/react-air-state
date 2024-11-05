import {AirState, ValueRef} from "./types";
import {useEffect, useState} from "react";
import {subscriptionAdapter} from "./utils";

export const makeAirState = <T>(defaultValue: T): AirState<T> => {
    const valueRef: ValueRef<T> = {
        current: defaultValue,
    };

    const {subscribe, sendToSubscribers} = subscriptionAdapter<T>()

    const changeState = (value: T | ((prevState: T) => T)) => {
        const newValue = typeof value === 'function' ? (value as (prevState: T) => T)(valueRef.current) : value

        if (valueRef.current !== newValue) {
            valueRef.current = newValue;

            sendToSubscribers(valueRef.current);
        }
    };

    const useValueState = (): T => {
        const [state, setState] = useState<T>(valueRef.current);

        useEffect(() => {
            return subscribe(setState)
        }, []);

        return state;
    }

    const getValue = () => {
        return valueRef.current
    }

    return {
        type: "airState",
        dispatch: changeState,
        useValue: useValueState,
        subscribe,
        getValue
    };
}
