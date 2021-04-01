import {
  DispatchActionTypes,
  Sprint,
  TaskState,
} from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialSprintState: TaskState = {
  tasks: [],
  SprintDetails: {} as Sprint,
  hasTaskErrors: false,
  taskErrors: [],
  comments: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialSprintState,
  action: DispatchActionTypes
): TaskState {
  switch (action.type) {
    case actionTypes.SET_DEFAULT:
      return {
        ...initialSprintState,
      };
    case actionTypes.GET_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case actionTypes.GET_SPRINT_DETAILS:
      return {
        ...state,
        SprintDetails: action.payload,
      };
    case actionTypes.TASK_ERROR:
      return {
        ...state,
        hasTaskErrors: true,
        taskErrors: [...action.payload],
      };
    case actionTypes.GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case actionTypes.CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
}
