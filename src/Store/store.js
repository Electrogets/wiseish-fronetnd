import { configureStore } from '@reduxjs/toolkit';
import * as StoreAdminReducer from "./StoreAdminAuth/StoreAdminReducer";
import * as SalesReducer from "./StoreAdminPannel/SalesReducer";
import * as Toggle from "./SidebarComponent/SidebarReducer";
import * as salesToken from "./SalesAuthToken/StoreAdminReducer";
import * as dateRange from "./DateRange/DateRangeReducer";
import * as LoginLogout from "./LoginLogout/LoginLogoutReducer";

// redux persistenace start

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    storeAdminLogin: StoreAdminReducer.reducer,
    salesData: SalesReducer.reducer,
    toggle: Toggle.reducer,
    salesToken: salesToken.reducer,
    dateRange: dateRange.reducer,
    LoginLogout: LoginLogout.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer)
// redux persistance end

export const store = configureStore({
    // reducer: {
    //     storeAdminLogin: StoreAdminReducer.reducer,
    //     salesData: SalesReducer.reducer,
    //     toggle: Toggle.reducer,
    //     salesToken: salesToken.reducer,
    //     dateRange: dateRange.reducer,
    //     LoginLogout: LoginLogout.reducer
    // }


    // redux persist
    reducer: persistedReducer
    // redux persist
})
export default store