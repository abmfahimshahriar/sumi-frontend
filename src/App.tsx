import React from "react";
import "./App.css";
import { LoginPage } from "./pages";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>hello people</div>
        <LoginPage />
      </Provider>
    </div>
  );
}

export default App;
