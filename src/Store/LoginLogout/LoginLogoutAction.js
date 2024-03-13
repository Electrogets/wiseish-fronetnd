import axios from 'axios';
import { setLogin, setLogout } from './LoginLogoutConstant';
import { useNavigate } from 'react-router-dom';
export const actionCreators = {
    setLoginUser: (token) => async (dispatch, getState) => {
        dispatch({ type: setLogin, payload: token })
    },

    setLogoutUser: (token) => async (dispatch) => {
        dispatch({ type: setLogout });
    },
}

