import React from "react";
import { Redirect } from "react-router-dom";

class FlatKey extends React.Component {
  copyToClipboard = e => {
    e.preventDefault();
    console.log(e.target[0].value);
    let copy = e.target[0];
    copy.select();
    document.execCommand("copy");
  };

  render() {
    return (
      <>
        {!this.props.logged_in ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div className="popOut">
            <div className="popOutCenter">
              <div className="form">
                <button
                  className="joinFlatButton"
                  onClick={this.props.handleClick}
                >
                  Done
                </button>
                <p>
                  Keep your flat key safe and secure and give this to fellow
                  house mates so they can move in with you!
                </p>
                <p>Flat Key:</p>
                <form onSubmit={this.copyToClipboard}>
                  <input
                    className="flatKey"
                    type="flat_key"
                    name="flat_key"
                    value={this.props.flat.flat_key}
                  />
                  <button className="joinFlatButton">Copy</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default FlatKey;
