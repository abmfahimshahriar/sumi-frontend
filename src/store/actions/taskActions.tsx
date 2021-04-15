import axios, { AxiosResponse, AxiosError } from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  ChangeBucketPayload,
  CreateCommentPayload,
  CreateTaskPayload,
  SumiBackendResponse,
  Task,
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

export const getTasks = (
  sprintId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
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
      dispatch({
        type: actionTypes.GET_PROJECT_DETAILS_FOR_TASK,
        payload: data.Result.Project,
      });
      dispatch({
        type: actionTypes.FILTER_TASKS,
      });
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const changeBucket = (
  payload: ChangeBucketPayload,
  sprintId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/task/bucketChange", payload)
    .then((res: AxiosResponse) => {
      dispatch(getTasks(sprintId));
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const createTask = (
  taskData: CreateTaskPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/task/createTask", taskData)
    .then((res: AxiosResponse) => {
      dispatch(getTasks(taskData.SprintId));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const updateTask = (
  taskData: CreateTaskPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .put("/task/updateTask", taskData)
    .then((res: AxiosResponse) => {
      dispatch(getTasks(taskData.SprintId));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const createComment = (
  commentData: CreateCommentPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/task/createComment", commentData)
    .then((res: AxiosResponse) => {
      dispatch(getComments(commentData));
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      dispatch({
        type: actionTypes.EMPTY_USERS_LIST,
      });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const getComments = (
  commentData: CreateCommentPayload
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  axios
    .post("/task/getComments", commentData)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.GET_COMMENTS,
        payload: data.Result.Comments,
      });
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
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

export const filterTasks = (
  text: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  dispatch({
    type: actionTypes.SET_FILTER,
    payload: text,
  });
  dispatch({
    type: actionTypes.FILTER_TASKS,
  });
  dispatch({ type: actionTypes.END_GLOBAL_LOADING });
};

export const getUsersListWithDetails = (
  projectId: string,
  sprintId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_LOCAL_LOADING });
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  const payload = {
    ProjectId: projectId,
    SprintId: sprintId,
  };
  axios
    .post("/task/getUsersList", payload)
    .then((res: AxiosResponse) => {
      const data: SumiBackendResponse = res.data;
      dispatch({
        type: actionTypes.SET_USERS_LIST,
        payload: [...data.Result.UsersList],
      });
      dispatch({
        type: actionTypes.SET_USERSLIST_FOR_TASK_FILTERING,
        payload: JSON.parse(JSON.stringify(data.Result.UsersList)),
      });
      dispatch({ type: actionTypes.END_LOCAL_LOADING });
      dispatch({ type: actionTypes.END_GLOBAL_LOADING });
    })
    .catch((err: AxiosError) => {
      const data = err.response?.data;
      if (data) {
        dispatch({ type: actionTypes.TASK_ERROR, payload: data.Errors });
        dispatch({ type: actionTypes.END_LOCAL_LOADING });
        dispatch({ type: actionTypes.END_GLOBAL_LOADING });
      }
    });
};

export const filterTasksByUser = (
  usersList: UsersListItem[]
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: actionTypes.START_GLOBAL_LOADING });
  dispatch({
    type: actionTypes.SET_FILTER_BY_USER,
    payload: usersList,
  });
  dispatch({
    type: actionTypes.FILTER_TASKS,
  });
  dispatch({ type: actionTypes.END_GLOBAL_LOADING });
};

export const openTaskCUDialog = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_OPEN_TASK_CU_DIALOG,
  });
};

export const closeTaskCUDialog = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_CLOSE_TASK_CU_DIALOG,
  });
};

export const setSelectedTaskForUpdate = (
  selectedTask: Task
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_SELECTED_TASK_FOR_UPDATE,
    payload: selectedTask,
  });
  dispatch(openTaskCUDialog());
};

export const removeSelectedTaskForUpdate = (): ThunkAction<
  void,
  {},
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_SELECTED_TASK_FOR_UPDATE,
  });
  dispatch(closeTaskCUDialog());
};

export const selectUserForTaskFiltering = (
  userId: string
): ThunkAction<void, {}, unknown, Action<string>> => async (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_USER_FOR_TASK_FILTERING,
    payload: userId,
  });
};
