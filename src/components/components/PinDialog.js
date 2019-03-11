import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { lightBlue200, indigo300 } from "material-ui/styles/colors";
import { onEnterAction } from "../../util";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import _ from 'lodash';

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 18px;
  img {
    display: block;
    margin-bottom: -23px;
    margin-right: 10px;
    margin-left: -30px;
  }
`;

export default class PinDialog extends Component {
  constructor(props) {
    super(props);
    if (props.open) {
      this.bodyToggleFix(true);
    }
    this.mainActionHandler =  this.mainActionHandler.bind(this);
    this.closeHandler =  this.closeHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.bodyToggleFix(true);
    } else {
      this.bodyToggleFix(false);
    }
  }
  componentWillUnmount() {
    this.bodyToggleFix(false);
  }

  closeHandler = _.debounce(() => {
    this.props.handleClose;
  }, 500);

  mainActionHandler = _.debounce(() => {
    this.props.handleMainAction();
  }, 500);

  bodyToggleFix(isFixed) {
    const action = isFixed ? "add" : "remove";
    document.body.classList[action]("position-fixed");
  }
  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        className="center"
        contentStyle={{ transform: "translate(0px, 16px)" }}
        autoDetectWindowHeight={false}
      >
        <h2 className="light text-primary">Ingresa tu PIN:</h2>
        <div className="masked-input">
          <InputWrap>
            <img src="/images/icn-password.png" alt="" />
            <TextField
              underlineFocusStyle={{ borderColor: lightBlue200 }}
              floatingLabelStyle={{ color: indigo300 }}
              floatingLabelText="PIN"
              type="tel"
              pattern="[0-9]*"
              value={this.props.pin}
              onChange={this.props.onPinChange}
              onKeyDown={onEnterAction(() => {
                if (this.props.pin.trim() !== "") {
                  this.mainActionHandler();
                }
              })}
            />
          </InputWrap>
        </div>
        <div className="mt2">
          <RaisedButton
            label="Continuar"
            secondary={true}
            disabledBackgroundColor="#CAF1F6"
            disabledLabelColor="#FFF"
            disabled={this.props.pin.trim() === ""}
            onClick={() => {
              this.mainActionHandler();
            }}
          />
          <br />
          <FlatButton
            label="Cancelar"
            secondary={true}
            onClick={ () => {
              this.closeHandler();
            }}
          />
        </div>
      </Dialog>
    );
  }
}
