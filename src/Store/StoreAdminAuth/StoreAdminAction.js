import axios from 'axios';
import { masterStoreLogin, RefreshToken } from './StoreAdminConstant';
import { useNavigate } from 'react-router-dom';
export const actionCreators = {
    masterStoreAdmin: (token) => async (dispatch, getState) => {
        dispatch({ type: masterStoreLogin, payload: token })
    },

    setRefreshToken: (token) => async (dispatch) => {
        dispatch({ type: RefreshToken, payload: token });
    },
}

