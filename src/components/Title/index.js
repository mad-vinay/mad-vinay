import React from "react";
import Styled from "./style";

const Title = ({title, size = "16px" }) => (
    <Styled.Container size={size}>
        <h1 className="heading">{title}</h1>
    </Styled.Container>
)

export default Title;