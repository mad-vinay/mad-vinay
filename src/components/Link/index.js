import React from "react";
import Styled from "./style";

const Link = ({ handleClick, label }) => {
    return (
        <Styled.Container onClick={handleClick}>{label}</Styled.Container>
    )
}

export default Link;
