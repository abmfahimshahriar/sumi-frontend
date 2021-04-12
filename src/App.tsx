import React from "react";
import "./App.css";
import {
  LoginPage,
  LandingPage,
  SignupPage,
  ProjectPage,
  SprintPage,
  TaskPage,
  ReportPage,
  GanttChartPage,
  VelocityChartPage,
  ProfilePage
} from "./pages";
import { Navbar, Sidebar } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRoute } from "./utility/components";
// redux
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";

axios.defaults.baseURL = "https://sumi-server.herokuapp.com";

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
              <AuthRoute exact path="/profile">
                <ProfilePage />
              </AuthRoute>
              <AuthRoute exact path="/projects">
                <ProjectPage />
              </AuthRoute>
              <AuthRoute exact path="/projects/:projectId">
                <SprintPage />
              </AuthRoute>
              <AuthRoute exact path="/sprints/:projectId/:sprintId">
                <Sidebar />
                <TaskPage />
              </AuthRoute>
              <AuthRoute exact path="/sprints/:projectId/:sprintId/reports">
                <Sidebar />
                <ReportPage />
              </AuthRoute>
              <AuthRoute exact path="/sprints/:projectId/:sprintId/reports/ganttChart">
                <Sidebar />
                <GanttChartPage />
              </AuthRoute>
              <AuthRoute exact path="/sprints/:projectId/:sprintId/reports/velocityChart">
                <Sidebar />
                <VelocityChartPage />
              </AuthRoute>
              <AuthRoute exact path="/sprints/:projectId/:sprintId/:taskId">
                <Sidebar />
                <TaskPage />
              </AuthRoute>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
