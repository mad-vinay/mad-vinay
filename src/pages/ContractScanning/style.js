import styled from "styled-components";

const FormWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px 5px;
    .inputFields {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    .iconWrapper {
        padding: 5px;
    }
    .confirmBtn {
        margin-top: 15px;
    }
`;

export default FormWrapper;