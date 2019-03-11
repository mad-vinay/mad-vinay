import React, {
  Component
} from "react";
import { PropTypes } from "prop-types";
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Page from "../../components/Page";
import ProgressSteps from '../../components/ProgressSteps';
import Title from '../../components/Title';
import Scanner from '../../components/Scanner';
import ErrorMessage from '../../components/ErrorMessage';

import { getMockData } from "../../services/apis/getMockData";
import FormWrapper from "../IdScanning/style";

class SimScanning extends Component {
  
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
    getSimDetails: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    setProcessingStatus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    simDetails: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ serverData: { ...nextProps.simDetails.data }});
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleUpload = () => {
    const { history } = this.props;
    const {
      number,
    } = this.state.serverData;
    if (number) {
      history.push("/RevisitInformation"); 
    } else {
      this.setState({ message: 'Por favor ingrese su identificación'});
    }
  }

  handleOnchange = (event) => {
    const { updateData } = this.props;
    const { target: { id, value} } = event;
    updateData({ [id]: value });
  }

  loadPageData = () => {
    getMockData('captursim').then(({result})=>{
      this.setState({
        data: {...result},
      });
    })
  }

render() {
  const {
    data,
    serverData
  } = this.state;
  const {
    clearData,
    getSimDetails,
    simDetails,
    setProcessingStatus,

  } = this.props;
    return (
      <Page
        pageTitle={"SIM"}
        backBtnPresent={true}
        logoPresent={false}
        handleBackButton={this.handleBackButton}
      >
        <ProgressSteps count={5} currentItem={3} />
        <Title title={data.heading} size="2rem"/>
        <span style={{color: '#00377B', textAlign: 'center', fontSize: '1rem',
          fontWeight: 200, paddingBottom: '3rem'}}> {data.description} </span>
        <Scanner
          btnText={"TOMAR FOTO"}
          getImage={getSimDetails}
          data={simDetails}
          setProcessingStatus={setProcessingStatus}
          clearData={clearData}
          fileName={'sim'}
        />
        <FormWrapper>      
          <ErrorMessage message={this.state.message}></ErrorMessage>   
          <div className="inputFields">
            <div style={{position: "relative",
        top: '5.5px'}}>
            <img src="../../../images/icn-SIM@3x.png" style={{width: "2.1rem"}} alt="phone number"/>     
            </div>
            <span style={{position: "relative",
        top: '5.5px', fontSize: '0.87rem'}}> 8950402516</span>
            <TextField
              id="number"
              label="Últimos 9 números del SIM"
              value={serverData.number}
              className="input-text"
              onChange={this.handleOnchange}/>
          </div>
          <Button
            className="confirmBtn"
            variant="contained"
            color="secondary"
            onClick={this.handleUpload}
          >
            CONFIRMA
          </Button>
        </FormWrapper>
      </Page>
    );}
  }


  const mapState = state => ({
    simDetails: state.simDetails,
  })
  
  const mapDispatch = (dispatch) => {
    return ({
      getSimDetails: (data) => dispatch.simDetails.getSimDetails(data),
      setProcessingStatus: (status) => dispatch.simDetails.setProcessingStatus(status),
      clearData: dispatch.simDetails.clearData,
      updateData: (data) => dispatch.simDetails.updateData(data),
    })
  }
  
  export default connect(mapState, mapDispatch)(SimScanning);
