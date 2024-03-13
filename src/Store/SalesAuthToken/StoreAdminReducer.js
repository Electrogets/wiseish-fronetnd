import { salesToken, salesNameCustomer } from './StoreAdminConstant';
let initialState = {
    salestoken: {},
    customerName: ''
}
export const reducer = (state, action) => {
    state = state || initialState
    console.log(action);
    if (action.type === salesToken) {
        return {
            ...state, salestoken: action.payload
        }
    }

    if (action.type === salesNameCustomer) {
        return {
            ...state, customerName: action.payload
        }
    }
    return state
}