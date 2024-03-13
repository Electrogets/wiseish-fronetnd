import axios from 'axios';
import { salesToken, salesNameCustomer } from './StoreAdminConstant';
import { useNavigate } from 'react-router-dom';
export const actionCreators = {

    salesToken: (token) => async (dispatch, getState) => {
        dispatch({ type: salesToken, payload: token })
    },

    setCustomerName: (name) => async (dispatch, getState) => {
        dispatch({ type: salesNameCustomer, payload: name })
    }
}