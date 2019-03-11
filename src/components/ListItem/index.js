import React from "react";
import Styled from "../MenuItem/style";

const ListItem = ({
    text,
    description,
    handleOnClick
}) => (
    <Styled.Container onClick={handleOnClick}>
        <div>
            <p className="heading">{text}</p>
            <p className="subHeading">{description}</p>
        </div>
        <span className="arrowRight"></span>
    </Styled.Container>
)

export default ListItem;