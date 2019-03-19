import React, {
  Component
} from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from "../Link/index";
import ErrorMessage from "../ErrorMessage";

import Styled from "./style";

import { convertDataToFile } from '../../utils/utils';

const videoConstraints = {
    facingMode: "environment",
}

const constraints = {
  video: videoConstraints,
  audio: false
};


class Scanner extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvas = React.createRef();
    this.img = React.createRef();
    this.state = {
        videoVisible : true,
        imageVisible : false,
    }
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      this.video.current.srcObject = stream;
    }).catch(err => {
      
    });
  }

  componentWillUnmount() {
    this.props.clearData();
  }  

  removeCurrentPhoto = () => {
    this.props.clearData();
    this.setState({
      videoVisible : true,
      imageVisible : false
    })
  }

  handleClick = async () => {
    // this.props.setProcessingStatus(true);
    let videoPlayer = this.video.current;
    let canvas = this.canvas.current;
    let image = this.img.current;
    let context = canvas.getContext('2d');
    let ratio = videoPlayer.videoWidth / videoPlayer.videoHeight
    let width = videoPlayer.videoWidth - 100;
    let height = parseInt(width/ratio, 10);
    let url;
    canvas.width = width;
    canvas.height = height;

    context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
    url = canvas.toDataURL("image/jpeg", 1.0);
    image.src = this.props.url || url;
    this.setState({
        videoVisible: false,
        imageVisible: true
    });
    convertDataToFile(url, this.props.fileName, this.props.getImage);
  }

  render() {
      let {videoVisible, imageVisible} = this.state;
      let {btnText, data} = this.props;
      let isProcessing =false;
    return (
      <Styled.Container>
        {
          this.props.data && this.props.data.error.has && 
          <ErrorMessage message={this.props.data.error.message}></ErrorMessage>
        }
        <div className="videoContainer">
          <video 
            className="video"
            autoPlay ref={this.video}
            style={{display: videoVisible ? "block" : "none"}}
            />
          <img
            className="video"
            src=""
            ref={this.img}
            alt="scannedImg"
            style={{display: imageVisible ? "block" : "none"}}
          />
        </div>
        <div className="btnContainer">
          {(videoVisible || isProcessing) &&
            <Button
              variant="contained"
              disabled={isProcessing}
              color="secondary"
              onClick={this.handleClick}
            >
              {btnText}
            </Button>
          }
          {imageVisible && !isProcessing &&
            <Link label={"RETOMAR FOTO"} handleClick={() => this.removeCurrentPhoto()}/>
          }
        </div>
        {isProcessing && <CircularProgress size={30} className="progress"/>}
        <canvas className="canvas" ref={this.canvas}></canvas>
      </Styled.Container>
    );
  }
}

export default Scanner;
