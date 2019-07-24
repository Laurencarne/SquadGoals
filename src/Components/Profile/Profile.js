import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import ProfilePicture from "./ProfilePicture";
import Flat from "./Flat";

class Profile extends Component {
  state = {
    clicked: false
  };

  renderPage = () => {
    const {
      logged_in,
      handleChange,
      updateProfile,
      flat,
      user,
      updateFlat
    } = this.props;
    if (!logged_in && user) {
      return <Redirect to="/" />;
    } else if (this.state.clicked && user.username) {
      return (
        <>
          <EditProfile
            handleChange={handleChange}
            updateProfile={updateProfile}
            handleClick={this.handleClick}
            user={user}
          />
        </>
      );
    } else if (logged_in && user) {
      return (
        <>
          <div className="page">
            <div className="container">
              <div className="pageLeft">
                <ProfilePicture updateProfile={updateProfile} user={user} />
                {user.flat_id ? (
                  <div className="flatDashboard">
                    <Flat updateFlat={updateFlat} flat={flat} />
                  </div>
                ) : null}
              </div>
              <div className="pageRight">
                <ShowProfile handleClick={this.handleClick} user={user} />
              </div>
            </div>
          </div>
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
    return <>{this.renderPage()}</>;
  }
}

export default Profile;
