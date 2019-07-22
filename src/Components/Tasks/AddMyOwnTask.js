import React from "react";
import "../../CSS/Signup.css";
import DatePage from "../../util/DatePage";
import Icons from "../../util/Icons";
import { Redirect } from "react-router-dom";

class SignupComponent extends React.Component {
  state = {
    clicked: false,
    avatar: false,
    avatarURL: "",
    name: "",
    description: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setAvatarURL = avatar => {
    this.setState({
      avatarURL: avatar
    });
  };

  renderAvatarsPage = () => {
    if (this.state.clicked) {
      return (
        <Icons
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
          value="Change The Avatar"
        />
      );
    } else {
      return (
        <input
          className="avatarInput"
          onClick={this.toggleAvatarBar}
          type="button"
          name="avatar"
          value="Choose The Avatar"
        />
      );
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const task = {
      name: this.state.name,
      description: this.state.description,
      avatar: this.state.avatarURL
    };
    this.props.signUpUserToServer(task);
  };

  render() {
    return (
      <>
        <div>
          {this.props.logged_in ? (
            <div>
              <Redirect to="/" />;
            </div>
          ) : (
            <div className="popOut">
              <div className="popOutCenter">
                {this.renderAvatarsPage()}
                <form className="form" onSubmit={this.handleFormSubmit}>
                  <p>Task Name: </p>
                  <input
                    onChange={this.handleChange}
                    type="name"
                    name="name"
                    value={this.state.name}
                  />
                  <p>Description: </p>
                  <input
                    onChange={this.handleChange}
                    type="description"
                    name="description"
                    value={this.state.description}
                  />
                  {this.renderChooseAvatarButton()}
                  {this.renderSelectedAvatar()}
                  <button className="submitButton">Create</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SignupComponent;
