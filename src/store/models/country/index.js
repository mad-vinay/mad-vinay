
const initialState = {
  data: '',
  error: {
    has: false,
    message: '',
  }
}

export const country = {
  
  state: { ...initialState }, // initial state
  reducers: {
    // handle state changes with pure functions
    setCountry(state, payload) {
      return {
        ...state,
        data: payload,
        error: {
          has: false,
          message: '',
        }
      }
    },
    setCountryFailed(state, message) {
      return {
        ...state,
        error: {
          has: true,
          message,
        }
      }
    },
    getCountry(state) {
      return state
    },
  }
}