import React, {
  Component,
} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import MenuItem from '../../components/MenuItem';
import Success from '../../components/Success';

import Styled from './style';

class ProofScanningConfirmation extends Component {

  static propTypes = {
    handleRevisitInformation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { handleRevisitInformation } = this.props;
    handleRevisitInformation('reviewinformation');
  }

  renderList = (items, handler) => {
      return items.length &&
      items.map(({ text, icon}, index) => {
        if (index < items.length - 1) {
          return <React.Fragment>
            <MenuItem title={text} iconSrc={icon} handleOnClick={handler}/>
            <Divider dark="true" />
          </React.Fragment>
        } else {
          return <React.Fragment>
            <MenuItem title={text} iconSrc={icon} handleOnClick={handler}/>
          </React.Fragment>
        }
      }); 
  }

  handleBackButton = () => {
    const { history } = this.props;
    // this.props.history.replace("/RevisitInformation");
    history.goBack();
  }

  handleContinue = () => {
    const { history } = this.props;
    history.push("/ContractScanning");    
  }

  renderContent = () => (
    <React.Fragment>
      <span className="details"> Valor del pago actual</span>
      <p className="text"> G70</p>

      <span className="details">Paquete de bienvenida</span>
      <p className="text">SIM + FB + Whatsapp + 100MB Vence en 24 horas</p>
      <span className="details">Número asignado</span>
      <p className="text">24565985</p>
    </React.Fragment>
  )

  renderFooter = () => (
    <section style={{border: "1px solid #e8dfdf38",
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <img 
        src="../../../images/icn-contract-white@3x.png"
        style={{width: "3em", height: "3em", float: "left"}} 
        alt="Flip id"
      />       
      <p onClick={this.handleContinue} > CONTINUAR A LA FIRMA Y FOTO DEL CONTRATO</p>
    </section>
  )

  render() {
    return (
      <Styled.Content>
          <Success 
          title="SIM activado con exito!"
          renderContent={this.renderContent}
          renderFooter={this.renderFooter}/>
        </Styled.Content>
    );}}

const mapState = state => ({
  revisitInformation: state.revisitInformation,
})

const mapDispatch = (dispatch) => {
  return ({
    handleRevisitInformation:
      (fileName) =>
        dispatch.revisitInformation.handleRevisitInformation(fileName),
  })
}

export default connect(mapState, mapDispatch)(ProofScanningConfirmation);