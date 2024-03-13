import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import * as XLSX from 'xlsx';

import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import DashbaordHeader from './DashbaordHeader';
import DashboardCard from './DashboardCard';
import { useLocation } from 'react-router-dom';
import PieChart from './Example';
function CustomInput({ value, onClick }) {
    return (
        <div className='input-date-parent'>
            <div className='input-group'>
                <input type='text' className='form-control' value={value} onClick={onClick} readOnly />
                <div className='input-group-append'>
                    <span className='input-group-text'>
                        <FaCalendarAlt />
                    </span>
                </div>
            </div>
        </div>
    )
}

const DashboardVisitorData = (props) => {
    const [showHeader, setShowHeader] = useState(true)
    const location = useLocation()
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access)
    const getSalesTokenByStore = useSelector(state => state?.salesToken?.salestoken?.access)
    console.log('storeadminlogin', getStoreAdminToken);
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [allData, setAllData] = useState([])
    const [selectedDate, setDate] = useState(null)// for select calender
    const [customerGetData, setCustomerGetData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Adjust the page size as needed
    const [storeData, setStoreData] = useState();
    // sales person api call 
    useEffect(() => {
        if (location?.state?.data) {
            console.log('salesmen', location.state.data);
            setCustomerGetData(location.state.data)
            setAllData(location.state.data)
            setStoreData(location.state.data.slice(0, 4))
            setNumberOfPages(Math.ceil(location.state.data.length / 4))
        } else {
            if (getStoreAdminToken) {
                console.log('salestoken', getStoreAdminToken);
                axios({
                    url: `http://13.200.89.3:8000/api/store_owner/customer/visitor/`,
                    data: {

                    },
                    headers: {
                        Authorization: `Bearer ${getStoreAdminToken}`
                    },
                    method: 'get'
                }).then((result) => {
                    console.log('salesmen', result.data);
                    setCustomerGetData(result.data)
                    setAllData(result?.data)
                    setStoreData(result.data.slice(0, 15))
                    setNumberOfPages(Math.ceil(result.data.length / 15))
                })
            }
        }
        // const accessToken = getStoreAdminToken?.tokens?.access;


    }, [getStoreAdminToken])

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePageClick = async (data1) => {
        console.log('click');
        console.log('pagecount3', data1.selected);
        const data = allData.slice(data1.selected * 4, (data1.selected + 1) * 4)
        setStoreData(data.slice(0, 4))
        // setNumberOfPages(Math.ceil(data.length / 10))
    };


    useEffect(() => {
        if (getSalesTokenByStore) {
            console.log('salestoken', getSalesTokenByStore);
            axios({
                url: `http://13.200.89.3:8000/api/store_owner/customer/visitor/`,
                data: {

                },
                headers: {
                    Authorization: `Bearer ${getSalesTokenByStore}`
                },
                method: 'get'
            }).then((result) => {
                console.log('salesmen', result.data.customers);
                setCustomerGetData(result.data.customers)
                setAllData(result.data.customers)
                setStoreData(result.data.customers.slice(0, 14))
                setNumberOfPages(Math.ceil(result.data.customers.length / 15))
            })
        }
    }, [getSalesTokenByStore])


    useEffect(() => {

        if (props?.showHeader) {
            setShowHeader(false)

        }
    }, [props])
    const handler = (val) => {
        let date = moment(val).format('YYYY-MM-DD')
        console.log('date', date, val);
        const data = allData.filter((value) => {
            let date1 = moment(value.date).format('YYYY-MM-DD')
            return moment(date).isSame(date1)

        })
        setStoreData(data)
    }

    const handleExcel = (e) => {
        const data = allData.map((val) => {
            return [val.id, val.name, val.email, val.phone_number, val.salesperson_name, val.visit_type, val.description]

        })
        const data1 = ['Id', 'Name', 'Email', 'Phone Number', 'Sales Person Name', 'Product List', 'Description']
        data.unshift(data1)
        var ws = XLSX.utils.aoa_to_sheet(data)
        var wv = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wv, ws, 'demo')
        XLSX.writeFile(wv, 'sheet.xlsx')
    }
    return (
        <>
            <section className={`Dashboard-wrapper`} id='Dashbaord-wrapper-margin-left'>
                {/* <!-- dashboard header section  --> */}
                {/* <!-- dashboard header section  --> */}
                {/* {showHeader &&
                    <>
                        <DashbaordHeader fun={handler} />
                        <DashboardCard />
                    </>
                } */}

                {/* <!-- Dashboard Charts Section  --> */}
                {/* <!-- Dashboard Charts Section  --> */}
                {/* <!-- Dashboard Charts Section  --> */}
                <div class="table-data-wrapper dashboard-charts-wrapper z1919">
                    <div className='title-customerdata-exportbtn'>
                        <h5 style={{ textAlign: 'left', paddingLeft: '10px', padding: '10px', marginTop: '20px' }}>Visitor Data</h5>
                        <button className='customer-data-btn-download' onClick={() => handleExcel()}>Export CVS</button>
                    </div>
                    <div class="table-inner-content table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Visit Type</th>
                                    <th>Sales Representative</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storeData && storeData?.map((val) => (
                                    <tr>
                                        <td>{val?.id}</td>
                                        <td>{val?.name}</td>
                                        <td>{val?.email}</td>
                                        <td>{val?.phone_number}</td>
                                        <td>{val?.visit_type}</td>

                                        <td>{val?.salesperson_name}</td>
                                        <td>{val?.description}</td>
                                        {/* <td onClick={(e) => handleDelete(e, val.id)}>Delete</td> */}
                                    </tr>
                                ))}
                            </tbody>

                        </table>

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

                    </div>

                </div>
            </section>
        </>
    )
}

export default DashboardVisitorData