import { SalesGetData } from './SalesConstant';
import axios from 'axios';
export const actionCreators = {
    salesData: (cdata) => async (dispatch, getState) => {
        const getToken = getState().masterStoreAdmin
        console.log('gettoken', getToken);
        axios({
            url: 'http://13.200.89.3:8000/customer/register/',
            data: {
                "name": cdata.name,
                "email": cdata.email,
                "phone_number": cdata.phone_number,
                "product_choice": cdata.product_choice,
                "description": cdata.description,
                "salesperson_name": cdata.salesperson_name
            },
            method: 'post',
            headers: {
                Authorization: `Bearer ${getToken}`
            }
        }).then((result) => {
            dispatch({ type: SalesGetData, payload: result.data })
        }).catch((error) => {
            console.log('error', error);
        })
    }
}