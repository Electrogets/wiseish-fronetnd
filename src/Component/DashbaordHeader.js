import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../Store/SidebarComponent/SidebarAction';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { DateRange } from 'react-date-range';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import "rsuite/dist/rsuite.css";
import { DateRangePicker } from 'rsuite';
import { actionCreators as dateAction } from '../Store/DateRange/DateRangeAction';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import { actionCreators as LoginLogout } from '../Store/LoginLogout/LoginLogoutAction';
import { actionCreators as LoginLogoutActionCreators } from '../Store/LoginLogout/LoginLogoutAction';
import { FaRegBell } from "react-icons/fa6";
import Notification from './Notification';


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

const DashbaordHeader = (props) => {
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access)
    const navigate = useNavigate()
    const { allowedRange } = DateRangePicker
    const { handleDateRangeChange, handleTodayFilter } = props;

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const dispatch = useDispatch()

    const [ranges, setRanges] = useState([])

    const salesPersonName = useSelector(state => state.salesToken.customerName)

    const getToggleSidebar = useSelector(state => state.toggle.sidebarToggle)
    const getStartTime = useSelector(state => state.dateRange.StartDate)
    const isLoggedIn = useSelector(state => state.LoginLogout.isLoggedIn)
    const userName = useSelector(state => state.LoginLogout.userName)

    console.log(props);
    const [selectedDate, setDate] = useState([])// for select calender
    console.log('date', selectedDate);

    const handleDate = (date) => {
        setDate(date);

        const startDate = moment(date[0]).startOf('day').toDate();
        const endDate = moment(date[1]).endOf('day').toDate();

        const today = new Date();
        const todayStart = moment(today).startOf('day').toDate();
        const todayEnd = moment(today).endOf('day').toDate();

        const date1 = moment(startDate).format('yyyy-MM-D');
        const date2 = moment(endDate).format('yyyy-MM-D');

        if (moment(todayStart).isSameOrBefore(startDate) && moment(todayEnd).isSameOrAfter(endDate)) {
            // Fetch data for today
            const todayDate1 = moment(todayStart).format('yyyy-MM-D');
            const todayDate2 = moment(todayEnd).format('yyyy-MM-D');
            handleDateRangeChange(todayDate1, todayDate2);
            dateAction.dateRangeFilter({ date1: todayDate1, date2: todayDate2 });
        } else {
            // Fetch data for the selected date range
            handleDateRangeChange(date1, date2);
            dateAction.dateRangeFilter({ date1, date2 });
        }
    }
    const handleData = () => {
        dispatch(actionCreators.SidebarToggle(!getToggleSidebar))
    }
    const handleShortcut = (range, event) => {
        console.log('rangeevent', range, event);
        handleDate(range.value)
        if (range.label === 'today') {
            handleTodayFilter();
        } else {
            handleDateRangeChange(range.value[0], range.value[1]);
        }
    }
    console.log('selectedDate', selectedDate);

    useEffect(() => {
        setDate([new Date(getStartTime), new Date()])
        console.log('getstarttime', getStartTime);
        setRanges([
            {
                label: 'today',
                value: [startOfDay(new Date()), endOfDay(new Date())]
            },
            {
                label: 'yesterday',
                value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
            },
            {
                label: 'last7Days',
                value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
            },
            {
                label: 'All Time',
                value: [startOfDay(new Date(getStartTime)), endOfDay(new Date())]
            }
        ])
    }, [getStartTime])
    const handleLogout = () => {
        // dispatch(LoginLogout.setLogout())
        dispatch(LoginLogoutActionCreators.setLogoutUser());
        navigate('/')
    }

    return (
        <>
            <header>
                {/* <span class="toggle-icon-dashboard" ><i class="bi bi-list"></i></span> */}
                <div class="top-bar">
                    <div class="top-left">
                        <div class="breadcrumb mb-0">
                            <ul class={`list-unstyled ${getToggleSidebar ? 'toggle-margin' : ''}`} >
                                <li onClick={(e) => handleData(e)}><a className='toggle-header'> <RxHamburgerMenu /></a></li>
                                <li><Link to="/admin">Home</Link><IoIosArrowForward /></li>
                                <li><Link to="/admin">Admin</Link></li>
                            </ul>
                        </div>
                        <h4 className="page-title mb-0">Admin Dashboard</h4>
                    </div>
                    <div className="top-right" style={{ textAlign: 'center' }}>
                        {/* -------------search filter date header---------------------- */}
                        {(window.location.pathname === '/customer-data') && <label><DateRangePicker showOneCalendar={true} ranges={ranges} shouldDisableDate={allowedRange(new Date(getStartTime), new Date())} value={selectedDate}
                            onOk={date => handleDate(date)} onShortcutClick={(range, event) => handleShortcut(range, event)} customInput={<CustomInput />}
                            appearance="default" placeholder="Select From & To Date" style={{ width: 230, height: 'auto', left: '805.292px!important' }} /></label>}
                        {/* -------------------search filter date header end--------------------- */}
                        {/* <label><DateRange
                            editableDateInputs={true}
                            onChange={item => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            onShortcutClick={(range, event) => handleShortcut(range, event)} customInput={<CustomInput />}
                            appearance="default" placeholder="Select From & To Date" style={{ width: 230, height: 'auto' }} /></label> */}
                        <div class="avatar-wrap">
                            <img
                                src="https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg"
                                alt=""
                                class="avatar-img"
                            />&nbsp; &nbsp;
                            <span class="user-name">Hello {salesPersonName}</span>
                            <button className="btn-logout-admindashboard" onClick={(e) => handleLogout(e)} >Logout</button>
                        </div>

                        {/*notification bell icon  */}
                        <div className='notification-bell' style={{ marginTop: '9px' }}>
                            <FaRegBell style={{ fontWeight: '900' }} />
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}
export default DashbaordHeader;