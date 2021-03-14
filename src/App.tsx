import React from "react";
import "./App.css";
import { LoginPage, LandingPage, SignupPage, ProjectPage } from "./pages";
import { Navbar } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRoute } from "./utility/components";
// redux
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <AuthRoute exact path="/projects">
                <ProjectPage />
              </AuthRoute>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
