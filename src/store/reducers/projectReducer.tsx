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
      let usersListData = [...action.payload];
      usersListData = usersListData.map((item) => {
        item.IsSelected = false;
        return item;
      });
      const usersFromState = state.usersList.filter(item => item.IsSelected === true);
      const combinedUserList = [...usersFromState, ...usersListData].filter(
        ((
          set // store the set and return the actual callback
        ) => (o: any) => (set.has(o._id) ? false : set.add(o._id)))(new Set()) // use an IIFE to create a Set and store it set
      );
      return {
        ...state,
        usersList: [...combinedUserList],
      };
    case actionTypes.MARK_ALREADY_SELECTED_USER:
      let usersForUpdate = [...action.payload];
      usersForUpdate = usersForUpdate.map((item) => {
        item.IsSelected = true;
        return item;
      });
      return {
        ...state,
        usersList: [...usersForUpdate],
      };
    case actionTypes.SELECT_USER:
      const selectedUser = state.usersList.find(
        (item) => item._id === action.payload
      );
      if (selectedUser) selectedUser.IsSelected = !selectedUser.IsSelected;

      return {
        ...state,
      };
    case actionTypes.EMPTY_USERS_LIST:
      return {
        ...state,
        usersList: [],
      };
    default:
      return state;
  }
}
