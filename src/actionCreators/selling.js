import { getPackageById, getTopupById } from "../util/index";
import { redirectTo } from "../router";
import API from "../api";
import get from "lodash/get";
import { addAlertAction } from "./alerts";
import { getFormatedDate } from "../util";
import { identify, track } from "../util/tracker";
import { clearPinAction, getBalanceAction } from "./auth";

export const CLEAR_CURRENT_USER_ACTION = "sell/CLEAR_CURRENT_USER";
const WRONG_PIN_ERROR_CODE = "141";

const getReferenceNumber = () => {
  return Date.now();
};



export const sellPendingAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    const pendingSale = state.pendingSale;
    if (pendingSale) {
      pendingSale();
    }
  };
};

export const sellTopupAction = tData => {
  return (dispatch, getState) => {
    const trackableData = { ...tData };
    const state = getState();
    const topupId = get(state, "route.id");
    const topup = getTopupById(state, topupId);
    const msisdn = get(state, "auth.token.msisdn");
    const clientPhoneNumber = get(state, "clientPhone.phoneNumber");
    const pin = get(state, "auth.pin");
    const referenceNumber = getReferenceNumber();
    let topupTrxDetailsObj = {
      trx_id: null,
      trx_date_hour: getFormatedDate(),
      latitude: tData.store.latitude,
      longitude: tData.store.longitude,
      pos_balance: state.auth.balance.balance,
      type: 'Sell Recharge',
      pos_id: state.auth.dmsid,
      msisdn_pos: state.clientPhone.phoneNumber,
      msisdn_user: state.auth.token.msisdn,
      category: 'N/A',
      suggested: topup.suggested,
      code: 'N/A',
      code_price: topup.price,
      description: topup.name,
      price: topup.price,
      trx_status: null,
      err_code: null,
      err_description: null
    }
    if (!pin) {
      return dispatch({
        type: "pendingSale/ADD",
        payload: () => {
          dispatch(sellTopupAction(trackableData));
        }
      });
    }

    trackableData.order_id = referenceNumber;
    trackableData.checkout_id = referenceNumber;

    const trackTopup = (event, additionalData = {}) => {
      navigator.geolocation.getCurrentPosition(
        info => {
          track(event, {
            ...trackableData,
            ...additionalData,
            latitude: get(info, "coords.latitude"),
            longitude: get(info, "coords.longitude")
          });
        },
        () => {
          track(event, { ...trackableData, ...additionalData });
        },
        { maximumAge: 300000 }
      );
    };

    trackTopup("Order Confirmation");
    dispatch({type: 'SUBMITTING'})
    API.sellTopup({
      msisdn,
      clientPhoneNumber,
      pin,
      amount: topup.price,
      currency: topup.currency,
      referenceNumber
    }).then(
      res => {
        identify(msisdn, {
          msisdn: process.env.REACT_APP_COUNTRY_PREFIX + clientPhoneNumber
        });
        topupTrxDetailsObj.trx_id = res.data.transactionId;
        topupTrxDetailsObj.trx_status = res.data.status;
        topupTrxDetailsObj.err_code = 'N/A';
        topupTrxDetailsObj.err_description = 'N/A';
        dispatch(getBalanceAction(topupTrxDetailsObj));
        trackTopup("Order Completed");
        trackTopup("PoS Authentication succeeded");
        redirectTo({ page: "TopupConfirmation", id: topupId });
        setTimeout(()=>{
          dispatch({type: 'SUBMIT_SUCCESS'})
        },1000)
      },
      err => {
        trackTopup("Order Failed", { error: get(err, "response.data.error") });
        trackTopup("PoS Authentication failed", {
          error: get(err, "response.data.error")
        });
        const error = get(err, "response.data.error.message");
        const errorCode = get(err, "response.data.error.code") + "";
        topupTrxDetailsObj.trx_id = 'N/A';
        topupTrxDetailsObj.trx_status = 'ERROR';
        topupTrxDetailsObj.err_code = errorCode;
        topupTrxDetailsObj.err_description = error;
        dispatch(saveTransactionDetailsAction(topupTrxDetailsObj));
        dispatch({type: 'SUBMIT_FAILED'})
        dispatch(addAlertAction("error", error));
        if (errorCode === WRONG_PIN_ERROR_CODE) {
          dispatch(clearPinAction());
          dispatch({
            type: "pendingSale/ADD",
            payload: () => {
              dispatch(sellTopupAction(trackableData));
            }
          });
        } else {
          dispatch({ type: "pendingSale/CLEAR" });
        }
      }
    );
  };
};

