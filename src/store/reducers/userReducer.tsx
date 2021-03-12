import { DispatchActionTypes, UserState } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialUserState: UserState = {
  userId: "",
  email: "",
  password: "",
  token: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialUserState,
  action: DispatchActionTypes
) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userId: action.payload.UserId,
        token: action.payload.Token,
      };
    default:
      return state;
  }
}
