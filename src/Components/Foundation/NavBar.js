import React, { Component } from "react";
import "../../CSS/NavBar.css";
import { Link } from "react-router-dom";
import CreateFlat from "../FlatForms/CreateFlat";
import JoinFlat from "../FlatForms/JoinFlat";
import FlatCreated from "../FlatForms/FlatCreated";

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class NavBar extends Component {
  state = {
    createFlat: false,
    joinFlat: false,
    flatCreated: false,
    flat: []
  };

  renderFlatForms = () => {
    if (this.state.createFlat) {
      return (
        <>
          <CreateFlat
            createNewFlat={this.props.createNewFlat}
            handleFlatCreatedClick={this.handleFlatCreated}
            handleCreateFlat={this.handleCreateFlat}
          />
        </>
      );
    } else if (this.state.joinFlat) {
      return (
        <>
          <JoinFlat
            handleClick={this.handleJoinFlat}
            user={this.props.user}
            addUserToFlat={this.props.addUserToFlat}
          />
        </>
      );
    } else if (this.state.flatCreated) {
      return (
        <>
          <FlatCreated
            handleClick={this.handleFlatCreated}
            flat={this.state.flat}
          />
        </>
      );
    }
  };

  handleJoinFlat = () => {
    this.setState({
      flat: this.props.flat,
      joinFlat: !this.state.joinFlat
    });
  };

  handleCreateFlat = () => {
    this.setState({
      createFlat: !this.state.createFlat
    });
  };

  handleFlatCreated = flat => {
    this.setState({
      createFlat: false,
      joinFlat: false,
      flat: flat.flat,
      flatCreated: !this.state.flatCreated
    });
  };

  render() {
    return (
      <>
        {this.props.user && this.props.logged_in ? (
          <nav className="nav">
            <span className="navLeft">
              <Link style={navStyle} to="/">
                <h3>
                  <img
                    className="homeImage"
                    src="https://image.flaticon.com/icons/svg/25/25694.svg"
                    alt="Home Icon"
                  />
                </h3>
              </Link>
            </span>
            <span className="navRight">
              <Link style={navStyle} to="/profile">
                <p className="navButtons">Profile</p>
              </Link>
              <span className="navRight"></span>
              {this.props.user.flat_id ? (
                <>
                  <Link style={navStyle} to="/shopping">
                    <p className="navButtons">Shopping List</p>
                  </Link>
                  <span className="navRight"></span>
                  <Link style={navStyle} to="/tasks">
                    <p className="navButtons">Tasks</p>
                  </Link>
                  <span className="navRight"></span>
                  <Link style={navStyle} to="/bills">
                    <p className="navButtons">Bills</p>
                  </Link>
                  <span className="navRight"></span>
                  <Link style={navStyle} to="/calendar">
                    <p className="navButtons">Calender</p>
                  </Link>
                  <span className="navRight"></span>
                </>
              ) : (
                <>
                  <p onClick={this.handleJoinFlat} className="navButtons">
                    Join Flat
                  </p>
                  <span className="navRight"></span>
                  <p onClick={this.handleCreateFlat} className="navButtons">
                    Create a Flat
                  </p>
                  <span className="navRight"></span>
                </>
              )}
              <Link style={navStyle} to="/">
                <p onClick={this.props.handleLogOut} className="navButtons">
                  Log Out
                </p>
              </Link>
            </span>
          </nav>
        ) : (
          <nav className="nav">
            <span className="navLeft">
              <Link style={navStyle} to="/">
                <h3>
                  <img
                    className="homeImage"
                    src="https://image.flaticon.com/icons/svg/25/25694.svg"
                    alt="Home Icon"
                  />
                </h3>
              </Link>
            </span>
            <span className="navRight">
              <Link style={navStyle} to="/signup">
                <p className="navButtons">Sign Up</p>
              </Link>
              <span className="navRight"></span>
              <Link style={navStyle} to="/login">
                <p className="navButtons">Log In</p>
              </Link>
            </span>
          </nav>
        )}
        <div>{this.renderFlatForms()}</div>
      </>
    );
  }
}

export default NavBar;
