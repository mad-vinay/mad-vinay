import React, {
  Component,
} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ProgressSteps from '../../components/ProgressSteps';
import Page from "../../components/Page";

import Styled from './style';

class RevisitInformation extends Component {

  static propTypes = {
    handleRevisitInformation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    revisitInformation: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { handleRevisitInformation } = this.props;
    handleRevisitInformation('reviewinformation');
  }

  handleBackButton = () => {
    const { history } = this.props;
    // this.props.history.replace("/SimScanning");
    history.goBack();
  }

  handleContinue = () => {
    const { history } = this.props;
    history.push("/ProofScanningConfirmation");    
  }

  render() {
    const { data } = this.props.revisitInformation;
    return (
      <Page
        pageTitle={"Revisa tu información"}
        backBtnPresent={true}
        logoPresent={false}
        handleBackButton={this.handleBackButton}
      >
        <ProgressSteps count={5} currentItem={4} />
        <Styled.Content>
        <h3> {data.heading}</h3>
        {
          data.details && data.details.map((detail, index) => (
            <React.Fragment key={index}>
            <Styled.Details>
              <span> {detail.item }: </span>
              <span> {detail.value}  </span>
            </Styled.Details>
            </React.Fragment>
          ))
        }
            <Divider dark="true" />
        <Styled.SimWrapper>
          <Styled.SimDetails>
              <p className="heading">{data.selectedPackage.heading}</p>
              <p className="subHeading">{data.selectedPackage.subHeading}</p>
          </Styled.SimDetails> 
          <Styled.Payment>             
              <span className="payment">{data.selectedPackage.payment}</span>
          </Styled.Payment>             
        </Styled.SimWrapper>
              
          <Divider dark="true" />
          <Styled.ButtonWrapper>       
          <Button variant="contained" color="secondary" onClick={this.handleContinue}>CONFIRMAR</Button>
          </Styled.ButtonWrapper>       
          
         </Styled.Content>
      </Page>
    );}}

const mapState = state => ({
  revisitInformation: state.revisitInformation,
})

const mapDispatch = (dispatch) => {
  return ({
    handleRevisitInformation: (fileName) => dispatch.revisitInformation.handleRevisitInformation(fileName),
  })
}

export default connect(mapState, mapDispatch)(RevisitInformation);