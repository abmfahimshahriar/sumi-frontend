import { DispatchActionTypes, UIState } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialProjectState: UIState = {
  localLoading: false,
  globalLoading: false,
  createdProjectLoading: false,
  involvedProjectLoading: false,
  notificationLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialProjectState,
  action: DispatchActionTypes
): UIState {
  switch (action.type) {
    case actionTypes.SET_DEFAULT:
      return {
        ...initialProjectState,
      };
    case actionTypes.START_LOCAL_LOADING:
      return {
        ...state,
        localLoading: true,
      };
    case actionTypes.END_LOCAL_LOADING:
      return {
        ...state,
        localLoading: false,
      };
    case actionTypes.START_GLOBAL_LOADING:
      return {
        ...state,
        globalLoading: true,
      };
    case actionTypes.END_GLOBAL_LOADING:
      return {
        ...state,
        globalLoading: false,
      };
    case actionTypes.START_CREATED_PROJECT_LOADING:
      return {
        ...state,
        createdProjectLoading: true,
      };
    case actionTypes.END_CREATED_PROJECT_LOADING:
      return {
        ...state,
        createdProjectLoading: false,
      };
    case actionTypes.START_INVOLVED_PROJECT_LOADING:
      return {
        ...state,
        involvedProjectLoading: true,
      };
    case actionTypes.END_INVOLVED_PROJECT_LOADING:
      return {
        ...state,
        involvedProjectLoading: false,
      };
    case actionTypes.START_NOTIFICATION_LOADING:
      return {
        ...state,
        notificationLoading: true,
      };
    case actionTypes.END_NOTIFICATION_LOADING:
      return {
        ...state,
        notificationLoading: false,
      };
    default:
      return state;
  }
}
