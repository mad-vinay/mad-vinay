import styled from 'styled-components';

const Container = styled.div`
    padding: 0.6rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 0.9rem;
        color: #00377B;
        flex: 1;
        padding-left: 10px;
    }
    .arrowRight {
        background: url("../images/icn-arrowright-on@3x.png") no-repeat center;
        background-size: contain;
        display: inline-block;
        width: 30px;
        height: 30px;
    }
    .MenuItemIcon {
        max-width: 40px;
    }
    .heading {
        font-size: 15px;
        margin: 0;
        color: #00377B;
        font-weight: 800;
    }
    .subHeading {
        font-size: 14px;
        margin: 0;
        color: #00377B;
    }
    `;

const Styled = {
    Container,
}

export default Styled;