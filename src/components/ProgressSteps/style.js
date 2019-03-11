import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #d8d8d8;
  background: #fff;

  .lineItem {
      width: 100%;
      height: 1px;
      background: #4cc5f2;
      display: inline-block;
      max-width: 50px;
  }
`;

const Circle = styled.span`
    width: 12px;
    height: 12px;
    border: 1px solid #00377b;
    border-radius: 50%;
    background: ${props => props.index < props.currentItem ? "#00377b" : "#fff"};
    display: inline-block;
`

const Styled = {
    Container,
    Circle,
}
export default Styled;
