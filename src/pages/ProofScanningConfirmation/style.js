import styled from 'styled-components';

const Content = styled.div`

h3 {
    color: #00377B;
}
span {
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
    display: inline-block;
    padding: 0.7rem 0rem;
`
const Details = styled.div`
    padding-bottom: 1rem;
`
const Styled = {
    Content,
    Details,
    SimDetails
}
export default Styled;