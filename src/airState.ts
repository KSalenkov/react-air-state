import {AirState} from "./types";
import { makeAirState } from "./makeAirState";


export function airState<T>(defaultValue: T): AirState<T>;
export function airState<T = undefined>(): AirState<T | undefined>;


export function airState<T>(value?: T | undefined): AirState<T | undefined> {
    return makeAirState<T | undefined>(value);
}
