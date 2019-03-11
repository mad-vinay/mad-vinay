import axios from 'axios';
import {apiUrl as url } from '../../../config/api';


const initialState = {
    data: {
      number: '',
    },
    error: {
        has: false,
        message: '',
    },
    isProcessing: false,
}

export const contractDetails = {
    state: {...initialState},
    reducers: {
      setDataSuccess(state, payload) {
        return {
          ...state,
          data: { ...payload },
          error: {
            has: false,
            message: '',
          },
          isProcessing: false,
        }
      },
      setProcessingStatus(state, payload) {
        return {
          ...state,
          isProcessing: payload,
        }
      },

      setDataPartiallyFailed(state, payload) {
        return {
          ...state,          
          data: { ...payload.data },
          error: {
            has: true,
            message: payload.message,
          },
          isProcessing: false,
        }
      },
      setDataFailed(state, message) {
        return {
          ...state,          
          error: {
            has: true,
            message,
          },
          isProcessing: false,
        }
      },
      clearData() {
        return {...initialState}
      },
      updateData(state, data) {
        return {
          ...state,
          data: {
            ...state.data,
            number: data.number,
          },
        }
      },
    },
    effects: {
      // handle state changes with impure functions.
      // use async/await for async actions
      async getContractDetails(data) {
        axios({
          method: 'post',
          url,
          data,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          }).then(data=>{
            const Payload = data.data.Payload;            
            // const Payload = JSON.parse(data.data.Payload);
            if (Payload.errorMessage) {
              this.setDataFailed(Payload.errorMessage);              
            } else {
              if (!Payload.contractId) {
                this.setDataPartiallyFailed({data: { number: Payload.contractId},
                  message: 'La identificación no se pudo recuperar. Por favor intente una vez más o ingrese el valor en el campo'});
              } else {
              this.setDataSuccess({ number: Payload.contractId});
            }
          }
        }).catch(({message}) => {
          this.setDataFailed(message);
      },)
    }
  }
}