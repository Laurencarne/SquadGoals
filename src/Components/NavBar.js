import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

const navStyle = {
  color: "black"
};

class NavBar extends Component {
  state = {
    profile: false
  };

  handleProfile = () => {
    this.setState({
      profile: !this.state.profile
    });
  };

  renderRedirect = () => {
    if (this.state.profile) {
      return <Redirect to={"/profile"} />;
    }
  };
  render() {
    return (
      <>
        {this.props.logged_in ? (
          <nav className="NavBar">
            <Link style={navStyle} to="/">
              <h3>
                <img
                  className="homeImage"
                  src="https://image.flaticon.com/icons/svg/25/25694.svg"
                  alt="Home Icon"
                />
              </h3>
            </Link>
            <button onClick={this.handleProfile} className="navButtons">
              Profile
            </button>
            {this.renderRedirect()}
            <button onClick={this.props.handleLogOut} className="navButtons">
              Log Out
            </button>
            <button onClick={this.props.handleJoinFlat} className="navButtons">
              Join Flat
            </button>
          </nav>
        ) : (
          <nav className="NavBar">
            <Link style={navStyle} to="/">
              <h3>
                <img
                  className="homeImage"
                  src="https://image.flaticon.com/icons/svg/25/25694.svg"
                  alt="Home Icon"
                />
              </h3>
            </Link>

            <ul className="nav-links">
              <Link style={navStyle} to="/signup">
                <li className="navButtons">Sign Up</li>
              </Link>
              <Link style={navStyle} to="/login">
                <li className="navButtons">Log In</li>
              </Link>
            </ul>
          </nav>
        )}
      </>
    );
  }
}

export default NavBar;
