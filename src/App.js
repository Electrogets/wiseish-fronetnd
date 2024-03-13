import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StoreAd from './Component/StoreAd';
import SalesSignup from './Component/SalesSignup';
import ViewCustomerData from './Component/ViewCustomerData';
import Dashboard from './Component/Dashboard';
import Sidebar from './Component/NewAdminPanel/Sidebar';
import DashboardAdmin from './Page/DashboardAdmin';
import SalesData from './Page/SalesData';
import SalesRegister from './Page/SalesRegister';
import SalesPersonLogin from './Component/SalesPersonLogin';
import SalesLogin from './Page/SalesLogin';
import CustomerRegister from './Page/CustomerRegister';
import CustomerData from './Page/CustomerData';
import DashboardChart from './Component/DashboardChart';
import CalenderUpdate from './Component/CalenderUpdate';
import useAuth from './Component/useAuth';
import useAxiosInterceptor from './Component/axiosInterceptor';


function App() {
  const { isLoggedIn } = useAuth();


  // const isLoggedIn = sessionStorage.getItem('storeAdminToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);




  return (
    <div className="App">
      <Routes>
        <Route path='' element={<StoreAd />} />
        <Route path='/sales' element={<SalesSignup />} />
        <Route path='/viewcustomer' element={<ViewCustomerData />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/admin' element={<DashboardAdmin />} />
        <Route path='/sales-data' element={<SalesData />} />
        <Route path='/sales-register' element={<SalesRegister />} />
        <Route exact path='/sales-login' element={<SalesLogin />} />
        <Route path='/customer-register' element={<CustomerRegister />} />
        <Route path='/customer-data' element={<CustomerData />} />
        <Route path='/dashbaord-chart' element={<DashboardChart />} />
        <Route path='/calender-custome' element={<CalenderUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
