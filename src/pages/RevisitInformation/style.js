import styled from 'styled-components';

const Content = styled.div`
padding: 1rem;

h3 {
    color: #00377B;
}
.payment {
    display: inline-block;
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
const SimDetails = styled.div`
    padding: 0.7rem 0rem;
    flex: 0.5;
`
const Details = styled.div`
    padding-bottom: 1rem;
span {
    color: #00377B;
}
`
const Payment = styled.div`
    text-align: right;
    padding-top: 0.9rem;
    padding-right: 0.9rem;
    flex: 0.5;
span {
    color: #00377B;
}
`
const SimWrapper = styled.div`
display: flex;
`
const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 10rem;
`

const Styled = {
    Content,
    Details,
    SimDetails,
    Payment,
    SimWrapper,
    ButtonWrapper
}
export default Styled;