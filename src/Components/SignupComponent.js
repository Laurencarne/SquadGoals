import React from "react";

class SignupComponent extends React.Component {
  render() {
    return (
      <div className="nav">
        {this.props.logged_in ? (
          <div>
            <p> You're logged in already!</p>
          </div>
        ) : (
          <div className="container">
            <form className="form">
              <label htmlFor="first_name">First Name:</label>
              <input
                onChange={this.props.handleChange}
                id="first_name"
                type="first_name"
                name="first_name"
                value={this.props.first_name}
              />
              <label htmlFor="last_name">Last Name:</label>
              <input
                onChange={this.props.handleChange}
                id="last_name"
                type="last_name"
                name="last_name"
                value={this.props.last_name}
              />
              <label htmlFor="email">Email:</label>
              <input
                onChange={this.props.handleChange}
                id="email"
                type="email"
                name="email"
                value={this.props.email}
              />
              <label htmlFor="birthday">Birthday:</label>
              <input
                onChange={this.props.handleChange}
                id="birthday"
                type="date"
                name="birthday"
                value={this.props.birthday}
              />
              <label htmlFor="username">Username:</label>
              <input
                onChange={this.props.handleChange}
                id="username"
                type="text"
                name="username"
                value={this.props.username}
              />
              <label htmlFor="password">Password:</label>
              <input
                onChange={this.props.handleChange}
                id="password"
                type="password"
                name="password"
                value={this.props.password}
              />
              <button onClick={this.props.onSignupClicked}>Sign Up</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default SignupComponent;
