import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './CustomerRegister.css';
import { useEffect } from 'react';
import Button from './ButtonCustomerResponse';
import Modal from './CustomerResponseModal';
import { actionCreators } from '../Store/StoreAdminPannel/SalesAction';
import Navbar from './Navbar';

const CustomerRegister = (props) => {
    const dispatch = useDispatch()
    const [showModalStyle, setShowModalStyle] = useState(false)
    const [error, setError] = useState()
    const [salespersonname, setSalesPersonName] = useState([]) // select option
    const [selectProduct, setSelectProduct] = useState()
    const [option, setOption] = useState('')// call option below jsx
    console.log('salesData', props?.salesData);
    const navigate = useNavigate()
    const getTokenfromstore = useSelector(state => state?.storeAdminLogin?.storeAdmin)
    console.log('getToken', getTokenfromstore);

    const [customerapiResData, setCustomerApiResData] = useState([]);
    const [customerjorney, setCustomerJorney] = useState({
        name: "", email: "", phone_number: "", salesname: ""  // Populate with salesData.name
    })
    const handleInput = (e) => {
        e.preventDefault()
        setCustomerJorney({
            ...customerjorney, [e.target.name]: e.target.value
        })
        console.log(e);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customerjorney.description) {
            setError({ description: 'Please Enter Description Click on Consumer Enquiry button to put a description' })
            return
        }
        else {
            setError({ description: '' })
        }
        try {
            // Get the access token from the Redux store
            const accessToken = getTokenfromstore?.tokens?.access;
            // Check if the access token exists
            if (!accessToken) {
                alert("Access token not available. Please log in.");
                return;
            }
            const response = await axios.post(
                'http://13.200.89.3:8000/customer/register/',
                {
                    name: customerjorney.name,
                    email: customerjorney.email,
                    phone_number: customerjorney.phone_number,
                    salesperson_name: salespersonname,
                    product_choice: selectProduct,
                    description: customerjorney.description
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log('response', response.data);
            const token = response.data.getStoreAdminToken;
            localStorage.setItem('token', token);
            setCustomerApiResData(response.data)
            alert("Sales person successfully signup")
            navigate('/viewcustomer', {
                state: { selectProduct, customerjorney, salespersonname }
            })

        } catch (error) {
            // alert("Failed to sign up");
            console.log('error', error);
        }

    };
    // sales person api call 
    useEffect(() => {
        const accessToken = getTokenfromstore?.tokens?.access;
        console.log('acces', accessToken);
        if (accessToken) {
            axios({
                url: 'http://13.200.89.3:8000/salesperson/create/',
                data: {

                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                method: 'get'
            }).then((result) => {
                console.log('salesmen', result.data);
                // setSalesPersonName(result.data)
                const optionSales = result.data.map((val) => {
                    return val.name
                })
                setSalesPersonName(optionSales[0])
                setOption(optionSales)
            })
        }
    }, [getTokenfromstore])

    const handleOption = (e) => {
        console.log('e', e);
        setSalesPersonName(e.value)
    }
    const handleProductList = (e) => {
        console.log(e);
        setSelectProduct(e.target.value)
    }
    const openModal = (e) => {
        e.preventDefault()
        setShowModalStyle(true)
    }
    dispatch(actionCreators.salesData(customerjorney))
    return (
        <div>
            <div className="customer-review-page">
                <Navbar />
                {/* -------------------header end-------------- */}
                <div className='main-form-wrapper'>
                    <div className='login' id='customer-rview'>
                        <h5 style={{ fontSize: '19px', fontWeight: 'bold' }}>Customer Review</h5>
                        <div className=''>
                            <p style={{ color: '#cc0033', fontWeight: 'bold', marginBottom: '0px', textAlign: 'center !important' }}>No Review yet ?</p>
                            {/* <button id='writeReview-btn' className='write-review-customer'>Write a Review</button> */}
                        </div>

                        <hr />

                        <div className='logo_for_login'>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <br />
                        {/* <div className='orLoginwithCredn'>
                            <p style={{ color: '#71717A', fontWeight: '500', marginBottom: '10px' }}></p>
                        </div> */}
                        <input type='text' name='name' value={customerjorney.name} onChange={(e) => handleInput(e)} placeholder='Enter Name' />
                        <input type='text' name='email' value={customerjorney.email} onChange={(e) => handleInput(e)} placeholder='Enter Email' />
                        <input type='text' name='phone_number' value={customerjorney.phone_number} onChange={(e) => handleInput(e)} placeholder='Phone Number' />


                        <div className="mb-3">
                            <select name='Product' className="form-control" id="Product" onChange={(e) => handleProductList(e)}>
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

                            </select>
                            <span id="Product_e" className="text-danger font-weight-bold"></span>
                        </div>


                        {/* <div class="form-group" name="description" value={customerjorney.description} onChange={(e) => handleInput(e)} >
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div> */}

                        <Button openModal={() => setShowModalStyle(true)} />
                        {showModalStyle && <Modal isOpen={showModalStyle}
                            clickhandler={() => setShowModalStyle(false)} value={customerjorney.description}
                            onChange={(e) => handleInput(e)} />}

                        {/* <input
                        type='text'
                        name='salesperson_name'
                        value={customerjorney.salesperson_name}
                        onChange={(e) => handleInput(e)}
                        placeholder='Salesperson Name'
                    /> */}



                        <Dropdown className="productList" style={{ textAlign: 'left !important' }} options={option} onChange={(e) => handleOption(e)} value={salespersonname} name="salesname" placeholder="Select an option" />

                        <div className="form-check form-check-inline checkbox-parent">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                            <label className="form-check-label" for="inlineCheckbox1" style={{ fontSize: '14px' }}>Remember</label>
                        </div>
                        {/* end checkbox */}
                        {/* <button type='submit' onClick={(e) => handleSubmit(e)} >Review</button> */}
                        {error?.description && <div className="shake" style={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }}>{error.description}</div>}
                        <input type='submit' onClick={(e) => handleSubmit(e)} value="Review" />
                    </div>

                </div>
            </div>
            <div className="mb-3" id="ftr">
                <p className="footer" style={{ marginBottom: '0px' }}>Developed by Electrogets Technologies Pvt Ltd © 2023. All rights reserved by The Wise Owl</p>
            </div>
        </div>
    )
}

export default CustomerRegister