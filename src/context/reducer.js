export const initialState = {
  auth: false,
  userAddress: "",
  currencies: [],
  tokens: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload,
      };
    case "SET_USER_ADDRESS":
      return {
        ...state,
        userAddress: action.payload,
      };
    case "SET_CURRENCIES":
      return {
        ...state,
        currencies: action.payload,
      };
    case "SET_TOKENS":
      return {
        ...state,
        tokens: action.payload,
      };

    default:
      return state;
  }
};
