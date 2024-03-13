import React from 'react';
import Sidebarr from '../Component/Sidebarr';
import DashboardChart from '../Component/DashboardChart';


const Chart = () => {
    return (
        <>
            <main>
                <section class="main-dashboard">
                    <Sidebarr />
                    <DashboardChart />
                </section>
            </main>
        </>
    )
}

export default Chart