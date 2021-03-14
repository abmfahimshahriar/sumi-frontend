import { DispatchActionTypes, UserState } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialUserState: UserState = {
  userId: "",
  token: "",
  isAuthenticated: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialUserState,
  action: DispatchActionTypes
): UserState {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userId: action.payload.UserId,
        token: action.payload.Token,
        isAuthenticated: true,
      };
    case actionTypes.SIGNUP:
      return {
        ...state,
        userId: action.payload.UserId,
        token: action.payload.Token,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
