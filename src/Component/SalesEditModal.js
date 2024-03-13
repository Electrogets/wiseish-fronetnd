import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SalesEditModal = (props) => {
    const [data, setDate] = useState(props?.data)
    const getStoreAdminToken = useSelector(state => state?.storeAdminLogin?.storeAdmin.access)

    const handleInput = (e) => {
        setDate({
            ...data, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        axios({
            url: 'http://13.200.89.3:8000/salesperson/update/',
            data: {
                "email": data.email ? data.email : props.data.email,
                "name": data.name ? data.name : props.data.name
            },
            headers: {
                Authorization: `Bearer ${getStoreAdminToken}`
            },
            method: 'put'
        }).then((result) => {
            console.log('result', result.data);
            props.close()
            props.fetch()
        })
    }
    return (
        <>


            {/* <!-- Modal --> */}

            <div style={{ display: 'block' }} class="modal fade show" id="exampleModal" tabindex="-1"
                role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content show">

                        <div class="modal-body">

                            <div class="form-outline mb-4">
                                <input type="text" id="name" name='name' class="form-control" onChange={(e) => handleInput(e)} placeholder='Name' />
                            </div>




                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => props.close()}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => handleSubmit()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
        </>
    )
}

export default SalesEditModal