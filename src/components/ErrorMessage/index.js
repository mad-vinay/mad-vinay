import React from "react";
import Styled from './style';

const ErrorMessage = ({ message }) => (
    <Styled.Container>
        {message}
    </Styled.Container>
) 

export default ErrorMessage;