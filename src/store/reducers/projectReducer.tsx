import {
  DispatchActionTypes,
  ProjectState,
} from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialProjectState: ProjectState = {
  myCreatedProjects: [],
  myInvolvedProjects: [],
  hasProjectErrors: false,
  projectErrors: [],
  usersList: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialProjectState,
  action: DispatchActionTypes
): ProjectState {
  switch (action.type) {
    case actionTypes.SET_DEFAULT:
      return {
        ...initialProjectState,
      };
    case actionTypes.GET_MY_CREATED_PROJECTS:
      return {
        ...state,
        myCreatedProjects: [...action.payload],
      };
    case actionTypes.GET_MY_INVOLVED_PROJECTS:
      return {
        ...state,
        myInvolvedProjects: [...action.payload],
      };
    case actionTypes.PROJECT_ERROR:
      return {
        ...state,
        hasProjectErrors: true,
        projectErrors: [...action.payload],
      };
    case actionTypes.SET_USERS_LIST:
      return {
        ...state,
        usersList: [...action.payload]
      };
    default:
      return state;
  }
}
