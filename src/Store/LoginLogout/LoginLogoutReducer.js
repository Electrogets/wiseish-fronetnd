import { setLogin, setLogout } from './LoginLogoutConstant';

let initialState = {
    isLoggedIn: false,
    userName: null,
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === setLogin) {
        return {
            ...state,
            isLoggedIn: action.payload,
        };
    }

    if (action.type === setLogout) {
        return {
            ...state,
            userName: action.payload,
        };
    }

    return state;
};
