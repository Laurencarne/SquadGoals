import React from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert2";

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
    if (this.state.username && this.state.password) {
      this.props.onLoginClicked(user);
      this.setState({
        username: "",
        password: ""
      });
    } else {
      swal.fire({
        title: "Opps...",
        text: "Please enter your username and password",
        type: "error",
        confirmButtonText: "Try Again"
      });
    }
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
                required
              />
              <p>Password:</p>
              <input
                onChange={this.handleChange}
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                required
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
