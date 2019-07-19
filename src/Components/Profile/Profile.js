import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import ProfilePicture from "./ProfilePicture";

class Profile extends Component {
  state = {
    clicked: false
  };

  renderPage = () => {
    if (!this.props.logged_in && this.props.user) {
      return <Redirect to="/" />;
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
    } else if (this.props.logged_in && this.props.user) {
      return (
        <div className="page">
          <h1>Profile Page</h1>
          <div className="container">
            <ProfilePicture
              updateProfile={this.props.updateProfile}
              user={this.props.user}
            />
            <ShowProfile
              handleClick={this.handleClick}
              user={this.props.user}
            />
          </div>
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
    return <>{this.renderPage()}</>;
  }
}

export default Profile;
