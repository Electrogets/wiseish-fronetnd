import React from 'react';
import Sidebarr from '../Component/Sidebarr';
import { useSelector } from 'react-redux';

import DashboardMainSalesCreate from '../Component/DashboardMainSalesCreate';
const SalesRegister = () => {
    const getToggleSidebar = useSelector(state => state.toggle.sidebarToggle)

    return (
        <>
            <main>
                <section class="main-dashboard" className={`Dashboard-wrapper  ${getToggleSidebar ? '' : 'Dashbaord-wrapper-margin-left'}`}>
                    <Sidebarr />
                    <DashboardMainSalesCreate />
                </section>
            </main>
        </>
    )
}

export default SalesRegister