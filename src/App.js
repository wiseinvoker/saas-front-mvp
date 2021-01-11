import React, { Component } from "react";
import Root from "./Root";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
// import Home from "./Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
// import Dashboard from "./components/video/Dashboard";
import VideoDetail from "./components/video/VideoDetail";
import SuccessPage from "./components/results/Success";
import CanceledPage from "./components/results/Canceled";

// import requireAuth from "./utils/RequireAuth";

import axios from "axios";
if (window.location.origin === "http://localhost:3000") {
  // axios.defaults.baseURL = "http://sheltered-eyrie-96953.herokuapp.com";
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path="/yt-video" component={VideoDetail} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/success" component={SuccessPage} />
            <Route path="/canceled" component={CanceledPage} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Root>
      </div>
    );
  }
}

// <Route path="/dashboard" component={requireAuth(Dashboard)} />

export default App;
