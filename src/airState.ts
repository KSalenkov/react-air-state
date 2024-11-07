import { AirState } from './types';
import { makeAirState } from './makeAirState';
import { Combiner, makeCombineAirState } from './makeCombineAirState';

export function airState<T>(defaultValue: T): AirState<T>;
export function airState<T = undefined>(): AirState<T | undefined>;

export function airState<T>(value?: T | undefined): AirState<T | undefined> {
    return makeAirState<T | undefined>(value);
}

export function combineAirState<Result, States extends AirState<any>[]>(states: States, combine: Combiner<Result, States>) {
    return makeCombineAirState(states, combine);
}
