import { DispatchActionTypes, UserState } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialUserState: UserState = {
  username: "",
  userId: "",
  token: "",
  isAuthenticated: false,
  hasAuthErrors: false,
  authErrors: [],
  authSuccessMessage: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialUserState,
  action: DispatchActionTypes
): UserState {
  switch (action.type) {
    case actionTypes.SET_DEFAULT:
      return {
        ...initialUserState,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        userId: action.payload.UserId,
        token: action.payload.Token,
        username: action.payload.Username,
        isAuthenticated: true,
        hasAuthErrors: false,
        authSuccessMessage: "Successfully logged in!",
      };
    case actionTypes.SIGNUP:
      return {
        ...state,
        userId: action.payload.UserId,
        token: action.payload.Token,
        username: action.payload.Username,
        isAuthenticated: true,
        hasAuthErrors: false,
        authSuccessMessage: "Successfully signed up!",
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        hasAuthErrors: true,
        authErrors: [...action.payload],
        authSuccessMessage: "",
      };
    case actionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.UserId,
        token: action.payload.Token,
        username: action.payload.Username,
      };
    case actionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        userId: "",
        token: "",
      };
    default:
      return state;
  }
}
