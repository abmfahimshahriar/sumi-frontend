import axios, { AxiosResponse } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IUser, SumiBackendResponse } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

export const loginUser = (
  userData: IUser
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  axios
    .post("/auth/login", userData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      const payload = {
        UserId: data.Result.UserId,
        Token: data.Result.Token,
      };
      dispatch({ type: actionTypes.LOGIN, payload: payload });
    })
    .catch((err) => {
      console.log(err);
    });
};
