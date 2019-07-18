import React, { Component } from "react";
import "../../CSS/NavBar.css";
import { Link } from "react-router-dom";
import CreateFlat from "../FlatForms/CreateFlat";
import JoinFlat from "../FlatForms/JoinFlat";
import FlatCreated from "../FlatForms/FlatCreated";

const navStyle = {
  color: "black"
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
          <JoinFlat handleClick={this.handleJoinFlat} />
        </>
      );
    } else if (this.state.flatCreated) {
      return (
        <>
          <FlatCreated handleClick={this.handleFlatCreated} />
        </>
      );
    }
  };

  handleJoinFlat = () => {
    this.setState({
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
      flat: flat,
      flatCreated: !this.state.flatCreated
    });
  };

  render() {
    return (
      <>
        {this.props.user.username && this.props.logged_in ? (
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
            ) : (
              <>
                <button onClick={this.handleJoinFlat} className="navButtons">
                  Join Flat
                </button>
                <button onClick={this.handleCreateFlat} className="navButtons">
                  Create a Flat
                </button>
              </>
            )}
            <Link style={navStyle} to="/">
              <button onClick={this.props.handleLogOut} className="navButtons">
                Log Out
              </button>
            </Link>
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
        <div>{this.renderFlatForms()}</div>
      </>
    );
  }
}

export default NavBar;
