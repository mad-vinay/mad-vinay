import React, {
  Component,
} from "react";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import Styled from './styled';
import Title from '../../components/Title';
import MenuItem from '../../components/MenuItem';
import Page from "../../components/Page";

class MainMenu extends Component {

  state = {
    packages: {
      "heading": "Activación prepago",
      "items": [
        {
          "text": "Activacion + Paquete bienvenida",
          "icon": "../../../images/icn-activation@3x.png",
          "url": "/WelcomePackage"
        },
        {
          "text": "Cambio de sim",
          "icon": "../../../images/icn-changeSim@3x.png",
          "url": "/WelcomePackage"
        },
        {
          "text": "Portabilidad prepago",
          "icon": "../../../images/icn-portabilidad@3x.png",
          "url": "/WelcomePackage"
        }
      ]
    },
    account: {
      "heading": "Cuenta",
      "items": [
        {
          "text": "ventas",
          "icon": "../../../images/icn-ventas@3x.png"
        },
        {
          "text": "cambio de PIN",
          "icon": "../../../images/icn-ChangePin@3x.png"
        },
        {
          "text": "Salir",
          "icon": "../../../images/icn-exit@3x.png"
        }
      ]
    }
  }

  static propTypes = {
    //prepaidActivations: PropTypes.object.isRequired,
  }

  // componentDidMount() {
  //   /oauth/v2/authorize?
  // }

  renderList = (items, handler) => {
    return (items.length &&
      items.map(({ text, icon }, index) => {
        if (index < items.length - 1) {
          return <React.Fragment key={index}>
            <MenuItem title={text} iconSrc={icon} handleOnClick={handler} />
            <Divider dark="true" />
          </React.Fragment>
        } else {
          return <React.Fragment key={index}>
            <MenuItem title={text} iconSrc={icon} handleOnClick={handler} />
          </React.Fragment>
        }
      }));
  }

  selectPackage = () => {
    this.props.history.push("/WelcomePackage");
  }

  selectAccount = () => {
  }

  render() {
    const { heading: prepaidHeading, items: packages } = this.state.packages;
    const { heading: accountHeading, items: list } = this.state.account;
    return (
      <Page pageTitle={"Main Menu"} backBtnPresent={false} logoPresent={true}>
        <Styled.Container>
          <Card className="card">
            <Title title={prepaidHeading} size="30px" />
            {this.renderList(packages, this.selectPackage)}
          </Card>
          <Card className="card">
            <Title title={accountHeading} size="30px" />
            {this.renderList(list, this.selectAccount)}
          </Card>
        </Styled.Container>
      </Page>
    );
  }
}

export default MainMenu;