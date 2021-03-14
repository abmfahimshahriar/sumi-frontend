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

export const loginUser = (
  userData: IUser
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.SET_DEFAULT });
  axios
    .post("/auth/login", userData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      setAuthorizationHeader(data.Result.Token, data.Result.UserId);
      const payload = {
        UserId: data.Result.UserId,
        Token: data.Result.Token,
      };
      dispatch({ type: actionTypes.LOGIN, payload: payload });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
      }
    });
};

export const signupUser = (
  userData: IUser
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.SET_DEFAULT });
  axios
    .post("/auth/signup", userData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      setAuthorizationHeader(data.Result.Token, data.Result.UserId);
      const payload = {
        UserId: data.Result.UserId,
        Token: data.Result.Token,
      };
      dispatch({ type: actionTypes.SIGNUP, payload: payload });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
      }
    });
};


export const logoutUser = (): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  localStorage.removeItem("Token");
  localStorage.removeItem("UserId");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: actionTypes.SET_DEFAULT });
};

export const setAuthenticated = (): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  const token = localStorage.Token;
  const userId = localStorage.UserId;
  const payload = {
    UserId: userId,
    Token: token,
  };
  dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: payload });
  axios.defaults.headers.common["Authorization"] = token;
};

const setAuthorizationHeader = (token: string, userId: string) => {
  localStorage.setItem("Token", token);
  const userToken = `Bearer ${token}`;
  localStorage.setItem("UserId", userId);
  axios.defaults.headers.common["Authorization"] = userToken;
};