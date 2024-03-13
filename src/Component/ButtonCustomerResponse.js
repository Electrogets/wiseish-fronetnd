import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    // transform:translate(-50%,-50%);
    margin:20px;
    padding:10px 15px;
    text-transform:capitalize;
    background-color:#cc0033;
    outline:none;
    color:#fff;
    &:hover{
        cursor:pointer;
    }  
`;

const Button = (props) => {

    return <StyledButton onClick={props.openModal} className='customerfeedbackModalbtn'>Consumer Equiry</StyledButton>
}

export default Button;