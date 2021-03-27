import { DispatchActionTypes, SprintState } from "../../interfaces/GlobalTypes";
import * as actionTypes from "../actionTypes";

const initialSprintState: SprintState = {
  sprints: [],
  hasSprintErrors: false,
  sprintErrors: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = initialSprintState,
  action: DispatchActionTypes
): SprintState {
  switch (action.type) {
    case actionTypes.SET_DEFAULT:
      return {
        ...initialSprintState,
      };
    case actionTypes.GET_SPRINTS:
      return {
        ...state,
        sprints: [...action.payload],
      };
    case actionTypes.SPRINT_ERROR:
      return {
        ...state,
        hasSprintErrors: true,
        sprintErrors: [...action.payload],
      };
    default:
      return state;
  }
}
