import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import axios from "axios";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
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
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log("navbar render, props: ");
    console.log(this.props);

    return (
      <header id="navbar">
        <h1 id="AppTitle">Rogue Pod Interview</h1>

        <div id="navButtons">
          {loggedIn ? (
            <section id="navagation">
              <Link
                to="#"
                className="btn btn-link text-secondary"
                onClick={this.logout}
              >
                <span id="navagationButton">logout</span>
              </Link>
            </section>
          ) : (
            <section id="navagation">
              <Link to="/">
                <span id="navagationButton">home</span>
              </Link>
              <Link to="/login" className="btn btn-link text-secondary">
                <span id="navagationButton">login</span>
              </Link>
              <Link to="/signup" className="btn btn-link">
                <span id="navagationButton">sign up</span>
              </Link>
            </section>
          )}
        </div>
      </header>
    );
  }
}

export default Navbar;