export const sellPackageAction = tData => {
  return (dispatch, getState) => {
    const trackableData = { ...tData };
    const state = getState();
    const packageId = get(state, "route.id");
    const pack = getPackageById(state, packageId);
    const msisdn = get(state, "auth.token.msisdn");
    const clientPhoneNumber = get(state, "clientPhone.phoneNumber");
    const pin = get(state, "auth.pin");
    let packageTrxDetailsObj = {
      trx_id: null,
      trx_date_hour: getFormatedDate(),
      latitude: tData.store.latitude,
      longitude: tData.store.longitude,
      pos_balance: state.auth.balance.balance,
      type: 'Sell Package',
      pos_id: state.auth.dmsid,
      msisdn_pos: state.clientPhone.phoneNumber,
      msisdn_user: state.auth.token.msisdn,
      category: pack.category,
      suggested: pack.suggested,
      code: pack.productId,
      code_price: pack.price,
      description: pack.name,
      price: pack.displayPrice,
      trx_status: null,
      err_code: null,
      err_description: null
    }
    if (!pin) {
      return dispatch({
        type: "pendingSale/ADD",
        payload: () => {
          dispatch(sellPackageAction(trackableData));
        }
      });
    }

    const referenceNumber = getReferenceNumber();

    trackableData.order_id = referenceNumber;
    trackableData.checkout_id = referenceNumber;

    const trackPackage = (event, additionalData = {}) => {
      navigator.geolocation.getCurrentPosition(
        info => {
          track(event, {
            ...trackableData,
            ...additionalData,
            latitude: get(info, "coords.latitude"),
            longitude: get(info, "coords.longitude")
          });
        },
        () => {
          track(event, { ...trackableData, ...additionalData });
        },
        { maximumAge: 300000 }
      );
    };

    trackPackage("Order Confirmation");
    dispatch({type: 'SUBMITTING'})
    API.sellPackage({
      msisdn,
      clientPhoneNumber,
      pin,
      packageId: pack.productId,
      amount: pack.price,
      currency: pack.currency,
      referenceNumber
    }).then(
      res => {
        identify(msisdn, {
          msisdn: process.env.REACT_APP_COUNTRY_PREFIX + clientPhoneNumber
        });
        packageTrxDetailsObj.trx_id = res.data.Envelope.Body.SellPackageResponse.transactionId;
        packageTrxDetailsObj.trx_status = res.data.Envelope.Body.SellPackageResponse.status;
        packageTrxDetailsObj.err_code = 'N/A';
        packageTrxDetailsObj.err_description = 'N/A';
        dispatch(getBalanceAction(packageTrxDetailsObj));
        trackPackage("Order Completed");
        trackPackage("PoS Authentication succeeded");
        redirectTo({ page: "PackagesConfirmation", id: packageId });
        dispatch({type: 'SUBMIT_SUCCESS'})

      },
      err => {
        const error = get(err, "response.data.error.message");
        const errorCode = get(err, "response.data.error.code") + "";
        packageTrxDetailsObj.trx_id = 'N/A';
        packageTrxDetailsObj.trx_status = 'ERROR';
        packageTrxDetailsObj.err_code = errorCode;
        packageTrxDetailsObj.err_description = error;
        dispatch(saveTransactionDetailsAction(packageTrxDetailsObj));
        dispatch({type: 'SUBMIT_FAILED'})
        trackPackage("Order Failed", {
          error: get(err, "response.data.error")
        });
        trackPackage("PoS Authentication failed", {
          error: get(err, "response.data.error")
        });

        dispatch(addAlertAction("error", error));
        if (errorCode === WRONG_PIN_ERROR_CODE) {
          dispatch(clearPinAction());
          dispatch({
            type: "pendingSale/ADD",
            payload: () => {
              dispatch(sellPackageAction(trackableData));
            }
          });
        } else {
          dispatch({ type: "pendingSale/CLEAR" });
        }
      }
    );
  };
};

export const clearCurrentUserAction = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_CURRENT_USER_ACTION
    });
    redirectTo({ page: "MainMenu" });
  };
};

//Save Transaction Details Action
export const saveTransactionDetailsAction = (params) => {
  return (dispatch, getState) => {
    API.saveTransactionDetails(params).then(
      data => {
      },
      e => {
      }
    )
  }
}