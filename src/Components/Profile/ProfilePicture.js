import React, { Component } from "react";

class ProfilePicture extends Component {
  render() {
    return (
      <div className="pageLeft">
        <img src={this.props.user.avatar} alt="Profile" />
        <p>
          This image is hard coded. I would like to add an upload option to add
          a profile picture.
        </p>
      </div>
    );
  }
}

export default ProfilePicture;
