import React from 'react';
import Sidebarr from '../Component/Sidebarr';
import DashboardVisitorData from '../Component/DashboardVisitorData';

const VisitorData = () => {
    return (
        <>
            <main>
                <section class="main-dashboard">
                    <Sidebarr />
                    <DashboardVisitorData />
                </section>
            </main>
        </>
    )
}

export default VisitorData