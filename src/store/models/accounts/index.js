import { getMockData } from "../../../services/apis/getMockData";

const initialState = {
    data: {
      heading: "",
      items: []
  },
    error: {
        has: false,
        message: '',
    }
}

export const accounts = {
    state: {...initialState},
    reducers: {
      setDataSuccess(state, payload) {
        return {
          ...state,
          data: { ...payload },
          error: {
            has: false,
            message: '',
          }
        }
      },
      setDataFailed(state, message) {
        return {
          ...state,          
          error: {
            has: true,
            message,
          }
        }
      },
    },
    effects: {
      // handle state changes with impure functions.
      // use async/await for async actions
      async handleAccounts(fileName) {
        await getMockData(fileName).then(({result})=>{
          this.setDataSuccess(result);
        })
      }    
    }
  }