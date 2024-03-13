import { sidebarToggle, sidebarType } from './SidebarConstant';
export const actionCreators = {
    SidebarToggle: (toggle) => async (dispatch, getState) => {
        dispatch({ type: sidebarToggle, payload: toggle })
    },

    sidebartype: (type) => async (dispatch, getState) => {
        dispatch({ type: sidebarType, payload: type })
    }
}