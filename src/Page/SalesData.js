import React from 'react'
import Sidebarr from '../Component/Sidebarr';
import DashboardMainContent from '../Component/DashboardMainContent';
import DashboardMainSalesData from '../Component/DashboardMainSalesData';
import { useSelector } from 'react-redux';

const SalesData = () => {
    const getToggleSidebar = useSelector(state => state.toggle.sidebarToggle)

    return (
        <>
            <main>
                <section class="main-dashboard" className={`Dashboard-wrapper  ${getToggleSidebar ? '' : 'Dashbaord-wrapper-margin-left'}`}>
                    <Sidebarr />
                    <DashboardMainSalesData />
                </section>
            </main>
        </>
    )
}

export default SalesData