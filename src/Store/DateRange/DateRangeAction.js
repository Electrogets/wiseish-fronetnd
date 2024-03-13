import axios from 'axios';
import { DateRange, StartDate } from './DateRangeConstant';
import { useNavigate } from 'react-router-dom';
export const actionCreators = {

    dateRangeFilter: (date) => async (dispatch, getState) => {
        dispatch({ type: DateRange, payload: date })
    },

    startingDate: (date) => async (dispatch, getState) => {
        dispatch({ type: StartDate, payload: date })
    },
}