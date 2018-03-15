import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface State { }

export const reducers: ActionReducerMap<State> = {};

/* tslint:disable:no-console */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    // tslint:disable-next-line:no-any
    return (state: State, action: any): State => {
        if (action.type.startsWith('@ngrx/')) {
            return reducer(state, action);
        }

        try {
            console.group(action.type);
        } catch (e) {
            console.log(action.type);
        }

        const nextState = reducer(state, action);

        console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', state);
        console.log('%c action', 'color: #03A9F4; font-weight: bold', action);
        console.log('%c next state', 'color: #4CAF50; font-weight: bold', nextState);

        try {
            console.groupEnd();
        } catch (e) {
            console.log('—— log end ——');
        }

        return nextState;
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = environment.production
    ? [] : [logger, storeFreeze];
