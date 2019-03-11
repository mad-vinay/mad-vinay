import React, {
  Component
} from "react";
import { PropTypes } from "prop-types";

import { connect } from 'react-redux';

import Page from "../../components/Page";
import Progress from "../../components/ProgressSteps";
import ErrorMessage from '../../components/ErrorMessage';
import Title from "../../components/Title";
import Scanner from "../../components/Scanner";

import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import FormWrapper from "./style";

import { getMockData } from "../../services/apis/getMockData";

class ContractScanning extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      data: {
        "heading": "",
        "description": "",
      },
      serverData: {
        number: '',
      }
    }
    this.loadPageData();    
  }

  static propTypes = {
    updateData: PropTypes.func.isRequired,
    getContractDetails: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    setProcessingStatus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    contractDetails: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ serverData: { ...nextProps.contractDetails.data }});
  }
 
  handleBackButton = () => {
    const { history } = this.props;
    // history.replace("/ProofScanningConfirmation");
    history.goBack();
  }

  handleContinue = () => {
    const { history } = this.props;
    const {
      number,
    } = this.state.serverData;
    if (number) {
      history.push("/ContractScanningConfirmation"); 
    } else {
      this.setState({ message: 'Please enter id'});
    }
  }

  loadPageData = () => {
    getMockData('capturecontract').then(({result})=>{
      this.setState({
        data: {...result},
      });
    })
  }

  handleOnchange = (event) => {
    const { updateData } = this.props;
    const { target: { id, value} } = event;
    updateData({ [id]: value });
  }

render() {
  const { heading, description } = this.state.data;
  const {
    clearData,
    getContractDetails,
    contractDetails,
  } = this.props;
  
  return (
    <Page
       pageTitle={"Contrato"}
        logoPresent={false}
         backBtnPresent={true}
         handleBackButton={this.handleBackButton}>

      <Progress 
        count={5}
        currentItem={5} 
      />
      <Title title={heading} size={"2rem"}/>
      <p style={{ padding: '1rem',
        textAlign: 'center',
        color: '#00377B',
        fontSize: '0.9rem'}}> {description}</p>
        
      <Scanner
        btnText={"TOMAR FOTO"}
        getImage={getContractDetails}
        data={contractDetails}
        setProcessingStatus={this.props.setProcessingStatus}
        clearData={clearData}
        fileName={'prepaidContract'}
      />
      <FormWrapper>     
      <ErrorMessage message={this.state.message}></ErrorMessage> 
        <div className="inputFields">
          <div className="iconWrapper">
            <img
              src="../../../images/icn-contract@3x.png"
              style={{width: "2.1rem"}}
              alt="contract number"
            /> 
          </div>
          <TextField
            id="number"
            label="Número del contrato"
            value={this.state.serverData.number}
            onChange={this.handleOnchange}
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
  );}}

  const mapState = state => ({
    contractDetails: state.contractDetails,
  })
  
  const mapDispatch = (dispatch) => {
    return ({
      getContractDetails: (data) => dispatch.contractDetails.getContractDetails(data),
      setProcessingStatus: (status) => dispatch.contractDetails.setProcessingStatus(status),
      clearData: dispatch.contractDetails.clearData,
      updateData: (data) => dispatch.contractDetails.updateData(data),
    })
  }
  
  export default connect(mapState, mapDispatch)(ContractScanning);
  