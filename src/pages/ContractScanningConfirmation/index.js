import React, { Fragment } from "react";
import Success from '../../components/Success';

const ContractScanningConfirmation = () => {

const renderContent = () => (
  <React.Fragment>
    <span
      className="details">
        {
          `La oficina principal verificará la información proveida y se 
            le informará pronto del estado de esta venta`
        }
        </span>
  </React.Fragment>
)

const renderFooter = () => (
  <section style={{textAlign: 'center', color: '#4cc5f2',
    fontWeight: '400',
    fontSize: '1.2rem', marginBottom: "0.5rem"}}>
      VOLVER AL INCIO
  </section>
)

return (
  <Fragment>    
    <Success 
      title="¡Contracto enviado con éxito!"
      renderContent={renderContent}
      renderFooter={renderFooter}/>
  </Fragment>
);}

export default ContractScanningConfirmation;