import { Selector } from '../state/types';

export const createSelector = <State, Result>(selector: Selector<State, Result>): Selector<State, Result> => selector;
