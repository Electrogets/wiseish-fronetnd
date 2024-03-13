import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import './StoreAdminPannel.css';
import CustomerModal from './CustomerModal';

const StoreAdminPannel = (props) => {
    const [data, setData] = useState([])
    const [CustData, SetCustData] = useState()
    const [showModal, setShowModal] = useState(false)
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin)
    console.log('storeadminlogin', getStoreAdminToken);
    console.log('admindata', props.data1);
    const [show, setShow] = useState(false)
    const [openModal, setModal] = useState(false)
    const handleButton = () => {
        document.querySelector('#storeparent').style.width = show ? '20vw' : '10vw';
        setShow(!show)
    }
    const handleSalesCanditate = (e) => {
        axios({
            url: 'http://127.0.0.1:8000/customer/register/',

            method: 'get',
            headers: {
                Authorization: `Bearer ${getStoreAdminToken.tokens.access}`
            }
        }).then((result) => {
            setData(result.data)
            setModal(true)
            console.log(result.data);

        }).catch((error) => {
            console.log('error', error);
        })

    }
    const handleCount = (e, index) => {
        // SetCustData(allData[index].customers)
        // console.log('alldata', allData[index]);
        const data1 = data.filter((val) => index === val.salesperson_job_id)
        console.log('data', data1[0].customers);
        SetCustData(data1[0].customers)
        setShowModal(true)
    }
    return (
        <div>
            <div>
          
 
            </div>
            {showModal && <CustomerModal data={CustData} show={showModal} handleClose={() => setShowModal(false)} />}
           

            <div className='parentDiv'>
           
                <div id="storeparent" style={{ width: '20vw', height: '100vh', backgroundColor: '#fff' }}>
                    <div className="sidebar pe-4 pb-3">
                        <nav className="navbar bg-light navbar-light">
                        
                            <a href="index.html" className="navbar-brand mx-4 mb-3">
                            
                                <h3 className="text-danger">
                                   <Link to='/'><img src='img/wiseowl.png' style={{ width: '50px', height: '40px' }} /></Link>
                                    </h3>
                            </a>
                            <div className="d-flex align-items-center ms-4 mb-4">
                                <div className="position-relative">
                                    <img className="rounded-circle" src="img/profile.avif" alt="" style={{ width: '40px', height: '40px' }} />
                                    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                                </div>
                                <div className="ms-3">
                                    <h6 className="mb-0">Admin</h6>
                                </div>
                            </div>
                            <div className="navbar-nav w-100">
                                <a href="index.html" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a>
                                <div className="nav-item dropdown">

                                    <a href="#" className="nav-link dropdown-toggle" onClick={(e) => handleSalesCanditate(e)} data-bs-toggle="dropdown"><i class="fa fa-laptop me-2"></i>Sales Target</a>
                                    <div className="dropdown-menu bg-transparent border-0">
                                        <a href="button.html" className="dropdown-item">Customers</a>
                                        <a href="typography.html" className="dropdown-item">Target Achieve</a>
                                        <a href="element.html" className="dropdown-item">Performance</a>
                                    </div>
                                </div>
                                <a href="widget.html" className="nav-item nav-link"><i className="fa fa-th me-2"></i>Customers</a>
                                <a href="form.html" className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Target Achieve</a>
                                <a href="table.html" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Performance</a>
                                <a href="chart.html" className="nav-item nav-link"><i className="fa fa-chart-bar me-2"></i>Charts</a>

                            </div>
                        </nav>
                    </div>





                    {/* -----------------------second section-------------------------- */}

                </div>

                <div className='tableparet'>
                

                    <div class="nine">
                        <h1>Sales Target<span>Report</span></h1>
                    </div>
                    <table className="table table-sm">
                        <thead style={{ backgroundColor: '#cc0033', color: '#fff' }}>
                            <tr>
                                <th scope="col">Job Id</th>
                                <th scope="col">Sales Employee</th>
                                <th scope="col" >Target Count</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((val) => (
                                <tr>
                                    <td>{val.salesperson_job_id}</td>
                                    <td>{val.salesperson_name}</td>
                                    <td onClick={(e) => handleCount(e, val.salesperson_job_id)}>{val.customers.length}</td>

                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StoreAdminPannel