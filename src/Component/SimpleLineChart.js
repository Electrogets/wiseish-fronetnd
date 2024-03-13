import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const uData = [120, 210, 230, 0, 0, 0, 20, 2, 0, 20, 0, 0];
const pData = [10, 130, 0, 20, 0, 0, 0, 20, 0, 30, 0, 0];
const xLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novermber',
    'December'
];

const SimpleLineChart = () => {
    const [salesPerformance, setSalesPerformance] = useState([{
        name: 'A', visitors: 1, shoppers: 1
    }])
    const [salesPerformanceData, setSalesPerformanceData] = useState([])
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access)

    useEffect(() => {
        if (getStoreAdminToken) {
            console.log('salestoken', getStoreAdminToken);
            axios({
                url: `https://thewiseowl.pythonanywhere.com/sales-representative-visit-count/`,
                data: {

                },
                headers: {
                    Authorization: `Bearer ${getStoreAdminToken}`
                },
                method: 'get'
            }).then((result) => {
                console.log('salesperformance', result.data);
                const data = result.data.map((val) => {
                    return { name: val.salesperson_name, visitors: val.visitor_count, shoppers: val.shopping_count, total: val.shopping_count + val.visitor_count }
                })
                const data1 = result.data.map((val) => {
                    return val.shopping_count + val.visitor_count
                })
                console.log('line chart', data, data1);
                setSalesPerformance(data)
                setSalesPerformanceData(data1)
            })
        }
    }, [])
    return (
        <div className='main-simpleline-chart' >

            <ResponsiveContainer width="100%" height="">
                <LineChart
                    width={''}
                    height={''}
                    data={salesPerformance}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis scale={5} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                    <Line type="monotone" dataKey="shoppers" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default SimpleLineChart