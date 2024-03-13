import React from 'react'
import Sidebarr from '../Component/Sidebarr';
import DashboardMainContent from '../Component/DashboardMainContent';
import DashboardCustomerData from '../Component/DashboardCustomerData';
import { useSelector } from 'react-redux';
const SalesData = () => {
    const getToggleSidebar = useSelector(state => state.toggle.sidebarToggle)

    return (
        <>
            <main>
                <section class="main-dashboard" className={`Dashboard-wrapper  ${getToggleSidebar ? '' : 'Dashbaord-wrapper-margin-left'}`} >
                    <Sidebarr />
                    <DashboardCustomerData />
                </section>
            </main>
        </>
    )
}

export default SalesData