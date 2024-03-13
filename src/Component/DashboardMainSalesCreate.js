import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './DashboardMainSalesCreate.css';
import DashbaordHeader from './DashbaordHeader';
import DashboardCard from './DashboardCard';
import { actionCreators } from '../Store/SalesAuthToken/StoreAdminAction';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const DashboardMainSalesCreate = () => {
    const [disable, setDiasable] = useState(false);
    const navigate = useNavigate();
    const [apiResData, setApiResDataa] = useState([]); // sales register
    const dispatch = useDispatch();
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin.access);

    const [salesRegister, setSalesRegister] = useState({
        name: "", email: "", password: ""
    });

    const [error, setError] = useState({
        name: "", email: "", password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
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
        e.preventDefault();
        setSalesRegister({
            ...salesRegister,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        setDiasable(true);

        let errorData = {};
        if (salesRegister.name === '') {
            errorData.name = "Please enter a name";
        } else {
            errorData.name = '';
        }
        if (!String(salesRegister.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            errorData.email = "Please enter a valid email";
        } else {
            errorData.email = '';
        }
        if (salesRegister.password === '') {
            errorData.password = "Please enter a password";
        } else {
            errorData.password = '';
        }

        if (errorData.name !== '' || errorData.email !== '' || errorData.password !== '') {
            setError(errorData);
            setDiasable(false); // Reset the disable state
            return;
        }

        try {
            const response = await axios.post(
                'http://13.200.89.3:8000/salesperson/create/',
                {
                    name: salesRegister.name,
                    email: salesRegister.email,
                    password: salesRegister.password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getStoreAdminToken}`
                    }
                }
            );

            console.log('response', response.data);

            if (response.data.error) {
                // Display an error message for existing user or any other error
                toast.error(response.data.error, {
                    position: 'top-right',
                    duration: 2000,
                    id: 'toast-error'
                });
            } else {
                // Process the successful registration
                const token = response.data.tokens;
                setApiResDataa(response.data);
                dispatch(actionCreators.salesToken(token));
                toast.success("Successfully registered!", {
                    position: 'top-right',
                    id: 'toast-success'
                });
                setTimeout(() => {
                    toast.remove('toast-success');
                    navigate('/sales-data');
                    setDiasable(false);
                }, 2000);
            }
        } catch (error) {
            redirectLogin(error)
            // Check if error.response exists before accessing its properties
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error, {
                    position: 'top-right',
                    duration: 2000,
                    id: 'toast-error'
                });
            } else {
                // Fallback error message
                toast.error("Unable to Register. Please try again!.", {
                    position: 'top-right',
                    duration: 5000,
                    id: 'toast-error'
                });
            }
            setDiasable(false);
            console.log('error', error);

        }
    };

    useEffect(() => {
        if (getStoreAdminToken) {
            axios({
                url: 'http://13.200.89.3:8000/api/store-owner/customer-count/',
                data: {

                },
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`
                },
                method: 'get'
            }).catch((error) => {
                redirectLogin(error)
            })
        }

    }, [])
    return (
        <>
            <Toaster />
            <section className={`Dashboard-wrapper`} id='Dashbaord-wrapper-margin-left'>
                <DashbaordHeader />
                <DashboardCard />
                <div class="table-data-wrapper">
                    <div class="table-inner-content table-responsive">
                        <form className='sales-register-create'>
                            <h5 className='text-center'>Sales Representative Registration</h5>
                            <input type="text" id="name" name='name' value={salesRegister.name} onChange={(e) => handleInput(e)} placeholder='Name' />
                            {error.name && <p style={{ color: 'red', fontSize: '14px' }}>{error.name}</p>}
                            <input type="text" id="email" name='email' value={salesRegister.email} onChange={(e) => handleInput(e)} placeholder='Email' />
                            {error.email && <p style={{ color: 'red', fontSize: '14px' }}>{error.email}</p>}
                            <div className="password-input-wrapper">
                                <input type={showPassword ? "text" : "password"}
                                    id="password" name='password' value={salesRegister.password} onChange={(e) => handleInput(e)} placeholder='Password' />
                                <FontAwesomeIcon style={{ marginLeft: '-20px', cursor: 'pointer' }}
                                    icon={showPassword ? faEye : faEyeSlash}
                                    className={`eye-icon ${showPassword ? 'open' : 'closed'}`}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            {error.password && <p style={{ color: 'red', fontSize: '14px' }}>{error.password}</p>}
                            <br />
                            <button className="login-button-admin" onClick={(e) => handleSubmit(e)}>Register</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DashboardMainSalesCreate;
