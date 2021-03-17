import axios, { AxiosResponse, AxiosError } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IUser, SumiBackendResponse } from "../../interfaces/GlobalTypes";
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
  axios
    .get("/project/myCreatedProjects")
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      console.log(data);
      dispatch({ type: actionTypes.GET_MY_CREATED_PROJECTS, payload: data.Result.myCreatedProjects });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
        if (data) {
          dispatch({ type: actionTypes.PROJECT_ERROR, payload: data.Errors });
        }
      console.log(data);
    });
};
