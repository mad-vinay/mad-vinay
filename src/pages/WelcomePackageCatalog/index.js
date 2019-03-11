import React, {
  Component,
} from "react";
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import ListItem from '../../components/ListItem';
import Page from "../../components/Page";
import Progress from "../../components/ProgressSteps";

import Styled from "./styled";

class WelcomePackageCatalog extends Component {

  state = {
    "items": [
        {
            "text": "SIM + 1GB",
            "description": "vence en 30 dias"
        },
        {
            "text": "SIM + 500MB",
            "description": "Vence en 7 dias"
        },
        {
            "text": "SIM + 200MB",
            "description": "Vence en 2 dias"
        },
        {
            "text": "SIM + FB + whatsapp + 100MB",
            "description": "Vence en 24 horas"
        }
    ]
}
  static propTypes = {
    packages: PropTypes.object.isRequired,
  }
  renderList = (items, handler) => {
    
    return items.length &&
      items.map(({ text, description }, index) => {
        if (index < items.length - 1) { 
          return  <React.Fragment key={index} ><Styled.ListWrapper>
            <ListItem text={text} description={description} handleOnClick={handler} />
            <Divider light={false} />
          </Styled.ListWrapper>
          </React.Fragment>
        } else {
          return  <React.Fragment key={index}> <Styled.ListWrapper>
            <ListItem text={text} description={description} handleOnClick={handler} />
          </Styled.ListWrapper>
          </React.Fragment>
        }
      });
  }

  selectPackage = () => { 
    this.props.history.push("/IdScanningInstruction");
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { history } = this.props;
    const { items } = this.state;
    return (
      <Page
        pageTitle={"Selecciona un paquete"}
        backBtnPresent={true}
        logoPresent={false}
        history={history}
        handleBackButton={this.handleBackButton}
      >       
          <Progress count={5} currentItem={1} />
          {this.renderList(items, this.selectPackage)}
      </Page>
    );}}

export default WelcomePackageCatalog;