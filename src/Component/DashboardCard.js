import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const DashboardCard = () => {
    const navigate = useNavigate()
    const [footfall, setFootfall] = useState([])
    const [shopper, setShopper] = useState()
    const [visitor, setVisitor] = useState()
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin.access)

    useEffect(() => {
        handleTotalFootfall();
        // handleTotalShopper();
        // handleVisitor();
        handleShopper()
    }, [])

    const redirectLogin = (error) => {
        if (error.response.status === 401) {
            toast.error('Session expired. Please login again.', {
                duration: 2000,
                id: 'toast-error'
            })
            setTimeout(() => {
                navigate('/')
            }, 2500)
        }
    }
    const handleTotalFootfall = () => {
        if (getStoreAdminToken) {
            axios({
                url: 'http://13.200.89.3:8000/api/store-owner/customer-count/',
                data: {

                },
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`
                },
                method: 'get'
            }).then((result) => {
                console.log('footfall', result.data);
                // Check if result.data is an array or a single item
                setFootfall(result.data.customer_count);
            }).catch((error) => {
                console.error('Error fetching data:', error);
                redirectLogin(error)
            });
        }
    }
    // const handleTotalShopper = () => {
    //     if (getStoreAdminToken) {
    //         axios({
    //             url: 'https://thewiseowl.pythonanywhere.com//api/store_owner/customer/shoppers/',
    //             data: {

    //             },
    //             headers: {
    //                 Authorization: `Bearer ${getStoreAdminToken}`
    //             },
    //             method: 'get'
    //         }).then((result) => {
    //             console.log('shopper', result.data);
    //             // Check if result.data is an array or a single item
    //             setShopper(result.data.customer_count);
    //         }).catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    //     }
    // }
    // const handleVisitor = () => {
    //     if (getStoreAdminToken) {
    //         axios({
    //             url: 'https://thewiseowl.pythonanywhere.com/api/store_owner/customer/visitors/',
    //             data: {

    //             },
    //             headers: {
    //                 Authorization: `Bearer ${getStoreAdminToken}`
    //             },
    //             method: 'get'
    //         }).then((result) => {
    //             console.log('visitor', result.data);
    //             // Check if result.data is an array or a single item
    //             setVisitor(result.data.customer_count);
    //         }).catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    //     }
    // }


    const handleShopper = () => {
        if (getStoreAdminToken) {
            axios({
                url: 'http://13.200.89.3:8000/sales-representative-percentage-visit-count/',
                data: {},
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`,
                },
                method: 'get',
            })
                .then((result) => {
                    console.log('shoppers', result.data);
                    // setShopper([
                    //     { name: 'Shoppers', value: result.data.total_shoppers_percentage },
                    //     { name: 'Visitors', value: result.data.total_visitors_percentage },
                    // ]);
                    setVisitor(result.data.total_visitors_percentage)
                    setShopper(result.data.total_shoppers_percentage)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    redirectLogin(error)
                });
        }
    };
    return (
        <>
            <Toaster />
            {/* <!-- Dashbaord card section  --> */}
            <div class="dashbard-inner-card">
                <div class="row" id="cart-header-three-box">
                    <div class="col-md-6 col-lg-3">
                        <div class="card-inner">
                            <div class="top-content">
                                <h2>Total Customers</h2>
                            </div>
                            <div class="middle-text">
                                <span >
                                    {footfall}
                                </span>
                                {/* Footfall */}
                            </div>
                            <p class="text-gray">
                                <span class="per-count">+4%</span> vs. last month
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="card-inner">
                            <div class="top-content">
                                <h2>Shoppers</h2>
                            </div>
                            <div class="middle-text">
                                <span >
                                    {shopper?.toFixed(0)}%
                                </span>
                                {/* Shopper */}
                            </div>
                            <p class="text-gray">
                                <span class="per-count">+4%</span> vs. last month
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="card-inner">
                            <div class="top-content">
                                <h2>Visitors</h2>
                            </div>
                            <div class="middle-text">
                                <span>
                                    {visitor?.toFixed(0)}%
                                </span>
                                {/* Visitor */}
                            </div>
                            <p class="text-gray">
                                <span class="per-count">+4%</span> vs. last month
                            </p>
                        </div>
                    </div>
                    {/* <div class="col-md-6 col-lg-3">
                        <div class="card-inner">
                            <div class="top-content">
                                <h2>Messages Delivered</h2>
                            </div>
                            <div class="middle-text">
                                <span>42%</span>

                            </div>
                            <p class="text-gray">
                                <span class="per-count">+4%</span> vs. last month
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* <!-- Dashboard Charts Section  --> */}
        </>
    )
}

export default DashboardCard