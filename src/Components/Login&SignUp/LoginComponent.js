import React from "react";
import { Redirect } from "react-router-dom";

class LoginComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.logged_in ? (
          <div>
            <Redirect to="/" />;
          </div>
        ) : (
          <div className="container">
            <form className="form">
              <p>Username:</p>
              <input
                onChange={this.props.handleChange}
                id="username"
                type="text"
                name="username"
                value={this.props.username}
              />
              <p>Password:</p>
              <input
                onChange={this.props.handleChange}
                id="password"
                type="password"
                name="password"
                value={this.props.password}
              />
              <button onClick={this.props.onLoginClicked}>Log in</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default LoginComponent;
