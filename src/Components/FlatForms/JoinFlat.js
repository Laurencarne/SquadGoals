import React from "react";
import { Redirect } from "react-router-dom";

class JoinFlat extends React.Component {
  state = {
    flat_name: "",
    flat_key: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const flat = {
      name: this.state.flat_name,
      flat_key: this.state.flat_key,
      id: this.props.user.id
    };
    this.props.addUserToFlat(flat);
    this.setState({
      flat_name: "",
      flat_key: ""
    });
    this.props.handleClick();
  };

  render() {
    return (
      <>
        {this.props.logged_in ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div className="popOut">
            <div className="popOutCenter">
              <form className="form" onSubmit={this.handleSubmit}>
                <button type="button" onClick={this.props.handleClick}>
                  Back
                </button>
                <p>Flatname: </p>
                <input
                  onChange={this.handleChange}
                  type="flat_name"
                  name="flat_name"
                  value={this.state.flat_name}
                />
                <p>Flat Key:</p>
                <input
                  onChange={this.handleChange}
                  type="flat_key"
                  name="flat_key"
                  value={this.state.flat_key}
                />
                <button type="submit">Log in</button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default JoinFlat;
