import React from "react";
import { PropTypes } from "prop-types";

import {connect} from 'react-redux';

import { Button } from "@material-ui/core";

import Page from "../../components/Page";
import Progress from "../../components/ProgressSteps";
import Title from "../../components/Title";
import Scanner from "../../components/Scanner";

const IdRearScanning = (props) => {
  
  const handleBackButton = () => {
    const { history } = props;
    // history.replace("/IdScanning");
    history.goBack();
  }
  const handleContinue = () => {
    const { history } = props;
    history.push("/SimScanning"); 
  }
  const {
    clearData,
    getRearIdDetails,
    idRearDetails,
    setProcessingStatus
  } = props;
  return (
    <Page
       pageTitle={"Cédula de Identidad"}
        logoPresent={false}
         backBtnPresent={true}
         handleBackButton={handleBackButton}>

      <Progress 
        count={5}
        currentItem={2} 
      />
      <Title title={"Captura la cara posterior"} size={"22px"}/>
      <Scanner
        btnText={"Captura cara posterior"}
        getImage={getRearIdDetails}
        data={idRearDetails}
        setProcessingStatus={setProcessingStatus}
        clearData={clearData}
        fileName={'idRear'}
      />
      <div style={{textAlign: "center", paddingBottom: '1rem'}}>
        <Button
          onClick={handleContinue}
          variant="contained"
          color="secondary">
            CONFIRMAR
        </Button>
      </div>      
    </Page>
  );}


const mapState = state => ({
  idRearDetails: state.idRearDetails,
})

const mapDispatch = (dispatch) => {
  return ({
    getRearIdDetails: (data) => dispatch.idRearDetails.getRearIdDetails(data),
    setProcessingStatus: (status) => dispatch.idRearDetails.setProcessingStatus(status),
    clearData: dispatch.idRearDetails.clearData,
  })
}

IdRearScanning.propTypes = {
  getRearIdDetails: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  setProcessingStatus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  idRearDetails: PropTypes.object.isRequired,
}

export default connect(mapState, mapDispatch)(IdRearScanning);