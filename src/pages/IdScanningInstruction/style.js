import styled from 'styled-components';

const Content = styled.div`
align-items: center;
justify-content: center;
display: flex;
flex-direction: column;
color: #00377B;
padding: 1.5rem;
font-weight: 200;
h5 {
    margin-bottom: 0px;
    font-size: 0.87rem;    
}
p {
    margin-top: 0px;
    font-size: 0.87rem;
    text-align: center;
}
span {
    font-weight: 200;
    font-size: 0.97rem;
}
.imageWrapper {
    margin: 2.5rem 0rem;
}
.heading {
    font-size: 1.5rem;
    margin: 0;
    color: #00377B;
    font-weight: 2s00;
}
.subHeading {
    font-size: 14px;
    margin: 0;
    color: #00377B;
}
.MuiTypography-root-59 {
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
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
`
const Styled = {
    Content,
    Details,
    SimDetails,
    ButtonWrapper
}
export default Styled;