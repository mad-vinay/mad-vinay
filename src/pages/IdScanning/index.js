import React from "react";
import { PropTypes } from "prop-types";
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

import Page from "../../components/Page";
import Progress from "../../components/ProgressSteps";
import ErrorMessage from '../../components/ErrorMessage';
import Title from "../../components/Title";
import Scanner from "../../components/Scanner";

import FormWrapper from "./style";



import {
  getFrontIdDetails,
  // loginAclearDataction,
  // setProcessingStatus,
  // updateData
} from "../../../src/actionCreators/auth";

import get from "lodash/get";

class IdScanning extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      data: {
        number: '',
        surname: '',
        dob: '',
      }
    }
  }
  static propTypes = {
    updateData: PropTypes.func.isRequired,
    getFrontIdDetails: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    setProcessingStatus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    idDetails: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    debugger
    this.setState({ data: { ...nextProps.idDetails.data.frontData } });
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleContinue = () => {
    const { history } = this.props;
    const {
      number,
      surname,
      dob,
    } = this.state.data;
    if (number && surname && dob) {
      history.push("/IdRearScanning");
    } else {
      this.setState({ message: 'Por favor ingrese todos los campos' });
    }
  }

  handleOnchange = (event) => {
    const { updateData } = this.props;
    const { target: { id, value } } = event;
    updateData({ [id]: value });
  }

  render() {
    const {
      clearData,
      getFrontIdDetails,
      idDetails,
      setProcessingStatus
    } = this.props;
    const { data } = this.state;
    const {
      number,
      surname,
      dob
    } = data;
    return (
      <Page
        pageTitle={"Cédula de Identidad"}
        logoPresent={false}
        backBtnPresent={true}
        handleBackButton={this.handleBackButton}>

        <Progress
          count={5}
          currentItem={2}
        />
        <Title title={"Captura la cara frontal"} size={"1.5rem"} />
        <Scanner
          btnText={"Captura cara frontal"}
          getImage={getFrontIdDetails}
          data={idDetails}
          setProcessingStatus={setProcessingStatus}
          clearData={clearData}
          fileName={'idFront'}
        />
        <FormWrapper>
          <ErrorMessage message={this.state.message}></ErrorMessage>
          <div className="inputFields">
            <div className="iconWrapper">
              <img
                src="../../../images/icn-document-number@3x.png"
                style={{ width: "2.1rem" }}
                alt="document number"
              />
            </div>
            <TextField
              onChange={this.handleOnchange}
              value={number}
              id="number"
              label="Numero del documento"
            />
          </div>
          <div className="inputFields">
            <div className="iconWrapper">
              <img
                src="../../../images/icn-name@3x.png"
                style={{ width: "2.1rem" }}
                alt="name"
              />
            </div>
            <TextField
              onChange={this.handleOnchange}
              value={surname}
              id="surname"
              label="Apellidos nombres"
            />
          </div>
          <div className="inputFields">
            <div className="iconWrapper">
              <img
                src="../../../images/icn-dob@3x.png"
                style={{ width: "2.1rem" }}
                alt="date of birth"
              />
            </div>
            <TextField
              onChange={this.handleOnchange}
              value={dob}
              id="dob"
              label="Fecha de nacimento"
            />
          </div>
          <Button
            className="confirmBtn"
            variant="contained"
            color="secondary"
            onClick={this.handleContinue}>
            CONFIRMAR
        </Button>
        </FormWrapper>
      </Page>
    );
  }
}

// const mapState = state => ({
//   idDetails: state.idDetails,
// })

// const mapDispatch = (dispatch) => {
//   return ({
//     getFrontIdDetails: (data) => dispatch.idDetails.getFrontIdDetails(data),
//     setProcessingStatus: (status) => dispatch.idDetails.setProcessingStatus(status),
//     clearData: dispatch.idDetails.clearData,
//     updateData: (data) => dispatch.idDetails.updateData(data),
//   })
// }

// export default connect(mapState, mapDispatch)(IdScanning);

export default connect(
  state => {
    return {
      // dmsid: get(state, "auth.dmsid") || "",
      // pin: get(state, "auth.pin") || "",
      // status: get(state, "auth.status"),
      idDetails: get(state, "idDetails")
    };
  },
  dispatch => {
    return {
      getFrontIdDetails: (data) => {
        return dispatch(getFrontIdDetails(data));
      },
      // setProcessingStatus: (status) => {
      //   return dispatch(setProcessingStatus(status));
      // },
      // clearData: () => {
      //   return dispatch(loginAclearDataction());
      // },
      // updateData: (data) => {
      //   return dispatch(updateData(data));
      // }
    };
  }
)(IdScanning);