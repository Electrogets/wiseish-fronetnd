import React, { useState } from 'react';
// import './Sidebar.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa';
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
const Sidebar = () => {
    const [selectedDate, setDate] = useState(null)// for select calender
    const [showSidebar, setShowSidebar] = useState(false)
    const handleToggle = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div>

            <div className="wrapper">

                <nav id="sidebar" className={showSidebar ? 'active' : ''}>
                    <div className="sidebar-header">
                        <h3><img src='img/logoWish.png' style={{ width: '150px', height: 'auto' }} /></h3>
                    </div>

                    <ul className="list-unstyled components">

                        <li className="active">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fa-solid fa-clapperboard"></i> &nbsp; Dashboard</a>
                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <a href="#"><i className="fa-solid fa-users"></i> &nbsp; People</a>
                                </li>
                                <li>
                                    <a href="#">Chart</a>
                                </li>
                                <li>
                                    <a href="#">Task Board</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="fa-solid fa-users"></i> &nbsp; People</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa-solid fa-bars-progress"></i> &nbsp; Chart</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa-solid fa-bars-progress"></i> &nbsp; Task Board</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa-solid fa-circle-question"></i> &nbsp; Support</a>
                        </li>
                    </ul>

                    <div className='owlimg'>
                        <ul><p style={{ fontSize: '18px' }}> Hi, User</p><img src='img/profile.jpeg' style={{ width: '100px', height: 'auto' }} /><br /></ul>
                        <img src='img/owl2.jpeg' style={{ width: '200px', height: 'auto', marginTop: '-25   px' }} />
                    </div>

                    <ul className="list-unstyled CTAs">

                        <li>
                            <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article"><i className="fa-solid fa-right-from-bracket"></i>&nbsp; Log out</a>
                        </li>
                    </ul>
                </nav>


                <div id="content">

                    {/* --------------------------fisrt section of dashboard---------------------------------- */}
                    <div className='fisrtSectionHeader'>
                        <div className='box-1'>
                            <ul>
                                <li>Home &nbsp;<span><i className="fa-solid fa-arrow-right"></i></span><span>&nbsp; Admin Dashboard</span></li>
                                <h4 className='headingAdminDashbord'>Admin Dashboard</h4>
                            </ul>
                        </div>

                        <div className='box-2'>
                            <div className='parent-profileName'>
                                <img src='img/profileimg.png' style={{ width: '45px', height: 'auto' }} />
                                <p>Hi, user</p>
                            </div>

                            {/* -------------search filter date header---------------------- */}
                            <label><DatePicker selected={selectedDate} onChange={date => setDate(date)} customInput={<CustomInput />} /></label>
                            {/* -------------------search filter date header end--------------------- */}
                        </div>

                    </div>
                    {/* -----------------------------------first section end----------------------------------------------------- */}

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container">

                            <button type="button" id="sidebarCollapse" onClick={handleToggle} className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span></span>
                            </button>
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>
                            <div className='dashboard-right-main'>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        <div className="profile-login-dashbaord">
                                            <p> <img src='img/profileimg.png' style={{ width: '40px', height: 'auto' }} />&nbsp;<span>Hi, user</span></p>
                                        </div>
                                        {/* <li class="nav-item">
                                        <a class="nav-link" href="#">Page</a>
                                    </li> */}

                                    </ul>

                                </div>
                            </div>
                        </div>
                    </nav>


                    <div className="line"></div>

                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div className="line"></div>

                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                </div>
            </div>


        </div>
    )
}

export default Sidebar