import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DashboardCard from './DashboardCard';
import DashbaordHeader from './DashbaordHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { actionCreators } from '../Store/StoreAdminPannel/SalesAction';
// import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from 'react-icons/fa';
import CustomerRegisterNotifyModal from './CustomerRegisterNotifyModal';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
const DashboardCustomerCreate = (props) => {
    const [disable, setDiasable] = useState(false)

    const salesPersonName = useSelector(state => state.salesToken.customerName)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [salespersonname, setSalesPersonName] = useState() // select option
    const [showModal, setShowModal] = useState(false)
    const [selectProduct, setSelectProduct] = useState()
    const [optionShopping, setOptionShopping] = useState('')// call option below jsx
    const [apiResData, setApiResDataa] = useState([])// sales register
    const [selectedDate, setDate] = useState(null)// for select calender
    const getStoreAdminToken = useSelector(state => state?.salesToken?.salestoken?.access)
    console.log('salestoken', getStoreAdminToken);
    const [customerRegister, setCustomerRegister] = useState({
        name: "", email: "", phone_number: "", description: ""
    })
    const [error, setError] = useState({
        name: "", email: "", phone: "", visit_type: "", feedback: ""
    })


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
    const handleInput = (e) => {
        e.preventDefault()
        setCustomerRegister({
            ...customerRegister, [e.target.name]: e.target.value
        })
        console.log('input', customerRegister);
    }


    const handleSubmit = async () => {
        setDiasable(false)
        try {

            const response = await axios.post(
                'http://13.200.89.3:8000/customer/register/',
                {
                    // store_owner_email: salesPersonSignup.email,
                    name: customerRegister.name,
                    email: customerRegister.email,
                    phone_number: customerRegister.phone_number,
                    product_choice: selectProduct,
                    description: customerRegister.description,
                    salesperson_name: salesPersonName,
                    visit_type: optionShopping
                    // date: selectedDate

                },
                {
                    headers: {
                        Authorization: `Bearer ${getStoreAdminToken}`
                    }
                }
            );
            console.log('response', response.data);
            const token = response.data.accessToken;
            setApiResDataa(response.data)
            toast.success("Successfully registered!", {
                position: 'top-right',
                id: 'toast-success',
                duration: 1500

            })
            setTimeout(() => {
                toast.remove('toast-success')
                navigate('/sales-login', { state: { selectProduct, customerRegister, salespersonname } })
                setDiasable(false)
            }, 1000)
            // navigate('/viewcustomer', {
            //     state: { selectProduct, customerRegister, salespersonname }
            // })
        } catch (error) {
            toast.error("Please check your credentials", {
                position: 'top-right',
                duration: 2000,
                id: 'toast-error'
            })
            setDiasable(false)
            console.log('error', error);
            redirectLogin(error)
        }
    };
    const handleProductList = (e) => {
        console.log(e);
        setSelectProduct(e.target.value)
    }
    // dispatch(actionCreators.salesData(customerjorney))
    const handleShoppingType = (e) => {
        console.log(e);
        setOptionShopping(e.target.value)
    }
    const handleClose = () => {

        setShowModal(false)
    }
    const handleOpen = (e) => {
        e.preventDefault()
        // if (disable) {
        //     return
        // }
        setDiasable(true)
        let errorData = {}
        if (!String(customerRegister.name)
            .toLowerCase()
            .match(
                /^[a-z ,.'-]+$/i
            )) {
            errorData.name = "Please enter a valid name"
        }
        else {
            errorData.name = ''
        }

        if (customerRegister.name === '') {
            errorData.name = "Please enter a name"
            // seterrorData({...errorData, name:"Please enter a name"})
        }

        if (!String(customerRegister.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            errorData.email = "Please enter a valid email"
        }
        else {
            errorData.email = ''
        }

        if (customerRegister.phone_number.length !== 10) {
            errorData.phone = "Please enter a valid phone number"
        }
        else {
            errorData.phone = ''
        }
        if (optionShopping === '') {
            errorData.visit_type = "Please select a visit type"
        }

        else {
            errorData.visit_type = ''
        }

        if (customerRegister.description === '') {
            errorData.feedback = "Please write a feedback"
        }
        else {
            errorData.feedback = ''
        }
        if (errorData.name === '' && errorData.email === '' && errorData.phone === '' && errorData.visit_type === '' && errorData.feedback === '') {
            setShowModal(true)
        }
        setError(errorData)

    }
    const handleDate = (date) => {
        console.log('customer-date', date);
        setDate(moment(date.toString).format('yyyy-MM-DD'))
    }
    console.log('errorData', error);
    return (

        <>
            {/* <ToastContainer /> */}
            <Toaster />

            {/* <NotificationContainer /> */}
            <section className={`Dashboard-wrapper bg-img-page customer-login`} style={{ height: "100vh" }}>
                {showModal && <CustomerRegisterNotifyModal customerRegister={customerRegister} optionShopping={optionShopping} salesPersonName={salesPersonName} handleClose={handleClose} handleSubmit={handleSubmit} />
                }
                {/* <!-- dashboard header section  --> */}
                {/* <DashbaordHeader /> */}
                {/* <!-- Dashbaord card section  --> */}
                {/* <DashboardCard /> */}
                {/* <!-- Dashboard Charts Section  --> */}
                <div class="table-data-wrapper-z123" >
                    <div className='bg'></div>

                    <div class="table-inner-content table-responsive">
                        <form className='sales-register-create ' id='customer-rgister'>
                            <h5 style={{ textAlign: 'center' }}>Customer Registration</h5>
                            <div className="row">
                                <div className="col-md-12 col-xs-4">
                                    <input type="text" id="name" name='name' value={customerRegister.name}
                                        onChange={(e) => handleInput(e)} placeholder='Name' />

                                </div>
                                {error.name && <p style={{ color: 'red', fontSize: '14px' }}>{error.name}</p>}

                                <div className="col-md-12 col-xs-4">
                                    <input type="text" id="phone_number" name='phone_number' value={customerRegister.phone_number} onChange={(e) => handleInput(e)} placeholder='Mobile' />
                                </div>
                                {error.phone && <p style={{ color: 'red', fontSize: '14px' }}>{error.phone}</p>}

                                <div className="col-md-12 col-xs-4 mb-2">
                                    <input type="email" id="email" name='email' value={customerRegister.email} onChange={(e) => handleInput(e)} placeholder='Email' />
                                </div>
                                {error.email && <p style={{ color: 'red', fontSize: '14px' }}>{error.email}</p>}



                                {/* <div className="col-md-6">
                                    <div className="">
                                        <select name='Product' id="Product" className=" border-none" onChange={(e) => handleProductList(e)}>
                                            <option value="" disabled selected> Select product</option>
                                            <option value="Air Conditioner">Air Conditioner  </option>
                                            <option value="Refrigerator">Refrigerator</option>
                                            <option value="Washing Machine">Washing Machine </option>
                                            <option value="Oled/Nano/UHD/ LED">Oled/Nano/UHD/ LED </option>
                                            <option value="Microwave ">Microwave   </option>
                                            <option value="Water Purifier">Water Purifier</option>
                                            <option value="Air Purifier">Air Purifier</option>
                                            <option value="Dishwasher ">Dishwasher </option>
                                            <option value="XBoom"> XBoom </option>
                                            <option value="Tone Free">Tone Free </option>
                                            <option value="Styler ">Styler  </option>
                                            <option value="Styler ">Other  </option>

                                        </select>
                                        <span id="Product_e" className="text-danger font-weight-bold"></span>
                                    </div>
                                </div> */}

                                <div className="col-md-12 col-xs-4">
                                    <div className="">
                                        <select name='visit_type' id="visit_type" className=" border-none" onChange={(e) => handleShoppingType(e)}>
                                            <option value="" disabled selected> Select Visit Type</option>
                                            <option value="shoppers"> Shopper</option>
                                            <option value="visitors">Visitor </option>
                                        </select>
                                        <span id="Product_e" className="text-danger font-weight-bold"></span>
                                    </div>
                                </div>
                                {error.visit_type && <p style={{ color: 'red', fontSize: '14px' }}>{error.visit_type}</p>}

                                {/* 
                                <div className="col-md-12 col-xs-4" >
                                    <div class="form-group mt-3 mb-0">
                                        <label style={{ marginTop: '0px', borderRadius: '23px', margin: '9px, 22px' }}><DatePicker style={{ border: 'none' }} selected={selectedDate} onChange={date => handleDate(date)} customInput={<CustomInput />} /></label>
                                    </div>
                                </div> */}


                                <div className="col-md-12 col-xs-4" >
                                    <div class="form-group">
                                        <textarea name='description' value={customerRegister.description} onChange={(e) => handleInput(e)}
                                            placeholder='Feedback' class="form-control" id="exampleFormControlTextarea1" rows="3" />
                                    </div>
                                </div>

                                {error.feedback && <p style={{ color: 'red', fontSize: '14px' }}>{error.feedback}</p>}


                            </div>


                            <button className="login-button-admin" onClick={(e) => handleOpen(e)} >Checkin</button>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardCustomerCreate