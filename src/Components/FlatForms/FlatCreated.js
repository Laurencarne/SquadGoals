import React from "react";
import { Redirect } from "react-router-dom";

class FlatCreated extends React.Component {
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
              <div className="form">
                <button onClick={this.props.handleClick}>Back</button>
                <p>Flatname: {this.props.flat_name}</p>
                <p>You have successfully moved in!</p>
                <p>
                  Keep your flat key safe and secure and give this to fellow
                  house mates so they can move in with you!
                </p>
                <p>Flat Key:</p>
                <input
                  type="flat_key"
                  name="flat_key"
                  value={this.props.flat_key}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default FlatCreated;
