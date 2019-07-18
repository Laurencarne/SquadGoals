import React, { Component } from "react";
import "../../CSS/NavBar.css";
import { Link } from "react-router-dom";

const navStyle = {
  color: "black"
};

class NavBar extends Component {
  render() {
    return (
      <>
        {this.props.logged_in ? (
          <nav className="nav">
            <Link style={navStyle} to="/">
              <h3>
                <img
                  className="homeImage"
                  src="https://image.flaticon.com/icons/svg/25/25694.svg"
                  alt="Home Icon"
                />
              </h3>
            </Link>
            <Link style={navStyle} to="/profile">
              <button className="navButtons">Profile</button>
            </Link>
            {this.props.user.flat_id ? (
              <>
                <Link style={navStyle} to="/shopping">
                  <button className="navButtons">Shopping List</button>
                </Link>
                <Link style={navStyle} to="/tasks">
                  <button className="navButtons">Tasks</button>
                </Link>
                <Link style={navStyle} to="/calendar">
                  <button className="navButtons">Calender</button>
                </Link>
              </>
            ) : null}
            <Link style={navStyle} to="/">
              <button onClick={this.props.handleLogOut} className="navButtons">
                Log Out
              </button>
            </Link>
            <button onClick={this.props.handleJoinFlat} className="navButtons">
              Join Flat
            </button>
          </nav>
        ) : (
          <nav className="nav">
            <Link style={navStyle} to="/">
              <h3>
                <img
                  className="homeImage"
                  src="https://image.flaticon.com/icons/svg/25/25694.svg"
                  alt="Home Icon"
                />
              </h3>
            </Link>
            <Link style={navStyle} to="/signup">
              <button className="navButtons">Sign Up</button>
            </Link>
            <Link style={navStyle} to="/login">
              <button className="navButtons">Log In</button>
            </Link>
          </nav>
        )}
      </>
    );
  }
}

export default NavBar;
