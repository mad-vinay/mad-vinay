const initialState = {
    isSubmitting: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SUBMITTING":
      return {
        ...state,
        isSubmitting: true
      };
    case "SUBMIT_SUCCESS":
      return{
        ...state,
        isSubmitting: false
      };
    case "SUBMIT_FAILED":
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};