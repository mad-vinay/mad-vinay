import axios from 'axios';
import {apiUrl as url } from '../../../config/api';

const initialState = {
    data: {
      success: false,
    },
    error: {
        has: false,
        message: '',
    },
    isProcessing: false,
}

export const idRearDetails = {
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
      } 
    },
    effects: {
      // handle state changes with impure functions.
      // use async/await for async actions
      async getRearIdDetails(data) {   
        axios({
          method: 'post',
          url,
          data,
          config: { headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        }}
          }).then(data=>{
            const Payload = data.data.Payload;    
            // const Payload = JSON.parse(data.data.Payload);            
            if (Payload.errorMessage) {
              this.setDataFailed(Payload.errorMessage);
            } else {
              this.setDataSuccess({ success: Payload.success});
            }
        }).catch(({message}) => {
          this.setDataFailed(message);         
        })
      },
    }
  }