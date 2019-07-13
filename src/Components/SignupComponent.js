import React from "react";

class LoginComponent extends React.Component {
  render() {
    return (
      <div className="nav">
        {this.props.logged_in ? (
          <div>
            <p> {`You're logged in already as ${this.props.username}`}</p>
          </div>
        ) : (
          <div>
            <p>You need to sign up or log in</p>
          </div>
        )}
      </div>
    );
  }
}

export default LoginComponent;
