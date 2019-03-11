import styled from "styled-components";

const Container = styled.section`
    text-align: center;
    padding: 5px;
    .heading {
        font-size : ${props => props.size};
        font-weight: 200;
        color: #00377B
    }
`;

const Styled = {
    Container,
}
export default Styled;
