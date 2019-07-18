import React from "react";
import "../../CSS/Signup.css";
import DatePage from "../../util/DatePage";
import Avatar from "../../util/Avatar";
import { Redirect } from "react-router-dom";

class SignupComponent extends React.Component {
  state = {
    clicked: false,
    avatar: false,
    avatarURL: "",
    first_name: "First Name",
    last_name: "Last Name",
    email: "E-Mail",
    birthday: new Date(),
    username: "username",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };

  setAvatarURL = avatar => {
    this.setState({
      avatar: avatar
    });
  };

  renderAvatarsPage = () => {
    if (this.state.clicked) {
      return (
        <Avatar
          handleAvatarClick={this.handleAvatarClick}
          toggleAvatarBar={this.toggleAvatarBar}
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
  };

  toggleAvatarBar = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  renderChooseAvatarButton = () => {
    if (this.state.avatar) {
      return (
        <input
          className="avatarInput"
          onClick={this.toggleAvatarBar}
          type="button"
          name="avatar"
          value="Change Your Avatar"
        />
      );
    } else {
      return (
        <input
          className="avatarInput"
          onClick={this.toggleAvatarBar}
          type="button"
          name="avatar"
          value="Choose Your Avatar"
        />
      );
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const flatmate = {
      flatmate: {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        birthday: this.state.birthday,
        email: this.state.email,
        avatar: this.state.avatarURL
      }
    };
    this.props.signUpUserToServer(flatmate);
  };

  render() {
    return (
      <>
        {this.renderAvatarsPage()}
        <div>
          {this.props.logged_in ? (
            <div>
              <Redirect to="/" />;
            </div>
          ) : (
            <div className="container">
              <form className="form" onSubmit={this.handleFormSubmit}>
                <p>First Name: </p>
                <input
                  onChange={this.handleChange}
                  type="first_name"
                  name="first_name"
                  value={this.state.first_name}
                />
                <p>Last Name: </p>
                <input
                  onChange={this.handleChange}
                  type="last_name"
                  name="last_name"
                  value={this.state.last_name}
                />
                <p>E-Mail: </p>
                <input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={this.state.email}
                />
                <p>Birthday: </p>
                <DatePage
                  date={new Date()}
                  handleDateChange={this.handleDateChange}
                  name={"birthday"}
                />
                <p>Username: </p>
                <input
                  onChange={this.handleChange}
                  type="username"
                  name="username"
                  value={this.state.username}
                />
                <p>Password: </p>
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={this.state.password}
                />
                {this.renderChooseAvatarButton()}
                {this.renderSelectedAvatar()}
                <button className="submitButton">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SignupComponent;
