import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit");

    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ", response);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          this.setState({
            redirectTo: "/"
          });
        }
      })
      .catch(error => {
        console.log("login error: ", error);
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div id="centeredContent">
          <div id="loginSignupPage">
            <h4 id="loginSignupTitle">Login</h4>
            <form id="loginSignupForm">
              <div id="formGroup">
                <div id="loginSignupInfo">
                  <label id="formLabel" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="formInput"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div id="formGroup">
                <div id="loginSignupInfo">
                  <label id="formLabel" htmlFor="password">
                    Password:{" "}
                  </label>
                  <input
                    id="formInput"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div id="formGroup">
                <button
                  id="submitButton"
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
