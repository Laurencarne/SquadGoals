import React from "react";
import "../../CSS/Signup.css";
import DatePage from "../../util/DatePage";
import Avatar from "../../util/Avatar";
import { Redirect } from "react-router-dom";

class SignupComponent extends React.Component {
  state = {
    clicked: false,
    avatar: false
  };

  renderAvatars = () => {
    if (this.state.clicked) {
      return (
        <Avatar
          handleAvatarClick={this.handleAvatarClick}
          handleClicked={this.handleClicked}
        />
      );
    }
  };

  renderSelectedAvatar = () => {
    if (this.state.avatar) {
      return (
        <img
          className="avatarProfilePicture"
          src={this.state.avatarURL}
          alt="Avatar"
        />
      );
    }
  };

  handleAvatarClick = avatarUrl => {
    this.setState({
      avatarURL: avatarUrl,
      clicked: !this.state.clicked,
      avatar: true
    });
    this.props.setAvatarURL(avatarUrl);
  };

  handleClicked = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  renderChooseAvatarButton = () => {
    if (this.state.avatar) {
      return (
        <input
          className="avatarInput"
          onClick={this.handleClicked}
          type="button"
          name="avatar"
          value="Change Your Avatar"
        />
      );
    } else {
      return (
        <input
          className="avatarInput"
          onClick={this.handleClicked}
          type="button"
          name="avatar"
          value="Choose Your Avatar"
        />
      );
    }
  };

  render() {
    return (
      <>
        {this.renderAvatars()}
        <div>
          {this.props.logged_in ? (
            <div>
              <Redirect to="/" />;
            </div>
          ) : (
            <div className="container">
              <form className="form">
                <p>First Name: </p>
                <input
                  onChange={this.props.handleChange}
                  id="first_name"
                  type="first_name"
                  name="first_name"
                  value={this.props.first_name}
                />
                <p>Last Name: </p>
                <input
                  onChange={this.props.handleChange}
                  id="last_name"
                  type="last_name"
                  name="last_name"
                  value={this.props.last_name}
                />
                <p>E-Mail: </p>
                <input
                  onChange={this.props.handleChange}
                  id="email"
                  type="email"
                  name="email"
                  value={this.props.email}
                />
                <p>Birthday: </p>
                <DatePage
                  date={new Date()}
                  handleDateChange={this.props.handleDateChange}
                  name={"birthday"}
                />
                <p>Username: </p>
                <input
                  onChange={this.props.handleChange}
                  id="username"
                  type="text"
                  name="username"
                  value={this.props.username}
                />
                <p>Password: </p>
                <input
                  onChange={this.props.handleChange}
                  id="password"
                  type="password"
                  name="password"
                  value={this.props.password}
                />
                {this.renderChooseAvatarButton()}
                {this.renderSelectedAvatar()}
                <button
                  className="submitButton"
                  onClick={this.props.onSignupClicked}
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SignupComponent;
