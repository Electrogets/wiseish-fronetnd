import React from 'react'
import Sidebarr from '../Component/Sidebarr';
import CDataBySales from '../Component/CDataBySales';
const CustomerDataBySales = () => {
    return (
        <>
            <main>
                <section class="main-dashboard">
                    <Sidebarr />
                    <CDataBySales />
                </section>
            </main>
        </>
    )
}

export default CustomerDataBySales