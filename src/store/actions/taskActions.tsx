import axios, { AxiosResponse, AxiosError } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
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