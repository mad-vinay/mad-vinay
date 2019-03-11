import React from "react";
import Styled from "./style";

const MenuItem = ({ 
    title,
    iconSrc,
    handleOnClick
}) => (
    <Styled.Container onClick={handleOnClick}>
        <img src={iconSrc} className="MenuItemIcon" alt="icon" />
        <span className="title">{title}</span>
        <span className="arrowRight"></span>
    </Styled.Container>
) 

export default MenuItem;