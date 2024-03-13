import React, { useState } from 'react';
import './StoreAdmin.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../Store/StoreAdminAuth/StoreAdminAction';
import Navbar from './Navbar';

const StoreAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [storeLogin, setStoreLogin] = useState({
        email: "", password: ""
    })
    const handleInput = (e) => {
        e.preventDefault()
        setStoreLogin({
            ...storeLogin, [e.target.name]: e.target.value
        })
        console.log('input', storeLogin);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actionCreators.masterStoreAdmin(storeLogin))
        alert("Store Owner Login Successfully")
        navigate('/sales')
    }
    return (
        <>
            <div>
                <div className='store-admin'>
                  
                    <section className='firstback-img' >
                        {/* <div className='orLoginwithCredn'>
                            <h5 style={{ marginBottom: '0px', fontSize: '18px', fontWeight: 'bold' }}>LOGIN WITH CREDENTIAL</h5>
                        </div> */}
                        <div className='formparent'>
                            <form className='login storeAdmin'>
                                <div className='logo-admin'>
                                    <img className='logothe-wise-owl' src='img/wishise-logo.jpeg' style={{width:'150px', height:'auto'}} />
                                </div>
                                <p style={{ textAlign: 'center', fontSize: '25px', color: '#413759', marginBottom: '7px', fontWeight: 'bold' }}>Login</p>
                                <hr style={{ margin: '0px' }} />
                                <br />
                                {/* <div className='logo_for_login'>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <br /> */}
                                <input type='text' name='email' value={storeLogin.email} onChange={(e) => handleInput(e)} placeholder='Email' />
                                <input type='password' name='password' value={storeLogin.password} onChange={(e) => handleInput(e)} placeholder='Password' />

                                {/* checkbox */}
                                <div class="form-check form-check-inline checkbox-parent">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                    <label class="form-check-label" for="inlineCheckbox1" style={{ fontSize: '14px' }}>Remember</label>
                                </div>
                                {/* end checkbox */}
                                <input type='submit' onClick={(e) => handleSubmit(e)} value="Login" />

                            </form>
                        </div>
                    </section>
                </div>
                {/* <div className="mb-3" id="ftr">
                    <p className="footer" style={{ marginBottom: '0px' }}>Developed by Electrogets Technologies Pvt Ltd © 2023. All rights reserved by The Wise Owl</p>
                </div> */}
            </div>
        </>
    )
}

export default StoreAdmin