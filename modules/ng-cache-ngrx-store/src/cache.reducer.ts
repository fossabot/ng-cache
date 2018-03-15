import { CacheState } from './cache-state';
import { CacheActions, CacheActionTypes } from './cache.actions';

export const initialState: CacheState = {
    data: {}
};

export function cacheReducer(state: CacheState = initialState, action: CacheActions): CacheState {
    switch (action.type) {
        case CacheActionTypes.SetInitialCacheSuccess:
            {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        ...action.payload
                    }
                };
            }
        case CacheActionTypes.SetItemSuccess:
            {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [action.key]: action.value
                    }
                };

            }
        case CacheActionTypes.RemoveItemSuccess:
            {
                const newState = {
                    ...state
                };

                const newData = { ...newState.data };
                if (newData[action.key]) {
                    try {
                        delete newData[action.key];
                    } catch (e) {
                        // do nothing
                    }
                }

                newState.data = newData;

                return newState;
            }
        case CacheActionTypes.ClearSuccess:
            {
                return {
                    ...state,
                    data: {}
                };
            }
        default:
            {
                return state;
            }
    }
}

export const getData = (state: CacheState) => state.data;
