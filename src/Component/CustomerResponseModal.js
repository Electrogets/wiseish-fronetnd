import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import './CustomerResModal.css';


const Modal = ({ clickhandler, isOpen, onChange, value }) => {
    console.log('modal');
    return (
        <AnimatePresence>
            {
                isOpen
                    ? (
                        <StyledDiv className="Modal customerfeedback" variants={variant} initial='containerInitial' animate='containerAnimate' exit='containerExit'>
                            <motion.div variants={modalVariant} initial='initial' animate='animate' exit='initial'>
                            <div class="form-group"  >
                            <textarea value={value} name="description" onChange={(e)=>onChange(e)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                            </motion.div>
                            <button onClick={clickhandler} className='closeModall'><i class="fa-solid fa-xmark"></i></button>
                        </StyledDiv>
                    )
                    : null
            }
        </AnimatePresence>
    );
}

const StyledDiv = styled(motion.div)`
    height:100%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color: rgba(0,0,0,.8);
    position:relative;
    &>div{
        height:max(50%,300px);
        width:max(50%,400px);
        background-color:#F0EFFF;
        border-radius:10px;
        padding:10px;
        box-shadow:0 0 15px #f0e9d6;
        display:flex;
        align-items:center;
        justify-content:center;
        &>ul{
            list-style:none;
            font-size:60px;
        }
    }
    &>button{
        position:absolute;
        top:0;
        right:0;
        margin:20px;
        padding:10px 15px;
        text-transform:capitalize;
        &:hover{
            cursor:pointer;
        }
       
        border-radius:10px;
    }
`;

const variant = {
    containerInitial: {
        opacity: 0
    },
    containerAnimate: {
        opacity: 1
    },
    containerExit: {
        opacity: 0,
        transition: {
            delay: .8
        }
    }
};

const modalVariant = {
    initial: {
        opacity: 0,
        y: 50,
        transition: {
            type: 'spring',
            duration: .5,
            mass: 2,
            damping: 10,
            delay: .4
        }
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            duration: .5,
            mass: 2,
            damping: 10,
            delay: .2
        }
    },
}

const emojiVariant = {
    initial: {
        y: -30,
        opacity: 0,
        transition: {
            type: 'spring',
            duration: .5,
            mass: 2,
            damping: 10
        }
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: .5,
            mass: 2,
            damping: 10,
            delay: .4
        }
    }
}


export default Modal;