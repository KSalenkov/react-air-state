import { AirState, CombineAirState, Subscription } from './types';
import { useEffect, useState } from 'react';
import { subscriptionAdapter } from './utils';

export type ExtractReturnType<T extends AirState<any>[]> = {
    [index in keyof T]: T[index] extends T[number] ? ReturnType<T[index]['getValue']> : never;
};

export type Combiner<Result, States extends AirState<any>[]> = (...statesResult: ExtractReturnType<States>) => Result;

export const makeCombineAirState = <Result, States extends AirState<any>[]>(
    states: [...States],
    combiner: Combiner<Result, States>
): CombineAirState<Result> => {
    const getValue = () => {
        return combiner(...(states.map((s: AirState<any>) => s.getValue()) as ExtractReturnType<States>));
    };

    const { subscribe, sendToSubscribers } = subscriptionAdapter<Result>();

    const changeState = () => {
        const result = getValue();

        sendToSubscribers(result);
    };

    const listenStates = (): Subscription[] => {
        return states.map((s) => s.subscribe(changeState));
    };
    const useValueState = () => {
        const [state, setState] = useState(getValue());

        useEffect(() => {
            const unsubscribe = subscribe(setState);
            const listeners = listenStates();

            return () => {
                unsubscribe();
                listeners.forEach((unsubListeners) => unsubListeners());
            };
        }, []);

        return state;
    };

    return {
        type: 'combineAirState',
        getValue,
        useValue: useValueState,
        subscribe
    };
};
