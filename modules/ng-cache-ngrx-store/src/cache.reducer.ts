 import { CacheState } from './cache-state';
import { CacheActions, CacheActionTypes } from './cache.actions';

 export const initialState: CacheState = {
     data: {},
    loading: false,
    loaded: false
};

export function cacheReducer(state: CacheState = initialState, action: CacheActions): CacheState {
    switch (action.type) {
        case CacheActionTypes.Init:
            {
                return {
                    ...state,
                    loading: true
                };
            }
        case CacheActionTypes.InitSuccess:
            {
                const newState = {
                    ...state,
                    loading: false,
                    loaded: true
                };
                if (action.payload) {
                    newState.data = {...action.payload};
                }

                return newState;
            }

        case CacheActionTypes.SetItemSuccess:
            {
                const newState = {
                    ...state
                };
                newState.data = { ...newState.data, [action.payload.key]: action.payload.value };

                return newState;
            }
        case CacheActionTypes.RemoveItemSuccess:
            {
                const newState = {
                    ...state
                };

                const newData: {} = {...newState.data};
                try {
                    delete newData[action.payload];
                } catch (e) {
                    // do nothing
                }
                newState.data = newData;

                return newState;
            }
        case CacheActionTypes.ClearSuccess:
            {
                const newState = {
                    ...state
                };
                newState.data = {};

                return newState;
            }
        default:
            {
                return state;
            }
    }
}

export const getData = (state: CacheState) => state.data;
