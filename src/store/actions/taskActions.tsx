import axios, { AxiosResponse, AxiosError } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  ChangeBucketPayload,
  CreateCommentPayload,
  CreateTaskPayload,
  SumiBackendResponse,
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

export const getTasks = (
  sprintId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .get(`/task/getTasks/${sprintId}`)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.GET_TASKS,
        payload: data.Result.Tasks,
      });
      dispatch({
        type: actionTypes.GET_SPRINT_DETAILS,
        payload: data.Result.Sprint,
      });
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};

export const changeBucket = (
  payload: ChangeBucketPayload,
  sprintId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  axios
    .post("/task/bucketChange", payload)
    .then((res: AxiosResponse) => {
      dispatch(getTasks(sprintId));
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
      }
    });
};

export const createTask = (
  taskData: CreateTaskPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .post("/task/createTask", taskData)
    .then((res: AxiosResponse) => {
      dispatch(getTasks(taskData.SprintId));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({
        type: actionTypes.EMPTY_USERS_LIST,
      });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};

export const createComment = (
  commentData: CreateCommentPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .post("/task/createComment", commentData)
    .then((res: AxiosResponse) => {
      dispatch(getComments(commentData));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({
        type: actionTypes.EMPTY_USERS_LIST,
      });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};

export const getComments = (
  commentData: CreateCommentPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .post("/task/getComments", commentData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.GET_COMMENTS,
        payload: data.Result.Comments,
      });
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};

export const clearComments = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_COMMENTS });
};
