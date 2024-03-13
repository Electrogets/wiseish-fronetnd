import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './DashboardMainSalesCreate.css';
import { actionCreators } from '../Store/SalesAuthToken/StoreAdminAction';
import { actionCreators as SidebarAction } from '../Store/SidebarComponent/SidebarAction';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCard from './DashboardCard';
import DashbaordHeader from './DashbaordHeader';
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
const SalesPersonLogin = () => {
    const [disable, setDiasable] = useState(false)
    const navigate = useNavigate()
    const [apiResData, setApiResDataa] = useState([])// sales register
    const [selectedDate, setDate] = useState(null)// for select calender
    const getStoreAdminToken = useSelector(state => state?.salesLogin?.salestoken?.access)
    console.log('storeadminlogin', getStoreAdminToken);
    const dispatch = useDispatch()
    const [salesLogin, setSalesLogin] = useState({
        name: "", password: ""
    })
    const [error, setError] = useState({
        name: "", password: ""
    })
    const handleInput = (e) => {
        e.preventDefault()
        setSalesLogin({
            ...salesLogin, [e.target.name]: e.target.value
        })
        console.log('input', salesLogin);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (disable) {
        //     return
        // }

        setDiasable(true)
        let errorData = {}
        if (salesLogin.name === '') {
            errorData.name = "Please enter a name"
            // seterrorData({...errorData, name:"Please enter a name"})
        }
        else {
            errorData.name = ''
        }
        if (salesLogin.password === '') {
            errorData.password = "Please enter a password"
            // seterrorData({...errorData, name:"Please enter a name"})
        }
        else {
            errorData.password = ''
        }
        if (salesLogin.name === '') {
            errorData.name = "Please enter a name"
        }
        if (errorData.name !== '' || errorData.password !== '') {
            setError(errorData)
            return
        }
        // if (!salesLogin.email.includes('@')) {
        //     NotificationManager.error("Please Enter Correct Email")
        //     return
        // }
        try {

            const response = await axios.post(
                'https://thewiseowl.pythonanywhere.com/salesperson/login/',
                {
                    // store_owner_email: salesPersonSignup.email,
                    name: salesLogin.name,
                    password: salesLogin.password,
                },
            );
            console.log('response', response.data);
            const token = response.data.tokens;
            setApiResDataa(response.data)
            dispatch(actionCreators.salesToken(token))
            dispatch(SidebarAction.sidebartype('sales-admin'))
            dispatch(actionCreators.setCustomerName(response.data.username))
            // toast.success("Login successfully", { duration: 4000 })
            toast.success("Logged in successfully!", {
                position: 'top-right',
                id: 'toast-success',
                duration: 1000

            })

            setTimeout(() => {
                toast.remove('toast-success')
                navigate('/customer-register', { state: { name: salesLogin.name, token } })
                setDiasable(false)
            }, 2000)
        } catch (error) {
            if (error.response && error.response.data) {
                const { name, password } = error.response.data;
                setError({
                    name: name || "",
                    password: password || ""
                })
            }
            toast.error(error.response.data.error, {
                position: 'top-right',
                duration: 2000,
                id: 'toast-error'
            })
            setDiasable(false)
            console.log('error', error);
        }
    };

    return (

        <>
            {/* <ToastContainer /> */}
            {/* <NotificationContainer /> */}
            <Toaster />

            <section className='bg-img-page sales-login' >
                {/* <DashbaordHeader />
            
                <DashboardCard />
                */}
                <form className='sales-register-create' id="sales-login-width">
                    <h4 style={{ fontSize: '18px', textAlign: 'center', color: '#000 !important' }}>Sales Login </h4>
                    {/* <strong><span style={{ color: '#000', fontWeight: '500', fontSize: '12px', marginTop: '-20px', textAlign: 'left' }}>Sales  <b style={{ color: '#6442c0' }}>login</b></span></strong> */}

                    {/* <input type="text" id="email" name='email' value={salesLogin.email} onChange={(e) => handleInput(e)} placeholder='Email' />
                    {error.email && <p style={{ color: 'red', fontSize: '14px' }}>{error.email}</p>} */}

                    <input type="text" id="name" name='name' value={salesLogin.name} onChange={(e) => handleInput(e)} placeholder='Name' />
                    {error.name && <p style={{ color: 'red', fontSize: '14px' }}>{error.name}</p>}

                    <input type="password" id="password" name='password' value={salesLogin.password} onChange={(e) => handleInput(e)} placeholder='Password' />
                    {error.password && <p style={{ color: 'red', fontSize: '14px' }}>{error.password}</p>}

                    <div className='checkboxText'>
                        <input type="checkbox" value="lsRememberMe" id="rememberMe" /> <label style={{ fontSize: '12px' }} for="rememberMe">Remember me</label><br />
                    </div>
                    <button className="login-button-admin" onClick={(e) => handleSubmit(e)} >Login</button>

                </form>

            </section >

        </>
    )
}

export default SalesPersonLogin