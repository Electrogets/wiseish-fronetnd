import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { BarChart } from '@mui/x-charts/BarChart';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ProgressBar = () => {
    const navigate = useNavigate()
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin?.access)
    const [salesPerformanceData, setSalesPerformanceData] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [allData, setAllData] = useState([])
    const [storeData, setStoreData] = useState();
    const [salesPerformance, setSalesPerformance] = useState({
        name: ['A'], visitors: [1],
        shoppers: [1]
    })

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
                const data = { name: [], shoppers: [], visitors: [] }
                result.data.forEach((val) => {
                    data.name.push(val.salesperson_name)
                    data.shoppers.push(val.total_shoppers_count)
                    data.visitors.push(val.total_visitors_count)
                })
                setAllData(data)
                setSalesPerformance({
                    name: data.name.slice(0, 10),
                    shoppers: data?.shoppers?.slice(0, 10),
                    visitors: data?.visitors?.slice(0, 10)

                })
                // setSalesPerformance(data.slice(0, 10))
                setNumberOfPages(Math.ceil(result?.data?.length / 10))
            }).catch((error) => {
                redirectLogin(error)
            })
        }
    }, [])

    const handlePageClick = async (data1) => {
        console.log('click');
        console.log('pagecount3', data1.selected);
        const data = {
            name: allData.name.slice(data1.selected * 10, (data1.selected + 1) * 10),
            visitors: allData?.visitors?.slice(data1.selected * 10, (data1.selected + 1) * 10),
            shoppers: allData?.visitors?.slice(data1.selected * 10, (data1.selected + 1) * 10)
        }
        setSalesPerformance(data)
        // setStoreData(data.slice(0, 4))
        // setNumberOfPages(Math.ceil(data.length / 10))
    };

    const calculateWidth = (a, b) => {
        if (a === 0 && b === 0) {
            return '0%'
        }
        const result = (a * 100) / (a + b)
        return `${result}%`
    }
    return (
        <>
            <Toaster />

            <div className='parent-div-progressbar' >
                <BarChart
                    xAxis={[{ scaleType: 'band', data: salesPerformance.name }]}
                    series={[{ data: salesPerformance.shoppers, color: '#4ba3dd', barWidth: 20 }, { data: salesPerformance.visitors, color: '#8299dd', barWidth: 20, }]}
                    width={900}
                    height={300}
                />

                <div className='parent-color-pillet-perform'>
                    <div className="color-pilot-name-customer">
                        <span className="dot"></span>&nbsp;
                        <p style={{ fontSize: '13.5px', marginBottom: '0px', color: '#a6a6a6', fontWeight: '600' }} >
                            Shoppers &nbsp;
                        </p>
                    </div>
                    <div className="color-pilot-name-visitor">
                        <span className="dot" style={{ backgroundColor: '#8299dd' }}></span>&nbsp;
                        <p style={{ fontSize: '13.5px', marginBottom: '0px', color: '#a6a6a6', fontWeight: '600' }} >
                            Visitors

                        </p>
                    </div>
                </div>

                <ReactPaginate
                    previousLabel={<i style={{ color: '#6e46c9' }} className="fas fa-angle-left"></i>}
                    nextLabel={<i style={{ color: '#6e46c9' }} className="fas fa-angle-right"></i>}
                    breakLabel={'...'}
                    pageCount={numberOfPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />

            </div >
        </>
    )
}

export default ProgressBar