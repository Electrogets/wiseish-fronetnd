import React, { useState } from 'react';
import './StoreAd.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { actionCreators } from '../Store/StoreAdminAuth/StoreAdminAction';
// import { ToastContainer, toast } from 'react-toastify';
import { actionCreators as SidebarAction } from '../Store/SidebarComponent/SidebarAction';
import 'react-toastify/dist/ReactToastify.css';
import { actionCreators as customerName } from '../Store/SalesAuthToken/StoreAdminAction';
import Sidebar from './NewAdminPanel/Sidebar';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const StoreAd = () => {
  const [disable, setDiasable] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [storeLogin, setStoreLogin] = useState({
    email: "", password: ""
  })
  const [error, setError] = useState({
    email: "", password: ""
  })
  const handleInput = (e) => {
    e.preventDefault()


    setStoreLogin({
      ...storeLogin, [e.target.name]: e.target.value
    })
    console.log('input', storeLogin);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    // if (disable) {
    //   return
    // }

    setDiasable(true)

    let errorData = {}
    if (!String(storeLogin.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      errorData.email = "Please enter a valid email"
    }
    else {
      errorData.email = ''
    }
    if (storeLogin.password === '') {
      errorData.password = "Please enter a password"
      // seterrorData({...errorData, name:"Please enter a name"})
    }
    else {
      errorData.password = ''
    }
    if (storeLogin.email === '') {
      errorData.email = "Please Enter a email"
    }
    if (errorData.email !== '' || errorData.password !== '') {
      setError(errorData)
      return
    }
    axios({
      url: "http://13.200.89.3:8000/storeowner/login/",
      data: {

        "email": storeLogin?.email,
        "password": storeLogin?.password
      },
      method: "post"
    }).then((res) => {
      console.log('token', res?.data?.tokens);
      // NotificationManager.success("Logged in successfully!", null, 2000);
      sessionStorage.setItem('storeAdminToken', res.data.tokens);

      toast.success("Logged in successfully!", {
        position: 'top-right',
        id: 'toast-success',
        duration: 1500,

      })
      dispatch(actionCreators.masterStoreAdmin(res?.data?.tokens))
      dispatch(SidebarAction.sidebartype('owner'))
      dispatch(customerName.setCustomerName(res?.data?.store_name))
      // dispatch(actionCreators.setRefreshToken(res?.data?.tokens?.refresh));

      setTimeout(() => {
        toast.remove('toast-success')
        navigate('/admin')
        setDiasable(false)

      }, 2000)

    }).catch((error) => {

      // Handle 401 Unauthorized error
      if (error?.response && error?.response?.status === 401) {
        // Handle session expiration or invalid token
        // Redirect to login page, show a notification, or take appropriate action
        toast.error('Session expired. Please login again.', {
          duration: 5000,
          id: 'toast-error',
          onShow: () => {
            setTimeout(() => {
              navigate('/');
            }, 60000); // 60000 milliseconds (60 seconds), adjust as needed
          },
        });
      } else {
        // Handle other errors
        console.error('API request error:', error?.message);
      }
    })

  }
  return (
    <>
      {/* <ToastContainer /> */}
      {/* <NotificationContainer /> */}
      <Toaster />


      <section className='bg-img-page'>
        <div className="login-wrapper">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form>
          <div class="bg"></div>
          <div className="logo-header" style={{ width: '100%' }}>
            <img src="/img/wiseish.png" style={{ width: '200px', height: 'auto' }} />
          </div>
          <h3 style={{
            fontSize: '28px', textAlign: 'left', fontFamily: 'PT Sans',
          }}>
            Welcome! <b className='headingWelcomeBack'></b>
            <strong><span style={{ color: '#000', fontWeight: '500', fontSize: '12px', marginTop: '-20px', textAlign: 'left' }}>Sign in to access <b style={{ color: '#6442c0' }}>admin dashboard</b></span></strong>
          </h3>

          <input type="text" id="username" name='email' value={storeLogin.email} onChange={(e) => handleInput(e)} placeholder='Email' />
          {error.email && <p style={{ color: 'red', fontSize: '14px' }}>{error.email}</p>}

          <div className="password-input-wrapper">
            <input type={showPassword ? "text" : "password"} id="password" name='password' value={storeLogin.password} onChange={(e) => handleInput(e)} placeholder='Password' />
            <FontAwesomeIcon style={{ marginLeft: '-20px', cursor: 'pointer' }}
              icon={showPassword ? faEye : faEyeSlash}
              className={`eye-icon ${showPassword ? 'open' : 'closed'}`}
              onClick={togglePasswordVisibility}
            />
          </div>

          {error.password && <p style={{ color: 'red', fontSize: '14px' }}>{error.password}</p>}

          <div className='checkboxText'>
            <input type="checkbox" value="lsRememberMe" id="rememberMe" /> <label style={{ fontSize: '12px' }} for="rememberMe">Remember me</label><br />
            <button className="login-button-admin" onClick={(e) => handleSubmit(e)} >Login</button>

          </div>
          <div className='login-side-img'>
            <img src='img/40174687890.png' style={{ height: 'auto', width: '100%', marginLeft: '0px' }} />
          </div>
        </form>
      </section>
    </>
  )
}

export default StoreAd