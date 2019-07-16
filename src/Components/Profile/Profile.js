import React, { Component } from "react";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import ProfilePicture from "./ProfilePicture";

class Profile extends Component {
  state = {
    clicked: false
  };

  renderPage = () => {
    if (this.state.clicked && this.props.user.username) {
      return (
        <>
          <h1>Profile Page</h1>
          <ProfilePicture user={this.props.user} />
          <EditProfile
            handleChange={this.props.handleChange}
            updateProfile={this.props.updateProfile}
            handleClick={this.handleClick}
            user={this.props.user}
          />
        </>
      );
    } else if (!this.state.clicked && this.props.user.username) {
      return (
        <>
          <h1>Profile Page</h1>
          <ProfilePicture user={this.props.user} />
          <ShowProfile handleClick={this.handleClick} user={this.props.user} />
        </>
      );
    } else {
      return (
        <div>
          <h1>Please Log In</h1>
        </div>
      );
    }
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    return (
      <div className="page">
        <div className="container">{this.renderPage()}</div>
      </div>
    );
  }
}

export default Profile;
