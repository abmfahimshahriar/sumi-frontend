import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";
import uiReducer from "./reducers/uiReducer";
import sprintReducer from "./reducers/sprintReducer";
import taskReducer from "./reducers/taskReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  project: projectReducer,
  sprint: sprintReducer,
  ui: uiReducer,
  task: taskReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
