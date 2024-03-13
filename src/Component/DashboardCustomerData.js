import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import { actionCreators } from '../Store/DateRange/DateRangeAction';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import DashbaordHeader from './DashbaordHeader';
import DashboardCard from './DashboardCard';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

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



const DashboardCustomerData = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access);

    const [numberOfPages, setNumberOfPages] = useState(1);
    const [allData, setAllData] = useState([]);
    const [storeData, setStoreData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const navigate = useNavigate();
    const redirectLogin = (error) => {
        if (error?.response?.status === 401) {
            toast.error('Session expired. Please login again.', { duration: 2000 });
            setTimeout(() => navigate('/'), 2500);
        }
    };

    useEffect(() => {
        if (location?.state?.data) {
            setAllData(location.state.data);
            setStoreData(location.state.data.slice(0, 10));
            setNumberOfPages(Math.ceil(location.state.data.length / 10));
        } else {
            if (getStoreAdminToken) {
                axios({
                    url: `http://13.200.89.3:8000/store-owner/customers/`,
                    data: {},
                    headers: {
                        Authorization: `Bearer ${getStoreAdminToken}`,
                    },
                    method: 'get',
                }).then((result) => {
                    let date = moment(new Date()).format('YYYY-MM-DD');
                    result.data.forEach((val) => {
                        if (moment(val.date).isBefore(date)) {
                            date = val.date;
                        }
                    });

                    dispatch(actionCreators.startingDate(date));
                    setAllData(result.data);
                    setStoreData(result?.data?.slice(0, 10));
                    setNumberOfPages(Math.ceil(result.data.length / 10));
                }).catch((error) => {
                    redirectLogin(error)
                })
            }
        }
    }, [getStoreAdminToken, location]);

    const handlePageClick = async (data1) => {
        const data = allData.slice(data1.selected * 10, (data1.selected + 1) * 10);
        setStoreData(data.slice(0, 10));
    };

    const handleDateRangeChange = async (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);

        try {
            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

            const response = await axios.get(`http://13.200.89.3:8000/store-owner/customers/`, {
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`,
                },
                params: {
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                }
            });

            setAllData(response.data);
            setStoreData(response.data.slice(0, 10));
            setNumberOfPages(Math.ceil(response.data.length / 10));
        } catch (error) {
            redirectLogin(error);
        }
    };

    const handleTodayFilter = async () => {
        const today = moment().format('YYYY-MM-DD');

        try {
            const response = await axios.get(`http://13.200.89.3:8000/store-owner/customers/`, {
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`,
                },
                params: {
                    start_date: today,
                    end_date: today,
                }
            });

            setAllData(response.data);
            setStoreData(response.data.slice(0, 10));
            setNumberOfPages(Math.ceil(response.data.length / 10));
        } catch (error) {
            redirectLogin(error);
        }
    };
    return (
        <>
            <Toaster />
            <section className={`Dashboard-wrapper `} id='Dashbaord-wrapper-margin-left'>
                <>
                    <DashbaordHeader handleDateRangeChange={handleDateRangeChange} handleTodayFilter={handleTodayFilter} />
                    <DashboardCard />
                </>

                <div class="table-data-wrapper dashboard-charts-wrapper z1919">
                    <div className='title-customerdata-exportbtn py-3'>
                        <h5 style={{ textAlign: 'left', paddingLeft: '10px', padding: '10px' }}>Customer Data</h5>
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
                                {storeData &&
                                    storeData?.map((val) => (
                                        <tr key={val.id}>
                                            <td>{val?.id}</td>
                                            <td>{val?.name}</td>
                                            <td>{val?.email}</td>
                                            <td>{val?.phone_number}</td>
                                            <td>{val?.visit_type}</td>
                                            <td>{val?.salesperson_name}</td>
                                            <td>{val?.description}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        <ReactPaginate
                            previousLabel={<i style={{ color: '#6e46c9' }} className="fas fa-angle-left"></i>}
                            nextLabel={<i style={{ color: '#6e46c9' }} className="fas fa-angle-right"></i>}
                            breakLabel={'...'}
                            pageCount={numberOfPages}
                            marginPagesDisplayed={3}
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
    );
};

export default DashboardCustomerData;
