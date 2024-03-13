import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#4BA1DC', '#8299DD'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="middle">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Example = () => {
    const navigate = useNavigate()
    const [shopper, setShopper] = useState([]);
    const getStoreAdminToken = useSelector((state) => state?.storeAdminLogin?.storeAdmin.access);

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
    const handleShopper = () => {
        if (getStoreAdminToken) {
            axios({
                url: 'http://13.200.89.3:8000/sales-representative-percentage-visit-count/',
                data: {},
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`,
                },
                method: 'get',
            }).then((result) => {
                console.log('shoppers', result.data);
                setShopper([
                    { name: 'Shoppers', value: result.data.total_shoppers_percentage },
                    { name: 'Visitors', value: result.data.total_visitors_percentage },
                ]);
            }).catch((error) => {
                // console.error('Error fetching data:', error);
                redirectLogin(error)
            });
        }
    };

    useEffect(() => {
        // Fetch shopper data on component mount
        handleShopper();
    }, []); // Empty dependency array ensures the effect runs once on mount

    const handleExcel = () => {
        // Handle Excel export logic
    };

    return (
        <>
            <Toaster />

            <ResponsiveContainer width="100%" height="100%" className="pie-chart-parent" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div className="title-customerdata-exportbtn color-pilot-name-customer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ textAlign: 'left', }}>Shoppers and Visitors</h5>
                    {/* <button className="customer-data-btn-download" onClick={() => handleExcel()}>
                    Export CVS
                </button> */}
                </div>
                <br />
                <div className="color-pilot-name-customer" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span className="dot" style={{ display: 'flex', justifyContent: 'flex-start' }}></span>&nbsp;
                    <p style={{ fontSize: '13.5px', marginBottom: '0px', color: '#a6a6a6', fontWeight: '600' }} onClick={handleShopper}>
                        Shoppers
                    </p>
                </div>
                <div className="color-pilot-name-visitor" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span className="dot" style={{ backgroundColor: '#8299DD' }}></span>&nbsp;
                    <p style={{ fontSize: '13.5px', marginBottom: '0px', color: '#a6a6a6', fontWeight: '600' }}>Visitors</p>
                </div>
                <PieChart width={300} height={300}>
                    <Pie
                        data={shopper}
                        cx={150}
                        cy={150}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {shopper.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default Example;
