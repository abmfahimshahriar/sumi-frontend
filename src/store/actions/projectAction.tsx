import axios, { AxiosResponse, AxiosError } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  CreateProjectPayload,
  SumiBackendResponse,
  UsersListItem,
} from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

export const setDefaults = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: actionTypes.SET_DEFAULT });
};

export const getMyCreatedProjects = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: actionTypes.START_CREATED_PROJECT_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .get("/project/myCreatedProjects")
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.GET_MY_CREATED_PROJECTS,
        payload: data.Result.myCreatedProjects,
      });
      dispatch({ type: actionTypes.END_CREATED_PROJECT_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_CREATED_PROJECT_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const getMyInvolvedProjects = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: actionTypes.START_INVOLVED_PROJECT_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .get("/project/myInvolvedProjects")
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.GET_MY_INVOLVED_PROJECTS,
        payload: data.Result.myInvolvedProjects,
      });
      dispatch({ type: actionTypes.END_INVOLVED_PROJECT_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_INVOLVED_PROJECT_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const createProject = (
  projectData: CreateProjectPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/project/createProject", projectData)
    .then((res: AxiosResponse) => {
      dispatch(getMyCreatedProjects());
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      dispatch({
        type: actionTypes.EMPTY_USERS_LIST,
      });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const updateProject = (
  projectData: CreateProjectPayload,
  projectId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .put(`/project/updateProject/${projectId}`, projectData)
    .then((res: AxiosResponse) => {
      dispatch(getMyCreatedProjects());
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      dispatch({
        type: actionTypes.EMPTY_USERS_LIST,
      });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const deleteProject = (
  projectId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .delete(`/project/deleteProject/${projectId}`)
    .then((res: AxiosResponse) => {
      dispatch(getMyCreatedProjects());
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const getUsersList = (
  isUpdate: boolean,
  searchText?: string,
  usersListForUpdate?: UsersListItem[],
  fromTask?: boolean,
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  if (isUpdate) {
    if(fromTask) {
      dispatch({
        type: actionTypes.MARK_ALREDY_SELECTED_USER_FOR_TASK,
        payload: usersListForUpdate,
      });
    }
    else {
      dispatch({
        type: actionTypes.MARK_ALREADY_SELECTED_USER,
        payload: usersListForUpdate,
      });
    }
  } else {
    dispatch({ type: actionTypes.START_LOCAL_LOADING });
    dispatch({ type: actionTypes.START_GLOBAL_LOADING });
    const payload = {
      SearchText: searchText,
    };
    axios
      .post("/project/getUsers", payload)
      .then((res: AxiosResponse) => {
        const data: SumiBackendResponse = res.data;
        dispatch({
          type: actionTypes.SET_USERS_LIST,
          payload: data.Result.Users,
        });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data;
        if (data) {
          dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
          dispatch({ type: actionTypes.END_LOCAL_LOADING });
          dispatch({ type: actionTypes.END_GLOBAL_LOADING });
        }
      });
  }
};

export const selectUser = (
  userId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_USER,
    payload: userId,
  });
};

export const selectUserFromTask = (
  userId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_USER_FROM_TASK,
    payload: userId,
  });
};

export const emptyUserslist = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: actionTypes.EMPTY_USERS_LIST,
  });
};
