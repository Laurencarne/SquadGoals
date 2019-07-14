import React, { Component } from "react";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";

class Profile extends Component {
  state = {
    clicked: false
  };

  renderPage = () => {
    if (this.state.clicked && this.props.user.username) {
      return (
        <>
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
        <h1>Profile Page</h1>
        <div className="container">
          <div className="pageLeft">
            <img src="https://i.imgur.com/xxOYSN2.png" alt="Profile Picture" />
            <p>
              This image is hard coded. I would like to add an upload option to
              add a profile picture.
            </p>
          </div>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default Profile;
