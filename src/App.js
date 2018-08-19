import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Signup from "./components/Header/signUp";
import LoginForm from "./components/Header/LoginForm";
import Navbar from "./components/Header/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer/Index";
import PhotoUploader from "./components/PhotoUploader/Index";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };
  }

  componentDidMount = () => {
    this.getUser();
  };

  updateUser = userObject => {
    this.setState(userObject);
  };

  getUser = () => {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div className="AppContent">
            <Navbar
              updateUser={this.updateUser}
              loggedIn={this.state.loggedIn}
            />
            {this.state.loggedIn && <p>Welcome, {this.state.username}!</p>}
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={() => <LoginForm updateUser={this.updateUser} />}
            />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/photoUpload" render={() => <PhotoUploader />} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
