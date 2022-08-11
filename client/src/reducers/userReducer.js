export const getAllUsersReducer = (state = { loginUser: [] }, action) => {
    switch (action.type) {
      case "GET_USERS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_USERS_SUCCESS":
        return {
          loginUser: action.payload,
          loading: false,
        };
      case "GET_USERS_FAIL":
        return {
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
};