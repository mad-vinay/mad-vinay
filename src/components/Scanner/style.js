import styled from "styled-components";
import MediaQuery from '../../themes/mediaQuery';
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0.3rem 1rem 0rem 1rem;

  video::-webkit-media-controls {
    display: none;
  }
  .video {
    border: 1px dashed green;
    border-radius: 8px;
    display: block;
    object-fit: fill;
  }
  .videoContainer {
    width: 100%;
    height: 337px;
    max-width: 450px;
  }

  @media ${MediaQuery.device.mobile} {
    .videoContainer {
      width: 100%;
      height: 450px;
      max-width: 337px;
    }
  }

  .video {
    width: 100%;
    height: 100%;
  }
  .btnContainer {
    padding: 1.6rem;
    padding-bottom: 1rem;
  }
  .canvas {
    display: none;
  }
  .progress {
    color: #4cc5f2;
  }
`;

const Styled = {
  Container,
}

export default Styled;