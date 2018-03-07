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

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    // tslint:disable-next-line:no-any
    return (state: State, action: any): State => {
        // tslint:disable-next-line:no-console
        console.log('state', state);
        // tslint:disable-next-line:no-console
        console.log('action', action);

        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = environment.production
    ? [] : [logger, storeFreeze];
