import {
  DispatchActionTypes,
  Sprint,
  TaskState,
} from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialSprintState: TaskState = {
  fullTaskList: [],
  tasks: [],
  SprintDetails: {} as Sprint,
  hasTaskErrors: false,
  taskErrors: [],
  comments: [],
  searchText: "",
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
        fullTaskList: [...action.payload],
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
    case actionTypes.SET_FILTER:
      return {
        ...state,
        searchText: action.payload,
      };
    case actionTypes.FILTER_TASKS:
      const text = state.searchText;
      let tempTasks = [...state.fullTaskList];
      if (text) {
        tempTasks = tempTasks.filter((item) => {
          return item.TaskName.toLowerCase().includes(text);
        });
      }
      return {
        ...state,
        tasks: [...tempTasks],
      };
    default:
      return state;
  }
}
