import React from "react";
import { Redirect } from "react-router-dom";

class LoginComponent extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.onLoginClicked(user);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        {this.props.logged_in ? (
          <div>
            <Redirect to="/" />;
          </div>
        ) : (
          <div className="container">
            <form className="form LoginSignup" onSubmit={this.handleSubmit}>
              <p>Username:</p>
              <input
                onChange={this.handleChange}
                id="username"
                type="text"
                name="username"
                value={this.state.username}
              />
              <p>Password:</p>
              <input
                onChange={this.handleChange}
                id="password"
                type="password"
                name="password"
                value={this.state.password}
              />
              <button className="submitButton">Log in</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default LoginComponent;
