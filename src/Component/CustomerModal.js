import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerModal.css';

const CustomerMddal = (props) => {

    console.log('data', props.data);
    return (
        <div id='customer-modal-parent'>
            <Modal show={props.show} onHide={props.handleClose} backdrop={false} backdropClassName='modalblurr'>
                <Modal.Header closeButton>
                    {/* <i class="fa-solid fa-xmark"></i> */}
                    <Modal.Title style={{ fontSize: '15px !important' }}>
                        <span style={{textAlign:'center', color:'#563D7C', fontWeight:'bold'}}>Customer Data</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col" style={{width:'150px!important', padding:'0px 20px !important'}}>Sales Candidate</th>
                                <th scope="col">Product List</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>


                            {props?.data?.map((val) => (
                                <tr >
                                    <td>{val?.id}</td>
                                    <td>{val?.name}</td>
                                    <td>{val?.email}</td>
                                    <td>{val?.phone_number}</td>
                                    <td>{val?.salesperson_name}</td>
                                    <td>{val?.product_choice}</td>

                                    <td>{val?.description}</td>


                                </tr>
                            ))}


                        </tbody>
                    </table>



                </Modal.Body>

            </Modal>
        </div>
    )
}
export default CustomerMddal