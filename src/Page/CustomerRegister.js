import React from 'react';
import Sidebarr from '../Component/Sidebarr';
import DashboardCustomerCreate from '../Component/DashboardCustomerCreate';
const CustomerRegister = () => {
    return (
        <>
            <main>
                <section class="main-dashboard">
                    {/* <Sidebarr /> */}
                    <DashboardCustomerCreate />
                </section>
            </main>
        </>
    )
}

export default CustomerRegister