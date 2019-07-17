import React, { Component } from "react";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import ProfilePicture from "./ProfilePicture";

class Profile extends Component {
  state = {
    clicked: false
  };

  renderPage = () => {
    if (!this.props.user.username) {
      return (
        <div>
          <h1>Please Log In</h1>
        </div>
      );
    } else if (this.state.clicked && this.props.user.username) {
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
    }
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    return (
      <>
        <div className="page">
          <h1>Profile Page</h1>
          <div className="container">
            <ProfilePicture user={this.props.user} />
            <ShowProfile
              handleClick={this.handleClick}
              user={this.props.user}
            />
          </div>
        </div>
        {this.renderPage()}
      </>
    );
  }
}

export default Profile;
