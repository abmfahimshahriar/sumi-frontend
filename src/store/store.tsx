import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
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
