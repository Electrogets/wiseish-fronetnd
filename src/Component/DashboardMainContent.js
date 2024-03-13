import React, { useState } from 'react';
import DashbaordHeader from './DashbaordHeader';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import ReactPaginate from 'react-paginate';
import DashboardCustomerData from './DashboardCustomerData';
import Example from './Example';
import DashboardVisitorData from './DashboardVisitorData';
import SimpleLineChart from './SimpleLineChart';
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from './ProgressBar';
import SalesPerformance from './SalesPerformance';
const DashboardMainContent = () => {
    const sidebarType = useSelector(state => state.toggle.sidebarType)
    const getToggleSidebar = useSelector(state => state.toggle.sidebarToggle)
    const [storeData, setStoreData] = useState();
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [allData, setAllData] = useState([])
    const [showSidebar, setShowSidebar] = useState(false)
    const handleToggle = () => {
        setShowSidebar(!showSidebar)
    }

    const handlePageClick = (data1) => {
        console.log('click');
        console.log('pagecount3', data1.selected);
        const data = allData?.slice(data1.selected * 10, (data1.selected + 1) * 10)
        setStoreData(data?.slice(0, 10))
    }
    return (
        <>
            <section className={`Dashboard-wrapper  ${getToggleSidebar ? '' : 'Dashbaord-wrapper-margin-left'}`} >
                {/* <!-- dashboard header section  --> */}
                {/* <!-- dashboard header section  --> */}
                <DashbaordHeader />
                {/* <!-- Dashbaord card section  --> */}
                <DashboardCard />
                {/* <!-- Dashboard Charts Section  --> */}
                {/* <!-- Dashboard Charts Section  --> */}
                <div class="dashboard-charts-wrapper h-auto">
                    <div class="top-section">
                        <div class="title" style={{ textAlign: 'left', margin: '10px', paddingTop: '15px' }}>
                            <h5 class="mb-0" style={{ fontSize: '18px' }}>Customer Count</h5>
                            <p class="text-gray" style={{ fontSize: '12px' }}>Track your Monthly Customers</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div class="cart-wrapper">
                                <DashboardChart />
                                {/* <canvas id="myChart"></canvas> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pie-chart-wrapper">
                    <h5 class="mb-0" style={{ fontSize: '18px' }}>Sale  Performance</h5>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="chart-inner">
                                <ProgressBar />
                                {/* <SalesPerformance /> */}
                            </div>
                            <hr style={{ width: '2px', color: '#000' }} />
                        </div>

                    </div>

                    <div className='row'>
                        <div className="col-md-4" id='pie-chart-mobile'>
                            <div className="chart-inner-text">
                                <Example />
                            </div>
                        </div>
                    </div>
                </div>

                {/*--------------all customer data--------  */}


                {/* -------------All Visitor Data----------- */}

                {/* <DashboardVisitorData /> */}

                {/* -------------all visitor data---------- */}

            </section>

        </>
    )
}

export default DashboardMainContent