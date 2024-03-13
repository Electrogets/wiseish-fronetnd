import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import './ViewCustomer.css';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';
import CustomerMddal from './CustomerModal';
import StoreAdminPannel from './StoreAdminPannel';

const ViewCustomerData = () => {
    const [showModal, setShowModal] = useState(false)
    const [showAdmin, setAdmin] = useState(false)
    const location = useLocation()
    const [CustData, SetCustData] = useState([])
    const [accordian, setAccordian] = useState(null)
    const navigate = useNavigate()
    let limit = 2;
    const [allData, setAllData] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [storeData, setStoreData] = useState();
    const getTokenfromstore = useSelector(state => state?.storeAdminLogin?.storeAdmin)
    console.log('access', getTokenfromstore);
    const fetchData = ((currentPage) => {
        const accessToken = getTokenfromstore?.tokens?.access;

        axios({
            'url': `https://thewiseowl.pythonanywhere.com/api/salesperson/customer_count/=${currentPage}$_limit=${limit}/`,
            data: {
                "name": location?.customerjorney?.name,
                "email": location?.customerjorney?.email,
                "phone_number": location?.customerjorney?.phone_number,
                "product_choice": location?.selectProduct,
                "description": location?.customerjorney?.description,
                "salesperson_name": location?.salespersonname
            },
            method: "get",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((result) => {
            console.log('viewcustomer', result.data);
            setAllData(result?.data)
            setStoreData(result?.data?.slice(0, 10))
            setNumberOfPages(Math.ceil(result?.data?.length / 10))

        }).catch((error) => {
            console.log('error', error);
        })
    })
    useEffect(() => {
        fetchData()
    }, [])

    const handlePageClick = async (data1) => {
        console.log('click');
        console.log('pagecount3', data1.selected);
        const data = allData?.slice(data1.selected * 10, (data1.selected + 1) * 10)
        setStoreData(data)
    };
    const handleUserData = (e, index) => {
        // SetCustData(allData[index].customers)
        // console.log('alldata', allData[index]);
        console.log('e', e, index);
        const data = allData?.filter((val) => index === val.salesperson_job_id)
        console.log('data', data[0].customers);
        SetCustData(data[0].customers)
        setShowModal(true)
        index === accordian ? setAccordian(null) : setAccordian(index)
    }
    const handleExcel = (e) => {
        const data = CustData?.map((val) => {
            return [val.id, val.name, val.email, val.phone_number, val.salesperson_name, val.product_choice, val.description]
        })
        const data1 = ['Id', 'Name', 'Email', 'Phone Number', 'Sales Person Name', 'Product List', 'Description']
        data.unshift(data1)
        var ws = XLSX.utils.aoa_to_sheet(data)
        var wv = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wv, ws, 'demo')
        XLSX.writeFile(wv, 'sheet.xlsx')
    }
    console.log('location', location.state);
    return (
        <div>
            {showAdmin && <StoreAdminPannel data1={CustData} show={showModal} handleClose={() => setShowModal(false)} />}
            {showModal && <CustomerMddal data={CustData} show={showModal} handleClose={() => setShowModal(false)} />}
            <div className='view-customer-page'>
                {/* --------------------Navigation bar start------------------------------ */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <div className='logo-admin' >
                            <Link to="/">
                                <img style={{ width: '87px', height: '60px' }} className='logothe-wise-owl' src='img/wiseowl.png' />
                            </Link>
                        </div>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                                {/* <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}

                            </ul>
                            <span className="navbar-text">
                                <Link to={'/customerjorney'}>
                                    <i style={{ color: '#' }} className="fa-solid fa-backward" navigate='/'></i>
                                </Link>
                            </span>
                        </div>
                    </div>
                </nav>
                {/* -----------------------------Navigation bar end------------------------ */}

                <div className='all_customers'>
                    <div className='box2'>
                        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={(e) => handleExcel(e)}><i
                            className="fas fa-download fa-sm text-white-50"></i>Export Report</a>
                    </div>
                    <div className='singleCustomer parentHeadCustomer' >
                        <div style={{ textAlign: 'center', flex: '1' }} className='customerHead'>Sales Person</div>
                        <div style={{ textAlign: 'center', flex: '1' }} className='number-customer'>Number Of Customers</div>
                    </div>
                    {storeData?.map((val, index) => (

                        <div >
                            <div >

                                <div className='singleCustomer'  >
                                    <div style={{ textAlign: 'center', flex: '1' }}> {val?.salesperson_name}</div>
                                    <div style={{ textAlign: 'center', flex: '1' }} className='customerCount' onClick={(e) => handleUserData(e, val.salesperson_job_id)}> {val?.customer_count}</div>

                                </div>
                            </div>

                        </div>

                    ))}
                </div>





                <ReactPaginate
                    previousLabel={<i style={{ color: '#6e46c9' }} className="fas fa-angle-left"></i>}
                    nextLabel={<i style={{ color: '#6e46c9' }} className="fas fa-angle-right"></i>}
                    breakLabel={'...'}
                    pageCount={numberOfPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
                <div className="mb-3" id="ftr">
                    <p className="footer" style={{ marginBottom: '0px' }}>Developed by Electrogets Technologies Pvt Ltd © 2023. All rights reserved by The Wise Owl</p>
                </div>
            </div>


        </div>
    )
}

export default ViewCustomerData
