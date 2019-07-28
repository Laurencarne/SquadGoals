import React from "react";
import "../../CSS/Signup.css";
import Icons from "../../util/Icons";
import { Redirect } from "react-router-dom";
import moment from "moment";

class SignupComponent extends React.Component {
  state = {
    clicked: false,
    avatar: false,
    avatarURL: "https://i.imgur.com/JAzqjJT.png",
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
    this.handleSubmit(task);
  };

  handleSubmit = task => {
    let counter = Math.floor(Math.random() * 3);
    let week = moment().isoWeekday(1)._d;
    let flatId = { flat_id: this.props.user.flat_id };
    let flatmate_id = this.props.getRandomFlatmate(counter);
    this.props.addTasksToFlat({ ...task, ...flatId, flatmate_id, week });
    // console.log({ ...task, ...flatId, flatmate_id, week });
    this.props.toggleAddMyOwn();
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
                  <button
                    className="taskBackButton"
                    onClick={this.props.toggleAddMyOwn}
                  >
                    <img
                      src="https://i.imgur.com/sW5hYLx.png"
                      alt="Task Logo"
                    />
                  </button>
                  <p>Task Name: </p>
                  <input
                    required
                    onChange={this.handleChange}
                    type="name"
                    name="name"
                    value={this.state.name}
                  />
                  <p>Description: </p>
                  <input
                    required
                    onChange={this.handleChange}
                    type="description"
                    name="description"
                    value={this.state.description}
                  />
                  {this.renderChooseAvatarButton()}
                  {this.renderSelectedAvatar()}
                  <button className="taskButton submitButton">Create</button>
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
