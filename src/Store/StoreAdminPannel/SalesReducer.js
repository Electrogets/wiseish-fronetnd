import { SalesGetData } from './SalesConstant';
let initialState = {
    salesdata: [],
}
export const reducer = (state, action) => {
    state = state || initialState
    if (action.type === SalesGetData) {
        return {
            ...state, salesdata: action.payload
        }
    }
    return state
}