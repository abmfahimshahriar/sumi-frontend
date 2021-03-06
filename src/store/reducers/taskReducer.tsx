import {
  DispatchActionTypes,
  Project,
  Sprint,
  Task,
  TaskState,
  UsersListItem,
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
  usersList: [],
  projectDetails: {} as Project,
  openTaskCUDialog: false,
  selectedTaskToUpdate: {} as Task,
  isUpdate: false,
  fullUsersList: [],
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
        hasTaskErrors: false,
        taskErrors: [],
      };
    case actionTypes.GET_SPRINT_DETAILS:
      return {
        ...state,
        SprintDetails: action.payload,
        hasTaskErrors: false,
        taskErrors: [],
      };
    case actionTypes.GET_PROJECT_DETAILS_FOR_TASK:
      return {
        ...state,
        projectDetails: action.payload,
        hasTaskErrors: false,
        taskErrors: [],
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
        hasTaskErrors: false,
        taskErrors: [],
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
      } else {
        tempTasks = [...state.fullTaskList];
      }
      const usersList: UsersListItem[] = [...state.usersList];
      if (usersList.length > 0) {
        let filteredTaskForUser: Task[] = [];
        // eslint-disable-next-line array-callback-return
        usersList.map((item) => {
          if (item.IsSelected) {
            const tasksForThisUser = tempTasks.filter(
              (task) => task.Assignee._id === item._id
            );
            filteredTaskForUser = [...filteredTaskForUser, ...tasksForThisUser];
          }
        });
        tempTasks = [...filteredTaskForUser];
      } else {
        tempTasks = [...state.fullTaskList];
      }
      return {
        ...state,
        tasks: [...tempTasks],
      };
    case actionTypes.SET_FILTER_BY_USER:
      return {
        ...state,
        usersList: [...action.payload],
      };
    case actionTypes.SET_OPEN_TASK_CU_DIALOG:
      return {
        ...state,
        openTaskCUDialog: true,
      };
    case actionTypes.SET_CLOSE_TASK_CU_DIALOG:
      return {
        ...state,
        openTaskCUDialog: false,
      };
    case actionTypes.SET_SELECTED_TASK_FOR_UPDATE:
      return {
        ...state,
        selectedTaskToUpdate: action.payload,
        isUpdate: true,
      };
    case actionTypes.REMOVE_SELECTED_TASK_FOR_UPDATE:
      return {
        ...state,
        selectedTaskToUpdate: {} as Task,
        isUpdate: false,
      };
    case actionTypes.SET_USERSLIST_FOR_TASK_FILTERING:
      return {
        ...state,
        fullUsersList: [...action.payload],
      };
    case actionTypes.SELECT_USER_FOR_TASK_FILTERING:
      const selectedUser = state.fullUsersList.find(
        (item) => item._id === action.payload
      );
      if (selectedUser) selectedUser.IsSelected = !selectedUser.IsSelected;

      return {
        ...state,
      };
    // const usersList: UsersListItem[] = action.payload;
    // let tempTaskForUserFilter = [...state.tasks];
    // let filteredTaskForUser: Task[] = [];
    // if (usersList.length > 0) {
    //   // eslint-disable-next-line array-callback-return
    //   usersList.map((item) => {
    //     if (item.IsSelected) {
    //       const taskForThisUser = tempTaskForUserFilter.filter(
    //         (task) => task.Assignee._id === item._id
    //       );
    //       filteredTaskForUser = [...filteredTaskForUser, ...taskForThisUser];
    //     }
    //   });
    // } else {
    //   filteredTaskForUser = [...state.fullTaskList];
    // }
    // return {
    //   ...state,
    //   tasks: [...filteredTaskForUser],
    // };
    default:
      return state;
  }
}
