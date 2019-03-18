import axios from 'axios';
import { apiUrl as url } from '../../../config/api';

const initialState = {
  data: {
    frontData: {
      number: '',
      surname: '',
      dob: '',
    },
    rearData: {},
  },
  error: {
    has: false,
    message: '',
  },
  isProcessing: false,
}

export const idDetails = {
  state: { ...initialState },

  reducers: {
    setDataSuccess(state, payload) {
      debugger
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
    clearData() {
      return { ...initialState }
    },
    updateData(state, data) {
      return {
        ...state,
        data: {
          frontData: {
            ...state.data.frontData,
            ...data
          }
        },
      }
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions

    async getFrontIdDetails(data) {
      debugger
      axios({
        method: 'post',
        url,
        data,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          }
        }
      }).then(data => {
        // const Payload = JSON.parse(data.data.Payload);
        const Payload = data.data.Payload;
        if (Payload.errorMessage) {
          this.setDataFailed(Payload.errorMessage);
        } else {
          if (!Payload.idno || !Payload.name || !Payload.dob) {
            this.setDataPartiallyFailed({
              data: {
                frontData: {
                  number: Payload.idno,
                  surname: Payload.name,
                  dob: Payload.dob,
                }
              },
              message:
                'No se detectan todos los campos. Por favor intente una vez más o ingrese los valores en el campo'
            });
          } else {
            this.setDataSuccess({
              frontData: {
                number: Payload.idno,
                surname: Payload.name,
                dob: Payload.dob,
              }
            });
          }
        }
      }).catch(({ message }) => {
        this.setDataFailed(message);
      })
    },
  }
}