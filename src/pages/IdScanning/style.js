import styled from "styled-components";

const FormWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 5px;
    color: #00377B;
    .inputFields {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .iconWrapper {
        padding: 5px;
    }
    .confirmBtn {
        margin: 1rem 0rem;
    }
`;

export default FormWrapper;