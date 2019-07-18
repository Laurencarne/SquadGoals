import React from "react";
import { Redirect } from "react-router-dom";

class JoinFlat extends React.Component {
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
                <button onClick={this.props.handleClick}>Back</button>
                <p>Flatname: </p>
                <input
                  onChange={this.props.handleChange}
                  type="flat_name"
                  name="flat_name"
                  value={this.props.flat_name}
                />
                <p>Flat Key:</p>
                <input
                  onChange={this.props.handleChange}
                  type="flat_key"
                  name="flat_key"
                  value={this.props.flat_key}
                />
                <button onClick={this.props.onLoginClicked}>Log in</button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default JoinFlat;
