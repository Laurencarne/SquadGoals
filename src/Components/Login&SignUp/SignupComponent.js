import React from "react";
import "../../CSS/Signup.css";
import DatePage from "../../util/DatePage";
import Avatar from "../../util/Avatar";
import { Redirect } from "react-router-dom";
import swal from "sweetalert2";

class SignupComponent extends React.Component {
  state = {
    clicked: false,
    avatar: false,
    avatarURL: "",
    first_name: "",
    last_name: "",
    email: "",
    birthday: new Date(),
    username: "",
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
    const {
      username,
      first_name,
      last_name,
      password,
      birthday,
      email,
      avatarURL
    } = this.state;
    e.preventDefault();
    const flatmate = {
      flatmate: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: password,
        birthday: birthday,
        email: email,
        avatar: avatarURL
          ? avatarURL
          : "http://www.agromarketday.com/images/profile-holder.png"
      }
    };
    if (username && first_name && last_name && password && birthday && email) {
      this.props.signUpUserToServer(flatmate);
    } else {
      swal.fire({
        title: "Opps...",
        text: "Please fill in your details to Sign Up",
        type: "error",
        confirmButtonText: "Try Again"
      });
    }
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
              <form
                className="form LoginSignup"
                onSubmit={this.handleFormSubmit}
              >
                <p>First Name: </p>
                <input
                  onChange={this.handleChange}
                  type="first_name"
                  name="first_name"
                  value={this.state.first_name}
                  required
                />
                <p>Last Name: </p>
                <input
                  onChange={this.handleChange}
                  type="last_name"
                  name="last_name"
                  value={this.state.last_name}
                  required
                />
                <p>E-Mail: </p>
                <input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={this.state.email}
                  required
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
                  required
                />
                <p>Password: </p>
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={this.state.password}
                  required
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
