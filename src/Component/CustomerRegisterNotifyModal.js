import React from 'react'

const CustomerRegisterNotifyModal = (props) => {
    const handleSubmit = () => {
        props.handleSubmit()
        props.handleClose()
    }
    const handleCancel = () => {
        props.handleClose()
    }
    return (
        <>
            <div class="modal show" tabindex="-1" role="dialog" style={{ display: 'block' }}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Are you sure to submit?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>You want to submit following data</p>
                            {/* <div>

                                <div>{props.customerRegister.name}</div>
                                <div>{props.customerRegister.email}</div>
                                <div>{props.customerRegister.phone_number}</div>
                                <div>{props.selectProduct}</div>
                                <div>{props.customerRegister.description}</div>
                                <div>{props.salesPersonName}</div>
                                <div>{props.optionShopping}</div>

                            </div> */}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => handleCancel()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerRegisterNotifyModal