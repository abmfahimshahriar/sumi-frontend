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
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/auth/login", userData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      setAuthorizationHeader(
        data.Result.Token,
        data.Result.UserId,
        data.Result.Username
      );
      const payload = {
        UserId: data.Result.UserId,
        Token: data.Result.Token,
        Username: data.Result.Username,
      };
      dispatch({ type: actionTypes.LOGIN, payload: payload });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      dispatch(getUserDetails());
      dispatch(getUserNotifications(1));
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const signupUser = (
  userData: IUser
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.SET_DEFAULT });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/auth/signup", userData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      setAuthorizationHeader(
        data.Result.Token,
        data.Result.UserId,
        data.Result.Username
      );
      const payload = {
        UserId: data.Result.UserId,
        Token: data.Result.Token,
        Username: data.Result.Username,
      };
      dispatch({ type: actionTypes.SIGNUP, payload: payload });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      dispatch(getUserDetails());
      dispatch(getUserNotifications(1));
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const logoutUser = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  localStorage.removeItem("Token");
  localStorage.removeItem("UserId");
  localStorage.removeItem("Username");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: actionTypes.SET_DEFAULT });
};

export const setAuthenticated = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  const token = localStorage.Token;
  const userId = localStorage.UserId;
  const username = localStorage.Username;
  const payload = {
    UserId: userId,
    Token: token,
    Username: username,
  };
  dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: payload });
  setAuthorizationHeader(token, userId, username);
  dispatch(getUserDetails());
  dispatch(getUserNotifications(1));
};

const setAuthorizationHeader = (
  token: string,
  userId: string,
  username: string
) => {
  localStorage.setItem("Token", token);
  localStorage.setItem("Username", username);
  const userToken = `Bearer ${token}`;
  localStorage.setItem("UserId", userId);
  axios.defaults.headers.common["Authorization"] = userToken;
};

export const getUserDetails = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .get("/user/userDetails")
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.SET_USER_DETAILS,
        payload: data.Result.UserDetails,
      });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const updateUser = (
  userData: FormData
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/user/updateUser", userData)
    .then((res: AxiosResponse) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data: SumiBackendResponse = res.data;
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      dispatch(getUserDetails());
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const getUserNotifications = (
  pageNumber: number
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_NOTIFICATION_LOADING });
  axios
    .get(`/notification/getNotifications/${pageNumber}`)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.SET_NOTIFICATIONS,
        payload: data.Result.Notifications,
      });
      dispatch({ type: actionTypes.END_NOTIFICATION_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_NOTIFICATION_LOADING });
      }
    });
};

export const readNotification = (
  notificationId: string,
  pageNumber: number,
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  const payload = {
    NotificationId: notificationId
  }
  axios
    .post("/notification/readNotification", payload)
    .then((res: AxiosResponse) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data: SumiBackendResponse = res.data;
      dispatch(getUserNotifications(pageNumber));
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};
