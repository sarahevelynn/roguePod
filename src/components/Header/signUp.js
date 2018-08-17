import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/user/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState({
            //redirect to login page
            redirectTo: "/login"
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  };

  render() {
    return (
      <div id="centeredContent">
        <div id="loginSignupPage">
          <h4 id="loginSignupTitle">Sign up</h4>
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
            <div id="formGroup ">
              <button
                id="submitButton"
                onClick={this.handleSubmit}
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
