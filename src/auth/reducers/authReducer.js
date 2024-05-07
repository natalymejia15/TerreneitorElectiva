import { authTypes } from "../types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case authTypes.login:
      return {
        ...state,
        logged: true,
        user: action.payload
      };
    case authTypes.logout:
      return {
        logged: false,
        errorMessage: action.payload?.errorMessage
      };
      case authTypes.error:
        return {
          ...state,
          logged: false,
          errorMessage: action.payload?.errorMessage
        };
    default:
      return state;
  }
}
