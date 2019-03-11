import React from "react";

import Divider from '@material-ui/core/Divider';

import Styled from "./style";

const Success = ({title, renderFooter, renderContent}) => {
    return (
        <Styled.Container>
            <section className="title">
                <span className="tick"></span>
                <h2 className="text">{title}</h2>
            </section>
            <Divider className="divider"/>
            <section className="content">
                {renderContent()}
            </section>
            <Divider className="divider" />
            <section style={{marginTop: '1rem'}}>
                {renderFooter()}
            </section>
        </Styled.Container>
    )
}
export default Success;