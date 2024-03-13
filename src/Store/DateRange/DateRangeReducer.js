import { DateRange, StartDate } from './DateRangeConstant';
let initialState = {
    dateRange: {
        start: '',
        end: ''
    },

    StartDate: ''

}
export const reducer = (state, action) => {
    state = state || initialState
    if (action.type === DateRange) {
        return {
            ...state, dateRange: action.payload
        }
    }

    if (action.type === StartDate) {
        return {
            ...state, StartDate: action.payload
        }
    }
    return state
}