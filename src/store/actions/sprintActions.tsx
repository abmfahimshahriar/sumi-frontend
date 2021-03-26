import axios, { AxiosResponse, AxiosError } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  CreateSprintPayload,
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

export const getSprints = (
  projectId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .get(`/sprint/getSprints/${projectId}`)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.GET_SPRINTS,
        payload: data.Result.Sprints,
      });
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.SPRINT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};

export const createSprint = (
  sprintData: CreateSprintPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .post("/sprint/createSprint", sprintData)
    .then((res: AxiosResponse) => {
      dispatch(getSprints(sprintData.ProjectId));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.SPRINT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};

export const updateSprint = (
  sprintData: CreateSprintPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  axios
    .put("/sprint/updateSprint", sprintData)
    .then((res: AxiosResponse) => {
      dispatch(getSprints(sprintData.ProjectId));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.SPRINT_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
      }
    });
};
