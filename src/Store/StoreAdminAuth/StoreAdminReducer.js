import { masterStoreLogin, RefreshToken } from './StoreAdminConstant';
let initialState = {
    storeAdmin: {},
    refreshToken: null,
}
export const reducer = (state, action) => {
    state = state || initialState
    if (action.type === masterStoreLogin) {
        return {
            ...state, storeAdmin: action.payload
        }
    }

    if (action.type === RefreshToken) {
        return {
            ...state, refreshToken: action.payload
        }
    }



    return state
}