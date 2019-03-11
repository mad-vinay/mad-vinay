import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { redirectTo } from "../../router";
import Divider from "material-ui/Divider";
import { connect } from "react-redux";
import get from "lodash/get";
import _ from 'lodash';
import {
  sellTopupAction,
  sellPendingAction
} from "../../actionCreators/selling";
import { getTopupById, formatPhoneNumber } from "../../util/index";
import { track } from "../../util/tracker";
import PinDialog from "../components/PinDialog";
import { updatePosPinAction } from "../../actionCreators/auth.js";

const ConnectedPinDialog = connect(
  state => {
    return {
      open: !!get(state, "pendingSale"),
      pin: get(state, "auth.pin") || ""
    };
  },
  dispatch => {
    return {
      onPinChange: (e, value) => dispatch(updatePosPinAction(value)),
      handleClose: () => {
        dispatch({ type: "pendingSale/CLEAR" });
        redirectTo({ page: "TopupDataEntry" }, true);
      },
      handleMainAction: () => dispatch(sellPendingAction())
    };
  }
)(PinDialog);

export class TopupReview extends Component {
  constructor (props){
    super(props);
    this.state = {
      isButtonDisabled: false
    }
    
    this.rechargeHandler = this.rechargeHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.clickCount = 0;
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.submitStatus !== this.props.submitStatus) {
      console.log("Entered  componentWillReceiveProps ------------->>>>>",nextProps.submitStatus);
      this.setState({isButtonDisabled: nextProps.submitStatus})
    }
  }

  componentWillUnmount(){
    this.clickCount = 0;
  }

  onClickBtn = () =>{
   console.log("Clicked on button")
   this.clickCount++;
   console.log('Click count', this.clickCount);
   if (this.clickCount === 1) {
    console.log('This should come only once. Otherwise shows multiple API calls')
    this.rechargeHandler(); 
   }
  }

  rechargeHandler = _.debounce(() => {
    this.props.sell(this.props.trackableData.confirm)
  }, 500)

  editHandler = _.debounce(() => {
    track("Order Cancelled", this.props.trackableData.cancel);
    redirectTo({ page: "TopupDataEntry" }, true);
  }, 500)


  render() {
    return (
      <PageTitle page="TopupReview">
        <div className="max-width-4 mx-auto">
          <div className="clearfix center">
            <h5 className="regular text-primary">Confirma tu transacción:</h5>
            <Divider />
            <h5 className="regular text-tertiary mb1">Valor</h5>
            <h4 className="h2 regular text-primary mt1">
              Q{this.props.topup.price}
            </h4>
            <h5 className="regular text-tertiary mb1">Teléfono del usuario</h5>
            <h4 className="h2 regular text-primary mt1">
              {this.props.clientPhoneNumber}
            </h4>
            <Divider />
            <br />
            <RaisedButton
              secondary={true}
              label="Recargar"
              disabled={this.props.submitStatus}
              disabledBackgroundColor="#CAF1F6"
              disabledLabelColor="#FFF"
              onClick={() => {
                this.onClickBtn()
                // this.setState({isButtonDisabled: true},()=>{
                //   console.log('Button disabled');
                //   this.rechargeHandler();
                // });
              }}
            />
            <br />
            <br />
            <FlatButton
              secondary={true}
              label="Editar"
              onClick={() => {
                this.editHandler();
              }}
            />
          </div>
          <ConnectedPinDialog />
        </div>
      </PageTitle>
    );
  }
}

export default connect(
  state => {
    const topup = getTopupById(state, get(state, "route.id"));
    const submitStatus = get(state, "buttonState.isSubmitting");
    const clientPhoneNumber = formatPhoneNumber(
      get(state, "clientPhone.phoneNumber")
    );

    const cancelTrackableData = {
      revenue: topup.price,
      payment_method: "BALANCE",
      products: [
        {
          name: topup.name,
          variant: "TOPUP",
          price: topup.price,
          quantity: 1,
          currency: topup.currency
        }
      ]
    };

    const confirmTrackableData = {
      revenue: topup.price,
      payment_method: "BALANCE",
      products: [
        {
          name: topup.name,
          variant: "TOPUP",
          price: topup.price,
          quantity: 1,
          currency: topup.currency
        }
      ],
      store: {
        address: get(state, "auth.dmsidData.storeAddress"),
        department: get(state, "auth.dmsidData.storeDepartment"),
        province: get(state, "auth.dmsidData.storeProvince"),
        longitude: get(state, "auth.dmsidData.storeLongitud"),
        latitude: get(state, "auth.dmsidData.storeLatitud")
      }
    };

    return {
      topup,
      submitStatus,
      clientPhoneNumber,
      trackableData: {
        cancel: cancelTrackableData,
        confirm: confirmTrackableData
      }
    };
  },
  dispatch => {
    return {
      sell: trackableData => dispatch(sellTopupAction(trackableData))
    };
  }
)(TopupReview);
