import React, { useEffect, useState } from 'react';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';


const chartSetting = {
    xAxis: [
        {
            label: '',
        },
    ],
    width: 500,
    height: 400,
};
const data = [{ month: 'Jan', value: 0 },
{ month: 'Jan', value: 0 },
{ month: 'Feb', value: 0 },
{ month: 'Mar', value: 0 },
{ month: 'Apr', value: 0 },
{ month: 'May', value: 0 },
{ month: 'Jun', value: 0 },
{ month: 'July', value: 0 },
{ month: 'Aug', value: 0 },
{ month: 'Sep', value: 0 },
{ month: 'Oct', value: 0 },
{ month: 'Nov', value: 0 },
{ month: 'Dec', value: 0 }

]
const DashboardChart = () => {
    const navigate = useNavigate()
    const [graphData, setGraphData] = useState(data)
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access)


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
    useEffect(() => {
        if (getStoreAdminToken) {
            axios({
                url: `http://13.200.89.3:8000/api/monthly-registration-count/`,
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`
                },
                method: 'get'
            }).then((result) => {
                const apiData = result?.data || {};

                const formattedData = Object.keys(apiData).map(month => ({
                    month: month.slice(0, 3), // Extract first three characters for Jan, Feb, etc.
                    value: apiData[month]
                }));

                setGraphData(formattedData);
            }).catch((error) => {
                redirectLogin(error)
            })
        }
    }, [getStoreAdminToken]);
    return (
        <>
            <Toaster />

            {/* <Paper elevation={3} style={{ padding: 0, marginBottom: 0, fontSize: '10px' }}>
                <Typography variant="h6" gutterBottom>
                </Typography>
                <ResponsiveContainer width="" height={300}>
                    <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Total Customer Count" fill="#4BA3DD" barSize={10} />
                    </BarChart>
                </ResponsiveContainer>
            </Paper> */}
            <div className="color-pilot-name-visitor" style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '1%' }}>
                <span className="dot" style={{ backgroundColor: '#4ba1dc' }}></span>&nbsp;
                <p style={{ fontSize: '13.5px', marginBottom: '0px', color: '#a6a6a6', fontWeight: '600' }}>Total Customer Count</p>
            </div>

            <BarChart
                dataset={graphData}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{
                    dataKey: 'value', label: 'Total Customer Count',
                    color: '#4ba1dc', width: '12px !important', height: '12px !important', borderRadius: '50%'
                }]}
                layout="horizontal"
                fill="#4ba1dc"
                {...chartSetting}
                margin={{ top: 50, right: 50, left: 80, bottom: 30 }}
            />

        </>
    )
}

export default DashboardChart