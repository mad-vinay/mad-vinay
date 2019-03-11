import styled from "styled-components";

const Container = styled.div`
    min-height: 100vh;
    background: #00377B;
    padding: 10px;
    flex-direction: column;
    display: flex;
    .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px;
    }
    .tick {
        background: url("../images/icn-sucess-green@3x.png") no-repeat center;
        background-size: contain;
        width: 40px;
        height: 50px;
    }
    .text {
        font-weight: 400;
        font-size: 2rem;
        color: #ffffff;
        text-align: center;
        margin: 5px;
        padding-bottom: 1rem;
    }
    .divider {
        background: #e8dfdf38;
    }
    .content {
        padding: 20px;
        flex:1;
        text-align: center;
    }
    .details {
        font-size: 0.9rem;
        color: #e8dfdf38
    }
    .footer {
        margin-top: 1rem;
    }

`;

const Styled = {
    Container,
}
export default Styled;