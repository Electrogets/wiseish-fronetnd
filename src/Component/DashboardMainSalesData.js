import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import { FaCalendarAlt } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashbaordHeader from './DashbaordHeader';
import DashboardCard from './DashboardCard';
import { FaEdit } from "react-icons/fa";
import './DashboardMainSalesData';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AddSalesModal from '../AddSalesModal';
import SalesEditModal from './SalesEditModal';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import toast, { Toaster } from 'react-hot-toast';
import { FaToggleOn } from "react-icons/fa";
import { IoToggleOutline } from "react-icons/io5";


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
const DashboardMainSalesData = () => {
    const [editData, setEditData] = useState()
    const navigate = useNavigate()
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin.access)
    const [selectedDate, setDate] = useState(null)// for select calender
    const [salesGetData, setSalesGetData] = useState([])
    const [allData, setAllData] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [showModal, setShowModal] = useState(false);


    const redirectLogin = (error) => {
        if (error?.response?.status === 401) {
            toast.error('Session expired. Please login again.', { duration: 2000 });
            setTimeout(() => navigate('/'), 2500);
        }
    };
    // sales person api call 
    const fetchApi = () => {
        axios.get('http://13.200.89.3:8000/salespersons/', {
            headers: { Authorization: `Bearer ${getStoreAdminToken}` }
        })
            .then(response => {
                setAllData(response.data);
                setSalesGetData(response.data.slice(0, 10));
                setNumberOfPages(Math.ceil(response.data.length / 10));
            })
            .catch(error => {
                console.error('Error fetching sales data:', error);
                redirectLogin(error);
            });
    };


    useEffect(() => {
        if (getStoreAdminToken) {
            fetchApi()
        }
    }, [getStoreAdminToken])


    useEffect(() => {
        // Check if there's data in localStorage
        // const storedData = JSON.parse(localStorage.getItem('salesRepresentatives'));
        // if (storedData) {
        //     setAllData(storedData);
        //     setSalesGetData(storedData.slice(0, 10));
        //     setNumberOfPages(Math.ceil(storedData.length / 10));
        // }
    }, []);
    // save refresh token


    //   session loutout please login start
    useEffect(() => {
        let timeoutId;

        if (!getStoreAdminToken) {
            // User is not authenticated, redirect to login page

            toast.error('Session expired. Please login again.', {
                duration: 5000,
                id: 'toast-error',
                onShow: () => {
                    // Hold for some time before redirecting
                    timeoutId = setTimeout(() => {
                        navigate('/');
                    }, 60000); // 5000 milliseconds (5 seconds), adjust as needed
                },

                onClose: () => {
                    // Clear the timeout when the notification is closed
                    clearTimeout(timeoutId);
                },
            });

        }
        return () => {
            // Cleanup the timeout when the component unmounts
            clearTimeout(timeoutId);
        };
    }, [getStoreAdminToken, navigate]);
    // -------------------------session expire and notification end------------
    // sales person api call 
    // session logout please login end
    const handleCustomerDataBySales = (name) => {

        axios({
            url: 'http://13.200.89.3:8000/api/salesperson/customer_count/',
            data: {
                "salesperson_name": name,


            },
            headers: {
                Authorization: `Bearer ${getStoreAdminToken}`
            },
            method: 'post'
        }).then((result) => {
            console.log('salesmen', result.data);
            if (result.data.customers.length > 0) {
                navigate('/customer-data', { state: { data: result.data.customers } })
            }
            else {
                toast.error("Empty Record", {
                    position: 'top-right',
                    duration: 2000,
                    id: 'toast-error'
                })

            }

        }).catch((error) => {
            redirectLogin(error)
        })

    }
    const handlePageClick = async (data1) => {
        console.log('click');
        console.log('pagecount3', data1.selected);
        const data = allData.slice(data1.selected * 10, (data1.selected + 1) * 10)
        setSalesGetData(data.slice(0, 10))

    };

    const handleSalesDelete = (e, email) => {
        axios({
            url: 'http://13.200.89.3:8000/salesperson/delete/',
            data: {
                "email": email,

            },
            headers: {
                Authorization: `Bearer ${getStoreAdminToken}`
            },
            method: 'delete'
        }).then((result) => {
            fetchApi()
        }).catch((error) => {
            redirectLogin(error)
        })
    }

    const handleSalesEdit = (e, email, name) => {
        setShowModal(true)
        setEditData({ email, name })
    }


    const handleApiError = (error) => {
        if (error.response.status === 401 || error.response.status === 400) {
            toast.error('Session expired. Please login again.', { duration: 2000 });
            setTimeout(() => {
                navigate('/');
            }, 2500);
        } else {
            toast.error('An error occurred. Please try again later.');
        }
    };





    useEffect(() => {
        if (salesGetData.length > 0) {
            // Initial API call to activate the first sales representative if not already active
            const firstSalesperson = salesGetData[0];
            if (!firstSalesperson.is_active) {
                handleToggleActivation(firstSalesperson.email, true);
            }
        }
    }, [salesGetData]);



    const handleToggleActivation = (email, isActive) => {
        axios.put('http://13.200.89.3:8000/salesperson/activate-deactivate/', {
            email,
            is_active: isActive
        }, {
            headers: { Authorization: `Bearer ${getStoreAdminToken}` }
        })
            .then(() => {
                const updatedData = salesGetData.map(salesperson => {
                    if (salesperson.email === email) {
                        return { ...salesperson, is_active: isActive };
                    }
                    return salesperson;
                });
                setSalesGetData(updatedData);
                toast.success(`Salesperson ${isActive ? 'activated' : 'deactivated'} successfully.`);
            })
            .catch(error => {
                console.error('Error toggling activation status:', error);
                redirectLogin(error);
            });
    };






    return (

        <>
            {/* <ToastContainer /> */}
            {/* <NotificationContainer /> */}
            <Toaster />

            {showModal && <SalesEditModal showModal={showModal} data={editData} close={() => setShowModal(false)} fetch={fetchApi} />}
            <section className={`Dashboard-wrapper`} id='Dashbaord-wrapper-margin-left'>

                <DashbaordHeader />
                <DashboardCard />
                <div className='buttom-parent-div-sales'>

                    <Link to="/sales-register">
                        <button className="button-30-add-sales" role="button" style={{ textAlign: 'right' }}>Add Sales Representative</button>
                    </Link>

                </div>
                <div className="table-data-wrapper">
                    <h5 style={{ textAlign: 'left', paddingLeft: '10px', padding: '10px', marginTop: '20px' }}>Sales Representative</h5>
                    <div className="table-inner-content table-responsive z1919">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Delete Record</th>
                                    <th>Edit Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesGetData.map((val) => (
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleCustomerDataBySales(val.name)}>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td onClick={(e) => handleSalesDelete(e, val.email)}><MdDelete className='bg-color-delete' /></td>
                                        <td onClick={(e) => handleSalesEdit(e, val.email, val.name)}><FaEdit className='bg-color-edit' /></td>
                                        <td>
                                            {/* <button onClick={() => handleToggleActivation(val.email, !val.is_active)} style={{ backgroundColor: val.is_active ? 'green' : 'gray', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
                                                {val.is_active ? <FaToggleOn style={{ color: 'white', marginRight: '5px' }} /> : <IoToggleOutline style={{ color: 'white', marginRight: '5px' }} />}
                                                {val.is_active ? 'Active' : 'Inactive'}
                                            </button> */}

                                            <td style={{ borderTop: 'none', paddingTop: '0px' }}>
                                                <button onClick={() => handleToggleActivation(val.email, !val.is_active)} style={{ color: val.is_active ? 'green' : 'gray' }}>
                                                    {val.is_active ? <FaToggleOn style={{ fontSize: '20px', backgroundColor: 'none' }} /> : <IoToggleOutline style={{ fontSize: '20px', backgroundColor: '#fff' }} />}
                                                </button>
                                            </td>
                                        </td>

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

export default DashboardMainSalesData

