import { DispatchActionTypes, UserNotification, UserState } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialUserState: UserState = {
  username: "",
  userId: "",
  token: "",
  isAuthenticated: false,
  hasAuthErrors: false,
  authErrors: [],
  authSuccessMessage: "",
  userDetails: {
    _id: "",
    Name: "",
    Email: "",
    ProfileImageUrl: "",
  },
  notifications: [],
  unreadNotifications: 0,
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
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case actionTypes.SET_NOTIFICATIONS:
      const notifications: UserNotification[] = action.payload;
      const unreadNotifications = notifications.filter(item => item.UnreadStatus === true);
      return {
        ...state,
        notifications: action.payload,
        unreadNotifications: unreadNotifications.length,
      };
    default:
      return state;
  }
}
