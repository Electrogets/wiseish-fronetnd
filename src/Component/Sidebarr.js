import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiPresentationFill } from "react-icons/ri";
import { actionCreators as salesToken } from '../Store/SalesAuthToken/StoreAdminAction';
import { actionCreators as adminToken } from '../Store/StoreAdminAuth/StoreAdminAction';
import { actionCreators } from '../Store/SidebarComponent/SidebarAction';

const Sidebar = (props) => {
  const salesPersonName = useSelector(state => state.salesToken.customerName)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showSalesModal, setShowSalesModal] = useState(false)
  const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access)
  const getSalesTokenByStore = useSelector(state => state?.salesToken?.salestoken?.access)
  const getToggleSidebar = useSelector(state => state.toggle.sidebarToggle)
  const [salesSidebar, setSalesSidebar] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const sidebarType = useSelector(state => state.toggle.sidebarType)
  let handleToggle = () => {
    console.log("clicked")
    setShowSidebar(!showSidebar)
  }
  const handleLogout = () => {
    if (sidebarType === 'owner') {
      dispatch(adminToken.masterStoreAdmin())
      navigate('/')
    }
    // else {
    //   dispatch(salesToken.salesToken())
    //   navigate('/sales-login')
    // }
  }
  const handleAddSales = () => {

  }
  const size = useRef(window.innerWidth)
  console.log('size', size);

  const handleDashboard = (e, value) => {
    dispatch(actionCreators.SidebarToggle(false))
    navigate(value)

  }
  return (
    <>
      {/* <!-- Dashbaord left Sidebar section   --> */}

      <aside class={`left-sidebar ${getToggleSidebar ? 'active' : ''}`}>
        <span class="toggle-icon-dashboard d-none" onClick={handleToggle}><i class="bi bi-list"></i></span>
        <div class={`sidebar-top `}>
          <img src="img/logo.jpeg" alt="" class="img-fluid" />
          <menu>
            <ul className="list-unstyled ">
              <li className="active">
                <div
                  onClick={(e) => handleDashboard(e, '/admin')} style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-clapperboard" style={{ color: '#4ba3dd' }}></i> <span class="list">&nbsp; Dashboard</span>
                </div>
              </li>
              <li>
                <div onClick={(e) => handleDashboard(e, '/sales-data')} style={{ cursor: 'pointer' }}>
                  <RiPresentationFill style={{ color: '#4ba3dd' }} /><span class="list">&nbsp; Sales Representative</span>
                </div>
              </li>
              <li>
                <div onClick={(e) => handleDashboard(e, '/customer-data')} style={{ cursor: 'pointer' }}><i class="fa-solid fa-eye" style={{ color: '#4ba3dd' }}></i>&nbsp;<span class="list">&nbsp;Customer Data</span></div>
              </li>

              {/* 
              <li className="active">
                <a
                  href="#homeSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  <i class="bi bi-people-fill"></i> &nbsp; <span class="list">People</span>
                </a>

                <ul className="collapse list-unstyled pt-2 pl-2" id="homeSubmenu">
                  <li>

                    <li>
                      <Link to="/sales-data">
                        <RiPresentationFill />&nbsp;<span class="list"> Sales Representative</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/customer-data"><i class="fa-solid fa-eye"></i>&nbsp;<span class="list">View customer</span></Link>
                    </li>



                  </li>

                </ul>
                
              </li> */}





              {/* <li>
                <a href="#">
                  <i class="bi bi-bar-chart"></i>&nbsp; <span class="list">Charts</span>
                </a>
              </li> */}
              {/* <li>
                <a href="#">
                  <i class="bi bi-journal-text"></i>&nbsp;  <span class="list">Task Board</span>

                </a>
              </li> */}
              {/* <li>
                <a href="#">
                  <i class="bi bi-chat-dots"></i>&nbsp;<span class="list">Support</span>
                </a>
              </li> */}
            </ul>
          </menu>
        </div>


        <div class="sidebar-bottom">
          <div className='owlimg'>
            {/* <ul style={{ paddingLeft: '0px !important' }}><p style={{ fontSize: '14px', position: 'relative', top: '38px' }}> Hi, {salesPersonName}</p>
              <img className="message-sidebar" src='img/Message.png' style={{ width: '150px', height: 'auto' }} />
            </ul> */}
            <img src='img/OWL.png' style={{ height: 'auto' }} />
          </div>
          <img src="images/sidebar-main-img.png" alt="" class="img-fluid" />
          {/* <button className="main-btn btn" onClick={() => handleLogout()}>Logout</button> */}
        </div>
      </aside>
      {/* <!-- Dashbaord Right Sidebar section   --> */}
    </>
  );
};

export default Sidebar;
