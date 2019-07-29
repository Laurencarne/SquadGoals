import React, { Component } from "react";
import "../../CSS/Profile.css";
import Avatar from "../../util/Avatar";

class ProfilePicture extends Component {
  state = {
    clicked: false
  };

  handleAvatarClick = avatarUrl => {
    this.setState({
      clicked: !this.state.clicked
    });
    this.props.updateProfile({ avatar: avatarUrl });
  };

  toggleAvatar = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  renderPage = () => {
    if (this.state.clicked) {
      return (
        <Avatar
          handleAvatarClick={this.handleAvatarClick}
          toggleAvatarBar={this.toggleAvatar}
        />
      );
    } else {
      return (
        <div className="pageLeft">
          <div onClick={this.toggleAvatar} className="profilePictureContainer">
            <img
              className="profilePictureImage"
              src={this.props.user.avatar}
              alt="Profile"
            />
            <div className="overlay">
              <div className="text">Update Picture</div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}

export default ProfilePicture;
