import { sidebarToggle, sidebarType } from './SidebarConstant';
let initialState = {
    sidebarToggle: false,
    sidebarType: ''
}
export const reducer = (state, action) => {
    state = state || initialState
    if (action.type == sidebarToggle) {
        return {
            ...state, sidebarToggle: action.payload
        }
    }

    if (action.type == sidebarType) {
        return {
            ...state, sidebarType: action.payload
        }
    }
    return state
}