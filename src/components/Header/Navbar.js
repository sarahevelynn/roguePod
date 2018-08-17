import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import axios from "axios";

export default class Navbar extends Component {
  constructor() {
    super();
  }

  logout = event => {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        console.log("Error with Logging out");
      });
  };

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <header id="navbar">
        <Link to="/">
          <h1 id="AppTitle">Rogue Pod Interview</h1>
        </Link>

        <div id="navButtons">
          {loggedIn ? (
            <section id="navagation">
              <Link to="#" onClick={this.logout}>
                <span id="navagationButton">logout</span>
              </Link>
            </section>
          ) : (
            <section id="navagation">
              <Link to="/">
                <span id="navagationButton">Home</span>
              </Link>
              <Link to="/login">
                <span id="navagationButton">Login</span>
              </Link>
              <Link to="/signup">
                <span id="navagationButton">Sign Up</span>
              </Link>
            </section>
          )}
        </div>
      </header>
    );
  }
}
